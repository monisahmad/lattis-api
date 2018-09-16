import 'babel-polyfill';

import constants from './config/constants';
import app from './server';

const port = constants.PORT;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
