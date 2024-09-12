const mongoose = require("mongoose");
const Contract_Model = require("../model/ContractModel");

// Add Contract
const AddContract = async (req, res) => {
  try {
    const {
      relContact,
      subject,
      contractValue,
      contractType,
      startDate,
      endDate,
      description,
      trash,
      hideCustomer,
      customer,
      project,
    } = req.body;

    // Create new Contract
    const newContract = new Contract_Model({
      trash: trash || false,
      startDate,
      hideCustomer: hideCustomer || false,
      endDate,
      customer: customer || "Select Customer",
      subject,
      contractValue,
      contractType: contractType || "Select Contract Type",
      project: project || "Select Project",
      description,
    });

    // Save the Contract
    const savedContract = await newContract.save();

    // Send response with status 201
    res.status(201).json({ error_code: 201, data: savedContract });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle Mongoose validation errors
      return res.status(400).json({ error_code: 400, message: error.message });
    }
    console.error("Error adding contract:", error);
    res.status(500).json({ error_code: 500, message: "Internal server error" });
  }
};

// Get all contracts
const getAllListContract = async (req, res) => {
  try {
    const contracts = await Contract_Model.find().select(
      "relContact startDate endDate subject contractValue"
    );

    res.status(200).json({ error_code: 200, data: contracts });
  } catch (error) {
    console.error("Error fetching contracts:", error);
    res.status(500).json({ error_code: 500, message: "Internal server error" });
  }
};

// Get contract by ID
const GetContractById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ error_code: 400, message: "Invalid Contract ID" });
    }

    const contract = await Contract_Model.findById(id);

    if (!contract) {
      return res
        .status(404)
        .json({ error_code: 404, message: "Contract not found" });
    }

    res.status(200).json({ error_code: 200, data: contract });
  } catch (error) {
    console.error("Error fetching contract by ID:", error);
    res.status(500).json({ error_code: 500, message: "Internal server error" });
  }
};

// Count all contracts
const CountContract = async (req, res) => {
  try {
    const count = await Contract_Model.countDocuments();

    res.status(200).json({ error_code: 200, count });
  } catch (error) {
    console.error("Error counting contracts:", error);
    res.status(500).json({ error_code: 500, message: "Internal server error" });
  }
};

// Export the controllers
module.exports = {
  AddContract,
  getAllListContract,
  GetContractById,
  CountContract,
};
