(function (undefined) {

    const
        React      = require('react'),
        createView = require('omniscient');

    var cell;

    cell = createView(function (data) {

        /**
         * Data should have the following structure:
         * {
         *    x: Number,
         *    y: Number,
         *    width: Number,
         *    height: Number,
         *    className: String
         * }
         */

        return React.DOM.rect(data);
    });

    module.exports = cell;
}());
