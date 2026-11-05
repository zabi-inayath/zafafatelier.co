const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');

async function seedAdmin() {
  try {
    // 1. Promote zabiu7697@gmail.com to admin
    await pool.query("UPDATE users SET role = 'admin' WHERE email = 'zabiu7697@gmail.com'");

    // 2. Ensure dedicated artisan admin account
    const [existing] = await pool.query("SELECT id FROM users WHERE email = 'admin@zafafatelier.co'");
    if (existing.length === 0) {
      const hash = await bcrypt.hash('ZafafAdmin@2026', 10);
      await pool.query(
        "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
        ['Zafaf Administrator', 'admin@zafafatelier.co', hash, '+917448552778', 'admin']
      );
      console.log('Created dedicated admin account: admin@zafafatelier.co');
    } else {
      console.log('Dedicated admin account already exists');
    }

    const [users] = await pool.query("SELECT id, name, email, role FROM users");
    console.log('Current users:', users);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
}

seedAdmin();
