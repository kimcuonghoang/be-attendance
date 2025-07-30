import { Router } from "express";
import { authLogin, authRegister } from "./auth.controller.js";
import validBodyRequest from "../../common/middleware/validBody.middleware.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

const authRoutes = Router();
authRoutes.post("/register", validBodyRequest(registerSchema), authRegister);
authRoutes.post("/login", validBodyRequest(loginSchema), authLogin);
export default authRoutes;
