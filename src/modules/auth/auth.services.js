import User from "../user/user.model.js";
import MESSAGES from "../../common/constants/messages.js";
import {
  comparePassword,
  hashPassword,
} from "../../common/utils/handlePassword.js";
import {
  generateStudentId,
  generateUsername,
} from "../../common/utils/codeGenerate.js";
import createError from "../../common/utils/error.js";
import { signToken, verifyToken } from "../../common/utils/token.js";
import { FRONTEND_URL } from "../../common/configs/environments.js";
import {
  generatePasswordResetSuccessEmail,
  generateResetPasswordEmail,
} from "./auth.view.js";
import sendEmail from "../../common/utils/sendEmail.js";

export const registerService = async (dataRegister) => {
  const { email, password, fullname } = dataRegister;
  if (!email || !password || !fullname) {
    throw createError(400, MESSAGES.AUTH.REGISTER_FAILED);
  }
  const existing = await User.findOne({ email });
  if (existing) throw createError(400, MESSAGES.AUTH.EMAIL_ALREADY_EXISTS);

  const hashedPassword = await hashPassword(password);
  const username = await generateUsername(fullname);
  let studentId = await generateStudentId();
  const newUser = await User.create({
    ...dataRegister,
    password: hashedPassword,
    username,
    studentId,
  });
  newUser.password = undefined;
  return newUser;
};

export const loginService = async (dataLogin) => {
  const { email, password } = dataLogin;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(400, MESSAGES.AUTH.EMAIL_NOT_FOUND);
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw createError(400, MESSAGES.AUTH.PASSWORD_INCORRECT);
  }
  const accessToken = signToken({ id: user._id }, "1d");
  const refreshToken = signToken({ id: user._id }, "30d");

  user.password = undefined;
  return { user, accessToken, refreshToken };
};
export const refreshTokenService = async (req) => {
  const refreshToken =
    req.body.refreshToken ||
    req.headers["x-refresh-token"] ||
    req.cookies.refreshToken;

  if (!refreshToken) {
    return createError(400, MESSAGES.AUTH.REFRESH_TOKEN_NOT_FOUND);
  }
  const { valid, decoded } = verifyToken(refreshToken);
  if (valid) {
    const accessToken = signToken({ id: decoded.id }, "1d");
    const newRefreshToken = signToken({ id: decoded.id }, "30d");
    return { accessToken, refreshToken: newRefreshToken };
  }
};
export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(400, MESSAGES.AUTH.EMAIL_NOT_FOUND);
  }
  const resetToken = signToken({ id: user._id, role: user.role }, "15m");
  const resetLink = `${FRONTEND_URL}/reset-password/${resetToken}`;
  await sendResetPasswordEmail(email, resetLink);
  return true;
};

export const sendResetPasswordEmail = async (
  email,
  resetLink,
  expriresIn = "15 phút"
) => {
  const subject = "Yêu cầu đặt lại mật khẩu";
  const html = generateResetPasswordEmail(resetLink, expriresIn);
  await sendEmail(email, subject, { html });
};
export const sendPasswordResetSuccessEmail = async (email) => {
  const subject = "Mật khẩu đã được đặt lại";
  const html = generatePasswordResetSuccessEmail();

  await sendEmail(email, subject, { html });
};
export const resetPasswordService = async (resetToken, newPassword) => {
  const decoded = verifyToken(resetToken);
  const user = await User.findById(decoded.decoded.id);
  if (!user) {
    throw createError(400, MESSAGES.AUTH.EMAIL_NOT_FOUND);
  }
  user.password = await hashPassword(newPassword);
  await user.save();
  await sendPasswordResetSuccessEmail(user.email);
  return true;
};
