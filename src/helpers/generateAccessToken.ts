import jwt from "jsonwebtoken";

const generateAccessToken = (email: string): string => {
  return jwt.sign(email, process.env.JWT_SECRET, { expiresIn: "1800s" });
};

export default generateAccessToken;
