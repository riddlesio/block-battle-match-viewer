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

function parseStates(data, settings) {

    const fieldSettings      = settings.field;
    const fieldWidth         = fieldSettings.width;
    const { width, height }  = fieldSettings.cell;
    const { winner, states } = data;
    const playerNames        = settings.players.names;

    const parsedStates = states.map(state => {

        const { players, round, nextShape } = state;

        return {
            round,
            nextShape,
            winner: null,
            players: players.map(player => {

                const { field, combo, skips, points, move } = player;

                return {
                    combo,
                    skips,
                    points,
                    move,
                    cells: _.chain(field)
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

    parsedStates[parsedStates.length - 1].winner = winner !== null ? playerNames[winner] : null;

    return parsedStates;
}

export {
    parsePlayerNames,
    parseStates,
};

