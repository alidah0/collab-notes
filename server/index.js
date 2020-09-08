const app = require('./app');
const runSockets = require('./services/runSockets');

const server = app.listen(app.get('port'), () =>
  // eslint-disable-next-line no-console
  console.log(`app is listeing http://localhost:${app.get('port')}`)
);

runSockets(server);
