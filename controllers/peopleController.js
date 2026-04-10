const People = require('../models/people');
const { uploadToR2, deleteFromR2 } = require('../utils/r2Upload');

async function getAll(req, res) {
  try {
    const people = await People.getAll(req.query.national);
    res.json(people);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function getOne(req, res) {
  try {
    const person = await People.getById(req.params.id);
    if (!person) return res.status(404).json({ message: 'Person not found' });
    res.json(person);
  } catch (err) {
    res.status(404).json({ message: 'Person not found' });
  }
}

async function update(req, res) {
  try {
    const person = await People.update(req.params.id, req.body);
    if (!person) return res.status(404).json({ message: 'Person not found' });
    res.json({ message: 'Updated', data: person });
  } catch (err) {
    res.status(404).json({ message: 'Person not found' });
  }
}

async function remove(req, res) {
  try {
    const person = await People.getById(req.params.id);
    if (!person) return res.status(404).json({ message: 'Person not found' });

    console.log('[people.remove] avatar:', person.avatar);
    console.log('[people.remove] nameCard:', person.nameCard);

    // Delete files from R2 before removing the record
    const results = await Promise.allSettled([
      deleteFromR2(person.avatar),
      deleteFromR2(person.photo),
      deleteFromR2(person.nameCard),
    ]);
    results.forEach((r, i) => {
      if (r.status === 'rejected') console.error('[people.remove] R2 delete error[' + i + ']:', r.reason?.message);
    });

    await People.remove(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('[people.remove] ERROR:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
}

async function uploadAvatar(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Delete old avatar from R2 before uploading new one
    const person = await People.getById(req.params.id);
    if (person?.avatar) await deleteFromR2(person.avatar).catch(() => {});

    const avatar = await uploadToR2(req.file.buffer, 'avatar', req.file.originalname, req.file.mimetype);
    const updated = await People.update(req.params.id, { avatar });
    if (!updated) return res.status(404).json({ message: 'Person not found' });
    res.json({ message: 'Avatar uploaded', avatar });
  } catch (err) {
    console.error('[people.uploadAvatar] ERROR:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
}

async function uploadPhoto(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const person = await People.getById(req.params.id);
    if (person?.photo) await deleteFromR2(person.photo).catch(() => {});

    const photo = await uploadToR2(req.file.buffer, 'uploads', req.file.originalname, req.file.mimetype);
    const updated = await People.update(req.params.id, { photo });
    if (!updated) return res.status(404).json({ message: 'Person not found' });
    res.json({ message: 'Photo uploaded', photo });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function uploadNameCard(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Delete old namecard from R2 before uploading new one
    const person = await People.getById(req.params.id);
    if (person?.nameCard) await deleteFromR2(person.nameCard).catch(() => {});

    const nameCard = await uploadToR2(req.file.buffer, 'namecard', req.file.originalname, req.file.mimetype);
    const updated = await People.update(req.params.id, { nameCard });
    if (!updated) return res.status(404).json({ message: 'Person not found' });
    res.json({ message: 'Name card uploaded', nameCard });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getAll, getOne, update, remove, uploadAvatar, uploadPhoto, uploadNameCard };
