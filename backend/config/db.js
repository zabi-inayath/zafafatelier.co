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

    // Create users table
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

    // Create orders table
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
        status ENUM('inquiry', 'confirmed', 'in_progress', 'ready_for_review', 'delivered', 'cancelled') DEFAULT 'confirmed',
        payment_status ENUM('pending', 'deposit_paid', 'paid', 'refunded') DEFAULT 'pending',
        amount DECIMAL(10,2) DEFAULT 0.00,
        currency VARCHAR(10) DEFAULT 'INR',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_orders_user (user_id),
        INDEX idx_orders_number (order_number)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    connection.release();
    console.log('[MySQL] All database tables initialized successfully.');
  } catch (err) {
    console.error('[MySQL Error] Database initialization failed:', err.message);
  }
}

module.exports = { pool, initDB };
