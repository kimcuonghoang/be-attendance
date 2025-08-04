import User from "./user.model.js";
export const getListTeacherService = async (role) => {
  const filter = {};
  if (role) filter.role = role;
  const users = await User.find(filter);
  return users;
};
