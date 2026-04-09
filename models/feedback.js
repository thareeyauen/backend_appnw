const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name:       { type: String, default: '' },
  email:      { type: String, default: '' },
  message:    { type: String, default: '' },
  created_at: { type: Date, default: Date.now },
}, { toJSON: { virtuals: true, versionKey: false, transform(doc, ret) { delete ret._id; } } });

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);

async function getAll() {
  return FeedbackModel.find().sort({ created_at: -1 });
}

async function create(data) {
  return FeedbackModel.create({
    name:    data.name    || '',
    email:   data.email   || '',
    message: data.message || '',
  });
}

async function remove(id) {
  return FeedbackModel.findByIdAndDelete(id);
}

module.exports = { getAll, create, remove };
