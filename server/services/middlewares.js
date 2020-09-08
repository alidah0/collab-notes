const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');

const middlewares = [
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.Secret_Cookie],
  }),
  cookieParser(),
  passport.initialize(),
  passport.session(),
];

module.exports = middlewares;
