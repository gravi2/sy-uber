'use strict';

var jwt = require('jsonwebtoken');

var passport = require('passport'),
  BearerStrategy = require('passport-http-bearer').Strategy,
  UberStrategy = require('../../strategy/uberstrategy');

var verifyHandler = function(token, tokenSecret, profile, done) {
  sails.log.debug('Verifying the uber tokens returned by uber oAuth2 service');
  User.findOne({
    uuid: profile.uuid
  }, function(err, user) {

    if (err) {
      sails.log.error(err);
      //TODO: error out
      return done(null, null);
    }

    if (user) {
      sails.log.debug('Found user in DB with uuid=' + profile.uuid);
      user.accessToken = token;
      user.save(function(error) {
        return done(null, user);
      });
    } else {
      sails.log.debug('Saving new user in DB with uuid=' + profile.uuid);
      var data = {
        provider: profile.provider,
        uuid: profile.uuid,
        name: profile.displayName
      };

      if (profile.emails && profile.emails[0] && profile.emails[0].value) {
        data.email = profile.emails[0].value;
      }
      if (profile.name && profile.name.givenName) {
        data.firstname = profile.name.givenName;
      }
      if (profile.name && profile.name.familyName) {
        data.lastname = profile.name.familyName;
      }

      if (profile.photos && profile.photos[0]) {
        data.picture = profile.photos[0];
      }

      data.accessToken = jwt.sign(data, sails.config.jwt.secret, {
        algorithm: sails.config.jwt.algorithm,
        issuer: sails.config.jwt.issuer,
        audience: sails.config.jwt.audience,
        expiresInMinutes: sails.config.jwt.expiresInMinutes
      });

      data.uberAccessToken = token;
      data.uberRefreshToken = tokenSecret;

      User.create(data, function(err, user) {
        sails.log.debug('New user saved with uuid=' + user.uuid);
        return done(err, user);
      });
    }
  });
};

passport.serializeUser(function(user, done) {
  done(null, user.uid);
});

passport.deserializeUser(function(uid, done) {
  User.findOne({
    uuid: uid
  }, function(err, user) {
    done(err, user);
  });
});

module.exports = {
  loadStrategies: function() {
    passport.use('UberAuth', new UberStrategy({
      authorizationURL: sails.config.uber.authorizationURL,
      tokenURL: sails.config.uber.tokenURL,
      clientID: sails.config.uber.clientID,
      clientSecret: sails.config.uber.clientSecret,
      callbackURL: sails.config.uber.callbackURL,
      scope: ['profile', 'history']
    }, verifyHandler));

    passport.use('bearer', new BearerStrategy(
      function(token, done) {
        sails.log.debug('Verifying the JWT token ' + token);
        try {
          var decoded = jwt.verify(token, sails.config.jwt.secret, {
            algorithm: sails.config.jwt.algorithm,
            issuer: sails.config.jwt.issuer,
            audience: sails.config.jwt.audience,
            expiresInMinutes: sails.config.jwt.expiresInMinutes
          });
        } catch (err) {
          return done(err);
        }

        sails.log.debug('Token verified, now looking for user in DB');

        User.findOne({
          accessToken: token
        }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          return done(null, user, {
            scope: 'all'
          });
        });
      }
    ));
  }
};