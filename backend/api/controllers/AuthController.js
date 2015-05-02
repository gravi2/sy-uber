/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');

module.exports = {

	_config: {
		actions: false,
		shortcuts: false,
		rest: false
	},

	uberLogin: function(req, res) {

		passport.authenticate('UberAuth', function(err, user, info) {
			if ((err) || (!user)) {
				return res.send({
					message: info.message,
					user: user
				});
			}
			req.logIn(user, function(err) {
				if (err) res.send(err);
				return res.send({
					message: info.message,
					user: user
				});
			});

		})(req, res);
	},

	logout: function(req, res) {
		req.logout();
		req.session.user = null;
		res.redirect('/login');
	},

	authorize: function(req, res) {
		passport.authenticate('UberAuth', function(err, user, info) {
			if (err) {
				sails.log.debug(err);
			} else {
				req.session.user = user;
			}
			res.redirect('/');
		})(req, res);

	}
};