const Users = require('../models/users');

function getAll(req, res) {
  res.json(Users.getAll());
}

function getOne(req, res) {
  const user = Users.getById(parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(Users.safe(user));
}

function create(req, res) {
  const safe = Users.create(req.body);
  res.status(201).json({ message: 'User created', data: safe });
}

function update(req, res) {
  const safe = Users.update(parseInt(req.params.id), req.body);
  if (!safe) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'Updated', data: safe });
}

function remove(req, res) {
  const ok = Users.remove(parseInt(req.params.id));
  if (!ok) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'Deleted' });
}

module.exports = { getAll, getOne, create, update, remove };
