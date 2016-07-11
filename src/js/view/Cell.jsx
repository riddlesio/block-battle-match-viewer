import React from 'react';
import component from 'omniscient';

const Cell = component(function (data) {

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

    const { width, height, row, column, x, y, cellType } = data;
    let imgId = '#block-' + cellType;

    if (cellType === '0') {
        if ((row + column) % 2 == 0) {
            imgId += '-dark';
        } else {
            imgId += '-light';
        }
    }

    return (
        <use x={ x } y={ y } width={ width } height={ height } xlinkHref={imgId} />
    );
});

export default Cell;
