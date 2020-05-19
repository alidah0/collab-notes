const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.disable('x-powered-by');
app.set('port', process.env.PORT || 4000);

const middlewares = [
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: false }),
];
app.use(middlewares);

app.listen(app.get('port'), () =>
  // eslint-disable-next-line no-console
  console.log(`app is listeing http://localhost:${app.get('port')}`)
);
