(function (undefined) {

    const
        _           = require('lodash'),
        React       = require('react'),
        createView  = require('omniscient'),
        MoveType    = require('../enum/MoveType'),
        Cell        = require('./Cell.jsx');

    var PlayerView;

    PlayerView = createView('PlayerView', function (props) {

        var { combo, points, move, cells, nextShape, settings, children } = props,
            { field, player, players } = settings,
            fieldWidth = field.width * field.cell.width,
            fieldHeight = field.height * field.cell.height,
            name = players.names[children[0]],
            moveClass = "TetrisGame-playerInfo TetrisGame-playerMove";

        if (!_.includes(MoveType, move)) {
            moveClass += " TetrisGame-playerMove-illegal";
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
        return <g
            key={ children[0] }
            className="TetrisGame-playerView"
            transform={ createTransform(children[0], fieldWidth, player.canvas) }>
                <g className="TetrisGame-grid">
                    <rect className="TetrisGame-grid-background" x="-2" y="-2" width={ fieldWidth + 4 } height={ fieldHeight + 4 } />
                    { _.map(cells, Cell) }
                </g>
                <rect className="TetrisGame-playerName-background" x="-2" y="-77" width={ fieldWidth + 4 } height="73" />
                <text
                    x={ fieldWidth / 2 }
                    y="-30"
                    className="TetrisGame-playerInfo TetrisGame-playerName">{ name }</text>
                <text
                    x={ fieldWidth + 25 }
                    y="80"
                    className="TetrisGame-playerInfo TetrisGame-playerPoints">{ 'Points ' + points }</text>
                <text
                    x={ fieldWidth + 25}
                    y="130"
                    className="TetrisGame-playerInfo TetrisGame-playerCombo">{ 'Combo ' + combo }</text>
                <g dangerouslySetInnerHTML={{
                    __html: `<use x="-130" y="30" width="99" height="132" xlink:href="#shape-${ nextShape }" />`
                }} />
                <text
                    x={ fieldWidth / 2 }
                    y={ fieldHeight + 48 }
                    className={ moveClass }>{ move }</text>
            </g>;
    });

    function createTransform (index, fieldWidth, canvas) {

        var x = 200 + index * (canvas.width - 400 - fieldWidth),
            y = 100;

        return `translate(${x}, ${y})`;
    }

    module.exports = PlayerView;
}());
