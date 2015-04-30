(function (undefined) {
    const
        _                   = require('lodash'),
        $                   = require('jquery'), // Waarom jQuery? Je hebt hier helemaal niks met de DOM te maken
        AIGames             = require('aigames'),
        PlaybackEvent       = AIGames.event.PlaybackEvent,
        CellType            = require('../enum/CellType'), // er moet .js achter? a: nee, is nergens voor nodig
        Parser              = require('../io/Parser'),
        SimpleGameLoopMixin = require('../mixin/SimpleGameLoopMixin'),

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
            // self.handleData(_dummyData);
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

            var moves,
                // Use self where this is used more than once
                // "self" can be shortened by the minifier unlike "this"
                self = this;

            // settings en data zijn twee heel verschillende dingen,
            // die zou ik niet zomaar samen in 1 variabele stoppen
            self.settings = _.merge(self.settings, data.settings);
            console.log(self.settings);
        
            moves = Parser.parseMoveSet(data);

            // Provided by AbstractGame
            self.setMoves(moves);
            self.play();
        },

        /**
         * Moves the game forward by one step
         */
        moveForward: function () {

            var i, 
                nextRound = false,
                self = this;

            for (i = 0; i < self.players.length; i++) { // check if we need to go to the next round
                if (self.roundMove >= self.players[i].history[self.round].length - 1) {
                    nextRound = true;
                    break;
                }
            }

            if (nextRound) {
                self.roundForward();
            } else {
                self.roundMove++;
                self.render();
            }
        },

        /**
         * Moves the game forward by one round
         */
        roundForward: function () {

            var self = this;

            if (self.settings.maxRound == self.round)
                return;

            self.setRoundNumber(self.round + 1);
            self.render();
        },

        /**
         * Moves the game backward by one step
         */
        moveBackward: function () {

            var self = this;

            if (self.roundMove <= 0) {
                self.roundBackward();
            } else {
                self.roundMove--;
                self.render();
            }
        },

        /**
         * Moves the game backward by one round
         */
        roundBackward: function () {

            var i, maxMove,
                roundMove   = 0,
                self        = this;

            if (self.round <= 0 && self.roundMove <= 0)
                return;

            if (self.roundMove > 0) {
                self.setRoundNumber(self.round);
            } else {
                self.setRoundNumber(self.round - 1);

                for (i = 0; i < self.players.length; i++) { // set moveRound to maximum for this round
                    maxMove = self.players[i].history[self.round].length - 1;
                    if (roundMove < maxMove) {
                        roundMove = maxMove;
                    }
                }

                self.roundMove = roundMove;
            }

            self.render();
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
         * Sets the round Number
         */
        setRoundNumber: function (round) {

            this.round = round;
            this.roundMove = 0;
            // this.drawnRound.attr({"text": "Round " + round});
        },

        /**
         * Renders the game
         */
        render: function () {

            var self  = this,
                state = Parser.parseState(self.round, self.roundMove, self.data, self.settings);

            React.render(GameView(state), self.getDOMNode());
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
    }

    /**
     * Release the event listeners
     */ 
    function releaseEventListeners (context) {

        PlaybackEvent.off(PlaybackEvent.FORWARD, context.moveForward, context);
        PlaybackEvent.off(PlaybackEvent.FAST_FORWARD, context.roundForward, context);
        PlaybackEvent.off(PlaybackEvent.BACK, context.moveBackward, context);
        PlaybackEvent.off(PlaybackEvent.REWIND, context.roundBackward, context);
    }

    module.exports = TetrisBattle;
}());
