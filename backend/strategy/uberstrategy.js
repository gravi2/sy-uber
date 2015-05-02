var util = require('util'),
  OAuth2Strategy = require('passport-oauth').OAuth2Strategy,
  InternalOAuthError = require('passport-oauth').InternalOAuthError;

function UberStrategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://login.uber.com/oauth/authorize';
  options.tokenURL = options.tokenURL || 'https://login.uber.com/oauth/token';
  options.scope = options.scope || ['profile'];
  OAuth2Strategy.call(this, options, verify);
  this.name = 'uber';
  this.profileUrl = (options.apiEndpoint || 'https://api.uber.com') + '/v1/me';
}

util.inherits(UberStrategy, OAuth2Strategy);

UberStrategy.prototype.userProfile = function(accessToken, done) {

  this._oauth2.get(this.profileUrl, accessToken, function(err, body, res) {
    if (err) {
      sails.log.error(err);
      return done(new InternalOAuthError('failed to fetch user profile', err));
    }

    try {
      var json = JSON.parse(body);
      var profile = {
        provider: 'uber'
      };
      profile.uuid = json.uuid;
      profile.displayName = json.first_name;
      profile.name = {
        familyName: json.last_name,
        givenName: json.first_name
      };
      profile.emails = [{
        value: json.email
      }];
      profile.photos = [];
      if (json.picture) {
        profile.photos.push(json.picture);
      }
      profile._raw = body;
      profile._json = json;
      done(null, profile);
    } catch (e) {
      sails.log.error(e);
      done(e);
    }
  });
}

module.exports = UberStrategy;