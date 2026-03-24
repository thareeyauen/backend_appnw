const mongoose = require('mongoose');

const expertiseSchema = new mongoose.Schema({
  label:       { type: String, required: true },
  description: { type: String, default: '' },
}, { toJSON: { virtuals: true, versionKey: false, transform(doc, ret) { delete ret._id; } } });

const ExpertiseModel = mongoose.model('Expertise', expertiseSchema);

async function getAll() {
  return ExpertiseModel.find();
}

async function getById(id) {
  return ExpertiseModel.findById(id);
}

async function create(label, description) {
  return ExpertiseModel.create({ label: label.trim(), description: (description || '').trim() });
}

async function update(id, data) {
  const updates = {};
  if (data.label !== undefined && data.label.trim()) updates.label = data.label.trim();
  if (data.description !== undefined) updates.description = data.description.trim();
  return ExpertiseModel.findByIdAndUpdate(id, updates, { new: true });
}

async function remove(id) {
  const result = await ExpertiseModel.findByIdAndDelete(id);
  return !!result;
}

module.exports = { getAll, getById, create, update, remove };
