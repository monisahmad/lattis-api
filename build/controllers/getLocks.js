'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

var _getLockById = require('./getLockById');

var _getLockById2 = _interopRequireDefault(_getLockById);

var _getLockByMacId = require('./getLockByMacId');

var _getLockByMacId2 = _interopRequireDefault(_getLockByMacId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getLocks = async (req, res) => {
  if (req.query.lockId) {
    (0, _getLockById2.default)(req, res);
  } else if (req.query.macId) {
    (0, _getLockByMacId2.default)(req, res);
  } else {
    const { userId } = req.decoded.data;
    const sql = `SELECT * from locks where userID = '${userId}'`;
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

exports.default = getLocks;