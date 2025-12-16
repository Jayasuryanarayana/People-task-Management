const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // No two users can have the same email
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Only these values are allowed
        default: 'user'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);