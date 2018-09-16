'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mysql = require('mysql2');

var _mysql2 = _interopRequireDefault(_mysql);

var _constants = require('./config/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const connection = _mysql2.default.createPool({
  // connectionLimit: 100,
  host: _constants2.default.DB_HOST,
  user: _constants2.default.DB_USER,
  password: _constants2.default.DB_PASSWORD,
  database: _constants2.default.DB_NAME
  // debug: false,
  // multipleStatements: true,
});

const promisePool = connection.promise();

exports.default = promisePool;