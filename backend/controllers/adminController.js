const { pool } = require('../config/db');

/**
 * GET /api/admin/stats
 * Dashboard overview statistics
 */
exports.getDashboardStats = async (req, res) => {
  try {
    const [[{ totalOrders }]] = await pool.query('SELECT COUNT(*) AS totalOrders FROM orders');
    const [[{ pendingOrders }]] = await pool.query(`SELECT COUNT(*) AS pendingOrders FROM orders WHERE status = 'pending'`);
    const [[{ totalInvitations }]] = await pool.query('SELECT COUNT(*) AS totalInvitations FROM invitations WHERE status != "archived"');
    const [[{ publishedInvitations }]] = await pool.query(`SELECT COUNT(*) AS publishedInvitations FROM invitations WHERE status = 'published'`);

    const [recentOrders] = await pool.query(
      `SELECT id, order_number, client_name, product_type, occasion, status, payment_status, amount, created_at
       FROM orders ORDER BY created_at DESC LIMIT 5`
    );

    const [recentInvitations] = await pool.query(
      `SELECT id, slug, template_slug, status, groom_name, bride_name, published_at, created_at
       FROM invitations ORDER BY created_at DESC LIMIT 5`
    );

    return res.json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        totalInvitations,
        publishedInvitations,
        recentOrders,
        recentInvitations
      }
    });
  } catch (err) {
    console.error('[adminController.getDashboardStats]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats.' });
  }
};

/**
 * GET /api/admin/orders
 * List orders with search, status filters, and pagination
 */
exports.listOrders = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 20);
    const offset = (page - 1) * limit;
    const { status, payment_status, search } = req.query;

    const whereClauses = [];
    const params = [];

    if (status) {
      whereClauses.push('o.status = ?');
      params.push(status);
    }

    if (payment_status) {
      whereClauses.push('o.payment_status = ?');
      params.push(payment_status);
    }

    if (search) {
      whereClauses.push('(o.order_number LIKE ? OR o.client_name LIKE ? OR o.contact_email LIKE ? OR o.couple_names LIKE ?)');
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    const where = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const query = `
      SELECT o.*, i.slug AS invitation_slug, i.status AS invitation_status
      FROM orders o
      LEFT JOIN invitations i ON o.id = i.order_id
      ${where}
      ORDER BY o.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [orders] = await pool.query(query, [...params, limit, offset]);

    const countQuery = `SELECT COUNT(*) AS total FROM orders o ${where}`;
    const [[{ total }]] = await pool.query(countQuery, params);

    return res.json({
      success: true,
      orders,
      total,
      page,
      limit
    });
  } catch (err) {
    console.error('[adminController.listOrders]', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve orders.' });
  }
};

/**
 * GET /api/admin/orders/:id
 * Retrieve single order with detailed invitation information
 */
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const [orders] = await pool.query(
      `SELECT o.*, u.name as user_name, u.email as user_email
       FROM orders o
       LEFT JOIN users u ON o.user_id = u.id
       WHERE o.id = ?`,
      [id]
    );

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const order = orders[0];

    // Find linked invitation if any
    const [invitations] = await pool.query(
      `SELECT id, slug, template_slug, status, published_at FROM invitations WHERE order_id = ?`,
      [id]
    );

    return res.json({
      success: true,
      order,
      invitation: invitations[0] || null
    });
  } catch (err) {
    console.error('[adminController.getOrderById]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch order.' });
  }
};

/**
 * PUT /api/admin/orders/:id
 * Update order status, payment status, notes, or details
 */
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, payment_status, notes, amount } = req.body;

    const [existing] = await pool.query('SELECT id FROM orders WHERE id = ?', [id]);
    if (!existing || existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const updates = [];
    const params = [];

    if (status !== undefined) {
      updates.push('status = ?');
      params.push(status);
    }
    if (payment_status !== undefined) {
      updates.push('payment_status = ?');
      params.push(payment_status);
    }
    if (notes !== undefined) {
      updates.push('notes = ?');
      params.push(notes);
    }
    if (amount !== undefined) {
      updates.push('amount = ?');
      params.push(amount);
    }

    if (updates.length === 0) {
      return res.status(400).json({ success: false, message: 'No fields provided to update.' });
    }

    params.push(id);
    await pool.query(`UPDATE orders SET ${updates.join(', ')} WHERE id = ?`, params);

    const [updated] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
    return res.json({
      success: true,
      message: 'Order updated successfully.',
      order: updated[0]
    });
  } catch (err) {
    console.error('[adminController.updateOrder]', err);
    return res.status(500).json({ success: false, message: 'Failed to update order.' });
  }
};
