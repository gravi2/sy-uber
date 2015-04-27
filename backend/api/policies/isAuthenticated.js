/**
 * oAuth 2 token policy
 **/
var passport = require('passport');

module.exports = function(req, res, next) {
	sails.log.debug('Checking if user is authenticated');
	if (req.session.user) {
		return next();
	} else {
		 res.redirect('/login');
	}
};