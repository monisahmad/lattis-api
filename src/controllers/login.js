import bcrypt from 'bcrypt';

import promisePool from '../database';
import generateToken from '../helpers/generateToken';

const login = async (req, res) => {
  try {
    const [rows] = await promisePool.query(`SELECT * from users where  username = '${req.body.username}'`);
    if (rows.length > 0) {
      bcrypt.compare(req.body.userPassword, rows[0].userPassword, (err, result) => {
        if (err) {
          res.status(500);
          res.send({
            success: false,
            error: 'Something went wrong',
          });
        }
        if (result) {
          res.send({
            success: true,
            token: generateToken(rows[0]),
          });
        } else {
          res.status(401);
          res.send({
            success: false,
            error: 'Wrong username or password',
          });
        }
      });
    } else {
      res.status(401);
      res.send({
        success: false,
        error: 'Wrong username or password',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({
      success: false,
      error: 'Something went wrong',
    });
  }
};

export default login;
