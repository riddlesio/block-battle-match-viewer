(function () {

    const
        _           = require('lodash'),
        React       = require('react'),
        createView  = require('omniscient'),
        PlayerView  = require('./PlayerView.jsx'),
        Overlay     = require('./Overlay.jsx').jsx;

    var GameView;

    GameView = createView('GameView', function (props) {

        var { state, settings } = props,
            { players, round, nextShape, winner } = state,
            playerView = [];

        _.forEach(players, function (player) {
            playerView.push(_.assign({ 
                "settings": settings,
                "nextShape": nextShape
            }, player));
        });

        /**
         * Data should have the following structure:
         * {
         *     round: Integer,
         *     playerView: [
         *         Object,
         *         Object
         *     ],
         *     winner: [unset | string]
         * }
         */

        return (
            <g className="TetrisGame">
                <text x="50%" y="5%" className="TetrisGame-currentRound">{ 'Round ' + round }</text>
                { _.map(playerView, PlayerView) }
                <Overlay winner={ winner } />
            </g>
        );
    });

    module.exports = GameView;
}());
