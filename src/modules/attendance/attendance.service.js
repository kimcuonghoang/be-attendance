import MESSAGES from "../../common/constants/messages.js";
import createError from "../../common/utils/error.js";
import Session from "../session/session.model.js";
import Class from "../class/class.model.js";
import Attendance from "./attendance.model.js";
import User from "../user/user.model.js";
import { RoleEnum, StatusEnum } from "../../common/constants/enums.js";
import mongoose from "mongoose";
import { queryBuilder } from "../../common/utils/queryBuilder.js";

export const checkAttendanceStatus = async (sessionId, user) => {
  const sessionExists = await Session.findById(sessionId);
  !sessionExists && createError(404, MESSAGES.SESSIONS.SESSION_NOT_FOUND);
  const classInstance = await Class.findById(sessionId.classId);
  !classInstance && createError(404, MESSAGES.CLASSES.CLASS_NOT_FOUND);

  const checkTeacher =
    user.role === RoleEnum.TEACHER &&
    classInstance.teacherId.toString() === user._id.toString();
  !checkTeacher &&
    user.role !== RoleEnum.SUPER_ADMIN &&
    createError(
      403,
      `Bạn không phải giảng viên lớp này, bạn cũng không phải ${RoleEnum.SUPER_ADMIN}`
    );

  const existingAttendances = await Attendance.find({
    sessionId,
    deletedAt: null,
  });

  return {
    hasAttendance: existingAttendances.length > 0,
    sessionId,
    classId: sessionExists.classId,
  };
};

export const createAttendance = async (data, user) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { sessionId, attendances } = data;

    const sessionExists = await Session.findById(sessionId).session(session);
    !sessionExists && createError(404, MESSAGES.SESSIONS.SESSION_NOT_FOUND);

    const classInstance = await Class.findById(sessionExists.classId).session(
      session
    );
    !classInstance && createError(404, MESSAGES.CLASSES.CLASS_NOT_FOUND);

    const checkTeacher =
      user.role === RoleEnum.TEACHER &&
      classInstance.teacherId.toString() === user._id.toString();

    !checkTeacher &&
      user.role !== RoleEnum.SUPER_ADMIN &&
      createError(
        403,
        `Bạn không phải giảng viên lớp này, bạn cũng không phải ${RoleEnum.SUPER_ADMIN}`
      );
    const studentIds = attendances.map((att) => att.studentId);
    const validStudents = await User.find({
      _id: { $in: studentIds },
      role: "student",
    }).session(session);
    validStudents.length !== studentIds.length &&
      createError(
        400,
        "Một hoặc nhiều ID sinh viên không hợp lệ hoặc không phải là sinh viên"
      );

    const classStudentIds = classInstance.studentIds.map((id) => id.toString());
    !studentIds.every((id) => classStudentIds.includes(id)) &&
      createError(400, "Một hoặc nhiều sinh viên không thuộc lớp này");

    const existingAttendances = await Attendance.find({
      sessionId,
      studentId: { $in: classStudentIds },
      deletedAt: null,
    }).session(session);
    existingAttendances.length > 0 &&
      createError(400, "Điểm danh đã tồn tại cho buổi học này");
    const attendanceMap = new Map(
      attendances.map((att) => [att.studentId, att])
    );
    const attendanceDocs = classInstance.studentIds.map((studentId) => {
      const att = attendanceMap.get(studentId.toString()) || {
        studentId: studentId.toString(),
        status: StatusEnum.ABSENT,
        note: "",
      };
      return {
        sessionId,
        studentId: att.studentId,
        status: att.status,
        note: att.note || "",
      };
    });

    const createAttendances = await Attendance.insertMany(attendanceDocs, {
      session,
    });
    await session.commitTransaction();
    session.endSession();
    return createAttendances;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    throw createError(
      error.status || 500,
      error.message || "Failed to create attendance"
    );
  }
};

