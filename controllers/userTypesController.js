const UserTypes = require('../models/userTypes');

function getAll(req, res) {
  res.json(UserTypes.getAll());
}

function create(req, res) {
  const { label, description } = req.body;
  if (!label || !label.trim()) return res.status(400).json({ message: 'label is required' });
  res.status(201).json(UserTypes.create(label, description));
}

function update(req, res) {
  const item = UserTypes.update(parseInt(req.params.id), req.body);
  if (!item) return res.status(404).json({ message: 'User type not found' });
  res.json(item);
}

function remove(req, res) {
  const ok = UserTypes.remove(parseInt(req.params.id));
  if (!ok) return res.status(404).json({ message: 'User type not found' });
  res.json({ message: 'Deleted' });
}

module.exports = { getAll, create, update, remove };
