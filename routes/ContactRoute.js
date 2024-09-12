const express = require("express");

const Router = express.Router();
const ContactController = require("../controllers/ContactController");
const LeadsController = require("../controllers/LeadsController");
const ContractController = require("../controllers/ContractController");

// ----------------------------
//  Contact Routes

Router.post("/AddNewContact/", ContactController.AddContact);
Router.get("/getAllContacts/", ContactController.getAllContacts);
Router.get("/getContactById/:id", ContactController.getContactById);
Router.get("/getContactCount", ContactController.getContactCount);

// ----------------------------
// Leads Routes

Router.post("/AddNewLeads/", LeadsController.AddLead);
Router.get("/getAllListLeads/", LeadsController.getAllListLeads);
Router.get("/GetLeadById/:id", LeadsController.GetLeadById);
Router.get("/getCountLeads", LeadsController.CountLeads);

//-----------------------------
// Contract Routes

Router.post("/AddNewContract", ContractController.AddContract);
Router.get("/getAllContract/", ContractController.getAllListContract);
Router.get("/GetContractById/:id", ContractController.GetContractById);
Router.get("/getCountContract", ContractController.CountContract);

module.exports = Router;
