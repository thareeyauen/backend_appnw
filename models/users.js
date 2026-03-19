let users = [
  { id: 1, name: 'Saranchanok', email: 'saranchanok@hand.co.th', type: 'User',  password: 'changeme' },
  { id: 2, name: 'Admin01',     email: 'admin01@hand.co.th',     type: 'Admin', password: 'changeme' },
];
let nextId = 3;

function safe(user) {
  const { password, ...rest } = user;
  return rest;
}

function getAll() {
  return users.map(safe);
}

function getById(id) {
  return users.find(u => u.id === id) || null;
}

function findById(id) {
  return users.find(u => u.id === id) || null;
}

function findByEmail(email) {
  return users.find(u => u.email === email) || null;
}

function create(data) {
  const newUser = {
    id: nextId++,
    name: data.name || '',
    email: data.email || '',
    type: data.type || 'User',
    password: data.password || 'changeme',
  };
  users.push(newUser);
  return safe(newUser);
}

function update(id, data) {
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  const { password, ...updates } = data;
  users[idx] = { ...users[idx], ...updates, id: users[idx].id };
  if (password) users[idx].password = password;
  return safe(users[idx]);
}

function remove(id) {
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
}

module.exports = { getAll, getById, findById, findByEmail, create, update, remove, safe };
