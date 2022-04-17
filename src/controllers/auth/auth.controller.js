const { successResponse, errorResponse } = require('../../helpers/general-helper')

 exports.login = async (req, res) => {
  try {
    return successResponse(req, res);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};