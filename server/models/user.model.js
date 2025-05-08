import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }, 
  profilePic: { type: String , default: '' }, 
  status: { type: String, default: 'Hey there! I am using ChatApp.' },
  isVerified: { type: Boolean, default: false },
  veficationOtp: { type: String, default: '' },
  veficationOtpExpiresAt: { type: Number, default: 0 },
  lastSeen: { type: Date, default: Date.now }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
