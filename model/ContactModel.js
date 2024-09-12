const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        secondName: {
            type: String,
            required: true
        },
        primaryEmail: {
            type: String,
            required: true,
            unique: true
        },
        secondaryEmail: {
            type: String
        },
        primaryPhone: {
            type: String,
            required: true
        },
        mobilePhone: {
            type: String
        },
        assignUser: {
            type: String,
            enum: ['Select Assign user', 'XfinitySoft'],
            required: true
        },
        invoicesPermission: {
            type: Number,
            default: 0
        },
        estimatesPermission: {
            type: Number,
            default: 0
        },
        contractsPermission: {
            type: Number,
            default: 0
        },
        proposalsPermission: {
            type: Number,
            default: 0
        },
        supportPermission: {
            type: Number,
            default: 0
        },
        projectsPermission: {
            type: Number,
            default: 0
        },
        password: {
            type: String,
            required: true,
            default: '12345678'
        },
        sendSetPasswordEmail: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
