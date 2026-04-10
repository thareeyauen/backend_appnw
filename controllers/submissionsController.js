const Submissions = require('../models/submissions');
const Users = require('../models/users');

async function create(req, res) {
  try {
    const data = { ...req.body };
    if (typeof data.tags === 'string') {
      try { data.tags = JSON.parse(data.tags); } catch { data.tags = []; }
    }
    if (req.file) data.avatar = `/avatar/${req.file.filename}`;
    if (req.user?.id) {
      const dbUser = await Users.findById(req.user.id);
      data.submitted_by = dbUser ? (Users.safe(dbUser).name || '') : (req.user.name || '');
    }
    const submission = await Submissions.create(data);
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

async function uploadNameCard(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const submission = await Submissions.getById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    const nameCard = `/namecard/${req.file.filename}`;
    submission.nameCard = nameCard;
    await submission.save();
    res.json({ message: 'Name card uploaded', nameCard });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { create, getOne, cancel, uploadNameCard };
