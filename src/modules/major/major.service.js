import { queryBuilder } from "../../common/utils/queryBuilder.js";
import Major from "./major.model.js";

export const createMajorService = async (data) => {
  const major = await Major.create(data);
  return major;
};

export const getAllMajorsService = async (query) => {
  const { includeDeleted = false, ...queryParams } = query;
  const data = await queryBuilder(Major, {
    ...queryParams,
    searchFields: ["name", "code", "description"],
  });
  return data;
};

export const getMajorByIdService = async (id) => {
  return await Major.findOne({ _id: id, deletedAt: null });
};

export const updateMajorService = async (id, data) => {
  return await Major.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: data },
    { new: true, runValidators: true }
  );
};

export const softDeleteMajorService = async (id) => {
  return await Major.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: new Date() } },
    { new: true }
  );
};

export const restoreMajorService = async (id) => {
  return await Major.findOneAndUpdate(
    { _id: id, deletedAt: { $ne: null } },
    { $set: { deletedAt: null } },
    { new: true }
  );
};

export const deleteMajorService = async (id) => {
  return await Major.findOneAndDelete({ _id: id, deletedAt: null });
};
