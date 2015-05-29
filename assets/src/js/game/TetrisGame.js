
(function (undefined) {
    const
        _                   = require('lodash'),
        React               = require('react'),
        AIGames             = require('aigames'),
        PlaybackEvent       = AIGames.event.PlaybackEvent,
        Parser              = require('../io/Parser'),
        StateMixin          = require('../mixin/StateMixin'),
        GameLoopMixin       = require('../mixin/SimpleGameLoopMixin'),
        GameView            = require('../view/GameView.jsx'),

        _defaults           = require('../data/gameDefaults.json');

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
            settings      = _.merge(this.getDefaults(), data.settings);

            states = Parser.parseStates(data, settings);
            moves  = Parser.parseMoveSet(states);

            self.states   = states;
            self.settings = settings;

            self.setMoves(moves)
                .setState({ currentState })
                .play();
        },

        /**
         * Renders the game
         * @param {Object} state
         * @param {Object} prevState
         */
        render: function (state, prevState) { // prevState is used for??

            var self   = this,
                states = self.states,
                { currentState } = state;

            console.log(states[currentState].players[0].move);
            React.render(GameView(states[currentState]), self.getDOMNode());
        }
    }, [StateMixin, GameLoopMixin]);

    // Private functions

    /**
     * Register the event listeners
     * @param {TetrisGame} context
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
     * @param {TetrisGame} context
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
