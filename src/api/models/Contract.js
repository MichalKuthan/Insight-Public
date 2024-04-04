const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    
    contractId: {
        type: String,
        required: true,
        unique: true
    },
    filePaths: [{ 
        type: String,
        default: []
    }]
});

const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;
