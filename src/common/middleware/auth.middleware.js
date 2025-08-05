import MESSAGES from "../constants/messages.js";
import createError from "../utils/error.js";
import { verifyToken } from "../utils/token.js";
import User from "../../modules/user/user.model.js";
export const verifyUser = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startWith("Bearer")) {
    return next(createError(401, MESSAGES.AUTH.ACCESS_DENIED));
  }
  const token = authHeaders.split(" ")[1];
  if (!token) {
    return next(createError(401, "TOken không được cung cấp"));
  }
  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.decoded.id).select(
      "role deleteAt"
    );
    if (!user || user.deleteAt) {
      return next(401, "Tài khoản không tồi tại hoặc đã bị xóa");
    }
    req.user = { id: decoded._id, role: user.role };
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(createError(401, "Token đã hết hạn"));
    }
    if (error.name === "TokenExpiredError") {
      return next(createError(401, "Token không hợp lệ"));
    }

    return next(createError(401, MESSAGES.AUTH.INVALID_TOKEN));
  }
};

export const restrictTo = (allowedRole) => (req, res, next) => {
  const userRole = req.user?.role;
  if (!userRole) {
    return next(createError(401, MESSAGES.AUTH.NOT_AUTHENTICATED));
  }
  if (!allowedRole.includes(userRole)) {
    return next(createError(401, MESSAGES.AUTH.NOT_AUTHENTICATED));
  }
  next();
};
