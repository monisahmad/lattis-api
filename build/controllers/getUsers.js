'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

var _getUserById = require('./getUserById');

var _getUserById2 = _interopRequireDefault(_getUserById);

var _getUserByUsername = require('./getUserByUsername');

var _getUserByUsername2 = _interopRequireDefault(_getUserByUsername);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getUsers = async (req, res) => {
  if (req.query.username) {
    (0, _getUserByUsername2.default)(req, res);
  } else if (req.query.userId) {
    (0, _getUserById2.default)(req, res);
  } else {
    const sql = 'SELECT userId, username,firstName, lastName, birthDate FROM users';
    try {
      const [queryResult, _fields] = await _database2.default.query(sql);
      res.send(queryResult);
    } catch (error) {
      console.log(error);
      res.status(500);
      res.send({
        success: false,
        error: 'Something Went Wrong'
      });
    }
  }
};

exports.default = getUsers;