import * as jwt from "jsonwebtoken";

const generateAccessToken = (email: string): string => {
  return jwt.sign({ email }, process.env.JWT_SECRET || "test_secret", {
    expiresIn: "1d",
  });
};

export default generateAccessToken;
