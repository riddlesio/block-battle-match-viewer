import _ from 'lodash';
import React from 'react';
import createView from 'omniscient';
import MoveType from '../enum/MoveType';
import Cell from './Cell.jsx';

const PlayerView = createView('PlayerView', function (props) {

    const { combo, skips, points, move, cells, nextShape, settings, children } = props;
    const { field, player, players } = settings;
    const fieldWidth = field.width * field.cell.width;
    const fieldHeight = field.height * field.cell.height;
    const name = players.names[children[0]];
    let moveClass = 'TetrisGame-playerInfo TetrisGame-playerMove';
    let playerSide = 'left';
    let nextBackgroundX = -90.5;
    let nextBlockX = -86;
    let playerNameBackgroundX = -86;
    let playerNameX = -10;
    let playerPointsX = fieldWidth - 55;
    let playerComboX = -17;

    if (!_.includes(MoveType, move)) {
        moveClass += ' TetrisGame-playerMove-illegal';
    }

    if (children[0] > 0) {
        playerSide = 'right';
        nextBackgroundX = fieldWidth + 7.5;
        nextBlockX = fieldWidth + 8;
        playerNameBackgroundX = -2;
        playerNameX = fieldWidth + 10;
        playerPointsX = 52;
        playerComboX = fieldWidth + 17;
    }

    /**
     * Data should have the following structure:
     * {
     *     combo: Integer,
     *     points: Integer,
     *     move: String,
     *     cells: [],
     *     nextShape: String
     *     settings: Object
     * }
     */

    return (
        <g
            key={ children[0] }
            className={ 'TetrisGame-playerView TetrisGame-playerView-' + playerSide }
            transform={ createTransform(children[0], fieldWidth, player.canvas) }
        >
            <g className="TetrisGame-grid">
                <use
                    x="-8"
                    y="-8"
                    xlinkHref="#grid-background"
                    width={ fieldWidth + 18 }
                    height={ fieldHeight + 18 }
                />
                { _.map(cells, Cell) }
            </g>
            <use
                width="328"
                height="71"
                x={ playerNameBackgroundX }
                y="-93"
                xlinkHref={ `#background-playername-${playerSide}` }
            />
            <text
                x={ playerNameX }
                y="-50"
                className="TetrisGame-playerInfo TetrisGame-playerName"
            >
                { name }
            </text>
            <text
                x={ playerPointsX }
                y="-40"
                className="TetrisGame-playerInfo TetrisGame-playerPoints"
            >
                { points }
            </text>
            <text
                x={ playerComboX }
                y="212"
                className="TetrisGame-playerInfo TetrisGame-playerCombo TetrisGame-playerCombo-text"
            >
                { 'Combo' }
            </text>
            <text
                x={ playerComboX }
                y="240"
                className="TetrisGame-playerInfo TetrisGame-playerCombo TetrisGame-playerCombo-combo"
            >
                { combo }
            </text>
            <text
                x={ playerComboX }
                y="280"
                className="TetrisGame-playerInfo TetrisGame-playerSkips TetrisGame-playerSkips-text"
            >
                { 'Skips' }
            </text>
            <text
                x={ playerComboX }
                y="308"
                className="TetrisGame-playerInfo TetrisGame-playerSkips TetrisGame-playerSkips-skips"
            >
                { skips }
            </text>
            <use width="85" height="184" x={ nextBackgroundX } y="4" xlinkHref={ `#next-block-${playerSide}` } />
            <use
                x={ nextBlockX }
                y="53"
                width="81"
                height="108"
                xlinkHref={ `#shape-${nextShape}` }
            />
            <text
                x={ fieldWidth / 2 }
                y={ fieldHeight + 42 }
                className={ moveClass }
            >
                { move }
            </text>
        </g>
    );
});

function createTransform(index, fieldWidth, canvas) {

    const offsetX = 230;
    const offsetY = 120;
    const x = offsetX + index * (canvas.width - 2 * offsetX - fieldWidth);
    const y = offsetY;

    return `translate(${x}, ${y})`;
}

export default PlayerView;
