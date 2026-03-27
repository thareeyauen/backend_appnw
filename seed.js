require('dotenv').config({ path: '.env.production' });
const dns = require('dns');
const mongoose = require('mongoose');

dns.setServers(['8.8.8.8', '1.1.1.1']);

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const People    = require('./models/people');
  const Expertise = require('./models/expertise');
  const UserType  = require('./models/userTypes');
  const Users     = require('./models/users');

  // Clear existing data
  const mongoose_ = require('mongoose');
  await mongoose_.connection.dropDatabase();
  console.log('Database cleared');

  // Seed People
  await Promise.all([
    People.add({ name: 'Khairil Yusof', name_th: 'ไคลิว ยูซอฟ', project: 'Sinar Project', location: 'Malaysia', tags: [{ label: 'Open Data' }, { label: 'Procurement' }, { label: 'PEPS' }], email: 'khairil@gmail.com', note: 'Met at OGP Summit 2024. Interested in data transparency tools for Southeast Asia.' }),
    People.add({ name: 'Somchai Rakdee', name_th: 'สมชาย รักดี', project: 'Green Tech Initiative', location: 'Thailand', tags: [{ label: 'Sustainability' }, { label: 'Solar Energy' }, { label: 'Environment' }], email: 'somchai.r@outlook.com', note: 'Looking for partners to pilot solar rooftop project in rural areas. Follow up in Q3.' }),
    People.add({ name: 'Maria Santos', name_th: 'มาเรีย ซานโตส', project: 'Digital Literacy Hub', location: 'Philippines', tags: [{ label: 'Education' }, { label: 'Community' }, { label: 'Literacy' }], email: 'm.santos@gmail.com', note: 'Runs workshops for out-of-school youth. Keen on collaboration with local NGOs.' }),
    People.add({ name: 'Nguyen Van Minh', name_th: 'เหงียน วัน มินห์', project: 'Smart City Saigon', location: 'Vietnam', tags: [{ label: 'Urban Planning' }, { label: 'IoT' }, { label: 'Technology' }], email: 'minh.nguyen@company.vn', note: 'Government advisor on smart infrastructure. Prefers formal communication.' }),
    People.add({ name: 'Lina Wijaya', name_th: 'ลินา วิชยา', project: 'Fintech for Farmers', location: 'Indonesia', tags: [{ label: 'Finance' }, { label: 'AgriTech' }, { label: 'Inclusion' }], email: 'lina.w@startup.id', note: 'Secured seed funding last month. Looking for tech advisors with microfinance background.' }),
    People.add({ name: 'Somsak Siriporn', name_th: 'สมศักดิ์ ศิริพร', project: 'Bangkok Health App', location: 'Thailand', tags: [{ label: 'Healthcare' }, { label: 'Mobile Dev' }, { label: 'Public Health' }], email: 'somsak.s@health.go.th', note: 'Ministry of Public Health contact. App targets elderly users — UX simplicity is key.' }),
    People.add({ name: 'Tan Wei Ling', name_th: 'ตัน เว่ย หลิง', project: 'Blue Ocean Research', location: 'Singapore', tags: [{ label: 'Marine Biology' }, { label: 'Conservation' }, { label: 'Data Analysis' }], email: 'weiling.tan@nus.edu.sg', note: 'PhD researcher at NUS. Open to sharing marine dataset for joint publications.' }),
    People.add({ name: 'Aung Kyaw Moe', name_th: 'ออง จอ โม', project: 'Rural Connectivity', location: 'Myanmar', tags: [{ label: 'Telecom' }, { label: 'Infrastructure' }, { label: 'Broadband' }], email: 'ak.moe@connect.mm', note: 'Works in challenging network conditions. Prefers async communication via email.' }),
    People.add({ name: 'Srey Roth', name_th: 'สเรย รส', project: 'Artisan Marketplace', location: 'Cambodia', tags: [{ label: 'E-commerce' }, { label: 'Culture' }, { label: 'Handicraft' }], email: 'srey.roth@khmerart.org', note: 'Platform supports 200+ artisans. Needs help with payment gateway integration.' }),
    People.add({ name: 'Khamla Phomvihane', name_th: 'คำลา พรหมวิหาร', project: 'Hydro Energy Watch', location: 'Laos', tags: [{ label: 'Energy' }, { label: 'Policy' }, { label: 'Monitoring' }], email: 'khamla.p@laosenergy.gov', note: 'Policy advisor tracking dam impact on Mekong communities. Interested in open monitoring tools.' }),
  ]);
  console.log('Seeded: People (10)');

  // Seed Expertise
  await Promise.all([
    Expertise.create('Open Data', 'การเปิดเผยข้อมูลสาธารณะเพื่อให้ทุกคนเข้าถึงและนำไปใช้ได้'),
    Expertise.create('Public Procurement', 'การจัดซื้อจัดจ้างภาครัฐอย่างโปร่งใสและตรวจสอบได้'),
    Expertise.create('WhistleBlower', 'การแจ้งเบาะแสและปกป้องผู้เปิดเผยข้อมูลทุจริต'),
    Expertise.create('Business integrity', 'ธรรมาภิบาลและจริยธรรมทางธุรกิจ'),
  ]);
  console.log('Seeded: Expertise (4)');

  // Seed UserTypes
  await Promise.all([
    UserType.create('User', ''),
    UserType.create('Admin', ''),
  ]);
  console.log('Seeded: UserTypes (2)');

  // Seed Users
  await Promise.all([
    Users.create({ name: 'Saranchanok', email: 'saranchanok@hand.co.th', type: 'User',  password: 'changeme' }),
    Users.create({ name: 'Admin01',     email: 'admin01@hand.co.th',     type: 'Admin', password: 'changeme' }),
    Users.create({ name: 'MJ',          email: 'MJ@hand.co.th',          type: 'User',  password: 'changeme' }),
  ]);
  console.log('Seeded: Users (3)');

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
