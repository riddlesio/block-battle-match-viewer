(function (undefined) {
    
    /**
     * MoveType contains constants to translate between game data and game logic
     */
    const MoveType = {
        DOWN: 'down',
        LEFT: 'left',
        RIGHT: 'right',
        TURN_LEFT: 'turnleft',
        TURN_RIGHT: 'turnright',
        DROP: 'drop',
        NONE: ''
    };

    module.exports = MoveType;
}());