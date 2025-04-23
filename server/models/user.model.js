const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // like Facebook
  password: { type: String, required: true }, // hashed password
  profilePic: { type: String }, // profile image URL
  status: { type: String, default: 'Hey there! I am using ChatApp.' },
  lastSeen: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
