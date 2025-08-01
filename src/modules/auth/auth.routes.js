import { Router } from "express";
import {
  authForgotPassword,
  authLogin,
  authRefreshToken,
  authRegister,
  authResetPassword,
} from "./auth.controller.js";
import validBodyRequest from "../../common/middleware/validBody.middleware.js";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "./auth.schema.js";

const authRoutes = Router();
authRoutes.post("/register", validBodyRequest(registerSchema), authRegister);
authRoutes.post("/login", validBodyRequest(loginSchema), authLogin);
authRoutes.post("/refresh-token", authRefreshToken);
authRoutes.post("/forgot-password", authForgotPassword);
authRoutes.post(
  "/reset-password",
  validBodyRequest(resetPasswordSchema),
  authResetPassword
);
export default authRoutes;
