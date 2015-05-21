(function (undefined) {
    const
        _                   = require('lodash'),
        React               = require('react'),
        AIGames             = require('aigames'),
        PlaybackEvent       = AIGames.event.PlaybackEvent,
        Parser              = require('../io/Parser'),
        SimpleGameLoopMixin = require('../mixin/SimpleGameLoopMixin'),
        StateMixin          = require('../mixin/StateMixin'),
        GameView            = require('../view/GameView.jsx'),

        _defaults           = require('../data/gameDefaults.json'),

        // To be removed for production
        _dummyData          = require('../data/dummyData.json');

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

            console.log('TetrisBattle');

            // register event listeners
            registerEventListeners(this);
        },

        /**
         * Cleans up anything which might cause memory leaks
         */
        destroy: function () {

            releaseEventListeners(this);
        },

        getDefaults: function () {
            return _defaults;
        },

        /**
         * Parses the received data and starts the game loop
         * @param  {Object} data
         */
        handleData: function (data) {

            var currentState,
                moves,
                settings,
                states,
                // Use self where this is used more than once
                // "self" can be shortened by the minifier unlike "this"
                self = this;

            currentState  = 0;
            settings      = _.merge(self.settings, data.settings);

            states = Parser.parseStates(data, self.settings);
            moves  = Parser.parseMoveSet(states);

            self.states   = states;
            self.settings = settings;

            self.setMoves(moves)
                .setState({ currentState })
                .play();
        },

        /**
         * Moves the game forward by one step
         */
        moveForward: function () {

            var self         = this,
                { currentState } = self.getState();

            if (currentState !== self.states.length - 1) {

                self.setState({ currentState: currentState + 1 });
            }
        },

        /**
         * Moves the game forward by one round
         */
        roundForward: function () {

            var currentRound,
                nextState,
                self = this,
                states = self.states,
                { currentState } = self.getState();

            currentRound = states[currentState].round;
            nextState    = _.findIndex(states, { round: currentRound + 1 });

            if (-1 === nextState) {

                nextState = states.length - 1;
            }

            self.setState({ currentState: nextState });
        },

        /**
         * Moves the game backward by one step
         */
        moveBackward: function () {

            var self = this,
                { currentState } = self.getState();

            if (currentState > 0) {

                self.setState({ currentState: currentState - 1 });
            }
        },

        /**
         * Moves the game backward by one round
         */
        roundBackward: function () {

            var currentRound,
                nextState,
                self = this,
                states = self.states,
                { currentState } = self.getState();

            currentRound = states[currentState].round;
            nextState    = _.findIndex(states, { round: currentRound - 1 });

            if (-1 === nextState) {
                nextState = 0;
            }

            self.setState({ currentState: nextState });
        },

        /**
         * Starts the game loop
         */
        play: function () {

            this.timer = window.setInterval(handleTimer, 200);
            PlaybackEvent.trigger(PlaybackEvent.PLAYING);
        },

        /**
         * Stops the game loop
         */
        pause: function () {

            window.clearInterval(this.timer);
            PlaybackEvent.trigger(PlaybackEvent.PAUSED);
        },

        /**
         * Renders the game
         */
        render: function (state, prevState) {

            var self   = this,
                states = self.states,
                { currentState } = state;

            React.render(GameView(states[currentState]), self.getDOMNode());
        },
    }, [StateMixin]);

    // Private functions

    function handleTimer () {
        PlaybackEvent.trigger(PlaybackEvent.FORWARD);
    }

    /**
     * Register the event listeners
     */ 
    function registerEventListeners (context) {

        PlaybackEvent.on(PlaybackEvent.PLAY, context.play, context);
        PlaybackEvent.on(PlaybackEvent.PAUSE, context.pause, context);
        PlaybackEvent.on(PlaybackEvent.FORWARD, context.moveForward, context);
        PlaybackEvent.on(PlaybackEvent.FAST_FORWARD, context.roundForward, context);
        PlaybackEvent.on(PlaybackEvent.BACK, context.moveBackward, context);
        PlaybackEvent.on(PlaybackEvent.REWIND, context.roundBackward, context);
    }

    /**
     * Release the event listeners
     */ 
    function releaseEventListeners (context) {

        PlaybackEvent.off(PlaybackEvent.PLAY, context.play, context);
        PlaybackEvent.off(PlaybackEvent.PAUSE, context.pause, context);
        PlaybackEvent.off(PlaybackEvent.FORWARD, context.moveForward, context);
        PlaybackEvent.off(PlaybackEvent.FAST_FORWARD, context.roundForward, context);
        PlaybackEvent.off(PlaybackEvent.BACK, context.moveBackward, context);
        PlaybackEvent.off(PlaybackEvent.REWIND, context.roundBackward, context);
    }

    module.exports = TetrisBattle;
}());
