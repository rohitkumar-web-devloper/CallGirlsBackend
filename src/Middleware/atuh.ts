import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../constants/Variables';
import db from '../models';
import User from '../Graphql/User/resolver';
import Customer from '../models/customer';

const authMiddleware = async (req: any) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1]; // Extract token

    if (!token) {
      console.error("No token provided");
      return null; // No token provided
    }

    if (!TOKEN_KEY) {
      throw new Error("TOKEN_KEY is not defined");
    }
    let exist = await db.User.findOne({
      where: {
        token
      }
    })
    if (!exist) {
      exist = await db.Customer.findOne({ where: { token } })
      if(!exist){
        return null
      }
    }
    const decoded = jwt.verify(token, TOKEN_KEY);
    return decoded;
  } catch (error) {
    console.error("Auth middleware error:",); // Log errors
    return null; // Invalid token
  }
};

export default authMiddleware;
