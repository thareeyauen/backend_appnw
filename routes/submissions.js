const router = require('express').Router();
const ctrl = require('../controllers/submissionsController');
const uploadAvatar = require('../middleware/uploadAvatar');
const uploadNameCard = require('../middleware/uploadNameCard');

router.post('/',                   uploadAvatar.single('avatar'), ctrl.create);
router.get('/:id',                 ctrl.getOne);
router.delete('/:id',              ctrl.cancel);
router.post('/:id/namecard',       uploadNameCard.single('nameCard'), ctrl.uploadNameCard);

module.exports = router;
