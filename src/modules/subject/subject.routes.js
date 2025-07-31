import { Router } from "express";
import {
  createSubjectController,
  deleteSubjectController,
  getAllSubjectController,
  getSubjectByIdController,
  restoreSubjectController,
  softDeleteSubjectController,
  updateSubjectController,
} from "./subject.controller.js";
import validBodyRequest from "../../common/middleware/validBody.middleware.js";
import { subjectSchema } from "./subject.schema.js";

const subjectRoutes = Router();

subjectRoutes.get("/", getAllSubjectController);
subjectRoutes.get("/:id", getSubjectByIdController);
subjectRoutes.post(
  "/",
  validBodyRequest(subjectSchema),
  createSubjectController
);
subjectRoutes.patch(
  "/:id",
  validBodyRequest(subjectSchema),
  updateSubjectController
);
subjectRoutes.delete("/:id", deleteSubjectController);
subjectRoutes.patch("/soft-delete/:id", softDeleteSubjectController);
subjectRoutes.patch("/restore/:id", restoreSubjectController);
export default subjectRoutes;
