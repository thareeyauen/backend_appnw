const Submissions = require('../models/submissions');
const People = require('../models/people');

async function getAllSubmissions(req, res) {
  try {
    const submissions = await Submissions.getAll(req.query.status);
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function getOneSubmission(req, res) {
  try {
    const submission = await Submissions.getById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json(submission);
  } catch (err) {
    res.status(404).json({ message: 'Submission not found' });
  }
}

async function approve(req, res) {
  try {
    const submission = await Submissions.getById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    if (submission.status !== 'pending') {
      return res.status(400).json({ message: `Submission is already ${submission.status}` });
    }

    const body = req.body || {};
    const newPerson = await People.add({
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
      avatar:      body.avatar      ?? submission.avatar,
    });

    await Submissions.setStatus(submission.id, 'approved');
    res.json({ message: 'Approved and added to main list', data: newPerson });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function reject(req, res) {
  try {
    const submission = await Submissions.getById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    if (submission.status !== 'pending') {
      return res.status(400).json({ message: `Submission is already ${submission.status}` });
    }

    const updated = await Submissions.setStatus(submission.id, 'rejected');
    res.json({ message: 'Submission rejected', data: updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getAllSubmissions, getOneSubmission, approve, reject };
