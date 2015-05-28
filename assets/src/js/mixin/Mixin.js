(function () {
	const
		_ = require('lodash');

	// Doet niks op het moment?
	module.exports = function (mixinDefinition) {

		return {
			applyTo: function (context) {

				var mixin = mixinDefinition instanceof Function ? mixinDefinition(context) : mixinDefinition;

				_.extend(context, mixin);
			}
		}

	});
}());
