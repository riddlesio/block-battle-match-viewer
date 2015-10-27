(function (undefined) {

    const
        _           = require('lodash'),
        React       = require('react'),
        createView  = require('omniscient'),
        MoveType    = require('../enum/MoveType'),
        Cell        = require('./Cell.jsx');

    var PlayerView;

    PlayerView = createView('PlayerView', function (props) {

        var { combo, skips, points, move, cells, nextShape, settings, children } = props,
            { field, player, players } = settings,
            fieldWidth = field.width * field.cell.width,
            fieldHeight = field.height * field.cell.height,
            name = players.names[children[0]],
            moveClass = "TetrisGame-playerInfo TetrisGame-playerMove",
            playerSide = "left",
            nextBackgroundX = -90.5,
            nextBlockX = -86,
            playerNameBackgroundX = -86,
            playerNameX = -10,
            playerPointsX = fieldWidth - 55,
            playerComboX = -17;

        if (!_.includes(MoveType, move)) {
            moveClass += " TetrisGame-playerMove-illegal";
        }

        if (children[0] > 0) {
            playerSide = "right";
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

        // <rect className="TetrisGame-grid-background" x="-2" y="-2" width={ fieldWidth + 4 } height={ fieldHeight + 4 } /> 
        return <g
            key={ children[0] }
            className={ "TetrisGame-playerView TetrisGame-playerView-" + playerSide }
            transform={ createTransform(children[0], fieldWidth, player.canvas) }>
                <g className="TetrisGame-grid">
                    <g dangerouslySetInnerHTML={{
                        __html: `<use x="-8" y="-8" xlink:href="#grid-background" />`
                    }} />
                    { _.map(cells, Cell) }
                </g>
                <g dangerouslySetInnerHTML={{
                    __html: `<use x="${ playerNameBackgroundX }" y="-93" xlink:href="#background-playername-${ playerSide }" />`
                }} />
                <text
                    x={ playerNameX }
                    y="-50"
                    className="TetrisGame-playerInfo TetrisGame-playerName">{ name }</text>
                <text
                    x={ playerPointsX }
                    y="-40"
                    className="TetrisGame-playerInfo TetrisGame-playerPoints">{ points }</text>
                <text
                    x={ playerComboX }
                    y="212"
                    className="TetrisGame-playerInfo TetrisGame-playerCombo TetrisGame-playerCombo-text">{ 'Combo' }</text>
                <text
                    x={ playerComboX }
                    y="240"
                    className="TetrisGame-playerInfo TetrisGame-playerCombo TetrisGame-playerCombo-combo">{ combo }</text>
                <text
                    x={ playerComboX }
                    y="280"
                    className="TetrisGame-playerInfo TetrisGame-playerSkips TetrisGame-playerSkips-text">{ 'Skips' }</text>
                <text
                    x={ playerComboX }
                    y="308"
                    className="TetrisGame-playerInfo TetrisGame-playerSkips TetrisGame-playerSkips-skips">{ skips }</text>
                <g dangerouslySetInnerHTML={{
                    __html: `<use x="${ nextBackgroundX }" y="4" xlink:href="#next-block-${ playerSide }" />`
                }} />
                <g dangerouslySetInnerHTML={{
                    __html: `<use x="${ nextBlockX }" y="53" width="81" height="108" xlink:href="#shape-${ nextShape }" />`
                }} />
                <text
                    x={ fieldWidth / 2 }
                    y={ fieldHeight + 42 }
                    className={ moveClass }>{ move }</text>
            </g>;
    });

    function createTransform (index, fieldWidth, canvas) {

        var offsetX = 230,
            offsetY = 120,
            x = offsetX + index * (canvas.width - 2 * offsetX - fieldWidth),
            y = offsetY;

        return `translate(${x}, ${y})`;
    }

    module.exports = PlayerView;
}());
