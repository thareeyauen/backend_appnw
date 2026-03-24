const mongoose = require('mongoose');

const userTypeSchema = new mongoose.Schema({
  label:       { type: String, required: true },
  description: { type: String, default: '' },
}, { toJSON: { virtuals: true, versionKey: false, transform(doc, ret) { delete ret._id; } } });

const UserTypeModel = mongoose.model('UserType', userTypeSchema);

async function getAll() {
  return UserTypeModel.find();
}

async function getById(id) {
  return UserTypeModel.findById(id);
}

async function create(label, description) {
  return UserTypeModel.create({ label: label.trim(), description: (description || '').trim() });
}

async function update(id, data) {
  const updates = {};
  if (data.label !== undefined && data.label.trim()) updates.label = data.label.trim();
  if (data.description !== undefined) updates.description = data.description.trim();
  return UserTypeModel.findByIdAndUpdate(id, updates, { new: true });
}

async function remove(id) {
  const result = await UserTypeModel.findByIdAndDelete(id);
  return !!result;
}

module.exports = { getAll, getById, create, update, remove };
