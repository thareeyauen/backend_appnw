const Submissions = require('../models/submissions');

async function create(req, res) {
  try {
    const submission = await Submissions.create(req.body);
    res.status(201).json({ message: 'Submission received', data: submission });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function getOne(req, res) {
  try {
    const submission = await Submissions.getById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json({
      id:         submission.id,
      status:     submission.status,
      name:       submission.name,
      project:    submission.project,
      country:    submission.country,
      created_at: submission.created_at,
    });
  } catch (err) {
    res.status(404).json({ message: 'Submission not found' });
  }
}

async function cancel(req, res) {
  try {
    const result = await Submissions.removePending(req.params.id);
    if (result.error === 'not_found') return res.status(404).json({ message: 'Submission not found' });
    if (result.error === 'not_pending') return res.status(400).json({ message: 'Can only cancel pending submissions' });
    res.json({ message: 'Submission cancelled' });
  } catch (err) {
    res.status(404).json({ message: 'Submission not found' });
  }
}

module.exports = { create, getOne, cancel };
