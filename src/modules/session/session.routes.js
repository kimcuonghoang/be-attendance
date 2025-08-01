import { Router } from "express";
import {
  createSessionController,
  deleteSessionController,
  getAllSessionController,
  getSessionByIdController,
  updateSessionController,
} from "./session.controller.js";

const sessionRoutes = Router();
sessionRoutes.get("/", getAllSessionController);
sessionRoutes.post("/", createSessionController);

sessionRoutes.get("/:id", getSessionByIdController);
sessionRoutes.patch("/:id", updateSessionController);
sessionRoutes.delete("/:id", deleteSessionController);
export default sessionRoutes;
