const Proposals_Model = require("../../model/Sales/ProposalsModel");

const AddProposals = async (req, res) => {
  try {
    const { subject, to, total, date, openTill, tags, status } = req.body;

    if (!subject || !to || !total || !date || !openTill || !tags || !status) {
      return res
        .status(400)
        .json({ error_code: 400, message: "All fields are required" });
    }

    const newProposals = new Proposals_Model({
      subject,
      to,
      total,
      date,
      openTill,
      tags,
      status,
    });
    const savedProposals = await newProposals.save();

    res.status(200).json({ error_code: 200, data: savedProposals });
  } catch (error) {
    console.error("Error adding Proposals:", error.message);
    res.status(500).json({ error_code: 500, message: "Internal server error" });
  }
};

// ---------------------------------------------------------

const getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposals_Model.find().select(
      "subject to total date openTill tags status"
    );

    res.status(200).json({ error_code: 200, data: proposals });
  } catch (error) {
    console.error("Error retrieving Proposals:", error.message);
    res.status(500).json({ error_code: 500, message: "Internal server error" });
  }
};

// --------------------------------------------------------

const getProposalsById = async (req, res) => {
  try {
    const { id } = req.params;
    const proposals = await Proposals_Model.findById(id);

    if (!proposals) {
      return res
        .status(404)
        .json({ error_code: 404, message: "Proposals not found" });
    }

    res.status(200).json({ error_code: 200, data: proposals });
  } catch (error) {
    console.error("Error retrieving Proposals by ID:", error.message);
    res.status(500).json({ error_code: 500, message: "Internal server error" });
  }
};

// --------------------------------------------------------

const getProposalsCount = async (req, res) => {
  try {
    const count = await Proposals_Model.countDocuments();
    res.status(200).json({ error_code: 200, count });
  } catch (error) {
    console.error("Error retrieving Proposals count:", error.message);
    res.status(500).json({ error_code: 500, message: "Internal server error" });
  }
};

module.exports = {
  AddProposals,
  getAllProposals,
  getProposalsById,
  getProposalsCount,
};
