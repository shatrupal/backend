require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');

const IMG = (id, w = 400) => `https://images.unsplash.com/photo-${id}?w=${w}&fit=crop&q=80`;

const categories = [
  { name: 'Vegetables', slug: 'vegetables', order: 1, image: IMG('1546470427-e26264be0b0d', 200) },
  { name: 'Fruits', slug: 'fruits', order: 2, image: IMG('1560806887-1e4cd0b6cbd6', 200) },
  { name: 'Dairy', slug: 'dairy', order: 3, image: IMG('1563636619-e9143da7973b', 200) },
  { name: 'Staples', slug: 'staples', order: 4, image: IMG('1586201375761-83865001e31c', 200) },
  { name: 'Snacks', slug: 'snacks', order: 5, image: IMG('1558961363-fa8fdf82db35', 200) },
  { name: 'Beverages', slug: 'beverages', order: 6, image: IMG('1571934811356-5cc061b6821a', 200) },
];

const products = [
  { name: 'Tomato', price: 40, compareAtPrice: 50, unit: 'kg', slug: 'tomato', catSlug: 'vegetables', image: IMG('1546470427-e26264be0b0d') },
  { name: 'Onion', price: 30, compareAtPrice: 35, unit: 'kg', slug: 'onion', catSlug: 'vegetables', image: IMG('1580201092675-a0a6a6cafbb1') },
  { name: 'Potato', price: 25, compareAtPrice: 30, unit: 'kg', slug: 'potato', catSlug: 'vegetables', image: IMG('1518977676601-b53f82aba655') },
  { name: 'Lady Finger', price: 50, unit: 'kg', slug: 'lady-finger', catSlug: 'vegetables', image: IMG('1597362925123-77861d3fbfaf') },
  { name: 'Brinjal', price: 45, unit: 'kg', slug: 'brinjal', catSlug: 'vegetables', image: IMG('16049770429426-3bb112f402b2') },
  { name: 'Spinach', price: 20, unit: 'bunch', slug: 'spinach', catSlug: 'vegetables', image: IMG('1576045059472-d88d734c882a') },
  { name: 'Capsicum', price: 80, unit: 'kg', slug: 'capsicum', catSlug: 'vegetables', image: IMG('1563565375-f3fdfdbefa83') },
  { name: 'Carrot', price: 55, unit: 'kg', slug: 'carrot', catSlug: 'vegetables', image: IMG('1598170845058-32b9d6df5bb1') },
  { name: 'Apple', price: 120, compareAtPrice: 140, unit: 'kg', slug: 'apple', catSlug: 'fruits', image: IMG('1560806887-1e4cd0b6cbd6') },
  { name: 'Banana', price: 50, unit: 'dozen', slug: 'banana', catSlug: 'fruits', image: IMG('1571771894821-ce9b6c11b08e') },
  { name: 'Orange', price: 80, unit: 'kg', slug: 'orange', catSlug: 'fruits', image: IMG('1547514701-42782101795e') },
  { name: 'Papaya', price: 40, unit: 'kg', slug: 'papaya', catSlug: 'fruits', image: IMG('1585059895524-72359e06133a') },
  { name: 'Milk (1L)', price: 58, unit: 'pack', slug: 'milk-1l', catSlug: 'dairy', image: IMG('1563636619-e9143da7973b') },
  { name: 'Curd (500g)', price: 35, unit: 'pack', slug: 'curd-500g', catSlug: 'dairy', image: IMG('1571212515416-d2f829c2e89b') },
  { name: 'Paneer (200g)', price: 90, unit: 'pack', slug: 'paneer-200g', catSlug: 'dairy', image: IMG('1585938380748-f8e4f851c873') },
  { name: 'Butter (100g)', price: 55, unit: 'pack', slug: 'butter-100g', catSlug: 'dairy', image: IMG('1589985270826-4b7bb135bcb4') },
  { name: 'Rice (1kg)', price: 65, unit: 'pack', slug: 'rice-1kg', catSlug: 'staples', image: IMG('1586201375761-83865001e31c') },
  { name: 'Wheat Flour (1kg)', price: 45, unit: 'pack', slug: 'wheat-flour-1kg', catSlug: 'staples', image: IMG('1574323347407-f5e1ad2b65b1') },
  { name: 'Toor Dal (1kg)', price: 120, unit: 'pack', slug: 'toor-dal-1kg', catSlug: 'staples', image: IMG('1604329760661-e71dc83f8f26') },
  { name: 'Refined Oil (1L)', price: 180, unit: 'bottle', slug: 'refined-oil-1l', catSlug: 'staples', image: IMG('1474979266404-7eaacbcd87c5') },
  { name: 'Salt (1kg)', price: 22, unit: 'pack', slug: 'salt-1kg', catSlug: 'staples', image: IMG('1582722872445-44dc5f7e3c8f') },
  { name: 'Sugar (1kg)', price: 48, unit: 'pack', slug: 'sugar-1kg', catSlug: 'staples', image: IMG('1550583724-b2692b85b150') },
  { name: 'Biscuits', price: 30, unit: 'pack', slug: 'biscuits', catSlug: 'snacks', image: IMG('1558961363-fa8fdf82db35') },
  { name: 'Chips', price: 20, unit: 'pack', slug: 'chips', catSlug: 'snacks', image: IMG('1566478989037-eec170784d0b') },
  { name: 'Namkeen (200g)', price: 50, unit: 'pack', slug: 'namkeen-200g', catSlug: 'snacks', image: IMG('1625948515291-69613a342c26') },
  { name: 'Tea (500g)', price: 200, unit: 'pack', slug: 'tea-500g', catSlug: 'beverages', image: IMG('1571934811356-5cc061b6821a') },
  { name: 'Coffee (200g)', price: 250, unit: 'pack', slug: 'coffee-200g', catSlug: 'beverages', image: IMG('1495474472287-4d71bcdd2085') },
  { name: 'Cold Drink (2L)', price: 90, unit: 'bottle', slug: 'cold-drink-2l', catSlug: 'beverages', image: IMG('1622483767028-3f66f32aef97') },
  { name: 'Juice (1L)', price: 120, unit: 'pack', slug: 'juice-1l', catSlug: 'beverages', image: IMG('1621506283937-6fe066f2c3c1') },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pal_brothers');
    console.log('Connected to MongoDB');
    await Category.deleteMany({});
    await Product.deleteMany({});
    const catDocs = await Category.insertMany(categories);
    const catBySlug = {};
    catDocs.forEach((c) => (catBySlug[c.slug] = c._id));
    const productDocs = products.map((p) => ({
      name: p.name,
      slug: p.slug,
      price: p.price,
      compareAtPrice: p.compareAtPrice || null,
      unit: p.unit,
      image: p.image || null,
      category: catBySlug[p.catSlug],
      inStock: true,
    }));
    await Product.insertMany(productDocs);
    console.log('Seeded:', catDocs.length, 'categories,', productDocs.length, 'products');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
