import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../constants/Variables';

const authMiddleware = (req: any) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1]; // Extract token
    if (!token) {
      console.error("No token provided");
      return null; // No token provided
    }

    if (!TOKEN_KEY) {
      throw new Error("TOKEN_KEY is not defined");
    }

    const decoded = jwt.verify(token, TOKEN_KEY);
    return decoded;
  } catch (error) {
    console.error("Auth middleware error:",); // Log errors
    return null; // Invalid token
  }
};

export default authMiddleware;
