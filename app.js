var express = require('express');
const cors = require("cors");
const logger = require('morgan')
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv')

var router = require('./src/routes/index');
const errorHandler = require('./src/middleware/error-handler');

require('./src/config/sequelize');

dotenv.config();
var app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable files upload
app.use(fileUpload({
  createParentPath: true,
  safeFileNames: true,
  preserveExtension: true,
}));

app.use('/static', express.static('uploads'))
app.use('/', router);

app.use(logger('dev'))

app.use(errorHandler);

module.exports = app;
