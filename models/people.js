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
  { id: 10, name: 'Khamla Phomvihane', name_th: 'คำลา พรหมวิหาร', project: 'Hydro Energy Watch', project_th: '', location: 'Laos', country: '', position: '', position_th: '', network: '', tags: [{ label: 'Energy' }, { label: 'Policy' }, { label: 'Monitoring' }], email: 'khamla.p@laosenergy.gov', note: 'Policy advisor tracking dam impact on Mekong communities. Interested in open monitoring tools.' },
];

function getAll(location) {
  if (location) return people.filter(p => p.location.toLowerCase() === location.toLowerCase());
  return people;
}

function getById(id) {
  return people.find(p => p.id === id);
}

function update(id, data) {
  const idx = people.findIndex(p => p.id === id);
  if (idx === -1) return null;
  people[idx] = { ...people[idx], ...data, id: people[idx].id };
  return people[idx];
}

function remove(id) {
  const idx = people.findIndex(p => p.id === id);
  if (idx === -1) return false;
  people.splice(idx, 1);
  return true;
}

function add(data) {
  const newPerson = {
    id: people.length > 0 ? Math.max(...people.map(p => p.id)) + 1 : 1,
    ...data,
  };
  people.push(newPerson);
  return newPerson;
}

module.exports = { getAll, getById, update, remove, add };
