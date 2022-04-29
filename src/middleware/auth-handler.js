const jwt = require("jsonwebtoken");
const { User } = require("../models");

const { errorResponse } = require('../helpers/general-helper')

require('dotenv').config()

exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  
  if (!token) {
    return errorResponse(res, "Forbidden", 403)
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return errorResponse(res, "Unauthorized", 401)
    }

    req.userId = decoded.id;
    
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      return errorResponse(res, "Forbidden", 403)
    });
  });
};

exports.isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      return errorResponse(res, "Forbidden", 403)
    });
  });
};
