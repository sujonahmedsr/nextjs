import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User"; // Assuming you have a User model

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userName, userId, descriptor } = req.body;
    
    try {
      // Ensure MongoDB is connected
      await dbConnect();

      // Check if user already exists
      const existingUser = await User.findOne({ userId });
      if (existingUser) {
        return res.status(400).json({ message: "User already registered" });
      }

      // Create a new user with face descriptor
      const newUser = new User({
        userName,
        userId,
        descriptor, // Store the face descriptor here
      });

      await newUser.save();

      res.status(200).json({ success: true, message: "Registration successful" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error", message: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
