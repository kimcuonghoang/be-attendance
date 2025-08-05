import { queryBuilder } from "../../common/utils/queryBuilder.js";
import Subject from "./subject.model.js";
import { generateSubjectCode } from "./subject.utils.js";

// Create a new subject
export const createSubjectService = async (data) => {
  const subject = await Subject.create({
    ...data,
    code: await generateSubjectCode(data.englishName),
  });
  return subject;
};

// Get all subjects (with optional inclusion of soft-deleted records)
export const getAllSubjectService = async (query) => {
  const { includeDeleted = false, ...queryParams } = query;
  const data = await queryBuilder(Subject, {
    ...queryParams,
    includeDeleted: includeDeleted === "true",
    searchFields: ["name", "code", "englishName", "description"],
  });
  return data;
};

// Get a subject by ID
export const getSubjectByIdService = async (id) => {
  return await Subject.findOne({ _id: id, deletedAt: null });
};

// Update a subject
export const updateSubjectService = async (id, data) => {
  if (!data.englishName) {
    throw new Error("English name là bắt buộc");
  }
  return await Subject.findOneAndUpdate(
    { _id: id, deletedAt: null },
    {
      ...data,
      code: await generateSubjectCode(data.englishName),
    },
    {
      new: true,
    }
  );
};

// Soft delete a subject
export const softDeleteSubjectService = async (id) => {
  return await Subject.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: new Date() } },
    { new: true }
  );
};

// Restore a soft-deleted subject
export const restoreSubjectService = async (id) => {
  return await Subject.findOneAndUpdate(
    { _id: id, deletedAt: { $ne: null } },
    { $set: { deletedAt: null } },
    { new: true }
  );
};

// Delete a subject permanently (not soft delete)
export const deleteSubjectService = async (id) => {
  return await Subject.findOneAndDelete({ _id: id, deletedAt: null });
};
