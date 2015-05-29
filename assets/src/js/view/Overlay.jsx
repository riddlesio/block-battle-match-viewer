(function () {

    const
        _           = require('lodash'),
        React       = require('react'),
        createView  = require('omniscient'),
        classNames  = require('classnames');

    var Overlay;

    Overlay = createView('Overlay', function (winner) {

        var cx,
            message;

        cx = classNames({
            'TetrisGame-overlay': true,
            'u-hidden': !winner
        });

        if ('none' === winner) {
            message = 'The game is a draw';
        }
        else {
            message = `Player ${winner} won the game`;
        }

        return (
            <g className={ cx }>
                <rect x="0" y="0" className="TetrisGame-overlayBackground"/>
                <text className="TetrisGame-overlayMessage">{ message }</text>
            </g>
        );
    });

    module.exports = Overlay;
}());
