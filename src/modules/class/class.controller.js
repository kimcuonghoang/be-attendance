import createResponse from "./../../common/utils/response.js";
import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/constants/messages.js";

import createError from "../../common/utils/error.js";
import {
  createClassService,
  deleteClassService,
  getAllClassesService,
  getClassByIdService,
  getStudentsByClassIdService,
  restoreClassService,
  softDeleteClassService,
  updateClassService,
} from "./class.service.js";

export const getAllClassesController = handleAsync(async (req, res) => {
  const classes = await getAllClassesService(req.query);
  createResponse(
    res,

    200,
    MESSAGES.CLASSES.GET_ALL_SUCCESS,
    classes.data,
    classes.meta
  );
});
export const getClassByIdController = handleAsync(async (req, res) => {
  const classInstance = await getClassByIdService(req.params.id);
  if (!classInstance) {
    throw createError(404, MESSAGES.CLASSES.CLASS_NOT_FOUND);
  }
  createResponse(res, 200, MESSAGES.CLASSES.GET_BY_ID_SUCCESS, classInstance);
});

export const createClassController = handleAsync(async (req, res, next) => {
  const newClass = await createClassService(req.body);
  createResponse(
    res,
    201,
    MESSAGES.CLASSES.CLASS_CREATED_SUCCESSFULLY,
    newClass
  );
});

export const updateClassController = handleAsync(async (req, res) => {
  const classInstance = await updateClassService(req.params.id, req.body);
  if (!classInstance) {
    throw createError(404, MESSAGES.CLASSES.CLASS_NOT_FOUND);
  }

  createResponse(
    res,

    200,
    MESSAGES.CLASSES.CLASS_UPDATED_SUCCESSFULLY,
    classInstance
  );
});

export const softDeleteClassController = handleAsync(async (req, res) => {
  const classInstance = await softDeleteClassService(req.params.id);
  if (!classInstance) {
    throw createError(404, MESSAGES.CLASSES.CLASS_NOT_FOUND);
  }
  return createResponse(
    res,
    200,
    MESSAGES.CLASSES.CLASS_UPDATED_SUCCESSFULLY,
    classInstance
  );
});

export const restoreClassController = handleAsync(async (req, res) => {
  const classInstance = await restoreClassService(req.params.id);
  if (!classInstance) {
    throw createError(404, MESSAGES.CLASSES.CLASS_NOT_FOUND);
  }
  return createResponse(
    res,

    200,
    MESSAGES.CLASSES.CLASS_UPDATED_SUCCESSFULLY,
    classInstance
  );
});
export const deleteClassController = handleAsync(async (req, res) => {
  const classInstance = await deleteClassService(req.params.id);
  if (!classInstance) {
    throw createError(404, MESSAGES.CLASSES.CLASS_NOT_FOUND);
  }
  return createResponse(
    res,

    200,
    MESSAGES.CLASSES.CLASS_DELETED_SUCCESSFULLY,
    classInstance
  );
});

export const getStudentsByClassIdController = handleAsync(async (req, res) => {
  const dataStudents = await getStudentsByClassIdService(req.params);
  return createResponse(res, 200, "Success", dataStudents);
});
