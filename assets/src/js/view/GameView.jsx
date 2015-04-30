(function (undefined) {

    const
        React       = require('react'),
        createView  = require('omniscient'),
        Grid        = require('./Grid.js');

    var GameView;

    GameView = createView(function (data) {
        /**
         * Data should have the following structure:
         * {
         *     round: Integer,
         *     players: [
         *         { grid: cells [] },
         *         { grid: cells [] }
         *     ]
         * }
         */
        return (
            <g class="TetrisGame">
                <text className="TetrisGame-currentRound">{ data.round }</text>
                { _.map(data.players, Grid) }
                <rect className="TetrisGame-background"/> 
            </g>
        );
    });

    module.exports = GameView;
}());
