import uuidv4 from 'uuid/v4';

import promisePool from '../database';

const createLock = async (req, res) => {
  const uuid = uuidv4();
  const { userId } = req.decoded.data;
  const { lockName } = req.body;
  const sql = `INSERT INTO locks (macId, lockName, userID) values
  ('${uuid}', '${lockName}', '${userId}')`;
  try {
    const queryResult = await promisePool.query(sql);
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
      error: 'Something Went Wrong',
    });
  }
};

export default createLock;
