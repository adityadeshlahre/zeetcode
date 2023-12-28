import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// const SECRET = process.env.JWT_SECRET as Secret;
const SECRET = process.env.JWT_SECRET || "tokEN";
//token from .env fix needed

export const GenerateToken = async (email: string): Promise<string> => {
  try {
    const token: string = sign({ email: email }, SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Error generating token");
  }
};

export const VerifyToken = async (token: string): Promise<boolean> => {
  try {
    const decoded = verify(token, SECRET);
    return !!decoded && typeof decoded === "object" && "email" in decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
};
