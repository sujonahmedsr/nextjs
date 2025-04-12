// models/Attendance.js
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userId: { type: String, required: true },
  descriptor: { type: [Number], required: true },  // Store the face descriptor as an array of numbers
  timestamp: { type: Date, default: Date.now },
});

const Attendance = mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);

export default Attendance;
