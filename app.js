const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;
// 1. The Dummy Data
const people = [
  { id: 1, name: 'Khairil Yusof', name_th: 'ไคลิว ยูซอฟ', project: 'Sinar Project', location: 'Malaysia', tags: [{ label: 'Open Data' }, { label: 'Procurement' }, { label: 'PEPS' }], email: 'khairil@gmail.com' },
  { id: 2, name: 'Somchai Rakdee', name_th: 'สมชาย รักดี', project: 'Green Tech Initiative', location: 'Thailand', tags: [{ label: 'Sustainability' }, { label: 'Solar Energy' }, { label: 'Environment' }], email: 'somchai.r@outlook.com' },
  { id: 3, name: 'Maria Santos', name_th: 'มาเรีย ซานโตส', project: 'Digital Literacy Hub', location: 'Philippines', tags: [{ label: 'Education' }, { label: 'Community' }, { label: 'Literacy' }], email: 'm.santos@gmail.com' },
  { id: 4, name: 'Nguyen Van Minh', name_th: 'เหงียน วัน มินห์', project: 'Smart City Saigon', location: 'Vietnam', tags: [{ label: 'Urban Planning' }, { label: 'IoT' }, { label: 'Technology' }], email: 'minh.nguyen@company.vn' },
  { id: 5, name: 'Lina Wijaya', name_th: 'ลินา วิชยา', project: 'Fintech for Farmers', location: 'Indonesia', tags: [{ label: 'Finance' }, { label: 'AgriTech' }, { label: 'Inclusion' }], email: 'lina.w@startup.id' },
  { id: 6, name: 'Somsak Siriporn', name_th: 'สมศักดิ์ ศิริพร', project: 'Bangkok Health App', location: 'Thailand', tags: [{ label: 'Healthcare' }, { label: 'Mobile Dev' }, { label: 'Public Health' }], email: 'somsak.s@health.go.th' },
  { id: 7, name: 'Tan Wei Ling', name_th: 'ตัน เว่ย หลิง', project: 'Blue Ocean Research', location: 'Singapore', tags: [{ label: 'Marine Biology' }, { label: 'Conservation' }, { label: 'Data Analysis' }], email: 'weiling.tan@nus.edu.sg' },
  { id: 8, name: 'Aung Kyaw Moe', name_th: 'ออง จอ โม', project: 'Rural Connectivity', location: 'Myanmar', tags: [{ label: 'Telecom' }, { label: 'Infrastructure' }, { label: 'Broadband' }], email: 'ak.moe@connect.mm' },
  { id: 9, name: 'Srey Roth', name_th: 'สเรย รส', project: 'Artisan Marketplace', location: 'Cambodia', tags: [{ label: 'E-commerce' }, { label: 'Culture' }, { label: 'Handicraft' }], email: 'srey.roth@khmerart.org' },
  { id: 10, name: 'Khamla Phomvihane', name_th: 'คำลา พรหมวิหาร', project: 'Hydro Energy Watch', location: 'Laos', tags: [{ label: 'Energy' }, { label: 'Policy' }, { label: 'Monitoring' }], email: 'khamla.p@laosenergy.gov' }
];

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---


// 2. GET all people (with optional location filtering)
// Example: http://localhost:3000/api/people?location=Thailand

app.get('/api/people', (req, res) => {
  const { location } = req.query;
  
  if (location) {
    const filtered = people.filter(p => p.location.toLowerCase() === location.toLowerCase());
    return res.json(filtered);
  }
  
  res.json(people);
});

// 3. GET a single person by ID
// Example: http://localhost:3000/api/people/1
app.get('/api/people/:id', (req, res) => {
  const person = people.find(p => p.id === parseInt(req.params.id));
  
  if (!person) {
    return res.status(404).json({ message: "Person not found" });
  }
  
  res.json(person);
});

// Start Server
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}/api/people`);
});