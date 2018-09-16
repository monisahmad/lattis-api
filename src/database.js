import mysql from 'mysql2';
import constants from './config/constants';

const connection = mysql.createPool({
  // connectionLimit: 100,
  host: constants.DB_HOST,
  user: constants.DB_USER,
  password: constants.DB_PASSWORD,
  database: constants.DB_NAME,
  // debug: false,
  // multipleStatements: true,
});

const promisePool = connection.promise();

export default promisePool;
