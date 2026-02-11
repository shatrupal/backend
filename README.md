# Pal Brothers BFF (Backend for Frontend)

Node/Express API for Pal Brothers. **Separate repo from the UI.**

- **Port:** 4000 (default)
- **MongoDB:** Required (set `MONGODB_URI` in `.env`)
- **CORS:** Allowed for `CORS_ORIGIN` (default `http://localhost:4200` for Angular dev)

---

## How to run the BFF

1. **Install dependencies** (once):
   ```bash
   cd pal-brothers-bff
   npm install
   ```

2. **Configure `.env`**  
   If there is no `.env` file, copy from example and set your MongoDB URL:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and set:
   - `MONGODB_URI` – your MongoDB connection string (e.g. MongoDB Atlas or your company DB).  
     If this is missing or points to `localhost:27017`, **seed will fail** with `ECONNREFUSED` unless MongoDB is running locally.

3. **Seed the database** (once, to load categories and products):
   ```bash
   npm run seed
   ```

4. **Start the API server**:
   ```bash
   npm start
   ```
   The BFF will be at **http://localhost:4000**.  
   Open **http://localhost:4200** for the Angular UI (run `npm start` in `pal-brothers-ui` in another terminal).

---

## If seed fails with `ECONNREFUSED 127.0.0.1:27017`

MongoDB is not running at `localhost:27017`, or `.env` is missing/not loaded.

- **Option A:** Use a **remote MongoDB** (e.g. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free tier). Put the connection string in `.env` as `MONGODB_URI`, then run `npm run seed` again.
- **Option B:** Run **MongoDB locally** (e.g. `brew services start mongodb-community` on Mac), and keep `MONGODB_URI=mongodb://localhost:27017/pal_brothers` in `.env`.

---

## Setup (summary)

## API

- `POST /api/auth/register` – body: `{ name, email, password, phone? }`
- `POST /api/auth/login` – body: `{ email, password }` → `{ token, user }`
- `GET /api/categories` – list categories
- `GET /api/categories/:slug` – one category
- `GET /api/products` – query: `?category=id&q=search&limit=50`
- `GET /api/products/:id` – one product
- `POST /api/orders` – body: `{ items: [{ productId, name, price, quantity, unit }], guestName, guestPhone, guestEmail?, address, deliverySlot? }` (Auth optional; use `Authorization: Bearer <token>` if logged in)
- `GET /api/orders` – **Auth required** – my orders

## Env

- `PORT` – default 4000
- `MONGODB_URI`
- `JWT_SECRET`
- `CORS_ORIGIN` – e.g. `http://localhost:4200`

## Deploy on Vercel

See **[DEPLOY-VERCEL.md](../DEPLOY-VERCEL.md)** in the workspace root for step-by-step instructions to deploy both the BFF and the Angular UI on Vercel.
