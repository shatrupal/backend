const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { optionalAuth, requireAuth } = require('../middleware/jwtAuth');

router.post('/', optionalAuth, async (req, res) => {
  try {
    const { items, guestName, guestEmail, guestPhone, address, deliverySlot, paymentMethod } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    const orderItems = items.map((i) => ({
      product: i.productId || i.product,
      name: i.name,
      price: Number(i.price),
      quantity: Number(i.quantity) || 1,
      unit: i.unit || 'piece',
    }));
    const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const deliveryCharge = subtotal >= 499 ? 0 : 40;
    const total = subtotal + deliveryCharge;
    const order = await Order.create({
      user: req.user ? req.user._id : undefined,
      guestName: guestName || req.body.name,
      guestEmail: guestEmail || req.body.email,
      guestPhone: guestPhone || req.body.phone,
      items: orderItems,
      subtotal,
      deliveryCharge,
      total,
      address: {
        street: address?.street || req.body.street,
        locality: address?.locality || req.body.locality,
        city: address?.city || req.body.city || 'Orai',
        state: address?.state || req.body.state || 'Uttar Pradesh',
        district: address?.district || req.body.district || 'Jalaun',
        pincode: address?.pincode || req.body.pincode,
        phone: address?.phone || guestPhone || req.body.phone,
      },
      deliverySlot: deliverySlot || req.body.deliverySlot || '10 AM - 12 PM',
      paymentMethod: paymentMethod || req.body.paymentMethod || 'cod',
    });
    res.status(201).json({ order: { id: order._id, total: order.total, status: order.status } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', requireAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
