import * as jwt from "jsonwebtoken";

type CheckedToken = {
  email: string;
  exp: number;
  iat: number;
};

const checkTocken = (token: string): CheckedToken => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET || "test_secret"
  ) as CheckedToken;
};

export default checkTocken;
