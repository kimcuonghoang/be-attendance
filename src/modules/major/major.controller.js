import MESSAGES from "../../common/constants/messages.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import {
  createMajorService,
  deleteMajorService,
  getAllMajorsService,
  getMajorByIdService,
  softDeleteMajorService,
  updateMajorService,
  restoreMajorService,
} from "./major.service.js";

export const getAllMajorsController = handleAsync(async (req, res, next) => {
  const majors = await getAllMajorsService();
  res.json(createResponse(true, 200, MESSAGES.MAJORS.GET_ALL_SUCCESS, majors));
});
export const getMajorByIdController = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const major = await getMajorByIdService(id);
  res.json(createResponse(true, 200, MESSAGES.MAJORS.GET_BY_ID_SUCCESS, major));
});
export const createMajorController = handleAsync(async (req, res, next) => {
  const dataMajor = req.body;
  const newMajor = await createMajorService(dataMajor);
  res.json(
    createResponse(
      true,
      201,
      MESSAGES.MAJORS.MAJOR_CREATED_SUCCESSFULLY,
      newMajor
    )
  );
});
export const updateMajorController = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const dataUpdate = req.body;
  const updatedMajor = await updateMajorService(id, dataUpdate);
  res.json(
    createResponse(
      true,
      200,
      MESSAGES.MAJORS.MAJOR_UPDATED_SUCCESSFULLY,
      updatedMajor
    )
  );
});
export const deleteMajorController = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const message = await deleteMajorService(id);
  console.log(message);
  res.json(
    createResponse(true, 200, MESSAGES.MAJORS.MAJOR_DELETED_SUCCESSFULLY)
  );
});
export const softDeleteMajorController = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const major = await softDeleteMajorService(id);
  res.json(
    createResponse(true, 200, MESSAGES.MAJORS.MAJOR_UPDATED_SUCCESSFULLY, major)
  );
});
export const restoreMajorController = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const major = await restoreMajorService(id);
  res.json(
    createResponse(true, 200, MESSAGES.MAJORS.MAJOR_UPDATED_SUCCESSFULLY, major)
  );
});
