'use strict';

require('babel-polyfill');

var _constants = require('./config/constants');

var _constants2 = _interopRequireDefault(_constants);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = _constants2.default.PORT;
_server2.default.listen(port, () => {
  console.log(`server started on port 3000 ${port}`);
});