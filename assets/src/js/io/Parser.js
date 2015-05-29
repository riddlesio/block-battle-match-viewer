(function () {

    const _ = require('lodash');

    var Parser;

    /**
     * Singleton containing several utility functions for data parsing
     * @type {Object}
     */
    Parser = {

        parseMoveSet: function (states) {

            var currentRound;

            return _
                .chain(states)
                .map(function (state, index) {

                    var label,
                        { round } = state;

                    if (currentRound === round) {
                        return false;
                    }

                    currentRound = round;
                    label = `Round ${round}`;

                    return { label, value: index };
                })
                .compact()
                .value();
        },

        parseStates: function (data, settings) {

            var fieldSettings       = settings.field,
                fieldWidth          = fieldSettings.width,
                { width, height }   = fieldSettings.cell;

            return _.map(data.states, function (state) {

                var { players, round, winner } = state;

                return {
                    round,
                    winner,
                    players: _.map(players, function (player) {

                        var { field, move } = player;

                        return {
                            move,
                            cells: _
                                .chain(field)
                                .thru((string) => string.split(/,|;/))
                                .map(function (cellType, index) {
                                    var row     = Math.floor(index / fieldWidth),
                                        column  = index % fieldWidth,
                                        x       = column * width,
                                        y       = row * height;

                                    return { x, y, width, height, cellType };
                                })
                                .value()
                        };
                    })
                };
            });
        }
    };

    module.exports = Parser;
}());
