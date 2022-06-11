const mongoose = require('mongoose');
const { Schema } = mongoose;

const post = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Post = mongoose.model('Post',post)
module.exports = Post