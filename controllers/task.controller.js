const taskService = require("../services/task.service");

const createTaskForDepartment = async (req, res) => {
  try {
    const { task, due_date, department } = req.body;

    // Validate input
    if (!task || !due_date || !department) {
      return res.status(400).json({ message: "Task, due date, and department are required." });
    }

    // Call the service to create the task
    const result = await taskService.createTaskForDepartment(task, due_date, department);

    res.status(201).json({ message: "Task created and assigned successfully.", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating task.", error: error.message });
  }
};



const updateTaskProgressStatus = async (req, res) => {
  try {
    const { taskProgressId } = req.params;
    const { status } = req.body;
    const userId = req.user.userId; 
    console.warn(req.user,"aaa");
    

    // Validate input
    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    // Call the service to update the status
    const updatedTaskProgress = await taskService.updateStatus(userId, taskProgressId, status);

    res.status(200).json({ message: "Task progress updated successfully.", updatedTaskProgress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task progress.", error: error.message });
  }
};


const getStudentTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user.userId;

    const { tasks, totalTasks } = await taskService.fetchStudentTasks(userId, page, limit);

    res.status(200).json({
      success: true,
      tasks,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalTasks / limit),
        totalTasks,
      },
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching tasks.",
    });
  }
};


const getAllTasksWithStudentName = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const { tasks, totalTasksProgress } = await taskService.fetchAllTasksWithStudentName(page, limit);

    res.status(200).json({
      success: true,
      tasks,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalTasksProgress / limit),
        totalTasksProgress,
      },
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching tasks.",
    });
  }
};

const fetchAllTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const tasks = await taskService.fetchAllTasks(page, limit);

    res.status(200).json({
      message: 'Tasks retrieved successfully',
      data: tasks,
    });
  } catch (error) {
    console.error('Error listing tasks:', error);
    res.status(500).json({
      message: 'Failed to list tasks',
      error: error.message,
    });
  }
};
module.exports = { 
  createTaskForDepartment, 
  updateTaskProgressStatus, 
  getStudentTasks, 
  getAllTasksWithStudentName,
  fetchAllTasks };
