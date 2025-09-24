import Session from "./session.model.js";
import createError from "./../../common/utils/error.js";
import MESSAGES from "./../../common/constants/messages.js";
import { queryBuilder } from "../../common/utils/queryBuilder.js";

export const createSessionService = async (data) => {
  const session = await Session.create(data);
  return session;
};

export const getAllSessionsByClassId = async (classId, query) => {
  const { queryParams } = query;
  const sessions = await queryBuilder(
    Session,
    {
      ...queryParams,
      classId,
    },
    {
      populate: [
        {
          path: "classId",
          select: "name teacherId subjectId room",
          populate: {
            path: "teacherId subjectId",
            select: "fullname name",
          },
        },
      ],
    }
  );

  if (!sessions) {
    throw createError(404, MESSAGES.SESSIONS.SESSION_NOT_FOUND);
  }
  return sessions;
};

export const getSessionById = async (id) => {
  const session = await Session.findById(id).populate("classId");
  return session;
};

export const updateSessionById = async (id, data) => {
  const session = await Session.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate({
    path: "classId",
    select: "name",
  });
  return session;
};

export const deleteSessionById = async (id) => {
  const session = await Session.findByIdAndDelete(id, { new: true });
  return session;
};
