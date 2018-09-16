import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import signup from './controllers/signup';
import login from './controllers/login';
import isAuthenticated from './helpers/isAuthenticated';
import updateUser from './controllers/updateUser';
import deleteUser from './controllers/deleteUser';
import createLock from './controllers/createLock';
import updateLock from './controllers/updateLock';
import deleteLock from './controllers/deleteLock';
import getLocks from './controllers/getLocks';
import getUsers from './controllers/getUsers';
import getMyDetails from './controllers/getMyDetails';


const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Hello, \n This application is sample REST Apis. \n For more Details https://github.com/monisahmad/lattis-api'));

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

export default app;
