import MESSAGES from "../../common/constants/messages.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import { getListTeacherService } from "./user.service.js";

export const getListTeacherController = handleAsync(async (req, res, next) => {
  const { role } = req.query;
  const dataTeacher = await getListTeacherService(role);
  return createResponse(
    res,
    200,
    MESSAGES.USERS.GET_TEACHER_SUCCESS,
    dataTeacher
  );
});
