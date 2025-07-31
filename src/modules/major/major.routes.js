import { Router } from "express";
import {
  createMajorController,
  deleteMajorController,
  getAllMajorsController,
  restoreMajorController,
  softDeleteMajorController,
  updateMajorController,
  getMajorByIdController,
} from "./major.controller.js";
import validBodyRequest from "../../common/middleware/validBody.middleware.js";
import { majorSchema } from "./major.schema.js";

const majorRoutes = Router();

majorRoutes.get("/", getAllMajorsController);
majorRoutes.get("/:id", getMajorByIdController);
majorRoutes.post("/", validBodyRequest(majorSchema), createMajorController);
majorRoutes.patch("/:id", validBodyRequest(majorSchema), updateMajorController);
majorRoutes.delete("/:id", deleteMajorController);
majorRoutes.patch("/soft-delete/:id", softDeleteMajorController);
majorRoutes.patch("/restore/:id", restoreMajorController);
export default majorRoutes;
