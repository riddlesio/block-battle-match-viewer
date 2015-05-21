(function () {
	const
		_ = require('lodash');

	module.exports = function (mixinDefinition) {

		return {
			applyTo: function (context) {

				var mixin = mixinDefinition instanceof Function ? mixinDefinition(context) : mixinDefinition;

				_.extend(context, mixin);
			}
		}

	});
}());
