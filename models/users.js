const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:     { type: String, default: '' },
  email:    { type: String, required: true, unique: true },
  type:     { type: String, default: 'User' },
  password: { type: String, required: true },
}, { toJSON: { virtuals: true, versionKey: false, transform(doc, ret) { delete ret._id; } } });

const UserModel = mongoose.model('User', userSchema);

function safe(user) {
  const obj = user.toObject ? user.toObject() : user;
  const { password, _id, __v, ...rest } = obj;
  rest.id = (user._id || obj._id).toString();
  return rest;
}

async function getAll() {
  const users = await UserModel.find();
  return users.map(safe);
}

async function getById(id) {
  return UserModel.findById(id);
}

async function findById(id) {
  return UserModel.findById(id);
}

async function findByEmail(email) {
  return UserModel.findOne({ email });
}

async function create(data) {
  const user = await UserModel.create({
    name:     data.name     || '',
    email:    data.email    || '',
    type:     data.type     || 'User',
    password: data.password || 'changeme',
  });
  return safe(user);
}

async function update(id, data) {
  const { password, ...updates } = data;
  if (password) updates.password = password;
  const user = await UserModel.findByIdAndUpdate(id, updates, { new: true });
  if (!user) return null;
  return safe(user);
}

async function remove(id) {
  const result = await UserModel.findByIdAndDelete(id);
  return !!result;
}

async function clearByType(label) {
  await UserModel.updateMany({ type: label }, { $set: { type: '' } });
}

module.exports = { getAll, getById, findById, findByEmail, create, update, remove, safe, clearByType };
