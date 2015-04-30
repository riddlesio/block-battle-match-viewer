(function (undefined) {
    
    /**
     * MoveType contains constants to translate between game data and game logic
     */
    const moveType = {
        DOWN: 'down',
        LEFT: 'left',
        RIGHT: 'right',
        TURN_LEFT: 'turnleft',
        TURN_RIGHT: 'turnright',
        DROP: 'drop',
        // ILLEGAL: 'illegal',
        NONE: ''
    };

    module.exports = moveType;
}());