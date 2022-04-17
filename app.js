var express = require('express');
const cors = require("cors");
const logger = require('morgan')
const dotenv = require('dotenv')

var router = require('./src/routes/index');
const errorHandler = require('./src/middleware/error-handler');

require('./src/config/sequelize');

dotenv.config();
var app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.use(logger('dev'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.json({
    message: 404,
    error: 404
  });
});

app.use(errorHandler);

module.exports = app;
