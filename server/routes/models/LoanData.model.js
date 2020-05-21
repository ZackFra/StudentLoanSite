const {Schema, model } = require('mongoose');

const LoanDataSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    debt: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    lastFour: {
        type: Number,
        required: true
    },
    DOB: {
        type: String,
        required: true
    }
})

const LoanData = model('LoanData', LoanDataSchema);

module.exports = LoanData;