import MESSAGES from "../../common/constants/messages.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import {
  createSubjectService,
  deleteSubjectService,
  getAllSubjectService,
  getSubjectByIdService,
  restoreSubjectService,
  softDeleteSubjectService,
  updateSubjectService,
} from "./subject.service.js";

export const createSubjectController = handleAsync(async (req, res) => {
  const subject = await createSubjectService(req.body);
  return createResponse(res, 201, MESSAGES.SUBJECTS.CREATE_SUCCESS, subject);
});

export const getAllSubjectsController = handleAsync(async (req, res) => {
  const subjects = await getAllSubjectService(req.query);
  if (!subjects) createError(400, MESSAGES.SUBJECTS.SUBJECT_NOT_FOUND);
  return createResponse(
    res,
    200,
    MESSAGES.SUBJECTS.GET_ALL_SUCCESS,
    subjects.data,
    subjects.meta
  );
});

export const getSubjectByIdController = handleAsync(async (req, res) => {
  const subject = await getSubjectByIdService(req.params.id);
  if (!subject) createError(404, MESSAGES.SUBJECTS.SUBJECT_NOT_FOUND);
  return createResponse(res, 200, MESSAGES.SUBJECTS.GET_BY_ID_SUCCESS, subject);
});

export const updateSubjectController = handleAsync(async (req, res) => {
  const subject = await updateSubjectService(req.params.id, req.body);
  if (!subject) createError(404, MESSAGES.SUBJECTS.SUBJECT_NOT_FOUND);
  return createResponse(
    res,
    200,
    MESSAGES.SUBJECTS.SUBJECT_UPDATED_SUCCESSFULLY,
    subject
  );
});

export const softDeleteSubjectController = handleAsync(async (req, res) => {
  const subject = await softDeleteSubjectService(req.params.id);
  if (!subject) createError(404, MESSAGES.SUBJECTS.SUBJECT_NOT_FOUND);
  return createResponse(
    res,
    200,
    MESSAGES.SUBJECTS.SUBJECT_SOFT_DELETED_SUCCESSFULLY
  );
});

export const restoreSubjectController = handleAsync(async (req, res) => {
  const subject = await restoreSubjectService(req.params.id);
  if (!subject) createError(404, MESSAGES.SUBJECTS.SUBJECT_NOT_FOUND);
  return createResponse(
    res,
    200,
    MESSAGES.SUBJECTS.SUBJECT_RESTORED_SUCCESSFULLY,
    subject
  );
});

export const deleteSubjectController = handleAsync(async (req, res) => {
  const subject = await deleteSubjectService(req.params.id);
  if (!subject) createError(404, MESSAGES.SUBJECTS.SUBJECT_NOT_FOUND);
  return createResponse(
    res,
    200,
    MESSAGES.SUBJECTS.SUBJECT_DELETED_SUCCESSFULLY
  );
});
