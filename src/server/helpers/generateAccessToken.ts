import * as jwt from "jsonwebtoken";

const generateAccessToken = (
  email: string,
  project?: string,
  tokenFromAdminPanel?: string
): string => {
  return jwt.sign(
    { email, project, tokenFromAdminPanel },
    process.env.JWT_SECRET || "test_secret",
    {
      expiresIn: "1d",
    }
  );
};

export default generateAccessToken;
