import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (userId, role) => {
  const payload = { userId, role}; // Define the payload
  const secretKey = process.env.JWT_SECRET; // Get the secret key from environment variables

  // Generate the JWT token
  const token = jwt.sign(payload, secretKey, { expiresIn: "30d" });

  // Return the token
  return token;
};

export default generateToken;
