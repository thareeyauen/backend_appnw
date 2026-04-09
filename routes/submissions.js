const router = require('express').Router();
const ctrl = require('../controllers/submissionsController');
const uploadAvatar = require('../middleware/uploadAvatar');

router.post('/',     uploadAvatar.single('avatar'), ctrl.create);
router.get('/:id',   ctrl.getOne);
router.delete('/:id', ctrl.cancel);

module.exports = router;
