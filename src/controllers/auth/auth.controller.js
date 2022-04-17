
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../../models")

const { successResponse, errorResponse } = require('../../helpers/general-helper')

require("dotenv").config()

 exports.login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ where : { username: username } })
    if (!user) {
      return errorResponse(req, res, "Invalid username or password", 401);
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(req, res, "Invalid username or password", 401);
    }

    var authToken = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400 // 24 hours
    });

    return successResponse(req, res, {
      accessToken: authToken,
      user: user
    });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};