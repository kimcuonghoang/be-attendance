import { Router } from "express";
import { getListTeacherController } from "./user.controller.js";

const userRoutes = Router();
userRoutes.get("/", getListTeacherController);
export default userRoutes;
