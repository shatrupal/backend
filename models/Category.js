const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Category', categorySchema);
