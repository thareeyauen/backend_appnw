const router = require('express').Router();
const ctrl = require('../controllers/peopleController');
const { requireAdmin } = require('../middleware/auth');

router.get('/',       ctrl.getAll);               // public
router.get('/:id',    ctrl.getOne);               // public
router.put('/:id',    requireAdmin, ctrl.update);
router.delete('/:id', requireAdmin, ctrl.remove);

module.exports = router;
