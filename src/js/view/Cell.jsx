import React from 'react';
import createView from 'omniscient';

const Cell = createView(function (data) {

    /**
     * Data should have the following structure:
     * {
     *    row: Number,
     *    column: Number,
     *    x: Number,
     *    y: Number,
     *    cellType: String
     * }
     */

    const { row, column, x, y, cellType } = data;
    let imgId = '#block-' + cellType;

    if (cellType === '0') {
        if ((row + column) % 2 == 0) {
            imgId += '-dark';
        } else {
            imgId += '-light';
        }
    }

    return (
        <g dangerouslySetInnerHTML={{
            __html: `<use x="${x}" y="${y}" xlink:href="${imgId}" />`,
        }} />
    );
});

export default Cell;
