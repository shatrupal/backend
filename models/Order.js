const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  price: Number,
  quantity: Number,
  unit: String,
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guestEmail: String,
  guestPhone: String,
  guestName: String,
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  deliveryCharge: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'packed', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'pending',
  },
  address: {
    street: String,
    locality: String,
    city: { type: String, default: 'Orai' },
    state: { type: String, default: 'Uttar Pradesh' },
    district: { type: String, default: 'Jalaun' },
    pincode: String,
    phone: String,
  },
  deliverySlot: String,
  paymentMethod: {
    type: String,
    enum: ['phonepe', 'google_pay', 'cod'],
    default: 'cod',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
