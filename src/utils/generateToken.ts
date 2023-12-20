import { sign } from "jsonwebtoken";

export const generateToken = async (id: string): Promise<string> => {
  try {
    // Replace 'your-secret-key' with a strong secret key for signing the token
    const secretKey = "your-secret-key";

    // Generate a token with the user ID
    const token = sign({ userId: id }, secretKey, { expiresIn: "1h" });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Error generating token");
  }
};
