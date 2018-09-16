'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _signup = require('./controllers/signup');

var _signup2 = _interopRequireDefault(_signup);

var _login = require('./controllers/login');

var _login2 = _interopRequireDefault(_login);

var _isAuthenticated = require('./helpers/isAuthenticated');

var _isAuthenticated2 = _interopRequireDefault(_isAuthenticated);

var _updateUser = require('./controllers/updateUser');

var _updateUser2 = _interopRequireDefault(_updateUser);

var _deleteUser = require('./controllers/deleteUser');

var _deleteUser2 = _interopRequireDefault(_deleteUser);

var _createLock = require('./controllers/createLock');

var _createLock2 = _interopRequireDefault(_createLock);

var _updateLock = require('./controllers/updateLock');

var _updateLock2 = _interopRequireDefault(_updateLock);

var _deleteLock = require('./controllers/deleteLock');

var _deleteLock2 = _interopRequireDefault(_deleteLock);

var _getLocks = require('./controllers/getLocks');

var _getLocks2 = _interopRequireDefault(_getLocks);

var _getUsers = require('./controllers/getUsers');

var _getUsers2 = _interopRequireDefault(_getUsers);

var _getMyDetails = require('./controllers/getMyDetails');

var _getMyDetails2 = _interopRequireDefault(_getMyDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
app.use((0, _cors2.default)());
app.use((0, _helmet2.default)());
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Hello, \n This application is sample REST Apis. \n For more Details https://github.com/monisahmad/lattis-api'));

app.get('/status', async (req, res) => {
  res.json({ status: 'Server is Running' });
});

app.post('/signup', _signup2.default);
app.post('/login', _login2.default);

app.put('/user', _isAuthenticated2.default, _updateUser2.default);
app.patch('/user', _isAuthenticated2.default, _updateUser2.default);
app.delete('/user', _isAuthenticated2.default, _deleteUser2.default);
app.get('/user', _isAuthenticated2.default, _getUsers2.default);

app.get('/me', _isAuthenticated2.default, _getMyDetails2.default);

app.post('/lock', _isAuthenticated2.default, _createLock2.default);
app.patch('/lock', _isAuthenticated2.default, _updateLock2.default);
app.delete('/lock', _isAuthenticated2.default, _deleteLock2.default);
app.get('/lock', _isAuthenticated2.default, _getLocks2.default);

exports.default = app;