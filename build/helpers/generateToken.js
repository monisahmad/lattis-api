'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _constants = require('../config/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jwtSecret = _constants2.default.JWT_SECRET;
const generateToken = data => {
  const token = _jsonwebtoken2.default.sign({
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    data: {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      userId: data.userId
    }
  }, jwtSecret);
  return token;
};

exports.default = generateToken;