(function (undefined) {

    const
        _           = require('lodash'),
        React       = require('react'),
        createView  = require('omniscient'),
        Cell        = require('./Cell.jsx');

    var PlayerView;

    PlayerView = createView('PlayerView', function (props) {

        var { combo, points, move, cells, nextShape, settings, children } = props,
            { field, player, players } = settings,
            fieldWidth = field.width * field.cell.width,
            fieldHeight = field.height * field.cell.height,
            name = players.names[children[0]];

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
            className="TetrisGame-playerView"
            transform={ createTransform(children[0], fieldWidth, player.canvas) }>
                <g className="TetrisGame-grid">
                    { _.map(cells, Cell) }
                </g>
                <text 
                    x={ fieldWidth / 2 }
                    y="-30" 
                    className="TetrisGame-playerInfo TetrisGame-playerName">
                        { name }
                </text>
                <text 
                    x="-180" 
                    y="5%" 
                    className="TetrisGame-playerInfo TetrisGame-playerCombo">
                        { 'Combo ' + combo } 
                </text>
                <text 
                    x="-180" 
                    y="12%" 
                    className="TetrisGame-playerInfo TetrisGame-playerPoints">
                        { 'Points ' + points }
                </text>
                <svg dangerouslySetInnerHTML={{ __html: 
                    `<image 
                        x=${ fieldWidth + 25 } 
                        y=5%
                        width=99
                        height=132
                        xlink:href=${ "./img/shape_" + nextShape + ".png" } />`  
                }} />
                <text 
                    x={ fieldWidth / 2 }
                    y={ fieldHeight + 35 }
                    className="TetrisGame-playerInfo TetrisGame-playerMove">
                        { move }
                </text>
            </g>;
    });

    function createTransform (index, fieldWidth, canvas) {

        var x = 200 + index * (canvas.width - 400 - fieldWidth),
            y = 100;

        return `translate(${x}, ${y})`;
    }

    module.exports = PlayerView;
}());
