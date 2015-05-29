(function () {

    const
        _           = require('lodash'),
        React       = require('react'),
        createView  = require('omniscient'),
        Grid        = require('./Grid.jsx');

    var GameView;

    GameView = createView('GameView', function (state) {

        var { players, round } = state;
        /**
         * Data should have the following structure:
         * {
         *     round: Integer,
         *     players: [
         *         { cells: [] },
         *         { cells: [] }
         *     ]
         * }
         */
        return (
            <g class="TetrisGame">
                <text className="TetrisGame-currentRound">{ round }</text>
                { _.map(players, Grid) }
                <rect className="TetrisGame-background"/>
            </g>
        );
    });

    module.exports = GameView;
}());
