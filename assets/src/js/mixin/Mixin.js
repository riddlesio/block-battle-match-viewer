(function () {
	const
		_ = require('lodash');

	var Mixin = function (augmentation) {
		this.augmentation = augmentation;
	};

	Mixin.prototype.augment = function (prototype) {

		_.extend(prototype, this.augmentation);
	};

	module.exports = Mixin;
}());
