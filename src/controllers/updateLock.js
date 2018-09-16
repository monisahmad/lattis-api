import promisePool from '../database';

const updateLock = async (req, res) => {
  const sql = `UPDATE locks SET
  lockName = '${req.body.newLockName}' WHERE
  lockName = '${req.body.oldLockName}' AND
  userID = '${req.decoded.data.userId}'`;
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

export default updateLock;
