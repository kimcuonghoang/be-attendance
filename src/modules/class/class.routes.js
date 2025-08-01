import { Router } from "express";
import {
  createClassController,
  deleteClassController,
  getAllClassesController,
  getClassByIdController,
  updateClassController,
} from "./class.controller.js";
import validBodyRequest from "./../../common/middleware/validBody.middleware.js";
import classSchema from "./class.schema.js";

const classRoutes = Router();
classRoutes.get("/", getAllClassesController);

classRoutes.post("/", validBodyRequest(classSchema), createClassController);

classRoutes.get("/:id", getClassByIdController);
classRoutes.patch("/:id", validBodyRequest(classSchema), updateClassController);
classRoutes.delete("/:id", deleteClassController);

export default classRoutes;
