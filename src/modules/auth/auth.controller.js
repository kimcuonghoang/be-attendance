import MESSAGES from "../../common/constants/messages.js";
import handleAsync from "./../../common/utils/handleAsync.js";
import createResponse from "./../../common/utils/response.js";
import { loginService, registerService } from "./auth.services.js";

export const authRegister = handleAsync(async (req, res, next) => {
  const newUser = await registerService(req.body);
  return res.json(
    createResponse(true, 201, MESSAGES.AUTH.REGISTER_SUCCESS, newUser)
  );
});

export const authLogin = handleAsync(async (req, res, next) => {
  const dataLogin = await loginService(req.body);
  return res.json(
    createResponse(true, 200, MESSAGES.AUTH.LOGIN_SUCCESS, dataLogin)
  );
});
