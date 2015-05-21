(function (undefined) {

    const
        AIGames     = require('aigames'),
        _           = require('lodash');

    var Parser;

    // Parser is a singleton object, so no createClass is nessecary
    /**
     * Singleton containing several utility functions for data parsing
     * @type {Object}
     */
    Parser = {

        parseMoveSet: function (states) {

            var round;

            return _.chain(states)
                .map(function (state, index) {

                    var label,
                        { round, players } = state;

                    if (state.round === round) {
                        return;
                    }

                    round = state.round;
                    label = `Round ${round}`;

                    return { label, value: index };
                })
                .compact()
                .value();
        },

        parseState: function (round, roundMove, data, settings) {

            var fieldSettings       = settings.field,
                fieldWidth          = fieldSettings.width,
                { width, height }   = fieldSettings.cell;

            return {
                round: round,
                players: _.map(settings.players.names, function (playerName) {

                    return {
                        cells: _
                            .chain(data[playerName][round].moves[roundMove].field)
                            .thru((string) => string.split(';'))
                            .map((substring) => substring.split(','))
                            .flatten()
                            .map(function (cellType, index) {

                                var row     = Math.floor(index / fieldWidth),
                                    column  = index % fieldWidth,
                                    x       = (column - 1) * width,
                                    y       = (row - 1) * height;

                                return { x, y, width, height, cellType };
                            })
                            .value()
                    };
                })
            };
        },

        parseStates: function (data, settings) {

            var fieldSettings       = settings.field,
                fieldWidth          = fieldSettings.width,
                { width, height }   = fieldSettings.cell,
                playerStates;

            playerStates = _.chain(settings.players.names)
                .map(function (playerName) {

                    return _.chain(data[playerName])
                        .map(function (roundDatum) {

                            var { moves, round } = roundDatum;

                            return roundDatum.moves.map(function (moveDatum) {

                                var cells,
                                    { field, move } = moveDatum;

                                cells = _.chain(field)
                                    .thru((string) => string.split(';'))
                                    .map((substring) => substring.split(','))
                                    .flatten()
                                    .map(function (cellType, index) {
                                        var row     = Math.floor(index / fieldWidth),
                                            column  = index % fieldWidth,
                                            x       = column * width,
                                            y       = row * height;

                                        return { x, y, width, height, cellType };
                                    })
                                    .value();

                                return { cells, move, round };
                            });
                        })
                        .flatten()
                        .value();
                })
                .reduce((a, b) => _.zip(a, b))
                .map((sub) => ({
                    round: sub[0].round,
                    players: sub.map((moveset) => _.omit(moveset, 'round'))
                }))
                .value();

            console.log(playerStates);

            return playerStates;
        }
    };

    module.exports = Parser;
}());
