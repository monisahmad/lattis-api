import jwt from 'jsonwebtoken';

import constants from '../config/constants';

const jwtSecret = constants.JWT_SECRET;
const generateToken = (data) => {
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      userId: data.userId,
    },
  }, jwtSecret);
  return token;
};

export default generateToken;
