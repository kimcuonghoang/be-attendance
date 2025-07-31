import MESSAGES from "../../common/constants/messages.js";
import createError from "../../common/utils/error.js";
import Subject from "./subject.model.js";

export const getAllSubjectService = async () => {
  const subjects = await Subject.find();
  if (!subjects) {
    throw createError(404, MESSAGES.SUBJECTS.SUBJECT_NOT_FOUND);
  }
  return subjects;
};
export const getSubjectByIdService = async (id) => {
  const subject = await Subject.findById(id);
  if (!subject) {
    throw createError(404, MESSAGES.SUBJECTS.SUBJECT_NOT_FOUND);
  }
  return subject;
};

export const createSubjectService = async (dataCreate) => {
  const { name, code, description, englishName } = dataCreate;
  if (!name || !code) {
    throw createError(400, MESSAGES.SUBJECTS.CREATE_FAILED);
  }
  const existingSubject = await Subject.findOne({ code });
  if (existingSubject) {
    throw createError(400, MESSAGES.SUBJECTS.SUBJECT_ALREADY_EXISTS);
  }
  const newSubject = await Subject.create({
    name,
    code,
    description,
    englishName,
  });
  return newSubject;
};

export const updateSubjectService = async (id, dataUpdate) => {
  const { name, code, description, englishName } = dataUpdate;
  if (!name || !code) {
    throw createError(400, MESSAGES.SUBJECTS.UPDATE_FAILED);
  }
  const existingSubject = await Subject.findById(id);
  if (!existingSubject) {
    throw createError(404, MESSAGES.SUBJECTS.SUBJECT_NOT_FOUND);
  }
  existingSubject.name = name;
  existingSubject.code = code;
  existingSubject.description = description;
  existingSubject.englishName = englishName;

  const updatedSubject = await existingSubject.save();
  return updatedSubject;
};
export const deleteSubjectService = async (id) => {
  const existingSubject = await Subject.findById(id);
  if (!existingSubject) {
    throw createError(404, MESSAGES.SUBJECTS.SUBJECT_NOT_FOUND);
  }
  const deletedSubject = await Subject.findOneAndDelete({ _id: id });
  return deletedSubject;
};
export const softDeleteSubjectService = async (id) => {
  const existingSubject = await Subject.findById(id);
  if (!existingSubject) {
    throw createError(404, MESSAGES.SUBJECTS.SUBJECT_NOT_FOUND);
  }
  existingSubject.deletedAt = new Date();
  const updatedSubject = await existingSubject.save();
  return updatedSubject;
};
export const restoreSubjectService = async (id) => {
  const existingSubject = await Subject.findById(id);
  if (!existingSubject) {
    throw createError(404, MESSAGES.SUBJECTS.SUBJECT_NOT_FOUND);
  }
  existingSubject.deletedAt = null;

  const restoredSubject = await existingSubject.save();
  return restoredSubject;
};
