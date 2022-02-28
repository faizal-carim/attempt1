const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.post('/', scheduleController.handleNewSchedule);
router.patch('/', scheduleController.updateSchedule);
router.delete('/', scheduleController.removeSchedule);
router.get('/', scheduleController.getUserSchedule);

module.exports = router;