const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const cookieSession = require('cookie-session');

const middlewares = [
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  }),
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['secretcookie'],
  }),
  cookieParser(),
  passport.initialize(),
  passport.session(),
];

module.exports = middlewares;
