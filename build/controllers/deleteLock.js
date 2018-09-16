'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteLock = async (req, res) => {
  const { lockName } = req.body;
  const { userId } = req.decoded.data;
  const sql = `DELETE FROM locks where userID = '${userId}' AND lockName = '${lockName}'`;
  try {
    const queryResult = await _database2.default.query(sql);
    if (queryResult[0].affectedRows === 1) {
      res.json({ success: true });
    } else {
      res.status(500);
      res.send({ success: false, error: 'Something went wrong' });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({
      success: false,
      error: 'Something Went Wrong'
    });
  }
};

exports.default = deleteLock;