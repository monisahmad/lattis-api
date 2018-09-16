'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saltRounds = 10;

const signup = async (req, res) => {
  _bcrypt2.default.hash(req.body.userPassword, saltRounds, async (err, hash) => {
    if (err) {
      console.log(err);
      res.statusCode(500);
      res.send({ success: false, error: 'Something went wrong' });
    }
    const sql = `Insert into users (username, firstName, lastName, userPassword, birthDate) values 
    ('${req.body.username}', '${req.body.firstName}', '${req.body.lastName}', '${hash}', '${req.body.birthDate}')`;
    try {
      const queryResult = await _database2.default.query(sql);
      if (queryResult[0].affectedRows === 1) {
        res.json({ success: true });
      } else {
        res.status(500);
        res.send({ success: false, error: 'Something went wrong' });
      }
    } catch (error) {
      if (error.errno === 1062) {
        res.status(422);
        res.send({ success: false, error: 'Username already registered ' });
      }
      console.log(error);
    }
  });
};

exports.default = signup;