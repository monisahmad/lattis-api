import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import signup from './src/controllers/signup';
import login from './src/controllers/login';
import isAuthenticated from './src/helpers/isAuthenticated';
import updateUser from './src/controllers/updateUser';
import deleteUser from './src/controllers/deleteUser';
import createLock from './src/controllers/createLock';
import updateLock from './src/controllers/updateLock';
import deleteLock from './src/controllers/deleteLock';
import getLocks from './src/controllers/getLocks';
import getUsers from './src/controllers/getUsers';
import getMyDetails from './src/controllers/getMyDetails';
import constants from './src/config/constants';


const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/status', async (req, res) => {
  res.json({ status: 'Server is Running' });
});

app.post('/signup', signup);
app.post('/login', login);


app.put('/user', isAuthenticated, updateUser);
app.patch('/user', isAuthenticated, updateUser);
app.delete('/user', isAuthenticated, deleteUser);
app.get('/user', isAuthenticated, getUsers);

app.get('/me', isAuthenticated, getMyDetails);

app.post('/lock', isAuthenticated, createLock);
app.patch('/lock', isAuthenticated, updateLock);
app.delete('/lock', isAuthenticated, deleteLock);
app.get('/lock', isAuthenticated, getLocks);

const port = constants.PORT;
app.listen(port, () => {
  console.log('server started on port 3000');
});
