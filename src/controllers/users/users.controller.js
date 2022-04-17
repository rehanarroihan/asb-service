const { User } = require("../../models");

const { successResponse, errorResponse } = require('../../helpers/general-helper')

 exports.users = async (req, res) => {
  try {
    const page = req.params.page ?? 1;
    const limit = req.params.limit ?? 10;

    const users = await User.findAndCountAll({
      order: [
        ["created_at", "DESC"],
        ["full_name", "ASC"],
      ],
      offset: (page - 1) * limit,
      limit,
    });

    return successResponse(req, res, { users });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};