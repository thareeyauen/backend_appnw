const router = require('express').Router();
const ctrl = require('../controllers/expertiseController');
const { requireAdmin } = require('../middleware/auth');

router.get('/',       ctrl.getAll);               // public — needed by Landing, Member, forms
router.post('/',      requireAdmin, ctrl.create);
router.put('/:id',    requireAdmin, ctrl.update);
router.delete('/:id', requireAdmin, ctrl.remove);

module.exports = router;
