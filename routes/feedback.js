const router = require('express').Router();
const ctrl = require('../controllers/feedbackController');
const { requireAdmin } = require('../middleware/auth');

router.post('/',      ctrl.create);              // auth user ส่ง feedback
router.get('/',       requireAdmin, ctrl.getAll); // admin ดู feedback ทั้งหมด
router.delete('/:id', requireAdmin, ctrl.remove); // admin ลบ feedback

module.exports = router;
