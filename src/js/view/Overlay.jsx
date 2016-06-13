import React from 'react';
import createView from 'omniscient';
import classNames from 'classnames';

const Overlay = createView('Overlay', function (props) {

    const { winner } = props;

    const cx = classNames({
        'TetrisGame-overlay': true,
        'u-hidden': !winner,
    });

    const message = winner === 'none' ? 'The game is a draw' : `${winner} won the game!`;

    return (
        <g className={ cx }>
            <rect x="0" y="0" width="100%" height="100%" className="TetrisGame-overlayBackground"/>
            <text x="50%" y="50%" className="TetrisGame-overlayMessage">{ message }</text>
        </g>
    );
});

export default Overlay;
