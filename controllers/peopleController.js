const People = require('../models/people');

async function getAll(req, res) {
  try {
    const people = await People.getAll(req.query.location);
    res.json(people);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function getOne(req, res) {
  try {
    const person = await People.getById(req.params.id);
    if (!person) return res.status(404).json({ message: 'Person not found' });
    res.json(person);
  } catch (err) {
    res.status(404).json({ message: 'Person not found' });
  }
}

async function update(req, res) {
  try {
    const person = await People.update(req.params.id, req.body);
    if (!person) return res.status(404).json({ message: 'Person not found' });
    res.json({ message: 'Updated', data: person });
  } catch (err) {
    res.status(404).json({ message: 'Person not found' });
  }
}

async function remove(req, res) {
  try {
    const ok = await People.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Person not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Person not found' });
  }
}

async function uploadPhoto(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const photo = `/uploads/${req.file.filename}`;
    const person = await People.update(req.params.id, { photo });
    if (!person) return res.status(404).json({ message: 'Person not found' });
    res.json({ message: 'Photo uploaded', photo });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function uploadNameCard(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const nameCard = `/uploads/${req.file.filename}`;
    const person = await People.update(req.params.id, { nameCard });
    if (!person) return res.status(404).json({ message: 'Person not found' });
    res.json({ message: 'Name card uploaded', nameCard });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getAll, getOne, update, remove, uploadPhoto, uploadNameCard };
