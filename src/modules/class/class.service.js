import MESSAGES from "../../common/constants/messages.js";
import createError from "../../common/utils/error.js";
import Class from "./class.model.js";
export const createClassService = async (dataCreate) => {
  const { name, teacherId, shift, room, status } = dataCreate;
  if (!name || !teacherId || !shift || !room || !status) {
    throw createError(400, MESSAGES.CLASSES.CREATE_FAILED);
  }
  const existingClass = await Class.findOne({ name, teacherId });
  if (existingClass) {
    throw createError(400, MESSAGES.CLASSES.CLASS_ALREADY_EXISTS);
  }
  const newClass = await Class.create(dataCreate);
  console.log(newClass);
  return newClass;
};
