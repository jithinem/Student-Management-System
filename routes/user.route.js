const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authorizeAdmin, authorizeStudent, authorizeAdminOrStudent } = require('../middlewares/authorization');
const { authenticateToken } = require('../middlewares/authentication');


router.post('/login', userController.loginController);

router.post('/create-student',authenticateToken,authorizeAdmin,  userController.createStudent);

router.get('/students', authenticateToken,authorizeAdmin, userController.fetchStudents);


module.exports = router;
