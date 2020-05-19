const passport = require('passport');
const GooleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../database/models/Users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GooleStrategy(
    {
      clientID: process.env.G_Key,
      clientSecret: process.env.G_Secret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ userId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            userId: profile.id,
            username: profile.displayName,
            picture: profile._json.picture,
          })
            .save()
            .then((user) => {
              done(null, user);
            });
        }
      });
    }
  )
);
