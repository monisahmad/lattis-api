import bcrypt from 'bcrypt';
import promisePool from '../database';

const saltRounds = 10;

const signup = async (req, res) => {
  bcrypt.hash(req.body.userPassword, saltRounds, async (err, hash) => {
    if (err) {
      console.log(err);
      res.statusCode(500);
      res.send({ success: false, error: 'Something went wrong' });
    }
    const sql = `Insert into users (username, firstName, lastName, userPassword, birthDate) values 
    ('${req.body.username}', '${req.body.firstName}', '${req.body.lastName}', '${hash}', '${req.body.birthDate}')`;
    try {
      const queryResult = await promisePool.query(sql);
      if (queryResult[0].affectedRows === 1) {
        res.json({ success: true });
      } else {
        res.status(500);
        res.send({ success: false, error: 'Something went wrong' });
      }
    } catch (error) {
      if (error.errno === 1062) {
        res.status(422);
        res.send({ success: false, error: 'Username already registered ' });
      }
      console.log(error);
    }
  });
};

export default signup;
