const express = require("express");

const Router = express.Router();
const ContactController = require("../controllers/ContactController");
const LeadsController = require("../controllers/LeadsController");
const ContractController = require("../controllers/ContractController");
const TasksController = require("../controllers/TasksController");
const ProjectController = require("../controllers/ProjectController");
const ProposalsController = require("../controllers/Sales/ProposalsController");

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

//------------------------------
//Tasks Routes

Router.post("/AddTasks", TasksController.AddTasks);
Router.get("/getAllListTasks/", TasksController.getAllListTasks);
Router.get("/GetTasksById/:id", TasksController.GetTasksById);
Router.get("/CountTasks", TasksController.CountTasks);

//-----------------------------
//Projects Routes

Router.post("/AddProject", ProjectController.addProject);
Router.get("/getAllListProject", ProjectController.getAllListProject);
Router.get("/getProjectById/:id", ProjectController.GetProjectById);
Router.get("/CountProject", ProjectController.CountProject);

//-----------------------------
//Proposals Routes

Router.post("/AddProposals", ProposalsController.AddProposals);
Router.post("/getAllProposals", ProposalsController.getAllProposals);
Router.post("/getProposalsById/:id", ProposalsController.getProposalsById);
Router.post("/getProposalsCount", ProposalsController.getProposalsCount);

module.exports = Router;
