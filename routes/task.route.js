const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const { authenticateToken } = require("../middlewares/authentication");
const { authorizeAdmin, authorizeStudent, authorizeAdminOrStudent } = require("../middlewares/authorization");

router.post("/department", authenticateToken, authorizeAdmin, taskController.createTaskForDepartment);

router.patch("/task-progress/:taskProgressId/status", authenticateToken, authorizeStudent, taskController.updateTaskProgressStatus);

router.get("/student-tasks",authenticateToken, authorizeStudent, taskController.getStudentTasks);

router.get("/admin/tasks-progress",authenticateToken, authorizeAdmin, taskController.getAllTasksWithStudentName);

router.get('/all',authenticateToken, authorizeAdmin, taskController.fetchAllTasks);


module.exports = router;
