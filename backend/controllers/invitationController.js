const { pool } = require('../config/db');

/**
 * Parse JSON columns from the database row safely.
 * MySQL returns JSON columns as strings; this converts them back to objects.
 */
function parseInvitationRow(row) {
  if (!row) return null;
  return {
    ...row,
    events: safeJson(row.events, []),
    images: safeJson(row.images, {}),
    customization: safeJson(row.customization, {}),
    content: safeJson(row.content, {}),
  };
}

function safeJson(value, fallback) {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'object') return value; // already parsed by mysql2
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

/**
 * Validate a CSS hex color value (prevent storing arbitrary strings).
 * Accepts #rgb, #rrggbb, #rgba, #rrggbbaa.
 */
function isValidHexColor(val) {
  return /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(val);
}

/**
 * Sanitize the customization object — only allow boolean flags and validated colors.
 */
function sanitizeCustomization(raw) {
  if (!raw || typeof raw !== 'object') return {};
  const allowed = ['showCountdown', 'showWalima', 'showGallery', 'showParents', 'showScratchCard'];
  const colorKeys = ['primaryColor', 'accentColor', 'goldColor'];
  const result = {};
  for (const key of allowed) {
    if (typeof raw[key] === 'boolean') result[key] = raw[key];
  }
  for (const key of colorKeys) {
    if (raw[key] && isValidHexColor(raw[key])) result[key] = raw[key];
  }
  return result;
}

/**
 * Sanitize events array — ensure each event is a plain object with expected keys only.
 */
function sanitizeEvents(raw) {
  if (!Array.isArray(raw)) return [];
  const VALID_TYPES = ['nikah', 'walima', 'aqiqah', 'engagement', 'custom'];
  return raw.slice(0, 4).map(ev => {
    if (!ev || typeof ev !== 'object') return null;
    return {
      type: VALID_TYPES.includes(ev.type) ? ev.type : 'custom',
      title: String(ev.title || '').slice(0, 200),
      date: String(ev.date || ''),
      time: String(ev.time || ''),
      timeDisplay: String(ev.timeDisplay || ''),
      hijriDate: String(ev.hijriDate || ''),
      venue: {
        name: String(ev.venue?.name || '').slice(0, 300),
        address: String(ev.venue?.address || '').slice(0, 500),
        mapsUrl: String(ev.venue?.mapsUrl || '').slice(0, 500),
      },
      dresscode: String(ev.dresscode || '').slice(0, 200),
      notes: String(ev.notes || '').slice(0, 500),
    };
  }).filter(Boolean);
}

/**
 * Sanitize images — only allow string URLs, no HTML injection.
 */
function sanitizeImages(raw) {
  if (!raw || typeof raw !== 'object') return {};
  const allowedKeys = ['openingVideo', 'heroBackground', 'thankYouCard', 'gallery1', 'gallery2', 'gallery3'];
  const result = {};
  for (const key of allowedKeys) {
    const val = raw[key];
    if (typeof val === 'string' && val.startsWith('http')) {
      result[key] = val.slice(0, 1000);
    } else if (typeof val === 'string' && val.startsWith('/')) {
      // Allow relative paths (served from public/)
      result[key] = val.slice(0, 500);
    }
  }
  return result;
}

/**
 * Sanitize content text fields — strip any HTML, limit lengths.
 */
function sanitizeContent(raw) {
  if (!raw || typeof raw !== 'object') return {};
  const FIELDS = ['bismillah', 'quranicVerse', 'quranicVerseRef', 'openingMessage',
    'closingDua', 'hashtag', 'dresscode', 'rsvpWhatsapp', 'rsvpDeadline'];
  const result = {};
  for (const key of FIELDS) {
    if (raw[key] !== undefined) {
      result[key] = String(raw[key]).replace(/<[^>]*>/g, '').slice(0, 2000);
    }
  }
  return result;
}

// ── PUBLIC ENDPOINTS ───────────────────────────────────────────────────────────

/**
 * GET /api/invitations/:slug
 * Returns a published invitation by its public slug.
 * Draft / archived invitations are NOT accessible via this endpoint.
 */
