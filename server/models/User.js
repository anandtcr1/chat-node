
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: false },
    contactNumber: { type: String, required: false },
    userImage: {type: String, required: true },
    emailAddress: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('user_details', UserSchema);