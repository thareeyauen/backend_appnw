const Feedback = require('../models/feedback');

async function getAll(req, res) {
  try {
    const list = await Feedback.getAll();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function create(req, res) {
  try {
    const saved = await Feedback.create(req.body);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function remove(req, res) {
  try {
    await Feedback.remove(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getAll, create, remove };
