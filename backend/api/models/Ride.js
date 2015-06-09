/**
 * Ride.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {

		pickupLocation: {
			type: 'json',
			required: true
		},

		dropoffLocation: {
			type: 'json',
			required: true
		},

		pickupDate: {
			type: 'datetime',
			required: true
		},

		user: {
			type: 'User',
			required: true
		},

		estimatedOn: {
			type: 'datetime'
		}
	}
};