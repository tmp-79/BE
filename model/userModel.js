const mongoose = require('mongoose');
const { Schema } = mongoose;


const user = Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
    },
    fullname: {
        type: String,
        require: true
    }
}, { timestamps: true });

const User = mongoose.model("Users", user);

module.exports = User