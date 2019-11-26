const mongoose = require('../../../database/database');

const SolicitationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    credit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Credit',
        require: true
    },
    value: {
        type: Number,
        min: 100.00,
        require: true
    },
    quantityInstallments: {
        type: Number,
        min: 1,
        require: true
    },
    status: {
        type: String,
        status: ['requested','approved', 'rejected'],
        default: 'requested',
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Solicitation = mongoose.model('Solicitation', SolicitationSchema);

module.exports = Solicitation;