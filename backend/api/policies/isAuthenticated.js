/**
 * oAuth 2 token policy
 **/
var passport = require('passport');

module.exports = function(req, res, next) {
	passport.authenticate('bearer', {
		session: false
	}, function(err, user, info) {
		if (err && !req.session.user) {
			sails.log.error(err);
			return next(err);
		}
		//if this is a browser session, check session object for user
		if (!user && req.session.user) {
			user = req.session.user;
		}

		if (user) {
			req.user = user;
			return next();
		}

		return res.send(403, {
			message: "You are not permitted to perform this action."
		});
	})(req, res);
};