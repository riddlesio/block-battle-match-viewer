(function () {

    const
        _           = require('lodash'),
        React       = require('react'),
        createView  = require('omniscient'),
        classNames  = require('classnames'),
        PlayerView  = require('./PlayerView.jsx'),
        Overlay     = require('./Overlay.jsx').jsx;

    var GameView;

    GameView = createView('GameView', function (props) {

        var { state, playerNames } = props,
            { players, round, nextShape, winner } = state;

        /**
         * Data should have the following structure:
         * {
         *     round: Integer,
         *     players: [
         *         { cells: [] },
         *         { cells: [] }
         *     ],
         *     winner: [unset | string]
         * }
         */

        return (
            <g className="TetrisGame">
                <text x="50%" y="5%" className="TetrisGame-currentRound">{ 'Round ' + round }</text>
                <text x="50%" y="10%" className="TetrisGame-nextShape">{ nextShape }</text>
                { _.map(players, PlayerView) }
                <Overlay winner={ winner } />
            </g>
        );
    });

    module.exports = GameView;
}());
