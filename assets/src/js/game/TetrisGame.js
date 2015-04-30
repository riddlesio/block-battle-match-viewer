(function (undefined) {
    const
        AIGames         = require('AIGames'),
        PlaybackEvent   = AIGames.event.PlaybackEvent,

        // To be removed for production
        _defaults       = require('../data/gameDefaults.json'),
        _dummyData      = require('../data/dummyData.json');

    var TetrisBattle;
     
    /**
     * TetrisBattle class
     * @constructor
     */
    TetrisBattle = AIGames.createGame({

        /**
         * TetrisBattle construct function
         * Automatically executed when instantiating the TetrisBattle class
         * @param  {Object} options
         */
        construct: function (options) {

            var self = this;
            
            self.settings = _.merge(options, _defaults);

            // register event listeners
            registerEventListeners(self);

            // start up the game
            self.setRoundNumber(0);
            self.handleData(_dummyData);
        },

        /**
         * Cleans up anything which might cause memory leaks
         */
        destroy: function () {

            releaseEventListeners(this);
        },

        /**
         * Parses the received data and starts the game loop
         * @param  {Object} data
         */
        handleData: function (data) {

            var moves;
        
            moves = Parser.parseMoveSet(data);

            this.setMoves(moves);
            this.play();
        },

        /**
         * Moves the game forward by one step
         */
        moveForward: function () {

            var i, 
                nextRound = false;

            for (i = 0; i < this.players.length; i++) { // check if we need to go to the next round
                if (this.roundMove >= this.players[i].history[this.round].length - 1) {
                    nextRound = true;
                    break;
                }
            }

            if (nextRound) {
                this.roundForward();
            } else {
                this.roundMove++;
                this.render();
            }
        },

        /**
         * Moves the game forward by one round
         */
        roundForward: function () {

            if (this.maxRound == this.round)
                return;

            this.setRoundNumber(this.round + 1);
            this.render();
        },

        /**
         * Moves the game backward by one step
         */
        moveBackward: function () {

            if (this.roundMove <= 0) {
                this.roundBackward();
            } else {
                this.roundMove--;
                this.render();
            }
        },

        /**
         * Moves the game backward by one round
         */
        roundBackward: function () {

            var i, maxMove,
                roundMove = 0;

            if (this.round <= 0 && this.roundMove <= 0)
                return;

            if (this.roundMove > 0) {
                this.setRoundNumber(this.round);
            } else {
                this.setRoundNumber(this.round - 1);

                for (i = 0; i < this.players.length; i++) { // set moveRound to maximum for this round
                    maxMove = this.players[i].history[this.round].length - 1;
                    if (roundMove < maxMove) {
                        roundMove = maxMove;
                    }
                }

                this.roundMove = roundMove;
            }

            this.render();
        },

        /**
         * Starts the game loop
         */
        play: function () {
            
            /**
             * TODO: Start the game loop
             */

            PlaybackEvent.trigger(PlaybackEvent.PLAYING);
        },

        /**
         * Stops the game loop
         */
        pause: function () {

            /**
             * TODO: Stop the game loop
             */

            PlaybackEvent.trigger(PlaybackEvent.PAUSED);
        },

        /**
         * Renders the game
         * @param  {Object} state
         */
        render: function () {

            var state = Parser.parseState(this.round, this.roundMove, this.data, this.settings);

            React.render(GameView(state), this.getDOMNode());
        },

        /**
         * Sets the round Number
         */
        setRoundNumber: function (round) {

            this.round = round;
            this.roundMove = 0;
            this.drawnRound.attr({"text": "Round " + round});
        },
    });

    // Private functions

    /**
     * Register the event listeners
     */ 
    function registerEventListeners (context) {

        PlaybackEvent.on(PlaybackEvent.FORWARD, context.moveForward, context);
        PlaybackEvent.on(PlaybackEvent.FAST_FORWARD, context.roundForward, context);
        PlaybackEvent.on(PlaybackEvent.BACK, context.moveBackward, context);
        PlaybackEvent.on(PlaybackEvent.REWIND, context.roundBackward, context);
    },

    /**
     * Release the event listeners
     */ 
    function releaseEventListeners (context) {

        PlaybackEvent.off(PlaybackEvent.FORWARD, context.moveForward, context);
        PlaybackEvent.off(PlaybackEvent.FAST_FORWARD, context.roundForward, context);
        PlaybackEvent.off(PlaybackEvent.BACK context.moveBackward, context);
        PlaybackEvent.off(PlaybackEvent.REWIND context.roundBackward, context);
    }

    module.exports = TetrisBattle;
}());
