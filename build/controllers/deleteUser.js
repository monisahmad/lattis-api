'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteUser = async (req, res) => {
  console.log(req.decoded);
  const sql = `DELETE FROM users where 
  username = '${req.decoded.data.username}' AND 
  userId = '${req.decoded.data.userId}'`;

  try {
    const queryResult = await _database2.default.query(sql);
    if (queryResult[0].affectedRows === 1) {
      res.json({ success: true });
    } else {
      console.log(queryResult);
      res.status(500);
      res.send({ success: false, error: 'Something went wrong' });
    }
  } catch (error) {
    res.status(500);
    res.send({ success: false, error: 'Something went wrong' });
    console.log(error);
  }
};

exports.default = deleteUser;