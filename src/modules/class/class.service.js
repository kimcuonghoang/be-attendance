import mongoose from "mongoose";
import MESSAGES from "../../common/constants/messages.js";
import createError from "../../common/utils/error.js";
import Class from "./class.model.js";
import { generateSessionDates } from "./class.utils.js";
import Session from "../session/session.model.js";
import { queryBuilder } from "../../common/utils/queryBuilder.js";

export const getAllClassesService = async (query) => {
  const { includeDeleted = false, ...queryParams } = query;
  const data = await queryBuilder(
    Class,
    {
      ...queryParams,
      searchFields: ["name", "teacherId", "subjectId", "majorId"],
    },
    {
      populate: [
        { path: "teacherId", select: "fullname" },
        { path: "subjectId", select: "name" },
        { path: "majorId", select: "name" },
      ],
    }
  );
  return data;
};

export const getClassByIdService = async (id, data) => {
  return await Class.findOne({ _id: id, deletedAt: null }).populate([
    { path: "teacherId", select: "fullname" },
    { path: "subjectId", select: "name" },
    { path: "majorId", select: "name" },
  ]);
};

export const createClassService = async (dataCreate) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { totalSessions, startDate, daysOfWeek } = dataCreate;
    if (!totalSessions || !startDate || !daysOfWeek) {
      throw createError(400, "Thiếu totalSessions , startDate hoặc daysOfWeek");
    }
    const classInstance = await Class.create([dataCreate], { session });
    const createdClass = classInstance[0];
    const datesOfWeek = daysOfWeek.split(",").map(Number);

    const sessionDates = generateSessionDates(
      new Date(startDate),
      totalSessions,
      datesOfWeek
    );
    const sessions = sessionDates.map((sessionDates) => ({
      classId: createdClass._id,
      sessionDates,
      note: "",
    }));

    await Session.insertMany(sessions, { session });

    await session.commitTransaction();
    session.endSession();
    return classInstance[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw createError(
      error.status || 500,
      error.message || "Faild to create class"
    );
  }
};

export const updateClassService = async (id, dataUpdate) => {
  return await Class.findByIdAndUpdate(
    { _id: id, deletedAt: null },
    { new: true }
  );
};
export const softDeleteClassService = async (id) => {
  return await Class.findByIdAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: new Date() } },
    { new: true }
  );
};

export const restoreClassService = async (id) => {
  return await Class.findByIdAndUpdate(
    { _id: id, deletedAt: { $ne: null } },
    { $set: { deletedAt: null } },
    { new: true }
  ).populate("subjectId majorId teacherId studentIds");
};

export const deleteClassService = async (id) => {
  return await Class.findByIdAndDelete(
    { _id: id, deleteAt: null },
    { new: true }
  );
};
