import { Router } from "express";
import {
  authLogin,
  authRefreshToken,
  authRegister,
} from "./auth.controller.js";
import validBodyRequest from "../../common/middleware/validBody.middleware.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

const authRoutes = Router();
authRoutes.post("/register", validBodyRequest(registerSchema), authRegister);
authRoutes.post("/login", validBodyRequest(loginSchema), authLogin);
authRoutes.post("/refresh-token", authRefreshToken);
export default authRoutes;
