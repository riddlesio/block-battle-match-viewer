(function (undefined) {

    const
        _           = require('lodash'),
        React       = require('react'),
        createView  = require('omniscient'),
        Cell        = require('./Cell.jsx');

    var Grid;

    Grid = createView('Grid', function (datum) {

        var { cells, children } = datum;

        /**
         * Data should have the following structure:
         * {
         *     cells: []
         * }
         */
        return <g
            className="TetrisGame-grid"
            transform={ createTransform(children[0]) }>
                { _.map(cells, Cell) }
            </g>;
    });

    function createTransform (index) {
        return `translate(${ 200 + 800 * index }, 100)`;
    }

    module.exports = Grid;
}());
