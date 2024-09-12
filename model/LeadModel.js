const mongoose = require("mongoose");

const leadsSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    primaryEmail: { type: String, required: true, unique: true },
    secondaryEmail: { type: String },
    primaryPhone: { type: String, required: true },
    mobilePhone: { type: String },
    assignUser: {
      type: String,
      enum: ["Select Assign user", "XfinitySoft"],
      required: true,
    },
    leadStatus: {
      type: String,
      enum: ["Select lead status", "Junk", "Started", "Appointed"],
      default: "Select lead status",
    },
    leadSource: {
      type: String,
      enum: ["Select lead source", "Google", "Facebook", "In person"],
      default: "Select lead source",
    },
    leadType: {
      type: String,
      enum: ["Select lead type", "commission", "agent", "rent"],
      default: "Select lead type",
    },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Leads", leadsSchema);

module.exports = Lead;
