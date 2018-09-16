import promisePool from '../database';

const deleteLock = async (req, res) => {
  const { lockName } = req.body;
  const { userId } = req.decoded.data;
  const sql = `DELETE FROM locks where userID = '${userId}' AND lockName = '${lockName}'`;
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

export default deleteLock;
