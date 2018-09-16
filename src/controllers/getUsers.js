import promisePool from '../database';
import getUserById from './getUserById';
import getUserByUsername from './getUserByUsername';

const getUsers = async (req, res) => {
  if (req.query.username) {
    getUserByUsername(req, res);
  } else if (req.query.userId) {
    getUserById(req, res);
  } else {
    const sql = 'SELECT userId, username,firstName, lastName, birthDate FROM users';
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

export default getUsers;
