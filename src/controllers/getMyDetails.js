import promisePool from '../database';

const getMyDetails = async (req, res) => {
  const { userId } = req.decoded.data;
  const sql = `SELECT userId, username,firstName, lastName, birthDate FROM users WHERE userId = '${userId}'`;
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

export default getMyDetails;
