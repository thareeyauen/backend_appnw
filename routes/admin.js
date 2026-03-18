const router = require('express').Router();
const ctrl = require('../controllers/adminController');

router.get('/submissions',              ctrl.getAllSubmissions);
router.get('/submissions/:id',          ctrl.getOneSubmission);
router.patch('/submissions/:id/approve', ctrl.approve);
router.patch('/submissions/:id/reject',  ctrl.reject);

module.exports = router;
