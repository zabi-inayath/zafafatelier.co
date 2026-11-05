/**
 * Zafaf Atelier — Invitation Data Schema Documentation
 *
 * This file documents the exact shape of the `invitation` object that every
 * template component must accept as a prop. Templates MUST NOT contain any
 * hardcoded customer data. All customer-specific values flow from this schema.
 *
 * When adding a new template, register its supported customization keys in
 * TEMPLATE_CUSTOMIZATION_SCHEMA below.
 */

/**
 * @typedef {Object} VenueData
 * @property {string} name         - Venue display name
 * @property {string} address      - Full address string
 * @property {string} [mapsUrl]    - Google Maps / Apple Maps URL
 */

/**
 * @typedef {Object} EventData
 * @property {'nikah'|'walima'|'aqiqah'|'engagement'|'custom'} type
 * @property {string} title        - Display title e.g. "Nikah Ceremony"
 * @property {string} date         - ISO date string: "2027-01-25"
 * @property {string} time         - 24h time string: "11:00"
 * @property {string} [timeDisplay]- Formatted time for display: "11:00 AM"
 * @property {string} [hijriDate]  - Hijri date string for display
 * @property {VenueData} venue
 * @property {string} [dresscode]  - Dress code note
 * @property {string} [notes]      - Additional event notes
 */

/**
 * @typedef {Object} InvitationImages
 * @property {string} [openingVideo]    - URL to the opening cinematic video
 * @property {string} [heroBackground]  - URL to hero section background image
 * @property {string} [thankYouCard]    - URL to thank-you card image
 * @property {string} [gallery1]        - Gallery image URLs (optional)
 * @property {string} [gallery2]
 * @property {string} [gallery3]
 */

/**
 * @typedef {Object} InvitationContent
 * @property {string} [bismillah]       - Opening Bismillah text (Arabic)
 * @property {string} [quranicVerse]    - Quranic verse (Arabic)
 * @property {string} [quranicVerseRef]- Reference e.g. "Surah Ar-Rum 30:21"
 * @property {string} [openingMessage]  - Custom opening message
 * @property {string} [closingDua]      - Closing dua text
 * @property {string} [hashtag]         - Wedding hashtag e.g. "#ZaydAndMaryam"
 * @property {string} [dresscode]       - Dress code text displayed on invitation
 * @property {string} [rsvpWhatsapp]    - WhatsApp number for RSVP (raw digits)
 * @property {string} [rsvpDeadline]    - RSVP deadline date string
 */

/**
 * @typedef {Object} InvitationCustomization
 * Template-specific display options. Each template defines which keys it supports.
 * @property {boolean} [showCountdown]   - Show live countdown timer (default: true)
 * @property {boolean} [showWalima]      - Show Walima event section (default: true when event exists)
 * @property {boolean} [showGallery]     - Show gallery section (default: false)
 * @property {boolean} [showParents]     - Show parents' names (default: false)
 * @property {boolean} [showScratchCard] - Enable scratch-card date reveal (default: true)
 * @property {string}  [primaryColor]    - CSS hex color (validated, not arbitrary)
 * @property {string}  [accentColor]     - CSS hex color
 */

/**
 * @typedef {Object} InvitationData
 * The complete data object passed as a prop to every template component.
 *
 * Templates receive this object and render their sections from it.
 * Missing optional fields must be handled gracefully (no empty sections).
 *
 * @property {string} slug                   - Public URL slug
 * @property {string} templateSlug           - Registered template identifier
 * @property {'draft'|'published'|'archived'} status
 *
 * @property {string} groomName              - Display name of groom
 * @property {string} [groomArabic]          - Groom name in Arabic script
 * @property {string} [groomFather]          - Groom's father name
 * @property {string} [groomMother]          - Groom's mother name
 *
 * @property {string} brideName              - Display name of bride
 * @property {string} [brideArabic]          - Bride name in Arabic script
 * @property {string} [brideFather]          - Bride's father name
 * @property {string} [brideMother]          - Bride's mother name
 *
 * @property {string} [tagline]              - Subtitle below couple names
 *
 * @property {EventData[]} events            - Array of one or more events
 *
 * @property {InvitationImages} [images]     - Named image/video URLs
 * @property {InvitationContent} [content]   - Custom text content
 * @property {InvitationCustomization} [customization] - Design toggles & colors
 */

// ─── Default values used when fields are missing ─────────────────────────────

export const INVITATION_DEFAULTS = {
  tagline: 'Under the grace and blessings of Almighty Allah, celebrating their sacred union',
  content: {
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم',
    quranicVerse: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا',
    quranicVerseRef: 'Surah Ar-Rum 30:21',
    rsvpWhatsapp: '917448552778',
  },
  customization: {
    showCountdown: true,
    showWalima: true,
    showGallery: false,
    showParents: false,
    showScratchCard: true,
  },
};

// ─── Per-template supported customization keys ────────────────────────────────
// Templates should only apply options they explicitly support.

export const TEMPLATE_CUSTOMIZATION_SCHEMA = {
  'mizaan-royal': {
    showCountdown: true,
    showWalima: true,
    showScratchCard: true,
    showParents: false,
    showGallery: false,
  },
  'royal-majesty': {
    showCountdown: true,
    showWalima: true,
    showScratchCard: true,
    showParents: false,
    showGallery: false,
  },
  'zafaf-regal': {
    showCountdown: true,
    showWalima: true,
    showScratchCard: false,
    showParents: true,
    showGallery: false,
  },
  'rawdah-luxe': {
    showCountdown: true,
    showWalima: true,
    showScratchCard: false,
    showParents: false,
    showGallery: false,
  },
};
