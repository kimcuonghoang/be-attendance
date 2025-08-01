import MESSAGES from "../../common/constants/messages.js";
import createError from "../../common/utils/error.js";
import Session from "./session.model.js";

export const getAllSessionsService = async () => {
  const sessions = await Session.find().populate("classId");
  if (!sessions) {
    throw createError(404, MESSAGES.SESSIONS.SESSION_NOT_FOUND);
  }
  return sessions;
};

export const getSessionByIdService = async (id) => {
  const session = await Session.findById(id).populate("classId");
  if (!session) {
    throw createError(404, MESSAGES.SESSIONS.SESSION_NOT_FOUND);
  }
  return session;
};
export const createSessionService = async (dataCreate) => {
  const { classId, sessionDate, shift, room } = dataCreate;
  if (!classId || !sessionDate || !shift || !room) {
    throw createError(400, MESSAGES.SESSIONS.CREATE_FAILED);
  }
  const newSession = await Session.create({
    classId,
    sessionDate,
    shift,
    room,
  });
  return newSession;
};
export const updateSessionService = async (id, dataUpdate) => {
  const { classId, sessionDate, shift, room } = dataUpdate;
  if (!classId || !sessionDate || !shift || !room) {
    throw createError(400, MESSAGES.SESSIONS.UPDATE_FAILED);
  }
  const existingSession = await Session.findById(id);
  if (!existingSession) {
    throw createError(404, MESSAGES.SESSIONS.SESSION_NOT_FOUND);
  }
  existingSession.classId = classId;
  existingSession.sessionDate = sessionDate;
  existingSession.shift = shift;
  existingSession.room = room;

  const updatedSession = await existingSession.save();
  return updatedSession;
};
export const deleteSessionService = async (id) => {
  const existingSession = await Session.findById(id);
  if (!existingSession) {
    throw createError(404, MESSAGES.SESSIONS.SESSION_NOT_FOUND);
  }
  const deletedSession = await Session.findOneAndDelete({ _id: id });
  return deletedSession;
};
