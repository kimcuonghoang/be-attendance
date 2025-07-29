import { Router } from "express";
import { authLogin, authRegister } from "./auth.controller.js";

const authRoutes = Router();
authRoutes.post("/register", authRegister);
authRoutes.post("/login", authLogin);
export default authRoutes;
