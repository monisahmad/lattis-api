import promisePool from '../database';
import getLockById from './getLockById';
import getLockByMacId from './getLockByMacId';

const getLocks = async (req, res) => {
  if (req.query.lockId) {
    getLockById(req, res);
  } else if (req.query.macId) {
    getLockByMacId(req, res);
  } else {
    const { userId } = req.decoded.data;
    const sql = `SELECT * from locks where userID = '${userId}'`;
    try {
      const [queryResult, _fields] = await promisePool.query(sql);
      res.send(queryResult);
    } catch (error) {
      console.log(error);
      res.status(500);
      res.send({
        success: false,
        error: 'Something Went Wrong',
      });
    }
  }
};

export default getLocks;
