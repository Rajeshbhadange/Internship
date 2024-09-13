const mongoose = require("mongoose");
const Tasks_Model = require("../model/TasksModel");

const AddTasks = async (req, res) => {
  try {
    const {
      ID,
      Title,
      Description,
      Priority,
      Status,
      activityType,
      tOrder,
      relContact,
      relLead,
      relExpense,
      relContract,
    } = req.body;

    // Validation checks
    if (!ID) {
      return res
        .status(400)
        .json({ error_code: 400, message: "Task ID is required" });
    }
    if (!Title) {
      return res
        .status(400)
        .json({ error_code: 400, message: "Task title is required" });
    }
    if (!Description) {
      return res
        .status(400)
        .json({ error_code: 400, message: "Task description is required" });
    }
    if (!Priority) {
      return res
        .status(400)
        .json({ error_code: 400, message: "Task priority is required" });
    }
    if (!Status) {
      return res
        .status(400)
        .json({ error_code: 400, message: "Task status is required" });
    }
    if (!activityType) {
      return res
        .status(400)
        .json({ error_code: 400, message: "Activity type is required" });
    }
    if (!tOrder) {
      return res
        .status(400)
        .json({ error_code: 400, message: "Task order is required" });
    }
    if (!relContact) {
      return res
        .status(400)
        .json({ error_code: 400, message: "Related contact is required" });
    }
    if (!relLead) {
      return res
        .status(400)
        .json({ error_code: 400, message: "Related lead is required" });
    }
    if (!relExpense) {
      return res
        .status(400)
        .json({ error_code: 400, message: "Related expense is required" });
    }

    // Create a new task
    const newTask = new Tasks_Model({
      ID,
      Title,
      Description,
      Priority,
      Status,
      activityType,
      tOrder,
      relContact,
      relLead,
      relExpense,
      relContract,
    });

    await newTask.save();

    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding task", error: error.message });
  }
};

// Get all tasks
const getAllListTasks = async (req, res) => {
  try {
    const tasks = await Tasks_Model.find().select(
      "ID Title Description Priority Status activityType tOrder relContact relLead relExpense relContract"
    );

    res.status(200).json({ error_code: 200, data: tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error_code: 500, message: "Internal server error" });
  }
};

// Get task by ID
const GetTasksById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ error_code: 400, message: "Invalid Task ID" });
    }

    const tasks = await Tasks_Model.findById(id);

    if (!tasks) {
      return res
        .status(404)
        .json({ error_code: 404, message: "Task not found" });
    }

    res.status(200).json({ error_code: 200, data: tasks });
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(500).json({ error_code: 500, message: "Internal server error" });
  }
};

// Count all tasks
const CountTasks = async (req, res) => {
  try {
    const count = await Tasks_Model.countDocuments();

    res.status(200).json({ error_code: 200, count });
  } catch (error) {
    console.error("Error counting tasks:", error);
    res.status(500).json({ error_code: 500, message: "Internal server error" });
  }
};

// Export the controllers
module.exports = {
  AddTasks,
  getAllListTasks,
  GetTasksById,
  CountTasks,
};
