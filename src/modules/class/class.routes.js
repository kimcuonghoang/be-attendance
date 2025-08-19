import { Router } from "express";
import {
  createClassController,
  deleteClassController,
  getAllClassesController,
  getClassByIdController,
  restoreClassController,
  softDeleteClassController,
  updateClassController,
} from "./class.controller.js";
import validBodyRequest from "./../../common/middleware/validBody.middleware.js";
import classSchema from "./class.schema.js";
import {
  restrictTo,
  verifyUser,
} from "../../common/middleware/auth.middleware.js";
import { RoleEnum } from "../../common/constants/enums.js";

const classRoutes = Router();

// Public routes (accessible to all authenticated users)
classRoutes.get("/", getAllClassesController);
classRoutes.get("/:id", getClassByIdController);

// admin routes (restricted to admin role)
classRoutes.use(verifyUser);
classRoutes.use(restrictTo(RoleEnum.SUPER_ADMIN));

classRoutes.post("/", validBodyRequest(classSchema), createClassController);
classRoutes.patch("/:id", validBodyRequest(classSchema), updateClassController);

classRoutes.patch("/soft-delete/:id", softDeleteClassController);
classRoutes.patch("/restore/:id", restoreClassController);
classRoutes.delete("/:id", deleteClassController);

export default classRoutes;
