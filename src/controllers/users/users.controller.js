const { User } = require("../../models");
var bcrypt = require("bcryptjs");

const { successResponse, errorResponse } = require('../../helpers/general-helper')

exports.create = async (req, res) => {
  try {
    const { full_name, dob, role, username, password, address } = req.body;

    const user = await User.findOne({ where : {username} });
    if (user) {
      return errorResponse(req, res, "User already exist with the same username");
    }

    const newUser = await User.create({
      role,
      full_name,
      username,
      password: bcrypt.hashSync(password, 8)
    })

    delete newUser.dataValues.password;

    return successResponse(req, res, newUser);
  } catch (e) {
    return errorResponse(req, res, e.message);
  }
}

exports.getAll = async (req, res) => {
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
  } catch (e) {
    return errorResponse(req, res, e.message);
  }
};