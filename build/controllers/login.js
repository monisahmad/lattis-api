'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

var _generateToken = require('../helpers/generateToken');

var _generateToken2 = _interopRequireDefault(_generateToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const login = async (req, res) => {
  try {
    const [rows] = await _database2.default.query(`SELECT * from users where  username = '${req.body.username}'`);
    if (rows.length > 0) {
      _bcrypt2.default.compare(req.body.userPassword, rows[0].userPassword, (err, result) => {
        if (err) {
          res.status(500);
          res.send({
            success: false,
            error: 'Something went wrong'
          });
        }
        if (result) {
          res.send({
            success: true,
            token: (0, _generateToken2.default)(rows[0])
          });
        } else {
          res.status(401);
          res.send({
            success: false,
            error: 'Wrong username or password'
          });
        }
      });
    } else {
      res.status(401);
      res.send({
        success: false,
        error: 'Wrong username or password'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({
      success: false,
      error: 'Something went wrong'
    });
  }
};

exports.default = login;