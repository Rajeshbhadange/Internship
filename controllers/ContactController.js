const Contact_Model = require("../model/ContactModel");

const AddContact = async (req, res) => {
  try {
    const {
      firstName,
      secondName,
      primaryEmail,
      secondaryEmail,
      primaryPhone,
      mobilePhone,
      assignUser,
      invoicesPermission,
      estimatesPermission,
      contractsPermission,
      proposalsPermission,
      supportPermission,
      projectsPermission,
      password,
      sendSetPasswordEmail,
    } = req.body;

    if (!firstName) {
      return res
        .status(400)
        .json({ error_code: 400, message: "First name is required" });
    }
    if (!secondName) {
      return res
        .status(400)
        .json({ error_code: 400, message: "Second name is required" });
    }
    if (!primaryEmail) {
      return res
        .status(400)
        .json({ error_code: 400, message: "Primary email is required" });
    }
    if (!primaryPhone) {
      return res
        .status(400)
        .json({ error_code: 400, message: "Primary phone is required" });
    }
    if (!assignUser) {
      return res
        .status(400)
        .json({ error_code: 400, message: "Assign user is required" });
    }

    const emailExists = await Contact_Model.findOne({ primaryEmail });
    if (emailExists) {
      return res.status(400).json({
        error_code: 400,
        message: "A contact with this primary email already exists",
      });
    }

    const phoneExists = await Contact_Model.findOne({ primaryPhone });
    if (phoneExists) {
      return res.status(400).json({
        error_code: 400,
        message: "A contact with this primary phone already exists",
      });
    }

    const newContact = new Contact_Model({
      firstName,
      secondName,
      primaryEmail,
      secondaryEmail,
      primaryPhone,
      mobilePhone,
      assignUser,
      invoicesPermission: invoicesPermission || 0,
      estimatesPermission: estimatesPermission || 0,
      contractsPermission: contractsPermission || 0,
      proposalsPermission: proposalsPermission || 0,
      supportPermission: supportPermission || 0,
      projectsPermission: projectsPermission || 0,
      password: password || "12345678",
      sendSetPasswordEmail: sendSetPasswordEmail || 0,
    });

    const savedContact = await newContact.save();

    res.status(200).json({ error_code: 200, data: savedContact });
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({ error_code: 500, message: "Internal server error" });
  }
};

// ---------------------------------------------------------

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact_Model.find().select(
      "firstName secondName primaryEmail secondaryEmail primaryPhone"
    );

    res.status(200).json({ error_code: 200, data: contacts });
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    res.status(500).json({ error_code: 500, message: "Internal server error" });
  }
};

// --------------------------------------------------------

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact_Model.findById(id);

    if (!contact) {
      return res
        .status(404)
        .json({ error_code: 404, message: "Contact not found" });
    }

    res.status(200).json({ error_code: 200, data: contact });
  } catch (error) {
    console.error("Error retrieving contact by ID:", error);
    res.status(500).json({ error_code: 500, message: "Internal server error" });
  }
};

// --------------------------------------------------------

const getContactCount = async (req, res) => {
  try {
    const count = await Contact_Model.countDocuments();

    res.status(200).json({ error_code: 200, count });
  } catch (error) {
    console.error("Error retrieving contact count:", error);
    res.status(500).json({ error_code: 500, message: "Internal server error" });
  }
};

module.exports = {
  AddContact,
  getAllContacts,
  getContactById,
  getContactCount,
};
