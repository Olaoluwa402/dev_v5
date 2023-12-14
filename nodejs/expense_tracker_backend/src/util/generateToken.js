//load environment variables fro .env file
import dotenv from "dotenv";
dotenv.config();

import JWT from "jsonwebtoken";
const { JWT_SECRET, JWT_EXPIRY } = process.env;
export const jwtToken = (id, email) => {
  return JWT.sign({ id, email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
};
