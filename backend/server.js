require('dotenv').config();
const express = require('express');
const cors = require('cors');
const assessRouter = require('./routes/assess');

const app = express();

// ── Middleware ─────────────────────────────────────────────────
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logger (dev only)
if (process.env.NODE_ENV === 'development') {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// ── Routes ─────────────────────────────────────────────────────
app.use('/api', assessRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// Global error handler
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong.' });
});

// ── Start ──────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`\n  🫀  Heart Risk API v2.0`);
  console.log(`  ✓  Running on http://localhost:${PORT}`);
  console.log(`  ✓  Environment: ${process.env.NODE_ENV || 'development'}\n`);
});
