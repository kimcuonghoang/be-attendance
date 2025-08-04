import MESSAGES from "../../common/constants/messages.js";
import createError from "../../common/utils/error.js";
import Class from "./class.model.js";

export const getAllClassesService = async () => {
  const classes = await Class.find()
    .populate("majorId")
    .populate("subjectId")
    .populate({ path: "teacherId", select: "_id fullname" });

  if (!classes) {
    throw createError(404, MESSAGES.CLASSES.CLASS_NOT_FOUND);
  }
  return classes;
};

export const getClassByIdService = async (id) => {
  const classData = await Class.findById(id)
    .populate("subjectId")
    .populate("teacherId")
    .populate("majorId");
  if (!classData) {
    throw createError(404, MESSAGES.CLASSES.CLASS_NOT_FOUND);
  }
  return classData;
};

export const createClassService = async (dataCreate) => {
  const { subjectId, majorId, name, teacherId } = dataCreate;

  if (!subjectId || !majorId || !name || !teacherId) {
    throw createError(400, MESSAGES.CLASSES.CREATE_FAILED);
  }

  const existingClass = await Class.findOne({
    subjectId,
    majorId,
    name,
    teacherId,
  });
  if (existingClass) {
    throw createError(400, MESSAGES.CLASSES.CLASS_ALREADY_EXISTS);
  }

  const newClass = await Class.create(dataCreate);
  return newClass;
};

export const updateClassService = async (id, dataUpdate) => {
  const { subjectId, majorId, name, teacherId } = dataUpdate;
  if (!subjectId || !majorId || !name || !teacherId) {
    throw createError(400, MESSAGES.CLASSES.UPDATE_FAILED);
  }

  const existingClass = await Class.findById(id);
  if (!existingClass) {
    throw createError(404, MESSAGES.CLASSES.CLASS_NOT_FOUND);
  }

  Object.assign(existingClass, dataUpdate);
  const updatedClass = await existingClass.save();
  return updatedClass;
};

export const deleteClassService = async (id) => {
  const deletedClass = await Class.findByIdAndDelete(id);
  if (!deletedClass) {
    throw createError(404, MESSAGES.CLASSES.CLASS_NOT_FOUND);
  }
  return deletedClass;
};
