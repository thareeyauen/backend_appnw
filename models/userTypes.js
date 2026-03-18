let userTypeList = [
  { id: 1, label: 'User' },
  { id: 2, label: 'Admin' },
];
let nextId = 3;

function getAll() {
  return userTypeList;
}

function getById(id) {
  return userTypeList.find(t => t.id === id) || null;
}

function create(label, description) {
  const newItem = { id: nextId++, label: label.trim(), description: (description || '').trim() };
  userTypeList.push(newItem);
  return newItem;
}

function update(id, data) {
  const idx = userTypeList.findIndex(t => t.id === id);
  if (idx === -1) return null;
  if (data.label !== undefined && data.label.trim()) userTypeList[idx].label = data.label.trim();
  if (data.description !== undefined) userTypeList[idx].description = data.description.trim();
  return userTypeList[idx];
}

function remove(id) {
  const idx = userTypeList.findIndex(t => t.id === id);
  if (idx === -1) return false;
  userTypeList.splice(idx, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
