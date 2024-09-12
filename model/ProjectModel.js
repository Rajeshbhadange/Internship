const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  member: {
    type: Number, // Changed from String to Number
    required: true,
  },
  startdate: {
    type: Date,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  tags: {
    type: String,
    default: "", // Changed from required to default to allow empty tags
  },
});

module.exports = mongoose.model("Project", projectSchema);
