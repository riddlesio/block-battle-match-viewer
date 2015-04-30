(function (undefined) {

    const
        React      = require('react'),
        createView = require('omniscient');

    var Cell;

    Cell = createView(function (data) {

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

    module.exports = Cell;
}());
