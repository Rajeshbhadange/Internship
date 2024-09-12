const Project_Model = require("../model/ProjectModel");
const mongoose = require("mongoose");

// Utility function for handling validation errors
const handleValidationError = (res, field) => {
  return res.status(400).json({
    error_code: 400,
    message: `${field} is required`,
  });
};

// Add a new project
const addProject = async (req, res) => {
  try {
    const { name, customer, member, startdate, deadline, tags } = req.body;

    // Validate required fields
    if (!name) return handleValidationError(res, "Project name");
    if (!customer) return handleValidationError(res, "Customer");
    if (member === undefined)
      return handleValidationError(res, "Project member"); // Updated for number
    if (!startdate) return handleValidationError(res, "Start date");
    if (!deadline) return handleValidationError(res, "Deadline");

    // Create a new project
    const newProject = new Project_Model({
      name,
      customer,
      member,
      startdate: new Date(startdate), // Ensure dates are converted
      deadline: new Date(deadline), // Ensure dates are converted
      tags,
    });

    await newProject.save();

    res.status(201).json({
      error_code: 201,
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({
      error_code: 500,
      message: "Internal server error",
    });
  }
};

// Get all projects with selected fields
const getAllListProject = async (req, res) => {
  try {
    const projects = await Project_Model.find().select(
      "name customer member startdate deadline tags"
    );

    res.status(200).json({ error_code: 200, data: projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      error_code: 500,
      message: "Internal server error",
    });
  }
};

// Get project by ID
const GetProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error_code: 400,
        message: "Invalid Project ID",
      });
    }

    const project = await Project_Model.findById(id).select(
      "name customer member startdate deadline tags"
    );

    if (!project) {
      return res.status(404).json({
        error_code: 404,
        message: "Project not found",
      });
    }

    res.status(200).json({ error_code: 200, data: project });
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    res.status(500).json({
      error_code: 500,
      message: "Internal server error",
    });
  }
};

// Count all projects
const CountProject = async (req, res) => {
  try {
    const count = await Project_Model.countDocuments();

    res.status(200).json({ error_code: 200, count });
  } catch (error) {
    console.error("Error counting projects:", error);
    res.status(500).json({
      error_code: 500,
      message: "Internal server error",
    });
  }
};

// Export the controllers
module.exports = {
  addProject,
  getAllListProject,
  GetProjectById,
  CountProject,
};
