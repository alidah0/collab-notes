const mongoose = require('mongoose');
require('env2')('config.env');

const dbUri = process.env.DB_URI;

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
