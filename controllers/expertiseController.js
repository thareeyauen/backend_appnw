const Expertise = require('../models/expertise');

async function getAll(req, res) {
  try {
    res.json(await Expertise.getAll());
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function create(req, res) {
  try {
    const { label, description } = req.body;
    if (!label || !label.trim()) return res.status(400).json({ message: 'label is required' });
    res.status(201).json(await Expertise.create(label, description));
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function update(req, res) {
  try {
    const item = await Expertise.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ message: 'Expertise not found' });
    res.json(item);
  } catch (err) {
    res.status(404).json({ message: 'Expertise not found' });
  }
}

async function remove(req, res) {
  try {
    const ok = await Expertise.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Expertise not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Expertise not found' });
  }
}

module.exports = { getAll, create, update, remove };
