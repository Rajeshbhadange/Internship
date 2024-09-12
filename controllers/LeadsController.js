const Leads_Model = require('../model/LeadModel');

const AddLead = async (req, res) => {
    try {
        const {
            firstName,
            secondName,
            primaryEmail,
            secondaryEmail,
            primaryPhone,
            mobilePhone,
            assignUser,
            leadStatus,
            leadSource,
            leadType
        } = req.body;

        // Field-specific validations
        if (!firstName) {
            return res.status(400).json({ error_code: 400, message: 'First name is required' });
        }
        if (!secondName) {
            return res.status(400).json({ error_code: 400, message: 'Second name is required' });
        }
        if (!primaryEmail) {
            return res.status(400).json({ error_code: 400, message: 'Primary email is required' });
        }
        if (!primaryPhone) {
            return res.status(400).json({ error_code: 400, message: 'Primary phone is required' });
        }
        if (!assignUser) {
            return res.status(400).json({ error_code: 400, message: 'Assign user is required' });
        }

        // Check for existing email
        const existingEmail = await Leads_Model.findOne({ primaryEmail });
        if (existingEmail) {
            return res.status(400).json({ error_code: 400, message: 'Primary email already exists' });
        }

        // Check for existing phone
        const existingPhone = await Leads_Model.findOne({ primaryPhone });
        if (existingPhone) {
            return res.status(400).json({ error_code: 400, message: 'Primary phone already exists' });
        }

        // Create new lead
        const newLead = new Leads_Model({
            firstName,
            secondName,
            primaryEmail,
            secondaryEmail,
            primaryPhone,
            mobilePhone,
            assignUser,
            leadStatus: leadStatus || 'Select lead status',
            leadSource: leadSource || 'Select lead source',
            leadType: leadType || 'Select lead type'
        });

        // Save the lead
        const savedLead = await newLead.save();

        // Send response
        res.status(200).json({ error_code: 200, data: savedLead });

    } catch (error) {
        console.error('Error adding lead:', error);
        res.status(500).json({ error_code: 500, message: 'Internal server error' });
    }
};



// ----------------------------


const getAllListLeads = async (req, res) => {
    try {
        const leads = await Leads_Model.find()
            .select('firstName secondName primaryEmail secondaryEmail primaryPhone');

        res.status(200).json({ error_code: 200, data: leads });
    } catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({ error_code: 500, message: 'Internal server error' });
    }
};


// ----------------------------


const GetLeadById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error_code: 400, message: 'Lead ID is required' });
        }

        const lead = await Leads_Model.findById(id);

        if (!lead) {
            return res.status(404).json({ error_code: 404, message: 'Lead not found' });
        }

        res.status(200).json({ error_code: 200, data: lead });
    } catch (error) {
        console.error('Error fetching lead by ID:', error);
        res.status(500).json({ error_code: 500, message: 'Internal server error' });
    }
};



// ----------------------------



const CountLeads = async (req, res) => {
    try {
        const count = await Leads_Model.countDocuments();

        res.status(200).json({ error_code: 200, count });
    } catch (error) {
        console.error('Error counting leads:', error);
        res.status(500).json({ error_code: 500, message: 'Internal server error' });
    }
};



// ----------------------------
// ----------------------------



module.exports = {
    AddLead,
    getAllListLeads,
    GetLeadById,
    CountLeads
};
