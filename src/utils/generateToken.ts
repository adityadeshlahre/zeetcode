import { createHash } from "crypto";

export const GenerateToken = async (email: string): Promise<string> => {
  try {
    const hash = createHash("sha256");
    const token = hash.update(email).digest("hex");

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Error generating token");
  }
};

export const VerifyToken = async (
  token: string,
  email: string,
): Promise<boolean> => {
  try {
    const hashedEmail = await GenerateToken(email);

    return token === hashedEmail;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
};
