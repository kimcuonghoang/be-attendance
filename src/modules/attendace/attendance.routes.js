import { Router } from "express";
import {
  restrictTo,
  verifyUser,
} from "../../common/middleware/auth.middleware.js";

import {
  checkAttendanceStatusController,
  createAttendanceController,
  deleteAttendanceController,
  getAttendancesController,
  updateAttendanceController,
} from "./attendance.controller.js";
import {
  createAttendanceSchema,
  updateAttendanceSchema,
} from "./attendance.schema.js";
import validBodyRequest from "../../common/middleware/validBody.middleware.js";
import { RoleEnum } from "../../common/constants/enums.js";

const attendanceRoutes = Router();

attendanceRoutes.use(verifyUser);
attendanceRoutes.get(
  "/",
  restrictTo([RoleEnum.SUPER_ADMIN, RoleEnum.TEACHER, RoleEnum.STUDENT]),
  getAttendancesController
);

attendanceRoutes.post(
  "/",
  restrictTo([RoleEnum.SUPER_ADMIN, RoleEnum.TEACHER]),
  validBodyRequest(createAttendanceSchema),
  createAttendanceController
);

attendanceRoutes.patch(
  "/:sessionId",
  restrictTo([RoleEnum.SUPER_ADMIN, RoleEnum.TEACHER]),
  validBodyRequest(updateAttendanceSchema),
  updateAttendanceController
);

attendanceRoutes.delete(
  "/:id",
  restrictTo([RoleEnum.SUPER_ADMIN, RoleEnum.TEACHER]),
  deleteAttendanceController
);

// * Nếu hasAttendance là false, hiển thị nút "Điểm danh" (gọi POST /attendances).
// * Nếu hasAttendance là true, hiển thị nút "Cập nhật" (gọi PUT /attendances/:sessionId).
attendanceRoutes.get(
  "/status/:sessionId",
  restrictTo([RoleEnum.SUPER_ADMIN, RoleEnum.TEACHER]),
  checkAttendanceStatusController
);

export default attendanceRoutes;
