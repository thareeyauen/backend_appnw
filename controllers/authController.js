const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const { SECRET } = require('../middleware/auth');

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await Users.findByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, type: user.type },
      SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, user: Users.safe(user) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function me(req, res) {
  try {
    const user = await Users.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(Users.safe(user));
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
}

async function changePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'กรุณากรอก oldPassword และ newPassword' });
    }
    const user = await Users.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!(await user.comparePassword(oldPassword))) {
      return res.status(400).json({ message: 'รหัสผ่านเดิมไม่ถูกต้อง' });
    }
    await Users.update(req.user.id, { password: newPassword });
    res.json({ message: 'เปลี่ยนรหัสผ่านสำเร็จ' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { login, me, changePassword };
