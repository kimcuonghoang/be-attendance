import MESSAGES from "../../common/constants/messages.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import {
  createSubjectService,
  deleteSubjectService,
  getAllSubjectService,
  softDeleteSubjectService,
  updateSubjectService,
} from "./subject.service.js";

export const getAllSubjectController = handleAsync(async (req, res, next) => {
  const subjects = await getAllSubjectService();
  res.json(
    createResponse(true, 200, MESSAGES.SUBJECTS.GET_ALL_SUCCESS, subjects)
  );
});
export const getSubjectByIdController = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const subject = await getSubjectByIdService(id);
  res.json(
    createResponse(true, 200, MESSAGES.SUBJECTS.GET_BY_ID_SUCCESS, subject)
  );
});
export const createSubjectController = handleAsync(async (req, res, next) => {
  const dataCreate = req.body;
  const newSubject = await createSubjectService(dataCreate);
  res.json(
    createResponse(
      true,
      201,
      MESSAGES.SUBJECTS.SUBJECT_CREATED_SUCCESSFULLY,
      newSubject
    )
  );
});
export const updateSubjectController = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const dataUpdate = req.body;
  const updatedSubject = await updateSubjectService(id, dataUpdate);
  res.json(
    createResponse(
      true,
      200,
      MESSAGES.SUBJECTS.SUBJECT_UPDATED_SUCCESSFULLY,
      updatedSubject
    )
  );
});
export const deleteSubjectController = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedSubject = await deleteSubjectService(id);
  res.json(
    createResponse(
      true,
      200,
      MESSAGES.SUBJECTS.SUBJECT_DELETED_SUCCESSFULLY,
      deletedSubject
    )
  );
});
export const softDeleteSubjectController = handleAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const message = await softDeleteSubjectService(id);
    res.json(
      createResponse(
        true,
        200,
        MESSAGES.SUBJECTS.SUBJECT_SOFT_DELETED_SUCCESSFULLY,
        message
      )
    );
  }
);
export const restoreSubjectController = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const subject = await restoreSubjectService(id);
  res.json(
    createResponse(
      true,
      200,
      MESSAGES.SUBJECTS.SUBJECT_RESTORED_SUCCESSFULLY,
      subject
    )
  );
});
