const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.patch('/', userController.updateUser);
router.delete('/', userController.removeUser);
router.get('/', userController.getUsersInOrderOfTotalShiftLength);

module.exports = router;