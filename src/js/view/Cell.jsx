(function (undefined) {

    const
        React      = require('react'),
        createView = require('omniscient'),
        classNames = require('classnames'),
        CellType   = require('../enum/CellType');

    var Cell;

    Cell = createView(function (data) {

        /**
         * Data should have the following structure:
         * {
         *    row: Number,
         *    column: Number,
         *    x: Number,
         *    y: Number,
         *    width: Number,
         *    height: Number,
         *    cellType: String
         * }
         */

        var className,
            { row, column, x, y, width, height, cellType } = data,
            imgId = "#block-" + cellType;

        if (cellType === "0") {
            if ( (row + column) % 2 == 0 ) {
                imgId += "-dark";
            } else {
                imgId += "-light";
            }
        }

        return (
            <g dangerouslySetInnerHTML={{
                __html: `<use x="${ x }" y="${ y }" xlink:href="${ imgId }" />`
            }} />
        );
    });

    module.exports = Cell;
}());
