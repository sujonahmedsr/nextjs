// /pages/api/attendance/mark.js

import dbConnect from "../../../lib/dbConnect";
import Attendance from "../../../models/Attendance";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Connect to the database
      await dbConnect();

      const { descriptor, userName, userId } = req.body;
      console.log(req.body);
      

      if (!descriptor || !userName || !userId) {
        return res.status(400).json({
          success: false,
          message: "Name, ID, and Face Descriptor are required",
        });
      }

      // Create a new attendance record
      const attendanceRecord = new Attendance({
        userName,
        userId,
        descriptor,
      });

      // Save to MongoDB
      await attendanceRecord.save();

      // Return success response
      res.status(200).json({
        success: true,
        message: "Attendance marked successfully",
        user: { name: userName, id: userId },
      });
    } catch (error) {
      console.error("Error saving attendance:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
