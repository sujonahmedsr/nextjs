import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  descriptor: [Number], // face descriptor
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
