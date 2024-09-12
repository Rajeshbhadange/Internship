const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  ID: {
    type: Number,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Priority: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  activityType: {
    type: String,
    required: true,
  },
  tOrder: {
    type: String,
    required: true,
  },
  relContact: {
    type: String,
    required: true,
  },
  relLead: {
    type: String,
    required: true,
  },
  relExpense: {
    type: String,
    required: true,
  },
  relContract: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tasks", tasksSchema);
