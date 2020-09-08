const express = require('express');
const { join } = require('path');

const app = express();

const db = require('./database/db_connection');
const middlewares = require('./services/middlewares');

app.disable('x-powered-by');
app.set('port', process.env.PORT || 4000);
require('./services/passport');

app.use(middlewares);

db
  // eslint-disable-next-line no-console
  .on('open', () => console.log('db is connected'))
  .on('error', () => process.exit(1));

app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;
