import MESSAGES from "../../common/constants/messages.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import {
  blockUser,
  getAllUsers,
  getUserById,
  getUserByRoleService,
  updateProfile,
  updateUserRole,
} from "./user.service.js";

export const getUserByRoleController = handleAsync(async (req, res, next) => {
  const { role } = req.query;
  const dataTeacher = await getUserByRoleService(role);
  return createResponse(
    res,
    200,
    MESSAGES.USERS.GET_TEACHER_SUCCESS,
    dataTeacher
  );
});

export const updateRoleController = handleAsync(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  const updatedUser = await updateUserRole(userId, role);
  return createResponse(res, 200, MESSAGES.USERS.UPDATE_USER_ROLE, updatedUser);
});

export const blockUserController = handleAsync(async (req, res) => {
  const { userId } = req.params;
  const { isBlocked } = req.body;

  const updatedUser = await blockUser(userId, isBlocked);
  return createResponse(
    res,
    200,
    `User ${isBlocked ? "blocked" : "unblocked"} successfully`,
    updatedUser
  );
});

// * admin can get user by ID
export const getUserController = handleAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await getUserById(userId);
  return createResponse(res, 200, MESSAGES.USERS.USER_RETRIEVED_SUCCESS, user);
});

// * Get profile of the logged-in user
export const getProfileController = handleAsync(async (req, res) => {
  const userId = req.user._id;
  const user = await getUserById(userId);
  return createResponse(res, 200, MESSAGES.USERS.USER_RETRIEVED_SUCCESS, user);
});

export const updateProfileController = handleAsync(async (req, res) => {
  const userId = req.user._id;
  const profileData = req.body;
  const updatedUser = await updateProfile(userId, profileData);
  return createResponse(
    res,
    200,
    MESSAGES.USERS.USER_UPDATED_SUCCESSFULLY,
    updatedUser
  );
});

export const createUserController = handleAsync(async (req, res) => {
  const data = await createUser(req.body);
  return createResponse(
    res,
    201,
    MESSAGES.USERS.USER_CREATED_SUCCESSFULLY,
    data
  );
});

export const getAllUsersController = handleAsync(async (req, res) => {
  const query = req.query;
  const users = await getAllUsers(query);
  return createResponse(
    res,
    200,
    MESSAGES.USERS.GET_SUCCESS,
    users.data,
    users.meta
  );
});
