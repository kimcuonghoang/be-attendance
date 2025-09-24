import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/constants/messages.js";

import createError from "../../common/utils/error.js";
import {
  createSessionService,
  getAllSessionsByClassId,
  getSessionById,
  updateSessionById,
  deleteSessionById,
} from "./session.service.js";
import createResponse from "../../common/utils/response.js";
export const createSessionForClassController = handleAsync(async (req, res) => {
  const session = await createSessionService(req.body);
  if (!session) createError(400, MESSAGES.SESSIONS.SESSION_NOT_FOUND);
  return createResponse(
    res,
    201,
    MESSAGES.SESSIONS.SESSION_CREATED_SUCCESSFULLY,
    session
  );
});

export const getAllSessionsByClassIdController = handleAsync(
  async (req, res) => {
    const sessions = await getAllSessionsByClassId(
      req.params.classId,
      req.query
    );

    return createResponse(
      res,
      200,
      MESSAGES.SESSIONS.GET_ALL_SUCCESS,
      sessions
    );
  }
);

export const getSessionByIdController = handleAsync(async (req, res) => {
  const session = await getSessionById(req.params.id, req.query);

  if (!session) createError(400, MESSAGES.SESSIONS.SESSION_NOT_FOUND);
  return createResponse(res, 200, MESSAGES.SESSIONS.GET_BY_ID_SUCCESS, session);
});

export const updateSessionByIdController = handleAsync(async (req, res) => {
  const session = await updateSessionById(req.params.id, req.body);
  if (!session) createError(400, MESSAGES.SESSIONS.SESSION_NOT_FOUND);
  return createResponse(
    res,
    200,
    MESSAGES.SESSIONS.SESSION_UPDATED_SUCCESSFULLY,
    session
  );
});

export const deleteSessionByIdController = handleAsync(async (req, res) => {
  const session = await deleteSessionById(req.params.id);
  if (!session) createError(400, MESSAGES.SESSIONS.SESSION_NOT_FOUND);
  return createResponse(
    res,
    200,
    MESSAGES.SESSIONS.SESSION_DELETED_SUCCESSFULLY,
    session
  );
});
