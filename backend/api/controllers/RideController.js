/**
 * RideController
 *
 * @description :: Server-side logic for managing Rides
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: true,
    prefix: '/api'
  },

  create: function(req, res, next) {
    var Model = actionUtil.parseModel(req);

    // Create data object (monolithic combination of all parameters)
    // Omit the blacklisted params (like JSONP callback param, etc.)
    var data = actionUtil.parseValues(req);
    sails.log.debug(req.user.id);
    data.user = req.user.id;

    // Create new instance of model using data from params
    Model.create(data).exec(function created(err, newInstance) {

      // Differentiate between waterline-originated validation errors
      // and serious underlying issues. Respond with badRequest if a
      // validation error is encountered, w/ validation info.
      if (err) return res.negotiate(err);

      // If we have the pubsub hook, use the model class's publish method
      // to notify all subscribers about the created item
      if (req._sails.hooks.pubsub) {
        if (req.isSocket) {
          Model.subscribe(req, newInstance);
          Model.introduce(newInstance);
        }
        Model.publishCreate(newInstance.toJSON(), !req.options.mirror && req);
      }

      // Send JSONP-friendly response if it's supported
      res.created(newInstance);
    });
  }

};