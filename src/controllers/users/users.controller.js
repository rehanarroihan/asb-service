const { User } = require("../../models");
var bcrypt = require("bcryptjs");
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const projectEnum = require('../../helpers/project-enum')

const { successResponse, errorResponse } = require('../../helpers/general-helper')

exports.create = async (req, res) => {
  try {
    const { full_name, dob, role, username, password, address } = req.body;

    const user = await User.findOne({ where : {username} });
    if (user) {
      return errorResponse(res, "User already exist with the same username");
    }

    let fileName = null
    if (req.files) {
      let profilePicture = req.files.profile_picture
      if (profilePicture) {
        fileName = Date.now() + profilePicture.name
        await profilePicture.mv('./uploads/' + fileName);
      }
    }

    const newUser = await User.create({
      roel: role,
      full_name: full_name,
      username: username,
      password: bcrypt.hashSync(password, 8),
      address: address,
      profile_picture: fileName,
      dob: dob,
    })

    delete newUser.dataValues.password;

    return successResponse(res, newUser, undefined, 201);
  } catch (e) {
    return errorResponse(res, e.message);
  }
}

exports.getAll = async (req, res) => {
  try {
    var condition = req.query.title ? { full_name: { [Op.like]: `%${ req.query.title }%` } } : null;
    const { limit, offset } = getPagination(parseInt(req.query.page)-1, req.query.limit);
    const users = await User.findAndCountAll({ where: condition, limit, offset });
    users.rows.map((user) => {
      // INFO : populating role with data dummy's object
      const detailedRole = projectEnum.user_role.find(r => r.id == user.role)
      user.role = detailedRole !== undefined ? detailedRole : null
    })
    const response = getPagingData(users, req.query.page, limit);

    return successResponse(res, response);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

exports.usernameCheck = async (req, res) => {
  try {
    const username = req.body.username
    const user = await User.findOne({ where : {username} });
    if (user) {
      return errorResponse(res, "Username not available", 200);
    }

    return successResponse(res, undefined, "Username available");
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

exports.roles = async (req, res) => {
  return successResponse(res, projectEnum.user_role)
}

exports.delete = async (req, res) => {
  try {
    const userId = req.body.user_id
    const deleteUser = await User.destroy({where: {id: userId}});
    return successResponse(res, deleteUser, "User deleted");
  } catch (e) {
    return errorResponse(res, e.message);
  }
}

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
