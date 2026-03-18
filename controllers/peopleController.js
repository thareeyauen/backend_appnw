const People = require('../models/people');

function getAll(req, res) {
  res.json(People.getAll(req.query.location));
}

function getOne(req, res) {
  const person = People.getById(parseInt(req.params.id));
  if (!person) return res.status(404).json({ message: 'Person not found' });
  res.json(person);
}

function update(req, res) {
  const person = People.update(parseInt(req.params.id), req.body);
  if (!person) return res.status(404).json({ message: 'Person not found' });
  res.json({ message: 'Updated', data: person });
}

function remove(req, res) {
  const ok = People.remove(parseInt(req.params.id));
  if (!ok) return res.status(404).json({ message: 'Person not found' });
  res.json({ message: 'Deleted' });
}

module.exports = { getAll, getOne, update, remove };
