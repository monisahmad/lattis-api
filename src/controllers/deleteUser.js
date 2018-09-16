import promisePool from '../database';


const deleteUser = async (req, res) => {
  console.log(req.decoded);
  const sql = `DELETE FROM users where 
  username = '${req.decoded.data.username}' AND 
  userId = '${req.decoded.data.userId}'`;

  try {
    const queryResult = await promisePool.query(sql);
    if (queryResult[0].affectedRows === 1) {
      res.json({ success: true });
    } else {
      console.log(queryResult);
      res.status(500);
      res.send({ success: false, error: 'Something went wrong' });
    }
  } catch (error) {
    res.status(500);
    res.send({ success: false, error: 'Something went wrong' });
    console.log(error);
  }
};

export default deleteUser;
