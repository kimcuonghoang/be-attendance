import handleAsync from "../../common/utils/handleAsync.js";
import {
  createMajorService,
  deleteMajorService,
  getAllMajorsService,
  getMajorByIdService,
  restoreMajorService,
  softDeleteMajorService,
  updateMajorService,
} from "./major.service.js";
import createResponse from "../../common/utils/response.js";
import createError from "../../common/utils/error.js";
import MESSAGES from "../../common/constants/messages.js";

export const createMajorController = handleAsync(async (req, res) => {
  const major = await createMajorService(req.body);
  if (!major) createError(400, MESSAGES.MAJORS.CREATE_FAILED);
  return createResponse(res, 201, MESSAGES.MAJORS.CREATE_SUCCESS, major);
});

export const getAllMajorsController = handleAsync(async (req, res) => {
  const majors = await getAllMajorsService(req.query);
  return createResponse(
    res,
    200,
    MESSAGES.MAJORS.GET_ALL_SUCCESS,
    majors.data,
    majors.meta
  );
});

export const getMajorByIdController = handleAsync(async (req, res) => {
  const major = await getMajorByIdService(req.params.id);
  if (!major) createError(404, MESSAGES.MAJORS.MAJOR_NOT_FOUND);

  return createResponse(res, 200, MESSAGES.MAJORS.GET_ALL_SUCCESS, major);
});

export const updateMajorController = handleAsync(async (req, res) => {
  const major = await updateMajorService(req.params.id, req.body);
  if (!major) createError(404, MESSAGES.MAJORS.MAJOR_NOT_FOUND);
  return createResponse(
    res,
    200,
    MESSAGES.MAJORS.MAJOR_UPDATED_SUCCESSFULLY,
    major
  );
});

export const softDeleteMajorController = handleAsync(async (req, res) => {
  const major = await softDeleteMajorService(req.params.id);
  if (!major) createError(404, MESSAGES.MAJORS.MAJOR_NOT_FOUND);
  return createResponse(
    res,
    200,
    MESSAGES.MAJORS.MAJOR_SOFT_DELETED_SUCCESSFULLY,
    major
  );
});

export const restoreMajorController = handleAsync(async (req, res) => {
  const major = await restoreMajorService(req.params.id);
  if (!major) createError(404, MESSAGES.MAJORS.MAJOR_NOT_FOUND);
  return createResponse(
    res,
    200,
    MESSAGES.MAJORS.MAJOR_RESTORED_SUCCESSFULLY,
    major
  );
});

export const deleteMajorController = handleAsync(async (req, res) => {
  const major = await deleteMajorService(req.params.id);
  if (!major) createError(404, MESSAGES.MAJORS.MAJOR_NOT_FOUND);
  return createResponse(
    res,
    200,
    MESSAGES.MAJORS.MAJOR_DELETED_SUCCESSFULLY,
    major
  );
});
