const path = require('path');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'Zabi@2201',
  database: process.env.DB_NAME || 'zafaf_atelier',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function initDB() {
  try {
    const connection = await pool.getConnection();
    console.log('[MySQL] Connected to database: ' + (process.env.DB_NAME || 'zafaf_atelier'));

    // ── users ──────────────────────────────────────────────────────────────
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50) DEFAULT NULL,
        role ENUM('customer', 'admin') DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_users_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // ── invitations ────────────────────────────────────────────────────────
    // Stores ALL customer-specific data. Templates are pure UI components
    // that receive this data as props — no customer data lives inside template files.
    await connection.query(`
      CREATE TABLE IF NOT EXISTS invitations (
        id INT AUTO_INCREMENT PRIMARY KEY,

        -- Public URL identifier e.g. "ahmed-safiya-2027"
        slug VARCHAR(120) NOT NULL UNIQUE,

        -- Maps to a registered template component e.g. "mizaan-royal"
        template_slug VARCHAR(100) NOT NULL,

        -- Lifecycle: draft -> published -> archived
        status ENUM('draft', 'published', 'archived') DEFAULT 'draft',

        -- Groom
        groom_name VARCHAR(200) DEFAULT '',
        groom_arabic VARCHAR(200) DEFAULT '',
        groom_father VARCHAR(200) DEFAULT '',
        groom_mother VARCHAR(200) DEFAULT '',

        -- Bride
        bride_name VARCHAR(200) DEFAULT '',
        bride_arabic VARCHAR(200) DEFAULT '',
        bride_father VARCHAR(200) DEFAULT '',
        bride_mother VARCHAR(200) DEFAULT '',

        -- Displayed below couple names
        tagline TEXT DEFAULT NULL,

        -- JSON array of events:
        -- [{ type, title, date, time, hijriDate, venue: { name, address, mapsUrl }, dresscode }]
        events JSON DEFAULT NULL,

        -- JSON map of named image/video URLs:
        -- { heroBackground, openingVideo, thankYouCard, ... }
        images JSON DEFAULT NULL,

        -- Per-template design configuration:
        -- { primaryColor, accentColor, showCountdown, showWalima, showGallery, ... }
        customization JSON DEFAULT NULL,

        -- Extra text content: duas, messages, hashtag, dress code text, etc.
        content JSON DEFAULT NULL,

        -- Internal admin notes, never shown to guests
        admin_notes TEXT DEFAULT NULL,

        -- FK to the order that generated this invitation (nullable)
        order_id INT NULL,

        -- FK to customer account (nullable)
        user_id INT NULL,

        -- Template version snapshot for forward compatibility
        template_version VARCHAR(20) DEFAULT '1.0',

        -- Set when published
        published_at TIMESTAMP NULL DEFAULT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        INDEX idx_invitations_slug (slug),
        INDEX idx_invitations_status (status),
        INDEX idx_invitations_template (template_slug)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // ── orders ─────────────────────────────────────────────────────────────
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) NOT NULL UNIQUE,
        user_id INT NULL,
        product_type VARCHAR(100) NOT NULL,
        occasion VARCHAR(100) NOT NULL,
        couple_names VARCHAR(255) DEFAULT '',
        client_name VARCHAR(255) NOT NULL,
        contact_email VARCHAR(255) NOT NULL,
        contact_phone VARCHAR(50) DEFAULT '',
        event_date VARCHAR(100) DEFAULT '',
        city_venue VARCHAR(255) DEFAULT '',
        language_calligraphy VARCHAR(100) DEFAULT 'English + Arabic Bismillah',
        notes TEXT DEFAULT NULL,
        status ENUM('inquiry','confirmed','in_progress','ready_for_review','delivered','cancelled') DEFAULT 'confirmed',
        payment_status ENUM('pending','deposit_paid','paid','refunded') DEFAULT 'pending',
        amount DECIMAL(10,2) DEFAULT 0.00,
        advance_paid DECIMAL(10,2) DEFAULT 0.00,
        currency VARCHAR(10) DEFAULT 'INR',
        invitation_id INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_orders_user (user_id),
        INDEX idx_orders_number (order_number),
        INDEX idx_orders_invitation (invitation_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // ── Safe migrations: add new columns to existing tables if absent ──────
    const [cols] = await connection.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'orders'`,
      [process.env.DB_NAME || 'zafaf_atelier']
    );
    const colNames = cols.map(c => c.COLUMN_NAME);

    if (!colNames.includes('advance_paid')) {
      await connection.query(`ALTER TABLE orders ADD COLUMN advance_paid DECIMAL(10,2) DEFAULT 0.00 AFTER amount`);
      console.log('[MySQL] Migration: added orders.advance_paid');
    }
    if (!colNames.includes('invitation_id')) {
      await connection.query(`ALTER TABLE orders ADD COLUMN invitation_id INT NULL AFTER currency`);
      console.log('[MySQL] Migration: added orders.invitation_id');
    }

    connection.release();
    console.log('[MySQL] All database tables initialized successfully.');
  } catch (err) {
    console.error('[MySQL Error] Database initialization failed:', err.message);
  }
}

module.exports = { pool, initDB };
