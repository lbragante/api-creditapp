const mongoose = require('../../../database/database');

const CreditSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Credit = mongoose.model('Credit', CreditSchema);

module.exports = Credit;