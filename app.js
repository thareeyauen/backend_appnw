const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/people',      require('./routes/people'));
app.use('/api/submissions', require('./routes/submissions'));
app.use('/api/users',       require('./routes/users'));
app.use('/api/user-types',  require('./routes/userTypes'));
app.use('/api/expertise',   require('./routes/expertise'));
app.use('/api/admin',       require('./routes/admin'));

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
  console.log(`  Public  → GET  /api/people`);
  console.log(`  Submit  → POST /api/submissions`);
  console.log(`  Admin   → GET  /api/admin/submissions`);
  console.log(`  Single  → GET  /api/admin/submissions/:id`);
  console.log(`  Approve → PATCH /api/admin/submissions/:id/approve`);
  console.log(`  Reject  → PATCH /api/admin/submissions/:id/reject`);
});
