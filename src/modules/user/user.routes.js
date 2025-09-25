import { Router } from "express";
import {
  blockUserController,
  createUserController,
  getAllUsersController,
  getProfileController,
  getUserController,
  updateProfileController,
  updateRoleController,
} from "./user.controller.js";
import {
  restrictTo,
  verifyUser,
} from "../../common/middleware/auth.middleware.js";
import validBodyRequest from "../../common/middleware/validBody.middleware.js";
import {
  blockUserSchema,
  createUserSchema,
  updateProfileSchema,
  updateRoleSchema,
} from "./use.schema.js";

const userRoutes = Router();

userRoutes.use(verifyUser);
userRoutes.get("/profile/me", getProfileController);
userRoutes.patch(
  "/profile/update",
  validBodyRequest(updateProfileSchema),
  updateProfileController
);

// * Kiểm tra user phải có quyền admin
userRoutes.use(restrictTo(["admin"]));
userRoutes.post("/", validBodyRequest(createUserSchema), createUserController);
userRoutes.get("/:userId", getUserController);
userRoutes.get("/", getAllUsersController);
userRoutes.patch(
  "/role/:userId",
  validBodyRequest(updateRoleSchema),
  updateRoleController
);
userRoutes.patch(
  "/block/:userId",
  validBodyRequest(blockUserSchema),
  blockUserController
);
export default userRoutes;
