const Submissions = require('../models/submissions');
const People = require('../models/people');

function getAllSubmissions(req, res) {
  res.json(Submissions.getAll(req.query.status));
}

function getOneSubmission(req, res) {
  const submission = Submissions.getById(parseInt(req.params.id));
  if (!submission) return res.status(404).json({ message: 'Submission not found' });
  res.json(submission);
}

function approve(req, res) {
  const submission = Submissions.getById(parseInt(req.params.id));
  if (!submission) return res.status(404).json({ message: 'Submission not found' });
  if (submission.status !== 'pending') {
    return res.status(400).json({ message: `Submission is already ${submission.status}` });
  }

  const body = req.body || {};
  const newPerson = People.add({
    name:        body.name        ?? submission.name,
    name_th:     body.name_th     ?? submission.name_th,
    project:     body.project     ?? submission.project,
    project_th:  body.project_th  ?? submission.project_th,
    location:    body.location    ?? submission.location,
    country:     body.country     ?? submission.country,
    position:    body.position    ?? submission.position,
    position_th: body.position_th ?? submission.position_th,
    network:     body.network     ?? submission.network,
    tags:        body.tags        ?? submission.tags,
    email:       body.email       ?? submission.email,
    note:        body.note        ?? submission.note,
  });

  Submissions.setStatus(submission.id, 'approved');
  res.json({ message: 'Approved and added to main list', data: newPerson });
}

function reject(req, res) {
  const submission = Submissions.getById(parseInt(req.params.id));
  if (!submission) return res.status(404).json({ message: 'Submission not found' });
  if (submission.status !== 'pending') {
    return res.status(400).json({ message: `Submission is already ${submission.status}` });
  }

  const updated = Submissions.setStatus(submission.id, 'rejected');
  res.json({ message: 'Submission rejected', data: updated });
}

module.exports = { getAllSubmissions, getOneSubmission, approve, reject };
