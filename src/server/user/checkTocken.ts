import * as jwt from "jsonwebtoken";

import {JwtUser} from 'src/declarations'

const checkTocken = (token: string): JwtUser => {
  return jwt.verify(token, process.env.JWT_SECRET || "test_secret") as JwtUser;
};

export default checkTocken;
