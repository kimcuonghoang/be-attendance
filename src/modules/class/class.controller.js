import createResponse from "./../../common/utils/response.js";
import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/constants/messages.js";
import { createClassService } from "./class.service.js";

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
