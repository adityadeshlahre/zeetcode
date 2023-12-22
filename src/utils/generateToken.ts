import { sign, verify } from "jsonwebtoken";
import { GetUserId } from "./returnId";

const secret: string = process.env.JWT_SECRET || "";
export const generateToken = async (email: string): Promise<string> => {
  try {
    const id = await GetUserId(email);

    const token = sign({ userId: id }, secret, { expiresIn: "1h" });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Error generating token");
  }
};

export const verifyToken = (token: string): Promise<{ userId: string }> => {
  return new Promise((resolve, reject) => {
    verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as { userId: string });
      }
    });
  });
};

//Throe Errors fix needed
