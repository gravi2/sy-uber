/**
 * UserController
 *
 * @description :: Server-side logic for managing Dashboard i.e logged in page
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	_config: {
		actions: false,
		shortcuts: false,
		rest: false
	},

	index: function(req, res) {
		res.view('dashboard/index');
	}

};