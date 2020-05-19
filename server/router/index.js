const express = require('express');

const router = express.Router();
const passport = require('passport');

const Board = require('../database/models/Board');

router.post('/addroom', async (req, res) => {
  const { room, nameuser } = req.body;
  Board.findOne({ title: room }).then((existingRoom) => {
    if (existingRoom) {
      res.json({ msg: 'room is existed you are in' });
    } else {
      new Board({
        title: room,
        owner: nameuser,
      })
        .save()
        .then(() => res.status(201).json({ msg: 'room successfully created' }))
        .catch((err) => {
          res.status(400).json({
            Error: err,
            msg: 'There is an error',
          });
        });
    }
  });
});

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies,
    });
  }
});

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect(process.env.CLIENT_HOME);
  }
);

router.get('/api/current_user', (req, res) => {
  res.json(req.user);
});

router.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_HOME);
});

module.exports = router;
