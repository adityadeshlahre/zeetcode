import { compare, hash } from "bcryptjs";

export const generateHashedPassword = async (
  password: string,
): Promise<string> => {
  try {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.error("Error generating hashed password:", error);
    return "error";
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  try {
    const isMatch = await compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
};

//Throe Errors fix needed
