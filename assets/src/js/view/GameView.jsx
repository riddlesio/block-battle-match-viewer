(function () {

    const
        _           = require('lodash'),
        React       = require('react'),
        createView  = require('omniscient'),
        classNames  = require('classnames'),
        Grid        = require('./Grid.jsx'),
        Overlay     = require('./Overlay.jsx').jsx;

    var GameView;

    GameView = createView('GameView', function (props) {

        var { state, playerNames } = props,
            { players, round, winner } = state;

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
        
        console.log(state);

        return (
            <g className="TetrisGame">
                <text x="50%" y="5%" className="TetrisGame-currentRound">{ 'Round ' + round }</text>
                { _.map(players, Grid) }
                <Overlay winner={ winner } />
            </g>
        );
    });

    module.exports = GameView;
}());
