import express from "express";
import {
  createSubjectController,
  deleteSubjectController,
  getAllSubjectController,
  getSubjectByIdController,
  restoreSubjectController,
  softDeleteSubjectController,
  updateSubjectController,
} from "./subject.controller.js";
import {
  restrictTo,
  verifyUser,
} from "../../common/middleware/auth.middleware.js";
import { RoleEnum } from "../../common/constants/enums.js";
import { createSubjectSchema, updateSubjectSchema } from "./subject.schema.js";
import validBodyRequest from "../../common/middleware/validBody.middleware.js";

const subjectRoutes = express.Router();

// Public routes (accessible to all authenticated users)
subjectRoutes.get("/", getAllSubjectController);
subjectRoutes.get("/:id", getSubjectByIdController);

// SuperAdmin routes (restricted to superAdmin role)
subjectRoutes.use(verifyUser);
subjectRoutes.use(restrictTo(RoleEnum.SUPER_ADMIN));
subjectRoutes.post(
  "/",
  validBodyRequest(createSubjectSchema),
  createSubjectController
);
subjectRoutes.patch(
  "/:id",
  validBodyRequest(updateSubjectSchema),
  updateSubjectController
);
subjectRoutes.patch("/soft-delete/:id", softDeleteSubjectController);
subjectRoutes.patch("/restore/:id", restoreSubjectController);
subjectRoutes.delete("/:id", deleteSubjectController);

export default subjectRoutes;
