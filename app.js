const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

// ─── 1. Main Data (approved & visible on website) ────────────────────────────
let people = [
  { id: 1, name: 'Khairil Yusof', name_th: 'ไคลิว ยูซอฟ', project: 'Sinar Project', project_th: '', location: 'Malaysia', country: '', position: '', position_th: '', network: '', tags: [{ label: 'Open Data' }, { label: 'Procurement' }, { label: 'PEPS' }], email: 'khairil@gmail.com', note: 'Met at OGP Summit 2024. Interested in data transparency tools for Southeast Asia.' },
  { id: 2, name: 'Somchai Rakdee', name_th: 'สมชาย รักดี', project: 'Green Tech Initiative', project_th: '', location: 'Thailand', country: '', position: '', position_th: '', network: '', tags: [{ label: 'Sustainability' }, { label: 'Solar Energy' }, { label: 'Environment' }], email: 'somchai.r@outlook.com', note: 'Looking for partners to pilot solar rooftop project in rural areas. Follow up in Q3.' },
  { id: 3, name: 'Maria Santos', name_th: 'มาเรีย ซานโตส', project: 'Digital Literacy Hub', project_th: '', location: 'Philippines', country: '', position: '', position_th: '', network: '', tags: [{ label: 'Education' }, { label: 'Community' }, { label: 'Literacy' }], email: 'm.santos@gmail.com', note: 'Runs workshops for out-of-school youth. Keen on collaboration with local NGOs.' },
  { id: 4, name: 'Nguyen Van Minh', name_th: 'เหงียน วัน มินห์', project: 'Smart City Saigon', project_th: '', location: 'Vietnam', country: '', position: '', position_th: '', network: '', tags: [{ label: 'Urban Planning' }, { label: 'IoT' }, { label: 'Technology' }], email: 'minh.nguyen@company.vn', note: 'Government advisor on smart infrastructure. Prefers formal communication.' },
  { id: 5, name: 'Lina Wijaya', name_th: 'ลินา วิชยา', project: 'Fintech for Farmers', project_th: '', location: 'Indonesia', country: '', position: '', position_th: '', network: '', tags: [{ label: 'Finance' }, { label: 'AgriTech' }, { label: 'Inclusion' }], email: 'lina.w@startup.id', note: 'Secured seed funding last month. Looking for tech advisors with microfinance background.' },
  { id: 6, name: 'Somsak Siriporn', name_th: 'สมศักดิ์ ศิริพร', project: 'Bangkok Health App', project_th: '', location: 'Thailand', country: '', position: '', position_th: '', network: '', tags: [{ label: 'Healthcare' }, { label: 'Mobile Dev' }, { label: 'Public Health' }], email: 'somsak.s@health.go.th', note: 'Ministry of Public Health contact. App targets elderly users — UX simplicity is key.' },
  { id: 7, name: 'Tan Wei Ling', name_th: 'ตัน เว่ย หลิง', project: 'Blue Ocean Research', project_th: '', location: 'Singapore', country: '', position: '', position_th: '', network: '', tags: [{ label: 'Marine Biology' }, { label: 'Conservation' }, { label: 'Data Analysis' }], email: 'weiling.tan@nus.edu.sg', note: 'PhD researcher at NUS. Open to sharing marine dataset for joint publications.' },
  { id: 8, name: 'Aung Kyaw Moe', name_th: 'ออง จอ โม', project: 'Rural Connectivity', project_th: '', location: 'Myanmar', country: '', position: '', position_th: '', network: '', tags: [{ label: 'Telecom' }, { label: 'Infrastructure' }, { label: 'Broadband' }], email: 'ak.moe@connect.mm', note: 'Works in challenging network conditions. Prefers async communication via email.' },
  { id: 9, name: 'Srey Roth', name_th: 'สเรย รส', project: 'Artisan Marketplace', project_th: '', location: 'Cambodia', country: '', position: '', position_th: '', network: '', tags: [{ label: 'E-commerce' }, { label: 'Culture' }, { label: 'Handicraft' }], email: 'srey.roth@khmerart.org', note: 'Platform supports 200+ artisans. Needs help with payment gateway integration.' },
  { id: 10, name: 'Khamla Phomvihane', name_th: 'คำลา พรหมวิหาร', project: 'Hydro Energy Watch', project_th: '', location: 'Laos', country: '', position: '', position_th: '', network: '', tags: [{ label: 'Energy' }, { label: 'Policy' }, { label: 'Monitoring' }], email: 'khamla.p@laosenergy.gov', note: 'Policy advisor tracking dam impact on Mekong communities. Interested in open monitoring tools.' }
];

