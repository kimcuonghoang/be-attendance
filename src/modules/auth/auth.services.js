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
import { signToken } from "../../common/utils/token.js";

export const registerService = async (dataRegister) => {
  const { email, password, fullname, role } = dataRegister;
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
  const isMatch = comparePassword(password, user.password);
  if (!isMatch) {
    throw createError(400, MESSAGES.AUTH.PASSWORD_INCORRECT);
  }
  const accessToken = signToken({ id: user._id }, "1d");
  const refreshToken = signToken({ id: user._id }, "30d");

  user.password = undefined;
  return { user, accessToken, refreshToken };
};
