import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../constants/Variables';

 // Ensure TOKEN_KEY is typed correctly

// Type for the image parameter
interface Image {
  md5: string;
  name: string;
  mv: (destination: string) => Promise<void>;
}

interface TokenPayload {
  email: string;
}
// Type for the file path parameter
type FilePath = string;

// Function to upload an image
const uploadImage = async (image: Image, filepath: FilePath): Promise<string> => {
  const fileName = image.md5 + (+new Date()) + 1;
  const extension = path.extname(image.name);
  await image.mv(`assets/${filepath}/` + fileName + extension);
  return fileName + extension;
}

// Function to encrypt a password
const passwordEncrypt = async (password: string): Promise<string> => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

// Function to compare a password with an encrypted password
const passwordCompare = async (password: string, encryptedPassword: string): Promise<boolean> => {
  return bcrypt.compareSync(password, encryptedPassword);
}

// Function to generate a JWT token
const generateToken = async (payload:TokenPayload): Promise<string> => {
  if (!TOKEN_KEY) {
    throw new Error("TOKEN_KEY is not defined");
  }
  const token = jwt.sign(payload, TOKEN_KEY);
  return token;
}


export {
  uploadImage,
  passwordEncrypt,
  passwordCompare,
  generateToken,
};