// ─── 2. Users (login accounts) ───────────────────────────────────────────────
let users = [
  { id: 1, name: 'Saranchanok', email: 'saranchanok@hand.co.th', type: 'User',  password: 'changeme' },
  { id: 2, name: 'Admin01',     email: 'admin01@hand.co.th',     type: 'Admin', password: 'changeme' },
];
let nextUserId = 3;

// ─── 3. Staging Data (submitted by users, waiting for admin approval) ─────────
let submissions = [];
let nextSubmissionId = 1;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── ROUTES: Public ───────────────────────────────────────────────────────────

// GET all approved people (with optional location filter)
app.get('/api/people', (req, res) => {
  const { location } = req.query;
  if (location) {
    return res.json(people.filter(p => p.location.toLowerCase() === location.toLowerCase()));
  }
  res.json(people);
});

// GET a single approved person by ID
app.get('/api/people/:id', (req, res) => {
  const person = people.find(p => p.id === parseInt(req.params.id));
  if (!person) return res.status(404).json({ message: 'Person not found' });
  res.json(person);
});

// PUT update an approved person by ID (admin only)
app.put('/api/people/:id', (req, res) => {
  const idx = people.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Person not found' });
  people[idx] = { ...people[idx], ...req.body, id: people[idx].id };
  res.json({ message: 'Updated', data: people[idx] });
});

// DELETE an approved person by ID (admin only)
app.delete('/api/people/:id', (req, res) => {
  const idx = people.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Person not found' });
  people.splice(idx, 1);
  res.json({ message: 'Deleted' });
});

// POST new submission from user form (soft validation — ใส่แค่ช่องเดียวก็ได้)
app.post('/api/submissions', (req, res) => {
  const {
    name, name_th,
    project, project_th,
    location, country,
    position, position_th,
    network, tags, email, note,
  } = req.body;

  const newSubmission = {
    id: nextSubmissionId++,
    name: name || '',
    name_th: name_th || '',
    project: project || '',
    project_th: project_th || '',
    location: location || '',
    country: country || '',
    position: position || '',
    position_th: position_th || '',
    network: network || '',
    tags: tags || [],
    email: email || '',
    note: note || '',
    status: 'pending',
    created_at: new Date().toISOString(),
    reviewed_at: null,
  };

  submissions.push(newSubmission);
  res.status(201).json({ message: 'Submission received', data: newSubmission });
});

// GET status ของ submission โดย user (ใช้ใน Profile.js)
app.get('/api/submissions/:id', (req, res) => {
  const submission = submissions.find(s => s.id === parseInt(req.params.id));
  if (!submission) return res.status(404).json({ message: 'Submission not found' });
  res.json({
    id:         submission.id,
    status:     submission.status,       // 'pending' | 'approved' | 'rejected'
    name:       submission.name,
    project:    submission.project,
    country:    submission.country,
    created_at: submission.created_at,
  });
});

// DELETE cancel submission โดย user (เฉพาะ pending เท่านั้น)
app.delete('/api/submissions/:id', (req, res) => {
  const idx = submissions.findIndex(s => s.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Submission not found' });
  if (submissions[idx].status !== 'pending') {
    return res.status(400).json({ message: 'Can only cancel pending submissions' });
  }
  submissions.splice(idx, 1);
  res.json({ message: 'Submission cancelled' });
});


// ─── ROUTES: Users ────────────────────────────────────────────────────────────

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users.map(({ password, ...u }) => u));
});

