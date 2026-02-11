const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const { category, q, limit = 50 } = req.query;
    let query = { inStock: true };
    if (category) query.category = category;
    if (q && q.trim()) {
      query.$or = [
        { name: new RegExp(q.trim(), 'i') },
        { description: new RegExp(q.trim(), 'i') },
      ];
    }
    const list = await Product.find(query).populate('category').sort({ order: 1 }).limit(Number(limit));
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
