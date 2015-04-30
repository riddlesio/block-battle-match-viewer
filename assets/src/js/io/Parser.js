(function (undefined) {
    'use strict';

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

        parseMoveSet: function (data) {
            return [];
        },

        parseState: function (round, roundMove, data, settings) {

            var fieldString,
                state = {};

            state.round = round;
            state.players = [];

            _.each(settings.players.names, function (player) {
                fieldString = data[player][round].moves[roundMove].field;
                console.log(fieldString);
                // continue here....
            });
        }
    };

    module.exports = Parser;
}());