const router = require('express').Router();
const ctrl = require('../controllers/peopleController');
const { requireAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');
const uploadAvatar = require('../middleware/uploadAvatar');

router.get('/',       ctrl.getAll);               // public
router.get('/:id',    ctrl.getOne);               // public
router.put('/:id',    requireAdmin, ctrl.update);
router.delete('/:id', requireAdmin, ctrl.remove);
router.post('/:id/avatar',   requireAdmin, uploadAvatar.single('avatar'), ctrl.uploadAvatar);
router.post('/:id/photo',    requireAdmin, upload.single('photo'),    ctrl.uploadPhoto);
router.post('/:id/namecard', requireAdmin, upload.single('nameCard'), ctrl.uploadNameCard);

module.exports = router;
