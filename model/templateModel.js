const mongoose = require('mongoose');
const { Schema } = mongoose;

const template = new Schema({
    name: {
        type: String,
        required: false
    },
    image: {
        type: Array,
        required: false
    },
    purchases: {
        type: String,
        required: false
    },
    views: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required:false
    },
    language: {
        type: Array,
        required: false
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Template = mongoose.model('Template', template)
module.exports = Template