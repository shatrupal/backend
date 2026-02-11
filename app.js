require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { optionalAuth } = require('./middleware/jwtAuth');

const authRoutes = require('./routes/auth');
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

connectDB();

const app = express();
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:4200';

app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());
app.use(optionalAuth);

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.get('/api/health', (req, res) => res.json({ ok: true }));

module.exports = app;
