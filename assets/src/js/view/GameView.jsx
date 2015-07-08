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
            <svg className="TetrisGame" viewBox="0 0 1515 890" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <symbol id='shape-I' viewBox='0 0 99 132'>
                        <rect x="33" y="0" className="TetrisGame-cell--I" width="32.5" height="32.5"/>
                        <rect x="33" y="33" className="TetrisGame-cell--I" width="32.5" height="32.5"/>
                        <rect x="33" y="66" className="TetrisGame-cell--I" width="32.5" height="32.5"/>
                        <rect x="33" y="99" className="TetrisGame-cell--I" width="32.5" height="32.5"/>
                    </symbol>
                    <symbol id='shape-J' viewBox='0 0 99 132'>
                        <rect x="49.5" y="16.5" className="TetrisGame-cell--J" width="32.5" height="32.5"/>
                        <rect x="49.5" y="49.5" className="TetrisGame-cell--J" width="32.5" height="32.5"/>
                        <rect x="49.5" y="82.5" className="TetrisGame-cell--J" width="32.5" height="32.5"/>
                        <rect x="16.5" y="82.5" className="TetrisGame-cell--J" width="32.5" height="32.5"/>
                    </symbol>
                    <symbol id='shape-L' viewBox='0 0 99 132'>
                        <rect x="16.5" y="16.5" className="TetrisGame-cell--L" width="32.5" height="32.5"/>
                        <rect x="16.5" y="49.5" className="TetrisGame-cell--L" width="32.5" height="32.5"/>
                        <rect x="16.5" y="82.5" className="TetrisGame-cell--L" width="32.5" height="32.5"/>
                        <rect x="49.5" y="82.5" className="TetrisGame-cell--L" width="32.5" height="32.5"/>
                    </symbol>
                    <symbol id='shape-O' viewBox='0 0 99 132'>
                        <rect x="16.5" y="33" className="TetrisGame-cell--O" width="32.5" height="32.5"/>
                        <rect x="16.5" y="66" className="TetrisGame-cell--O" width="32.5" height="32.5"/>
                        <rect x="49.5" y="33" className="TetrisGame-cell--O" width="32.5" height="32.5"/>
                        <rect x="49.5" y="66" className="TetrisGame-cell--O" width="32.5" height="32.5"/>
                    </symbol>
                    <symbol id='shape-S' viewBox='0 0 99 132'>
                        <rect x="16.5" y="16.5" className="TetrisGame-cell--S" width="32.5" height="32.5"/>
                        <rect x="16.5" y="49.5" className="TetrisGame-cell--S" width="32.5" height="32.5"/>
                        <rect x="49.5" y="49.5" className="TetrisGame-cell--S" width="32.5" height="32.5"/>
                        <rect x="49.5" y="82.5" className="TetrisGame-cell--S" width="32.5" height="32.5"/>
                    </symbol>
                    <symbol id='shape-T' viewBox='0 0 99 132'>
                        <rect x="16.5" y="16.5" className="TetrisGame-cell--T" width="32.5" height="32.5"/>
                        <rect x="16.5" y="49.5" className="TetrisGame-cell--T" width="32.5" height="32.5"/>
                        <rect x="16.5" y="82.5" className="TetrisGame-cell--T" width="32.5" height="32.5"/>
                        <rect x="49.5" y="49.5" className="TetrisGame-cell--T" width="32.5" height="32.5"/>
                    </symbol>
                    <symbol id='shape-Z' viewBox='0 0 99 132'>
                        <rect x="49.5" y="16.5" className="TetrisGame-cell--Z" width="32.5" height="32.5"/>
                        <rect x="49.5" y="49.5" className="TetrisGame-cell--Z" width="32.5" height="32.5"/>
                        <rect x="16.5" y="49.5" className="TetrisGame-cell--Z" width="32.5" height="32.5"/>
                        <rect x="16.5" y="82.5" className="TetrisGame-cell--Z" width="32.5" height="32.5"/>
                    </symbol>
                </defs>
                <text x="50%" y="70" className="TetrisGame-currentRound">{ 'Round ' + round }</text>
                { _.map(playerView, PlayerView) }
                <Overlay winner={ winner } />
            </svg>
        );
    });

    module.exports = GameView;
}());
