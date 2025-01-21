const Task = require("../models/task.model");
const TaskProgress = require("../models/task.progress.model");
const User = require("../models/user.model");

const createTaskForDepartment = async (task, due_date, department) => {
  const students = await User.find({ department, user_type: "student" });

  if (!students || students.length === 0) {
    throw new Error("No students found in the specified department.");
  }
  // Create the task
  const newTask = await Task.create({ task, due_date });
  // Create task progress entries for each student
  const taskProgressData = students.map((student) => ({
    user_id: student._id,
    task_id: newTask._id,
    status: "pending", // Default status
  }));
  await TaskProgress.insertMany(taskProgressData);
  return { task: newTask, assignedTo: students.length };
};



const updateStatus = async (userId, taskProgressId, status) => {
  // Ensure the status is valid
  const validStatuses = ["pending", "in-progress", "completed"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status. Allowed values are: 'pending', 'in-progress', 'completed'.");
  }

  console.log("TaskProgress ID:", taskProgressId);
console.log("User ID:", userId);
  const taskProgress = await TaskProgress.findOneAndUpdate(
    { _id: taskProgressId, user_id: userId },
    { status },
    { new: true }
  );

  if (!taskProgress) {
    throw new Error("Task progress not found or you are not authorized to update this task.");
  }

  return taskProgress;
};


const fetchStudentTasks = async (userId, page, limit) => {
    const skip = (page - 1) * limit;
  
    const tasks = await TaskProgress.find({ user_id: userId })
      .populate("task_id", "task due_date") 
      .sort({ "task_id.due_date": -1 }) 
      .skip(skip)
      .limit(parseInt(limit));
    const totalTasks = await TaskProgress.countDocuments({ user_id: userId });
  
    return { tasks, totalTasks };
  };

  const fetchAllTasksWithStudentName = async (page, limit) => {
    const skip = (page - 1) * limit;  
    const tasks = await TaskProgress.find()
      .populate("user_id", "name email") 
      .populate("task_id", "task due_date")
      .sort({ "task_id.due_date": -1 }) 
      .skip(skip)
      .limit(parseInt(limit));
  
    const totalTasksProgress = await TaskProgress.countDocuments();
  
    return { tasks, totalTasksProgress };
  };

  const fetchAllTasks = async (page, limit) => {
    const skip = (page - 1) * limit;
  
    const tasks = await Task.find()
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 }) 
      .lean();
  
    return tasks.map(task => ({
      id: task._id,
      taskName: task.task,
      dueDate: task.due_date,
      createdAt: task.createdAt,
    }));
  };



module.exports = { 
    createTaskForDepartment, 
    updateStatus, 
    fetchStudentTasks, 
    fetchAllTasksWithStudentName,
    fetchAllTasks };
