(function () {

    const
        _           = require('lodash'),
        React       = require('react'),
        createView  = require('omniscient'),
        classNames  = require('classnames'),
        Grid        = require('./Grid.jsx');

    var GameView;

    GameView = createView('GameView', function (state, canvas) {

        var { players, round, gameOver } = state,
            { width, height } = canvas;

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
            <g className="TetrisGame">
                <text className="TetrisGame-currentRound">{ round }</text>
                { _.map(players, Grid) }
                <g className={ createOverlayClass(gameOver) }>
                    <rect x="0" y="0" width={ width } height={ height } className="TetrisGame-overlayRect"/>
                </g>
            </g>
        );
    });

    // Private functions

    /**
     * Creates classes for the overlay element, hiding or displaying it
     * @return {String} classNames
     */
    function createOverlayClass (gameOver) {

        var className  = 'TetrisGame-gameOverlay',
            modifier = 'u-hidden',
            c = classNames({
                [className]: true,
                [modifier]: !gameOver
            });

        return c;
    }


    module.exports = GameView;
}());
