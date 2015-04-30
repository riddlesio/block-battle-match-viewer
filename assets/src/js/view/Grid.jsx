(function (undefined) {

    const
        React       = require('react'),
        createView  = require('omniscient'),
        Cell        = require('./Cell');

    var Grid;

    Grid = createView(function (data) {

    	/**
    	 * Data should have the following structure:
    	 * {
    	 *     cells: []
    	 * }
    	 */
        return <g className="TetrisGame-grid">{ _.each(data.cells, Cell) }</g>;
    });

    module.exports = Grid;
}());
