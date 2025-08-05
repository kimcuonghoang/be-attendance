import createError from "./error";

export const queryBuilder = async (Model, queryParams, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sort = "createAt",
    order = "desc",
    search,
    searchFields = [],
    includeDeleted = false,
    ...filters
  } = queryParams;
  const queryCounditions = {};
  if (!includeDeleted) {
    queryCounditions.deletedAt = null;
  }

  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      queryCounditions[key] = filters[key];
    }
  });
  if (search && searchFields.length > 0) {
    const searchRegex = new RegExp(search, "i");
    queryCounditions.$or = searchFields.map((field) => ({
      [field]: searchRegex,
    }));
  }
  let query = Model.find(queryCounditions);
  const sortOrder = order === "desc" ? -1 : 1;
  query == query.sort({ [sort]: sortOrder });

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const total = await Model.countDocuments(queryCounditions);
  const data = await query.exec();
  if (!data || data.length === 0) {
    throw createError(400, "Not Found");
  }

  return {
    data,
    meta: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    },
  };
};
