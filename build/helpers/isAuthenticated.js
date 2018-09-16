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

const isAuthenticated = (req, res, next) => {
  let token;
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')[1];
    token = bearer;
  }
  if (token) {
    _jsonwebtoken2.default.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.json({
          success: false,
          error: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token, return an error
    res.status(403).send({
      success: false,
      error: 'No token provided.'
    });
  }
};

exports.default = isAuthenticated;