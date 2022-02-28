const express = require('express');
const router = express.Router();
const staffController = require('../controllers/allStaffController');

router.get('/', staffController.getAllUsersSchedules);

module.exports = router;