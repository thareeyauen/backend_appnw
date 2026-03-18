const Submissions = require('../models/submissions');

function create(req, res) {
  const submission = Submissions.create(req.body);
  res.status(201).json({ message: 'Submission received', data: submission });
}

function getOne(req, res) {
  const submission = Submissions.getById(parseInt(req.params.id));
  if (!submission) return res.status(404).json({ message: 'Submission not found' });
  res.json({
    id:         submission.id,
    status:     submission.status,
    name:       submission.name,
    project:    submission.project,
    country:    submission.country,
    created_at: submission.created_at,
  });
}

function cancel(req, res) {
  const result = Submissions.removePending(parseInt(req.params.id));
  if (result.error === 'not_found') return res.status(404).json({ message: 'Submission not found' });
  if (result.error === 'not_pending') return res.status(400).json({ message: 'Can only cancel pending submissions' });
  res.json({ message: 'Submission cancelled' });
}

module.exports = { create, getOne, cancel };
