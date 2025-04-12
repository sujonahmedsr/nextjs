"use server"
// pages/api/delete-image.ts
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'dvjeaplel',
  api_key: '965318298626492',
  api_secret: "JjK7nxRbUadlYJ4IesuGh1QKw9Q", // .env file থেকে নেবে
});

export default async function handler(req, res) {
  
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { public_id } = req.body;

  if (!public_id) return res.status(400).json({ message: 'Missing public_id' });

  try {
    const result = await cloudinary.v2.uploader.destroy(public_id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
