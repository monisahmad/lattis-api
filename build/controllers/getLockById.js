'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getLockById = async (req, res) => {
  const { userId } = req.decoded.data;
  const { lockId } = req.query;
  const sql = `SELECT * from locks where userID = '${userId}' AND lockId = '${lockId}'`;
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
};

exports.default = getLockById;