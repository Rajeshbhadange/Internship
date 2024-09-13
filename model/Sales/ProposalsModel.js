const mongoose = require("mongoose");

const proposalsSchema = new mongoose.Schema({
  iD: {
    type: Number,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  to: {
    type: String,
    require: true,
  },
  total: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  openTill: {
    type: String,
    require: true,
  },
  Tags: {
    type: String,
    require: true,
  },
  Status: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Proposals", proposalsSchema);