export const updateAttendanceService = async (sessionId, data, user) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { attendances } = data;

    const sessionExists = await Session.findById(sessionId).session(session);
    !sessionExists && createError(404, MESSAGES.SESSIONS.SESSION_NOT_FOUND);
    const classInstance = await Class.findById(sessionExists.classId).session(
      session
    );
    !classInstance && createError(404, MESSAGES.CLASSES.CLASS_NOT_FOUND);

    const checkTeacher =
      user.role === RoleEnum.TEACHER &&
      classInstance.teacherId.toString() === user._id.toString();

    !checkTeacher &&
      user.role !== RoleEnum.SUPER_ADMIN &&
      createError(
        403,
        `Bạn không phải giảng viên lớp này, bạn cũng không phải ${RoleEnum.SUPER_ADMIN}`
      );
    const studentIds = attendances.map((att) => att.studentId);
    const validStudents = await User.find({
      _id: { $in: studentIds },
      role: "student",
    }).session(session);
    validStudents.length !== studentIds.length &&
      createError(
        400,
        "Một hoặc nhiều ID sinh viên không hợp lệ hoặc không phải là sinh viên"
      );

    const classStudentIds = classInstance.studentIds.map((id) => id.toString());
    !studentIds.every((id) => classStudentIds.includes(id)) &&
      createError(400, "Một hoặc nhiều sinh viên không thuộc lớp này");

    const attendanceMap = new Map(
      attendances.map((att) => [att.studentId, att])
    );
    const updatePromies = classInstance.studentIds.map(async (studentId) => {
      const att = attendanceMap.get(studentId.toString());
      if (att) {
        const existingAttendance = await Attendance.findOne({
          sessionId,
          studentId,
          deletedAt: null,
        }).session(session);

        !existingAttendance &&
          createError(
            404,
            `Điểm danh không tồn tại cho sinh viên ${studentId}`
          );
        return Attendance.findByIdAndUpdate(
          { sessionId, studentId, deletedAt: null },
          { status: att.status, note: att.note || "" },
          { new: true, session }
        );
      }
      return null;
    });
    const updateAttendances = (await Promise.all(updatePromies)).filter(
      (att) => att !== null
    );
    await session.commitTransaction();
    session.endSession();
    return updateAttendances;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw createError(500, "Failed to update attendance");
  }
};

export const getAttendances = async (query, user) => {
  const { sessionId, studentId, ...queryParams } = query;
  const conditions = { deletedAt: null };

  user.role === RoleEnum.STUDENT && (conditions.studentId = user._id);

  if (user.role === RoleEnum.TEACHER) {
    const classes = await Class.find({ teacherId: user._id, deletedAt: null });
    const classIds = classes.map((c) => c._id);
    const sessions = await Session.find({
      classId: { $in: classIds },
      deletedAt: null,
    });
    conditions.sessionId = { $in: sessions.map((s) => s._id) };
  }
  sessionId && (conditions.sessionId = sessionId);
  studentId && (conditions.studentId = studentId);

  const data = await queryBuilder(
    Attendance,
    { ...queryParams, ...conditions },
    {
      populate: [
        { path: "sessionId", select: "sessionDate classId" },
        { path: "studentId", select: "name subjectId teacherId" },
        { path: "sessionId.classId.subjectId", select: "name code" },
        { path: "sessionId.classId.teacherId", select: "fullname" },
      ],
    }
  );
  return data;
};

export const deleteAttendance = async (id, user) => {
  user.role !== RoleEnum.SUPER_ADMIN &&
    createError(403, `Chỉ ${RoleEnum.SUPER_ADMIN} mới có thể xóa điểm danh`);
  const attendance = await Attendance.findByIdAndUpdate(
    { _id: id, deletedAt: null },
    { deletedAt: new Date() },
    { new: true }
  );
  !attendance && createError(404, "Điểm danh không tồn tại");

  return attendance;
};
