import MESSAGES from "../../common/constants/messages.js";
import { verifyToken } from "../../common/utils/token.js";
import handleAsync from "./../../common/utils/handleAsync.js";
import createResponse from "./../../common/utils/response.js";
import {
  forgotPasswordService,
  loginService,
  refreshTokenService,
  registerService,
  resetPasswordService,
} from "./auth.services.js";
import createError from "../../common/utils/error.js";
export const authRegister = handleAsync(async (req, res, next) => {
  const newUser = await registerService(req.body);
  return createResponse(res, 201, MESSAGES.AUTH.REGISTER_SUCCESS, newUser);
});

export const authLogin = handleAsync(async (req, res, next) => {
  const dataLogin = await loginService(req.body);
  return createResponse(res, 200, MESSAGES.AUTH.LOGIN_SUCCESS, dataLogin);
});
export const authRefreshToken = handleAsync(async (req, res, next) => {
  const dataRefreshToken = await refreshTokenService(req);
  return createResponse(
    res,
    200,
    MESSAGES.AUTH.REFRESH_TOKEN_SUCCESS,
    dataRefreshToken
  );
});

export const authForgotPassword = handleAsync(async (req, res, next) => {
  const isSendEmail = await forgotPasswordService(req.body.email);
  if (!isSendEmail) {
    return next(createError(400, MESSAGES.AUTH.FORGOT_PASSWORD_FAILED));
  }
  return createResponse(res, 200, MESSAGES.AUTH.FORGOT_PASSWORD_SUCCESS);
});

export const authResetPassword = handleAsync(async (req, res, next) => {
  const isResetPassword = await resetPasswordService(
    req.body.resetToken,
    req.body.newPassword
  );
  if (!isResetPassword)
    return res
      .status(400)
      .json(createError(400, MESSAGES.AUTH.PASSWORD_CHANGE_FAILED));
  return createResponse(res, 200, MESSAGES.AUTH.RESET_PASSWORD_SUCCESS);
});
