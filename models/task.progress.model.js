const mongoose = require("mongoose");

const taskProgressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
    task_id: {
      type: mongoose.Schema.Types.ObjectId, 
      required: [true, "Task ID is required"],
      ref: "Task",
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["pending", "in-progress", "completed"],
      default: "pending", 
    },
  },
  {
    timestamps: true, 
  }
);

const TaskProgress = mongoose.model("TaskProgress", taskProgressSchema);

module.exports = TaskProgress;
