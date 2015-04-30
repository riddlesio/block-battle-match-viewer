(function (undefined) {

    const
        AIGames      = require('aigames'),
        TetrisGame   = require('./game/TetrisGame');

    var game;

    // Wraps the game for use on TheAIGames website
    // Takes care of setting up and destroying the competition namespace
    // console.log(AIGames);
    game = new TetrisGame({
        name: 'tetris-game',
        player: {
            // Determines whether they player's chrome should be displayed
            chrome: true,
            // Determines whether view selection should be possible
            viewstack: false,
            // A number between 0 and 1
            aspectRatio: 1000 / 558
        }
    });

}());