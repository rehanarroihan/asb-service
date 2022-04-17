exports.successResponse = (req, res, data, code = 200) => res.send({
  code,
  data,
  success: true,
});

exports.errorResponse = (
  req,
  res,
  errorMessage = 'Something went wrong',
  code = 500,
  error = {},
) => res.status(code).json({
  code,
  errorMessage,
  error,
  data: null,
  success: false,
});

exports.validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

exports.validateFields = (object, fields) => {
  const errors = [];
  fields.forEach((f) => {
    if (!(object && object[f])) {
      errors.push(f);
    }
  });
  return errors.length ? `${errors.join(', ')} are required fields.` : '';
};