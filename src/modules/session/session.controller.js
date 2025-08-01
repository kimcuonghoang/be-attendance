import MESSAGES from "../../common/constants/messages.js";
import createResponse from "./../../common/utils/response.js";
import handleAsync from "../../common/utils/handleAsync.js";
import {
  createSessionService,
  deleteSessionService,
  getAllSessionsService,
  getSessionByIdService,
  updateSessionService,
} from "./session.service.js";

export const getAllSessionController = handleAsync(async (req, res) => {
  const sessions = await getAllSessionsService();
  res.json(
    createResponse(
      true,
      200,
      MESSAGES.SESSIONS.GET_ALL_SUCCESS,
      sessions
    )
  );
});
export const getSessionByIdController = handleAsync(async (req, res) => {
  const { id } = req.params;
  const session = await getSessionByIdService(id);
  res.json(
    createResponse(
      true,
      200,
      MESSAGES.SESSIONS.GET_BY_ID_SUCCESS,
      session
    )
  );
});
export const createSessionController = handleAsync(async (req, res) => {
  const dataCreate = req.body;
  const newSession = await createSessionService(dataCreate);
  res
    .status(201)
    .json(
      createResponse(
        true,
        201,
        MESSAGES.SESSIONS.SESSION_CREATED_SUCCESSFULLY,
        newSession
      )
    );
});
export const updateSessionController = handleAsync(async (req, res) => {
  const { id } = req.params;
  const dataUpdate = req.body;
  const updatedSession = await updateSessionService(id, dataUpdate);
  res.json(
    createResponse(
      true,
      200,
      MESSAGES.SESSIONS.SESSION_UPDATED_SUCCESSFULLY,
      updatedSession
    )
  );
});
export const deleteSessionController = handleAsync(async (req, res) => {
  const { id } = req.params;
  const deletedSession = await deleteSessionService(id);
  res.json(
    createResponse(
      true,
      200,
      MESSAGES.SESSIONS.SESSION_DELETED_SUCCESSFULLY,
      deletedSession
    )
  );
});
