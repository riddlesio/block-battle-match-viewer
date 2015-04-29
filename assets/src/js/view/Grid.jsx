(function (undefined) {

    const
        React       = require('react'),
        createView  = require('omniscient'),
        Cell        = require('./Cell');


    module.exports = Component(function (data) {

    	/**
    	 * Data should have the following structure:
    	 * {
    	 *     cells: []
    	 * }
    	 */
        return <g className="TetrisGame-grid">{ _.each(data.cells, Cell) }</g>;
    });
}());
