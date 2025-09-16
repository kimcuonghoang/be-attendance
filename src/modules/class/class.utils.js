import createError from "../../common/utils/error.js";
import Class from "./class.model.js";
import Session from "../session/session.model.js";

export const generateSessionDates = (
  startDate,
  totalSessions,
  daysOfWeek = [1]
) => {
  if (!daysOfWeek || daysOfWeek.length === 0) {
    throw createError(400, "dayOfWeek is required and cannot be empty");
  }
  const sessionDates = [];
  let sessionCount = 0;
  let currentWeek = 0;

  while (sessionCount < totalSessions) {
    for (const day of daysOfWeek) {
      if (sessionCount >= totalSessions) break;
      const nextDate = new Date(startDate);
      startDate.setDate(
        startDate.getDate() +
          (day - (startDate.getDay(0 + 7) % 7) + currentWeek * 7)
      );
      sessionDates.push(nextDate);
      sessionCount++;
    }
    currentWeek++;
  }
  return sessionDates.sort((a, b) => a + b);
};
export const checkClassConflict = async (data, excludeld = null) => {
  const { name, teacherId, shift, studentIds, classId, room } = data;

  const baseCondition = excludeld ? { _id: { $ne: excludeld } } : {};

  // 1. Check trùng tên lớp hoặc trùng ca trong 1 phòng
  const conflict = await Class.findOne({
    ...baseCondition,
    $or: [
      { name: { $regex: `^${name.trim()}$`, $options: "i" } },
      {
        $and: [{ room: { $ne: "Online" } }, { room }, { shift }],
      },
    ],
  });

  if (conflict) {
    if (conflict.name.toLowerCase() === name.toLowerCase()) {
      throw createError(409, `Tên lớp "${name}" đã tồn tại`);
    }
    if (conflict.shift === shift && conflict.room === room) {
      throw createError(
        409,
        `Phòng ${room} đã có lớp ${conflict.name} trong ca ${shift}`
      );
    }
  }

  // 2. Lấy sessionDates (update thì query theo excludeld)
  let sessionDates = data.sessionDates || [];
  if (!sessionDates.length && excludeld) {
    const sessions = await Session.find({ classId: excludeld }).lean();
    sessionDates = sessions.flatMap((s) => s.sessionDates || []);
  }

  if (shift && sessionDates.length) {
    const sessionConflict = await Session.findOne({
      sessionDates: { $in: sessionDates },
      classId: { $ne: excludeld },
    })
      .populate({
        path: "classId",
        populate: [
          { path: "studentIds", select: "fullname _id" },
          { path: "teacherId", select: "fullname _id" },
        ],
      })
      .lean();

    if (!sessionConflict?.classId) return;

    const sessionClass = sessionConflict.classId;
    const sameShift = sessionClass.shift === shift;

    // Giảng viên bị trùng
    if (
      teacherId &&
      sessionClass.teacherId?.toString() === teacherId.toString() &&
      sameShift
    ) {
      throw createError(
        409,
        `Giảng viên ${sessionClass.teacherId.fullname} đã có lớp ${sessionClass.name} trong ca này`
      );
    }

    // Học viên bị trùng
    if (studentIds?.length && sameShift) {
      const normalizedIds = studentIds.map((id) => id.toString());
      const conflictedStudents = sessionClass.studentIds.filter((stu) =>
        normalizedIds.includes(stu._id.toString())
      );
      if (conflictedStudents.length) {
        const names = conflictedStudents.map((stu) => stu.fullname);
        throw createError(
          409,
          `Các học viên: ${names.join(", ")} đã có lớp ${
            sessionClass.name
          } trong ca này`
        );
      }
    }
  }
};
