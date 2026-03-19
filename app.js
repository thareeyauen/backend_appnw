const express = require('express');
const cors = require('cors');
const { requireAuth, requireAdmin } = require('./middleware/auth');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Public
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/people',      require('./routes/people'));

// Authenticated users
app.use('/api/submissions', requireAuth, require('./routes/submissions'));

// Admin only
app.use('/api/users',       requireAdmin, require('./routes/users'));
app.use('/api/user-types',  requireAdmin, require('./routes/userTypes'));
app.use('/api/expertise',   requireAdmin, require('./routes/expertise'));
app.use('/api/admin',       requireAdmin, require('./routes/admin'));

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
  console.log(`  Auth    → POST /api/auth/login`);
  console.log(`  Me      → GET  /api/auth/me`);
  console.log(`  Public  → GET  /api/people`);
  console.log(`  Submit  → POST /api/submissions  [auth]`);
  console.log(`  Admin   → GET  /api/admin/submissions  [admin]`);
});
