const multer = require('multer');
const path = require('path');
const fs = require('fs');

const nameCardDir = path.join(__dirname, '..', 'namecard');
if (!fs.existsSync(nameCardDir)) fs.mkdirSync(nameCardDir);

const storage = multer.diskStorage({
  destination: nameCardDir,
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const uploadNameCard = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only image or PDF files are allowed'));
  },
});

module.exports = uploadNameCard;
