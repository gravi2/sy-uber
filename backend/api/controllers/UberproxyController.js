/**
 * UberproxyController
 *
 * @description :: Server side proxy for Uber API calls
 */

var request = require('request');

module.exports = {

	_config: {
		actions: false,
		shortcuts: false,
		rest: false
	},

	_makeUberGetCall: function(req, res, url, headers) {
		var options = {
			url: url,
			qs: req.query,
			headers: headers
		};

		request(options, function(error, response, body) {
			if (!error) {
				jsonResponse = JSON.parse(body)
				res.json(jsonResponse);
			} else {
				sails.log.error(error);
			}
		});
	},

	_makeUberServerGetCall: function(req, res, url) {
		var headers = {
			'Authorization': 'Token ' + sails.config.uber.serverToken
		};
		this._makeUberGetCall(req, res, url, headers);
	},

	_makeUberUserGetCall: function(req, res, url) {
		var headers = {
			'Authorization': 'Bearer ' + req.user.uberAccessToken
		};
		this._makeUberGetCall(req, res, url, headers);
	},

	history: function(req, res) {
		this._makeUberUserGetCall(req, res, sails.config.uber.apiEndpoint + '/v1.2/history');
	},

	profile: function(req, res) {
		this._makeUberUserGetCall(req, res, sails.config.uber.apiEndpoint + '/v1/me');
	},

	products: function(req, res) {
		this._makeUberServerGetCall(req, res, sails.config.uber.apiEndpoint + '/v1/products');
	},

	priceEstimates: function(req, res) {
		this._makeUberServerGetCall(req, res, sails.config.uber.apiEndpoint + '/v1/estimates/price');
	},

	timeEstimates: function(req, res) {
		this._makeUberServerGetCall(req, res, sails.config.uber.apiEndpoint + '/v1/estimates/time');
	}

};