exports.getPublicInvitation = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      return res.status(400).json({ success: false, message: 'Invalid invitation identifier.' });
    }

    const [rows] = await pool.query(
      `SELECT id, slug, template_slug, status, groom_name, groom_arabic, groom_father, groom_mother,
              bride_name, bride_arabic, bride_father, bride_mother, tagline,
              events, images, customization, content, template_version, published_at, created_at
       FROM invitations WHERE slug = ? AND status = 'published' LIMIT 1`,
      [slug]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Invitation not found or not yet published.' });
    }

    return res.json({ success: true, invitation: parseInvitationRow(rows[0]) });
  } catch (err) {
    console.error('[invitationController.getPublicInvitation]', err);
    return res.status(500).json({ success: false, message: 'Failed to load invitation.' });
  }
};

// ── ADMIN ENDPOINTS ────────────────────────────────────────────────────────────

/**
 * GET /api/admin/invitations
 * List all invitations (all statuses) with pagination.
 */
exports.listInvitations = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 20);
    const offset = (page - 1) * limit;
    const status = req.query.status || null;

    let where = '';
    const params = [];
    if (status && ['draft', 'published', 'archived'].includes(status)) {
      where = 'WHERE status = ?';
      params.push(status);
    }

    const [rows] = await pool.query(
      `SELECT id, slug, template_slug, status, groom_name, bride_name, order_id,
              published_at, created_at, updated_at
       FROM invitations ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM invitations ${where}`,
      params
    );

    return res.json({ success: true, invitations: rows, total, page, limit });
  } catch (err) {
    console.error('[invitationController.listInvitations]', err);
    return res.status(500).json({ success: false, message: 'Failed to list invitations.' });
  }
};

/**
 * GET /api/admin/invitations/:id
 * Get a single invitation by database ID (admin only).
 */
exports.getInvitationById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM invitations WHERE id = ? LIMIT 1', [id]);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Invitation not found.' });
    }

    return res.json({ success: true, invitation: parseInvitationRow(rows[0]) });
  } catch (err) {
    console.error('[invitationController.getInvitationById]', err);
    return res.status(500).json({ success: false, message: 'Failed to load invitation.' });
  }
};

/**
 * POST /api/admin/invitations
 * Create a new invitation (always starts as draft).
 */
