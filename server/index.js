const express = require('express');

const app = express();

const db = require('./database/db_connection');
const middlewares = require('./services/middlewares');

app.disable('x-powered-by');
app.set('port', process.env.PORT || 4000);

app.use(middlewares);

db
  // eslint-disable-next-line no-console
  .on('open', () => console.log('db is connected'))
  .on('error', () => process.exit(1));

app.listen(app.get('port'), () =>
  // eslint-disable-next-line no-console
  console.log(`app is listeing http://localhost:${app.get('port')}`)
);
