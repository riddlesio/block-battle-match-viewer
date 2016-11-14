import _ from 'lodash';

function parsePlayerNames(playerData, settings) {

    settings.players.names = [];
    settings.players.emailHash = [];

    playerData.forEach((player) => {
        const name = player.name ? player.name : '';
        const hash = player.emailHash ? player.emailHash : '';

        settings.players.names.push(name);
        settings.players.emailHash.push(hash);
    });

    return settings;
}

// function parseMoveSet(states) {
//
//     let currentRound;
//
//     return _
//         .chain(states)
//         .map(function (state, index) {
//
//             let label;
//             const { round } = state;
//
//             if (currentRound === round) return false;
//
//             currentRound = round;
//             label = `Round ${round}`;
//
//             return { label, value: index };
//         })
//         .compact()
//         .value();
// }

function parseStates(data, settings) {

    const fieldSettings     = settings.field;
    const fieldWidth        = fieldSettings.width;
    const { width, height } = fieldSettings.cell;

    return _.map(data.states, function (state, index) {

        const { players, round, nextShape } = state;
        let winner = undefined;
        
        if (index === data.states.length - 1) {
            winner = state.winner ? settings.players.names[parseInt(winner.replace('player', '')) - 1] : 'none';
        }

        return {
            round,
            nextShape,
            winner,
            players: _.map(players, function (player) {

                const { field, combo, skips, points, move } = player;

                return {
                    combo,
                    skips,
                    points,
                    move,
                    cells: _
                        .chain(field)
                        .thru((string) => string.split(/,|;/))
                        .map(function (cellType, index) {
                            const row    = Math.floor(index / fieldWidth);
                            const column = index % fieldWidth;
                            const x      = column * width;
                            const y      = row * height;

                            return { row, column, x, y, width, height, cellType };
                        })
                        .value(),
                };
            }),
        };
    });
}

export {
    parsePlayerNames,
    parseStates,
};

