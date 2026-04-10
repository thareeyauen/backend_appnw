require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });
const express = require('express');
const cors = require('cors');
const { requireAuth, requireAdmin } = require('./middleware/auth');
const { connect } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// Public
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/people',      require('./routes/people'));

// Authenticated users
app.use('/api/submissions', requireAuth, require('./routes/submissions'));
app.use('/api/feedback',    requireAuth, require('./routes/feedback'));

// Admin only
app.use('/api/users',       requireAdmin, require('./routes/users'));
app.use('/api/user-types',  requireAdmin, require('./routes/userTypes'));
app.use('/api/expertise',   require('./routes/expertise'));         // GET public, POST/PUT/DELETE → admin (middleware in route)
app.use('/api/admin',       requireAdmin, require('./routes/admin'));

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
      console.log(`  Auth    → POST /api/auth/login`);
      console.log(`  Me      → GET  /api/auth/me`);
      console.log(`  Public  → GET  /api/people`);
      console.log(`  Submit  → POST /api/submissions  [auth]`);
      console.log(`  Admin   → GET  /api/admin/submissions  [admin]`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
