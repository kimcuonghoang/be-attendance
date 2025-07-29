import MESSAGES from "../../common/constants/messages.js";
import createError from "../../common/utils/error.js";
import User from "../user/user.model.js";
import handleAsync from "./../../common/utils/handleAsync.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createResponse from "./../../common/utils/response.js";
import {
  JWT_EXPIRES_IN,
  JWT_SECRET_KEY,
} from "../../common/configs/environments.js";
export const authRegister = handleAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing)
    return next(createError(400, MESSAGES.AUTH.EMAIL_ALREADY_EXISTS));
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    role: "student",
  });
  newUser.password = undefined;
  return res.json(
    createResponse(true, 201, MESSAGES.AUTH.REGISTER_SUCCESS, newUser)
  );
});

export const authLogin = handleAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(createError(400, MESSAGES.AUTH.LOGIN_FAILED));
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return next(createError(400, MESSAGES.AUTH.LOGIN_FAILED));
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });
  if (token) {
    user.password = undefined;
    return res.json(
      createResponse(true, 200, MESSAGES.AUTH.LOGIN_SUCCESS, {
        user: user,
        token,
      })
    );
  }
  return next(createError(400, MESSAGES.AUTH.LOGIN_FAILED));
});
