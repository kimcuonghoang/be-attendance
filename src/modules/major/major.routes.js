import express from "express";
import {
  createMajorController,
  deleteMajorController,
  getAllMajorsController,
  getMajorByIdController,
  restoreMajorController,
  softDeleteMajorController,
  updateMajorController,
} from "./major.controller.js";
import {
  restrictTo,
  verifyUser,
} from "./../../common/middleware/auth.middleware.js";
import { RoleEnum } from "../../common/constants/enums.js";
import { createMajorSchema, updateMajorSchema } from "./major.schema.js";
import validBodyRequest from "../../common/middleware/validBody.middleware.js";
const majorRoutes = express.Router();

// Public
majorRoutes.get("/", getAllMajorsController);
majorRoutes.get("/:id", getMajorByIdController);

// Private
majorRoutes.use(verifyUser);
majorRoutes.use(restrictTo(RoleEnum.SUPER_ADMIN));
majorRoutes.post(
  "/",
  validBodyRequest(createMajorSchema),
  createMajorController
);
majorRoutes.patch(
  "/:id",
  validBodyRequest(updateMajorSchema),
  updateMajorController
);
majorRoutes.patch("/soft-delete/:id", softDeleteMajorController);
majorRoutes.patch("/restore/:id", restoreMajorController);
majorRoutes.delete("/:id", deleteMajorController);

export default majorRoutes;
