import { sign, verify } from "jsonwebtoken";

// const secret: string = process.env.JWT_SECRET || "";
const secret: string = "token";
export const generateToken = async (email: string): Promise<string> => {
  try {
    console.log(secret);
    console.log(email);
    const token = sign({ email }, secret.toString(), {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    return "error";
  }
};

export const verifyToken = (token: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as string);
      }
    });
  });
};

//Throe Errors fix needed
