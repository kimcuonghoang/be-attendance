import mongoose from "mongoose";
import MESSAGES from "../../common/constants/messages.js";
import createError from "../../common/utils/error.js";
import Class from "./class.model.js";
import { checkClassConflict, generateSessionDates } from "./class.utils.js";
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
      throw createError(400, "Thiếu totalSessions, startDate hoặc daysOfWeek");
    }

    // Chuẩn hoá daysOfWeek
    let datesOfWeek = [];
    if (typeof daysOfWeek === "string") {
      datesOfWeek = daysOfWeek.split("-").map(Number);
    } else if (Array.isArray(daysOfWeek)) {
      datesOfWeek = daysOfWeek.map(Number);
    } else {
      throw createError(400, "daysOfWeek phải là array hoặc string");
    }

    // Validate day (ví dụ chỉ cho 0-6 hoặc 2-7 tuỳ định nghĩa)
    if (datesOfWeek.some((d) => isNaN(d) || d < 0 || d > 7)) {
      throw createError(400, "daysOfWeek không hợp lệ");
    }

    // Generate danh sách ngày học
    const sessionDates = generateSessionDates(
      new Date(startDate),
      totalSessions,
      datesOfWeek
    ).map((d) => {
      d.setHours(0, 0, 0, 0); // normalize date
      return d;
    });

    // Check conflict TRƯỚC KHI insert Class
    await checkClassConflict({ ...dataCreate, sessionDates });

    // Insert Class
    const classInstance = await Class.create([dataCreate], { session });
    const createdClass = classInstance[0];

    // Insert Sessions
    const sessions = sessionDates.map((sessionDate) => ({
      classId: createdClass._id,
      sessionDates: sessionDate,
      note: "",
    }));
    await Session.insertMany(sessions, { session });

    await session.commitTransaction();
    session.endSession();
    return createdClass;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw createError(
      error.status || 500,
      error.message || "Failed to create class"
    );
  }
};

export const updateClassService = async (id, dataUpdate) => {
  return await Class.findOneAndUpdate(
    { _id: id, deletedAt: null }, // điều kiện
    dataUpdate, // dữ liệu cần update
    { new: true } // trả về document mới
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

export const getStudentsByClassIdService = async (params) => {
  const { id } = params;
  const clazz = await Class.findById(id).populate(
    "studentIds",
    "fullname studentId email"
  );
  if (!clazz) return createError(404, "Class not found");
  return clazz.studentIds;
};
