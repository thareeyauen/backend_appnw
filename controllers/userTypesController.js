const UserTypes = require('../models/userTypes');
const Users = require('../models/users');

async function getAll(req, res) {
  try {
    res.json(await UserTypes.getAll());
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
}

async function create(req, res) {
  const { label, description } = req.body;
  if (!label || !label.trim()) return res.status(400).json({ message: 'label is required' });
  try {
    res.status(201).json(await UserTypes.create(label, description));
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
}

async function update(req, res) {
  try {
    const item = await UserTypes.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ message: 'User type not found' });
    res.json(item);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
}

async function remove(req, res) {
  try {
    const item = await UserTypes.getById(req.params.id);
    if (!item) return res.status(404).json({ message: 'User type not found' });
    await UserTypes.remove(req.params.id);
    await Users.clearByType(item.label);
    res.json({ message: 'Deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getAll, create, update, remove };
