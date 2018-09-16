import jwt from 'jsonwebtoken';

import constants from '../config/constants';

const jwtSecret = constants.JWT_SECRET;

const isAuthenticated = (req, res, next) => {
  let token;
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')[1];
    token = bearer;
  }
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.json({
          success: false,
          error: 'Failed to authenticate token.',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token, return an error
    res
      .status(403)
      .send({
        success: false,
        error: 'No token provided.',
      });
  }
};

export default isAuthenticated;
