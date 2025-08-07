import { Router } from "express";
import {
  blockUserController,
  createUserController,
  getAllUsersController,
  getUserByRoleController,
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
} from "./use.schema.js";

const userRoutes = Router();
userRoutes.get("/", getUserByRoleController);

userRoutes.use(verifyUser);
userRoutes.get("/profile/me", getProfileController);
userRoutes.patch(
  "/profile/update",
  validBodyRequest(updateProfileSchema),
  updateProfileController
);

// * Kiểm tra user phải có quyền superAdmin
userRoutes.use(restrictTo(["admin"]));
userRoutes.post("/", validBodyRequest(createUserSchema), createUserController);
userRoutes.get("/:userId", getUserController);
userRoutes.get("/", getAllUsersController);
userRoutes.patch(
  "/role/:userId",
  validBodyRequest(updateProfileSchema),
  updateRoleController
);
userRoutes.patch(
  "/block/:userId",
  validBodyRequest(blockUserSchema),
  blockUserController
);
export default userRoutes;
