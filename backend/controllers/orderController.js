const { pool } = require('../config/db');

// Helper to generate bespoke order numbers like ZA-2026-8492
function generateOrderNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ZA-${year}-${random}`;
}

// Create new order / purchase inquiry
exports.createOrder = async (req, res) => {
  try {
    const {
      product_type,
      occasion,
      couple_names,
      client_name,
      contact_email,
      contact_phone,
      event_date,
      city_venue,
      language_calligraphy,
      notes,
      amount
    } = req.body;

    if (!product_type || !occasion || !client_name) {
      return res.status(400).json({
        success: false,
        message: 'Product type, occasion, and contact name are required.'
      });
    }

    const orderNumber = generateOrderNumber();
    const userId = req.user ? req.user.id : null;
    const email = contact_email || (req.user ? req.user.email : '');
    const phone = contact_phone || (req.user ? req.user.phone : '');

    const [result] = await pool.query(
      `INSERT INTO orders (
        order_number, user_id, product_type, occasion, couple_names,
        client_name, contact_email, contact_phone, event_date,
        city_venue, language_calligraphy, notes, amount
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderNumber,
        userId,
        product_type,
        occasion,
        couple_names || '',
        client_name,
        email,
        phone || '',
        event_date || '',
        city_venue || '',
        language_calligraphy || 'English + Arabic Bismillah',
        notes || '',
        amount || 0.00
      ]
    );

    const [newOrder] = await pool.query('SELECT * FROM orders WHERE id = ?', [result.insertId]);

    return res.status(201).json({
      success: true,
      message: 'Order inquiry submitted successfully! A wedding artisan will contact you shortly.',
      order: newOrder[0]
    });
  } catch (err) {
    console.error('Create order error:', err);
    return res.status(500).json({ success: false, message: 'Failed to create order inquiry.' });
  }
};

// Get current user's orders
exports.getMyOrders = async (req, res) => {
  try {
    const [orders] = await pool.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    return res.status(200).json({
      success: true,
      orders
    });
  } catch (err) {
    console.error('Get my orders error:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve orders.' });
  }
};

// Get single order
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const order = orders[0];
    if (order.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized to view this order.' });
    }

    return res.status(200).json({
      success: true,
      order
    });
  } catch (err) {
    console.error('Get order error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch order.' });
  }
};
