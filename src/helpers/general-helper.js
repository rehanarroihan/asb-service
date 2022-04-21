exports.successResponse = (res, data, message, code = 200) => res.status(code).json({
  code,
  success: true,
  message,
  data,
});

exports.errorResponse = (
  res,
  message = 'Something went wrong',
  code = 500,
  error,
  data
) => res.status(code).json({
  code,
  success: false,
  message,
  error,
  data,
});