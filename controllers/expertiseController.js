const Expertise = require('../models/expertise');

function getAll(req, res) {
  res.json(Expertise.getAll());
}

function create(req, res) {
  const { label, description } = req.body;
  if (!label || !label.trim()) return res.status(400).json({ message: 'label is required' });
  res.status(201).json(Expertise.create(label, description));
}

function update(req, res) {
  const item = Expertise.update(parseInt(req.params.id), req.body);
  if (!item) return res.status(404).json({ message: 'Expertise not found' });
  res.json(item);
}

function remove(req, res) {
  const ok = Expertise.remove(parseInt(req.params.id));
  if (!ok) return res.status(404).json({ message: 'Expertise not found' });
  res.json({ message: 'Deleted' });
}

module.exports = { getAll, create, update, remove };
