const express = require('express');
const cookieParser = require('cookie-parser');

const db = require('./database/db_connection');

const app = express();

app.disable('x-powered-by');
app.set('port', process.env.PORT || 4000);

const middlewares = [
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: false }),
];
app.use(middlewares);

db
  // eslint-disable-next-line no-console
  .on('open', () => console.log('db is connected'))
  .on('error', () => process.exit(1));

app.listen(app.get('port'), () =>
  // eslint-disable-next-line no-console
  console.log(`app is listeing http://localhost:${app.get('port')}`)
);
