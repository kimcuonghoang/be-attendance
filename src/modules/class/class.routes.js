import { Router } from "express";
import { createClassController } from "./class.controller.js";

const classRoutes = Router();

classRoutes.post("/", createClassController);

export default classRoutes;
