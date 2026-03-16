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

// Middleware
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

// Start Server
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
  console.log(`  Public  → GET  /api/people`);
  console.log(`  Submit  → POST /api/submissions`);
  console.log(`  Admin   → GET  /api/admin/submissions`);
  console.log(`  Single  → GET  /api/admin/submissions/:id`);
  console.log(`  Approve → PATCH /api/admin/submissions/:id/approve`);
  console.log(`  Reject  → PATCH /api/admin/submissions/:id/reject`);
});
