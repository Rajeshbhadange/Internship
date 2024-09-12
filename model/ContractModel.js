const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema(
  {
    relContact: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    contractValue: {
      type: Number,
      required: true,
    },
    contractType: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
    hideCustomer: {
      type: Boolean,
      default: false,
    },
    customer: {
      type: String,
      default: "Select Customer",
    },
    project: {
      type: String,
      default: "Select Project",
    },
  },
  { timestamps: true } // Automatically creates createdAt and updatedAt
);

module.exports = mongoose.model("Contract", contractSchema);
