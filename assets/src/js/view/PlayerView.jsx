(function (undefined) {

    const
        _           = require('lodash'),
        React       = require('react'),
        createView  = require('omniscient'),
        Cell        = require('./Cell.jsx');

    var PlayerView;

    PlayerView = createView('PlayerView', function (datum) {

        var { combo, points, move, cells, children } = datum;

        /**
         * Data should have the following structure:
         * {
         *     cells: []
         * }
         */
        return <g
            className="TetrisGame-playerView"
            transform={ createTransform(children[0]) }>
                <g className="TetrisGame-grid">
                    { _.map(cells, Cell) }
                </g>
                <text x="-180" y="5%" className="TetrisGame-playerInfo TetrisGame-playerCombo">{ 'Combo ' + combo }</text>
                <text x="-180" y="12%" className="TetrisGame-playerInfo TetrisGame-playerPoints">{ 'Points ' + points }</text>
                <text x="-180" y="19%" className="TetrisGame-playerInfo TetrisGame-playerMove">{ move }</text>
            </g>;
    });

    function createTransform (index) {
        return `translate(${ 200 + 800 * index }, 100)`;
    }

    module.exports = PlayerView;
}());
