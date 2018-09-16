'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createLock = async (req, res) => {
  const uuid = (0, _v2.default)();
  const { userId } = req.decoded.data;
  const { lockName } = req.body;
  const sql = `INSERT INTO locks (macId, lockName, userID) values
  ('${uuid}', '${lockName}', '${userId}')`;
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

exports.default = createLock;