exports.createInvitation = async (req, res) => {
  try {
    const {
      slug, template_slug, groom_name, groom_arabic, groom_father, groom_mother,
      bride_name, bride_arabic, bride_father, bride_mother, tagline,
      events, images, customization, content, admin_notes, order_id, user_id,
    } = req.body;

    // Required fields
    if (!slug || !template_slug || !groom_name || !bride_name) {
      return res.status(400).json({
        success: false,
        message: 'slug, template_slug, groom_name, and bride_name are required.'
      });
    }

    // Slug format validation
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return res.status(400).json({
        success: false,
        message: 'Slug must contain only lowercase letters, numbers, and hyphens.'
      });
    }

    // Check slug uniqueness
    const [existing] = await pool.query('SELECT id FROM invitations WHERE slug = ?', [slug]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'An invitation with this slug already exists.' });
    }

    const sanitizedEvents = sanitizeEvents(events);
    const sanitizedImages = sanitizeImages(images);
    const sanitizedCustomization = sanitizeCustomization(customization);
    const sanitizedContent = sanitizeContent(content);

    const [result] = await pool.query(
      `INSERT INTO invitations
         (slug, template_slug, status, groom_name, groom_arabic, groom_father, groom_mother,
          bride_name, bride_arabic, bride_father, bride_mother, tagline,
          events, images, customization, content, admin_notes, order_id, user_id)
       VALUES (?, ?, 'draft', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug.trim(), template_slug.trim(),
        groom_name.trim(), groom_arabic?.trim() || '', groom_father?.trim() || '', groom_mother?.trim() || '',
        bride_name.trim(), bride_arabic?.trim() || '', bride_father?.trim() || '', bride_mother?.trim() || '',
        tagline?.trim() || null,
        JSON.stringify(sanitizedEvents),
        JSON.stringify(sanitizedImages),
        JSON.stringify(sanitizedCustomization),
        JSON.stringify(sanitizedContent),
        admin_notes?.trim() || null,
        order_id || null,
        user_id || null,
      ]
    );

    // If created from an order, link the invitation back to that order
    if (order_id) {
      await pool.query('UPDATE orders SET invitation_id = ? WHERE id = ?', [result.insertId, order_id]);
    }

    const [newRow] = await pool.query('SELECT * FROM invitations WHERE id = ?', [result.insertId]);
    return res.status(201).json({ success: true, invitation: parseInvitationRow(newRow[0]) });
  } catch (err) {
    console.error('[invitationController.createInvitation]', err);
    return res.status(500).json({ success: false, message: 'Failed to create invitation.' });
  }
};

/**
 * PATCH /api/admin/invitations/:id
 * Update an existing invitation (does not change status or slug).
 */
exports.updateInvitation = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query('SELECT id FROM invitations WHERE id = ?', [id]);
    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Invitation not found.' });
    }

    const {
      template_slug, groom_name, groom_arabic, groom_father, groom_mother,
      bride_name, bride_arabic, bride_father, bride_mother, tagline,
      events, images, customization, content, admin_notes,
    } = req.body;

    const updates = [];
    const params = [];

    const addField = (col, val) => { updates.push(`${col} = ?`); params.push(val); };

    if (template_slug !== undefined) addField('template_slug', template_slug.trim());
    if (groom_name !== undefined) addField('groom_name', groom_name.trim());
    if (groom_arabic !== undefined) addField('groom_arabic', groom_arabic.trim());
    if (groom_father !== undefined) addField('groom_father', groom_father.trim());
    if (groom_mother !== undefined) addField('groom_mother', groom_mother.trim());
    if (bride_name !== undefined) addField('bride_name', bride_name.trim());
    if (bride_arabic !== undefined) addField('bride_arabic', bride_arabic.trim());
    if (bride_father !== undefined) addField('bride_father', bride_father.trim());
    if (bride_mother !== undefined) addField('bride_mother', bride_mother.trim());
    if (tagline !== undefined) addField('tagline', tagline.trim() || null);
    if (events !== undefined) addField('events', JSON.stringify(sanitizeEvents(events)));
    if (images !== undefined) addField('images', JSON.stringify(sanitizeImages(images)));
    if (customization !== undefined) addField('customization', JSON.stringify(sanitizeCustomization(customization)));
    if (content !== undefined) addField('content', JSON.stringify(sanitizeContent(content)));
    if (admin_notes !== undefined) addField('admin_notes', admin_notes.trim() || null);

    if (updates.length === 0) {
      return res.status(400).json({ success: false, message: 'No valid fields to update.' });
    }

    params.push(id);
    await pool.query(`UPDATE invitations SET ${updates.join(', ')} WHERE id = ?`, params);

    const [updated] = await pool.query('SELECT * FROM invitations WHERE id = ?', [id]);
    return res.json({ success: true, invitation: parseInvitationRow(updated[0]) });
  } catch (err) {
    console.error('[invitationController.updateInvitation]', err);
    return res.status(500).json({ success: false, message: 'Failed to update invitation.' });
  }
};

/**
 * POST /api/admin/invitations/:id/publish
 * Publish a draft invitation — makes it publicly accessible at /invite/:slug.
 */
exports.publishInvitation = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT id, slug, status FROM invitations WHERE id = ?', [id]);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Invitation not found.' });
    }

    if (rows[0].status === 'published') {
      return res.json({ success: true, message: 'Invitation is already published.', slug: rows[0].slug });
    }

    await pool.query(
      `UPDATE invitations SET status = 'published', published_at = NOW() WHERE id = ?`,
      [id]
    );

    return res.json({
      success: true,
      message: 'Invitation published successfully.',
      slug: rows[0].slug,
      publicUrl: `/invite/${rows[0].slug}`,
    });
  } catch (err) {
    console.error('[invitationController.publishInvitation]', err);
    return res.status(500).json({ success: false, message: 'Failed to publish invitation.' });
  }
};

/**
 * POST /api/admin/invitations/:id/unpublish
 * Revert a published invitation back to draft (removes public access).
 */
exports.unpublishInvitation = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT id FROM invitations WHERE id = ?', [id]);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Invitation not found.' });
    }

    await pool.query(`UPDATE invitations SET status = 'draft', published_at = NULL WHERE id = ?`, [id]);
    return res.json({ success: true, message: 'Invitation unpublished. It is now a draft.' });
  } catch (err) {
    console.error('[invitationController.unpublishInvitation]', err);
    return res.status(500).json({ success: false, message: 'Failed to unpublish invitation.' });
  }
};

/**
 * DELETE /api/admin/invitations/:id (archive only — we never hard-delete)
 */
exports.archiveInvitation = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT id FROM invitations WHERE id = ?', [id]);
    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Invitation not found.' });
    }
    await pool.query(`UPDATE invitations SET status = 'archived' WHERE id = ?`, [id]);
    return res.json({ success: true, message: 'Invitation archived.' });
  } catch (err) {
    console.error('[invitationController.archiveInvitation]', err);
    return res.status(500).json({ success: false, message: 'Failed to archive invitation.' });
  }
};
