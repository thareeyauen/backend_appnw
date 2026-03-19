const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const { SECRET } = require('../middleware/auth');

function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  const user = Users.findByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, type: user.type },
    SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token, user: Users.safe(user) });
}

function me(req, res) {
  const user = Users.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(Users.safe(user));
}

module.exports = { login, me };
