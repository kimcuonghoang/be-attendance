import express from "express";
import { RoleEnum } from "./../../common/constants/enums.js";
import {
  restrictTo,
  verifyUser,
} from "./../../common/middleware/auth.middleware.js";
import { createSessionSchema, updateSessionSchema } from "./session.schema.js";
import {
  createSessionForClassController,
  deleteSessionByIdController,
  getAllSessionsByClassIdController,
  getSessionByIdController,
  updateSessionByIdController,
} from "./session.controller.js";
import validBodyRequest from "../../common/middleware/validBody.middleware.js";
const sessionRoutes = express.Router();

// Public
sessionRoutes.get("/classId/:classId", getAllSessionsByClassIdController);
sessionRoutes.get("/:id", getSessionByIdController);

// private
sessionRoutes.use(verifyUser);
sessionRoutes.use(restrictTo(RoleEnum.SUPER_ADMIN));
sessionRoutes.post(
  "/",
  validBodyRequest(createSessionSchema),
  createSessionForClassController
);
sessionRoutes.patch(
  "/:id",
  validBodyRequest(updateSessionSchema),
  updateSessionByIdController
);
sessionRoutes.delete("/:id", deleteSessionByIdController);

export default sessionRoutes;
