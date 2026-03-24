const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({ label: String }, { _id: false });

const submissionSchema = new mongoose.Schema({
  name:        { type: String, default: '' },
  name_th:     { type: String, default: '' },
  project:     { type: String, default: '' },
  project_th:  { type: String, default: '' },
  location:    { type: String, default: '' },
  country:     { type: String, default: '' },
  position:    { type: String, default: '' },
  position_th: { type: String, default: '' },
  network:     { type: String, default: '' },
  tags:        { type: [tagSchema], default: [] },
  email:       { type: String, default: '' },
  note:        { type: String, default: '' },
  status:      { type: String, default: 'pending' },
  created_at:  { type: Date, default: Date.now },
  reviewed_at: { type: Date, default: null },
}, { toJSON: { virtuals: true, versionKey: false, transform(doc, ret) { delete ret._id; } } });

const SubmissionModel = mongoose.model('Submission', submissionSchema);

async function getAll(status) {
  if (status) return SubmissionModel.find({ status });
  return SubmissionModel.find();
}

async function getById(id) {
  return SubmissionModel.findById(id);
}

async function create(data) {
  return SubmissionModel.create({
    name:        data.name        || '',
    name_th:     data.name_th     || '',
    project:     data.project     || '',
    project_th:  data.project_th  || '',
    location:    data.location    || '',
    country:     data.country     || '',
    position:    data.position    || '',
    position_th: data.position_th || '',
    network:     data.network     || '',
    tags:        data.tags        || [],
    email:       data.email       || '',
    note:        data.note        || '',
    status:      'pending',
    created_at:  new Date(),
    reviewed_at: null,
  });
}

async function removePending(id) {
  const submission = await SubmissionModel.findById(id);
  if (!submission) return { error: 'not_found' };
  if (submission.status !== 'pending') return { error: 'not_pending' };
  await SubmissionModel.findByIdAndDelete(id);
  return { ok: true };
}

async function setStatus(id, status) {
  return SubmissionModel.findByIdAndUpdate(
    id,
    { status, reviewed_at: new Date() },
    { new: true }
  );
}

module.exports = { getAll, getById, create, removePending, setStatus };
