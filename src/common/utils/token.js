import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "../configs/environments.js";

export const signToken = (payload, expiresIn = JWT_EXPIRES_IN || "1d") => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return { valid: true, decoded };
  } catch (err) {
    return { valid: false, error: err };
  }
};
