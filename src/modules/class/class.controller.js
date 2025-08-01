import createResponse from "./../../common/utils/response.js";
import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/constants/messages.js";
import {
  createClassService,
  deleteClassService,
  getAllClassesService,
  getClassByIdService,
  updateClassService,
} from "./class.service.js";

export const getAllClassesController = handleAsync(async (req, res) => {
  const classes = await getAllClassesService();
  res.json(
    createResponse(true, 200, MESSAGES.CLASSES.GET_ALL_SUCCESS, classes)
  );
});
export const getClassByIdController = handleAsync(async (req, res) => {
  const { id } = req.params;
  const classData = await getClassByIdService(id);
  res.json(
    createResponse(true, 200, MESSAGES.CLASSES.GET_BY_ID_SUCCESS, classData)
  );
});

export const createClassController = handleAsync(async (req, res, next) => {
  const dataCreate = req.body;
  const newClass = await createClassService(dataCreate);
  res.json(
    createResponse(
      true,
      201,
      MESSAGES.CLASSES.CLASS_CREATED_SUCCESSFULLY,
      newClass
    )
  );
});

export const updateClassController = handleAsync(async (req, res) => {
  const { id } = req.params;
  const dataUpdate = req.body;
  const updatedClass = await updateClassService(id, dataUpdate);
  res.json(
    createResponse(
      true,
      200,
      MESSAGES.CLASSES.CLASS_UPDATED_SUCCESSFULLY,
      updatedClass
    )
  );
});
export const deleteClassController = handleAsync(async (req, res) => {
  const { id } = req.params;
  const deletedClass = await deleteClassService(id);
  res.json(
    createResponse(
      true,
      200,
      MESSAGES.CLASSES.CLASS_DELETED_SUCCESSFULLY,
      deletedClass
    )
  );
});
