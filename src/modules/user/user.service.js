import MESSAGES from "../../common/constants/messages.js";
import createError from "../../common/utils/error.js";
import User from "./user.model.js";
import {
  generateStudentId,
  generateUsername,
} from "./../../common/utils/codeGenerate.js";
import { randomPassword } from "./../../common/utils/handlePassword.js";
import { queryBuilder } from "./../../common/utils/queryBuilder.js";

// * Update user role
export const updateUserRole = async (userId, role) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createError(404, "User not found");
  }

  if (role === "admin") {
    throw createError(400, MESSAGES.USERS.UNAUTHORIZED);
  }

  user.role = role;
  user.updatedAt = new Date();
  return user.save();
};

// * Block or unblock user
export const blockUser = async (userId, isBlocked) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createError(404, MESSAGES.USERS.USER_NOT_FOUND);
  }

  user.isBlocked = isBlocked;
  user.updatedAt = new Date();
  return user.save();
};

// * Get user by ID
export const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw createError(404, MESSAGES.USERS.USER_NOT_FOUND);
  }
  return user;
};

// * Update user profile
export const updateProfile = async (userId, profileData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createError(404, MESSAGES.USERS.USER_NOT_FOUND);
  }

  // Kiểm tra email trùng lặp (trường hợp cho phép người dùng cập nhật email)
  if (profileData.email && profileData.email !== user.email) {
    const existingUser = await User.findOne({ email: profileData.email });
    if (existingUser) {
      throw createError(400, MESSAGES.USERS.USER_ALREADY_EXISTS);
    }
  }

  user = {
    ...user.toObject(),
    ...profileData,
    updatedAt: new Date(),
  };

  return user.save();
};

// * Create a new user
export const createUser = async (userData) => {
  userData.username = await generateUsername(userData.fullname);
  if (userData.role === "student" || !userData.role) {
    userData.studentId = await generateStudentId();
  }

  userData.password = randomPassword();

  const newUser = await User.create(userData);

  return newUser;
};

export const getAllUsers = async (query) => {
  const { includeDeleted = false, ...queryParams } = query;
  const data = await queryBuilder(
    User,
    {
      ...queryParams,
      searchFields: ["fullname", "email", "username", "studentId"],
    },
    {
      populate: [{ path: "majorId", select: "name code" }],
    }
  );

  return data;
};
