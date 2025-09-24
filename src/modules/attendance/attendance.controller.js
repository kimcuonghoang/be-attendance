import MESSAGES from "../../common/constants/messages.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import {
  checkAttendanceStatus,
  createAttendance,
  deleteAttendance,
  getAttendances,
  updateAttendanceService,
} from "./attendance.service.js";
// * Lần đầu tiên giảng viên ấn vào nút điểm danh thì tạo thông tin điểm danh với cả lớp vắng!
export const createAttendanceController = handleAsync(async (req, res) => {
  const data = await createAttendance(req.body, req.user);
  return createResponse(
    res,
    201,
    MESSAGES.ATTENDANCES.ATTENDANCE_CREATED_SUCCESSFULLY,
    data
  );
});

// * Khi người giảng viên thay đổi trạng thái điểm danh và ghi chú cho học viên rồi ấn lưu, đây là update điểm danh
export const updateAttendanceController = handleAsync(async (req, res) => {
  const data = await updateAttendanceService(
    req.params.sessionId,
    req.body,
    req.user
  );
  return createResponse(
    res,
    200,
    MESSAGES.ATTENDANCES.ATTENDANCE_UPDATED_SUCCESSFULLY,
    data
  );
});

export const getAttendancesController = handleAsync(async (req, res) => {
  const data = await getAttendances(req.query, req.user);

  return createResponse(
    res,
    200,
    MESSAGES.ATTENDANCES.ATTENDANCE_GET_SUCCESS,
    data
  );
});

export const deleteAttendanceController = handleAsync(async (req, res) => {
  const data = await deleteAttendance(req.params.id, req.user);
  return createResponse(
    res,
    200,
    MESSAGES.ATTENDANCES.ATTENDANCE_DELETED_SUCCESSFULLY,
    data
  );
});

export const checkAttendanceStatusController = handleAsync(async (req, res) => {
  const data = await checkAttendanceStatus(req.params.sessionId, req.user);
  return createResponse(
    res,
    200,
    "Kiểm tra trạng thái điểm danh thành công",
    data
  );
});
