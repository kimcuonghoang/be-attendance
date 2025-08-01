import MESSAGES from "../../common/constants/messages.js";
import createError from "../../common/utils/error.js";
import Major from "./major.model.js";

// Lấy tất cả chuyên ngành
export const getAllMajorsService = async () => {
  const majors = await Major.find();
  return majors;
};
// Tạo mới chuyên ngành
export const createMajorService = async (dataMajor) => {
  const { name, description } = dataMajor;
  if (!name || !description) {
    throw createError(400, MESSAGES.MAJORS.CREATE_FAILED);
  }

  const existingMajor = await Major.findOne({ name });
  if (existingMajor) {
    throw createError(400, MESSAGES.MAJORS.MAJOR_ALREADY_EXISTS);
  }

  const newMajor = await Major.create(dataMajor);
  return newMajor;
};
// Cập nhật chuyên ngành
export const updateMajorService = async (id, dataUpdate) => {
  const { code, name, description } = dataUpdate;
  if (!name || !description || !code) {
    throw createError(400, MESSAGES.MAJORS.UPDATE_FAILED);
  }

  const existingMajor = await Major.findById(id);
  if (!existingMajor) {
    throw createError(404, MESSAGES.MAJORS.MAJOR_NOT_FOUND);
  }

  Object.assign(existingMajor, dataUpdate);
  const updatedMajor = await existingMajor.save();
  return updatedMajor;
};

// Xóa chuyên ngành
export const deleteMajorService = async (id) => {
  const existingMajor = await Major.findById(id);
  if (!existingMajor) {
    throw createError(404, MESSAGES.MAJORS.MAJOR_NOT_FOUND);
  }

  const deleteMajor = await Major.findOneAndDelete({ _id: id });
  return deleteMajor;
};

// Lấy chuyên ngành theo ID
export const getMajorByIdService = async (id) => {
  const existingMajor = await Major.findById(id);
  if (!existingMajor) {
    throw createError(404, MESSAGES.MAJORS.MAJOR_NOT_FOUND);
  }
  return existingMajor;
};
// Xóa mềm chuyên ngành
export const softDeleteMajorService = async (id) => {
  const existingMajor = await Major.findById(id);
  if (!existingMajor) {
    throw createError(404, MESSAGES.MAJORS.MAJOR_NOT_FOUND);
  }

  existingMajor.isDeleted = true;
  const softDeleteMajor = await existingMajor.save();
  return softDeleteMajor;
};

// Phục hồi chuyên ngành đã xóa mềm
export const restoreMajorService = async (id) => {
  const existingMajor = await Major.findById(id);
  if (!existingMajor) {
    throw createError(404, MESSAGES.MAJORS.MAJOR_NOT_FOUND);
  }
  existingMajor.isDeleted = false;
  const restoreMajor = await existingMajor.save();
  return restoreMajor;
};
