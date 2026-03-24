const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({ label: String }, { _id: false });

const peopleSchema = new mongoose.Schema({
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
}, { toJSON: { virtuals: true, versionKey: false, transform(doc, ret) { delete ret._id; } } });

const PeopleModel = mongoose.model('People', peopleSchema);

async function getAll(location) {
  if (location) {
    const escaped = location.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return PeopleModel.find({ location: new RegExp(`^${escaped}$`, 'i') });
  }
  return PeopleModel.find();
}

async function getById(id) {
  return PeopleModel.findById(id);
}

async function update(id, data) {
  return PeopleModel.findByIdAndUpdate(id, data, { new: true });
}

async function remove(id) {
  const result = await PeopleModel.findByIdAndDelete(id);
  return !!result;
}

async function add(data) {
  return PeopleModel.create(data);
}

module.exports = { getAll, getById, update, remove, add };
