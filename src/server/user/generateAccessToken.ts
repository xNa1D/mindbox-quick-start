import * as jwt from "jsonwebtoken";

import { JwtUser } from "src/declarations";

const generateAccessToken = ({
  email,
  project,
  tokenFromAdminPanel,
}: JwtUser): string => {
  return jwt.sign(
    { email, project, tokenFromAdminPanel },
    process.env.JWT_SECRET || "test_secret",
    {
      expiresIn: "1d",
    }
  );
};

export default generateAccessToken;
