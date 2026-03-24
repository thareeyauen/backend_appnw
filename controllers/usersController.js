const Users = require('../models/users');

async function getAll(req, res) {
  try {
    res.json(await Users.getAll());
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function getOne(req, res) {
  try {
    const user = await Users.getById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(Users.safe(user));
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
}

async function create(req, res) {
  try {
    const safe = await Users.create(req.body);
    res.status(201).json({ message: 'User created', data: safe });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function update(req, res) {
  try {
    const safe = await Users.update(req.params.id, req.body);
    if (!safe) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Updated', data: safe });
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
}

async function remove(req, res) {
  try {
    const ok = await Users.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
}

module.exports = { getAll, getOne, create, update, remove };
