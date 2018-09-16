import promisePool from '../database';

const getLockByMacId = async (req, res) => {
  const { userId } = req.decoded.data;
  const { macId } = req.query;
  const sql = `SELECT * from locks where userID = '${userId}' AND macId = '${macId}'`;
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
};

export default getLockByMacId;
