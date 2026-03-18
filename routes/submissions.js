const router = require('express').Router();
const ctrl = require('../controllers/submissionsController');

router.post('/',     ctrl.create);
router.get('/:id',   ctrl.getOne);
router.delete('/:id', ctrl.cancel);

module.exports = router;
