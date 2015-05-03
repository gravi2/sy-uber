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

		// format=html is for showing the dashboard. Else default to JSON response
		if ( req.param('format') == 'html') {
			req.session.format = 'html';
		} else {
			req.session.format = 'json';
		}

		sails.log.debug("format=" + req.session.format);
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
				//if format=html, show dashboard
				if (req.session.format == 'html') {
					req.session.user = user;
					res.redirect('/');
				} else {
					// render json response
					res.redirect('/api/uber/me');
				}
			}
		})(req, res);

	}
};