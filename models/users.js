const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  name:     { type: String, default: '' },
  email:    { type: String, required: true, unique: true },
  type:     { type: String, default: 'User' },
  password: { type: String, required: true },
}, { toJSON: { virtuals: true, versionKey: false, transform(doc, ret) { delete ret._id; } } });

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

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
  const user = new UserModel({
    name:     data.name     || '',
    email:    data.email    || '',
    type:     data.type     || 'User',
    password: data.password || 'changeme',
  });
  await user.save();
  return safe(user);
}

async function update(id, data) {
  const user = await UserModel.findById(id);
  if (!user) return null;
  if (data.name !== undefined)     user.name     = data.name;
  if (data.email !== undefined)    user.email    = data.email;
  if (data.type !== undefined)     user.type     = data.type;
  if (data.password)               user.password = data.password;
  await user.save();
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
