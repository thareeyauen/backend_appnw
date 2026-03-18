let expertiseList = [
  { id: 1, label: 'Open Data', description: 'การเปิดเผยข้อมูลสาธารณะเพื่อให้ทุกคนเข้าถึงและนำไปใช้ได้' },
  { id: 2, label: 'Public Procurement', description: 'การจัดซื้อจัดจ้างภาครัฐอย่างโปร่งใสและตรวจสอบได้' },
  { id: 3, label: 'WhistleBlower', description: 'การแจ้งเบาะแสและปกป้องผู้เปิดเผยข้อมูลทุจริต' },
  { id: 4, label: 'Business integrity', description: 'ธรรมาภิบาลและจริยธรรมทางธุรกิจ' },
];
let nextId = 5;

function getAll() {
  return expertiseList;
}

function getById(id) {
  return expertiseList.find(e => e.id === id) || null;
}

function create(label, description) {
  const newItem = { id: nextId++, label: label.trim(), description: (description || '').trim() };
  expertiseList.push(newItem);
  return newItem;
}

function update(id, data) {
  const idx = expertiseList.findIndex(e => e.id === id);
  if (idx === -1) return null;
  if (data.label !== undefined && data.label.trim()) expertiseList[idx].label = data.label.trim();
  if (data.description !== undefined) expertiseList[idx].description = data.description.trim();
  return expertiseList[idx];
}

function remove(id) {
  const idx = expertiseList.findIndex(e => e.id === id);
  if (idx === -1) return false;
  expertiseList.splice(idx, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
