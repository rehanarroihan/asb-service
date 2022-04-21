const { User } = require("../../models");
var bcrypt = require("bcryptjs");
const { Op } = require('sequelize');

const { successResponse, errorResponse } = require('../../helpers/general-helper')

exports.create = async (req, res) => {
  try {
    const { full_name, dob, role, username, password, address } = req.body;

    const user = await User.findOne({ where : {username} });
    if (user) {
      return errorResponse(res, "User already exist with the same username");
    }

    const newUser = await User.create({
      role,
      full_name,
      username,
      password: bcrypt.hashSync(password, 8)
    })

    delete newUser.dataValues.password;

    return successResponse(res, newUser);
  } catch (e) {
    return errorResponse(res, e.message);
  }
}

exports.getAll = async (req, res) => {
  try {
    const { page, size, title } = req.query;

    var condition = title ? { full_name: { [Op.like]: `%${title}%` } } : null;
    const { limit, offset } = getPagination(page, size);
    const users = await User.findAndCountAll({ where: condition, limit, offset });
    const response = getPagingData(users, page, limit);

    return successResponse(res, response);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows } = data;
  const currentPage = page ? + page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, totalPages, currentPage, rows };
};

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