// GET a single user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { password, ...safe } = user;
  res.json(safe);
});

// POST create a new user
app.post('/api/users', (req, res) => {
  const { name, email, type, password } = req.body;
  const newUser = { id: nextUserId++, name: name || '', email: email || '', type: type || 'User', password: password || 'changeme' };
  users.push(newUser);
  const { password: _, ...safe } = newUser;
  res.status(201).json({ message: 'User created', data: safe });
});

// PUT update a user (name, email, type only — password handled separately)
app.put('/api/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'User not found' });
  const { password, ...updates } = req.body;
  users[idx] = { ...users[idx], ...updates, id: users[idx].id };
  if (password) users[idx].password = password;
  const { password: _, ...safe } = users[idx];
  res.json({ message: 'Updated', data: safe });
});

// DELETE a user
app.delete('/api/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'User not found' });
  users.splice(idx, 1);
  res.json({ message: 'Deleted' });
});

// ─── ROUTES: Admin ────────────────────────────────────────────────────────────

// GET all submissions (admin view)
app.get('/api/admin/submissions', (req, res) => {
  const { status } = req.query;
  if (status) {
    return res.json(submissions.filter(s => s.status === status));
  }
  res.json(submissions);
});

// GET a single submission by ID  ← เพิ่มใหม่ (Approve.js ใช้ endpoint นี้)
app.get('/api/admin/submissions/:id', (req, res) => {
  const submission = submissions.find(s => s.id === parseInt(req.params.id));
  if (!submission) return res.status(404).json({ message: 'Submission not found' });
  res.json(submission);
});

// PATCH approve — move submission to main people list
app.patch('/api/admin/submissions/:id/approve', (req, res) => {
  const submission = submissions.find(s => s.id === parseInt(req.params.id));

  if (!submission) return res.status(404).json({ message: 'Submission not found' });
  if (submission.status !== 'pending') {
    return res.status(400).json({ message: `Submission is already ${submission.status}` });
  }

  // Admin สามารถแก้ไขข้อมูลก่อน approve ได้ผ่าน request body
  const body = req.body || {};

  const newPerson = {
    id: people.length > 0 ? Math.max(...people.map(p => p.id)) + 1 : 1,
    name: body.name ?? submission.name,
    name_th: body.name_th ?? submission.name_th,
    project: body.project ?? submission.project,
    project_th: body.project_th ?? submission.project_th,
    location: body.location ?? submission.location,
    country: body.country ?? submission.country,
    position: body.position ?? submission.position,
    position_th: body.position_th ?? submission.position_th,
    network: body.network ?? submission.network,
    tags: body.tags ?? submission.tags,
    email: body.email ?? submission.email,
    note: body.note ?? submission.note,
  };

  people.push(newPerson);

  submission.status = 'approved';
  submission.reviewed_at = new Date().toISOString();

  res.json({ message: 'Approved and added to main list', data: newPerson });
});

// PATCH reject — mark submission as rejected
app.patch('/api/admin/submissions/:id/reject', (req, res) => {
  const submission = submissions.find(s => s.id === parseInt(req.params.id));

  if (!submission) return res.status(404).json({ message: 'Submission not found' });
  if (submission.status !== 'pending') {
    return res.status(400).json({ message: `Submission is already ${submission.status}` });
  }

  submission.status = 'rejected';
  submission.reviewed_at = new Date().toISOString();

  res.json({ message: 'Submission rejected', data: submission });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
  console.log(`  Public  → GET  /api/people`);
  console.log(`  Submit  → POST /api/submissions`);
  console.log(`  Admin   → GET  /api/admin/submissions`);
  console.log(`  Single  → GET  /api/admin/submissions/:id`);
  console.log(`  Approve → PATCH /api/admin/submissions/:id/approve`);
  console.log(`  Reject  → PATCH /api/admin/submissions/:id/reject`);
});
