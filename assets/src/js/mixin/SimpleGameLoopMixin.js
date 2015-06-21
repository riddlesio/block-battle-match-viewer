(function () {

    const
        _               = require('lodash'),
        AIGames         = require('aigames'),
        PlaybackEvent   = AIGames.event.PlaybackEvent;

    var SimpleGameLoopMixin = {

        applyTo: function (context) {

            var mixin = {

                /**
                 * Moves the game forward by one step
                 */
                moveForward: function () {

                    var self = this,
                        { currentState } = self.getState();

                    if (currentState !== self.states.length - 1) {
                        self.setState({ currentState: currentState + 1 });
                    }
                    else {
                        self.pause();
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

                    if (0 < currentState) {

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

                    PlaybackEvent.trigger(PlaybackEvent.PLAYING);
                },

                /**
                 * Stops the game loop
                 */
                pause: function () {

                    PlaybackEvent.trigger(PlaybackEvent.PAUSED);
                },

                setMove: function (index) {

                    return this.setState({ currentState: index });
                }
            };

            _.extend(context, mixin);
        }
    };

    module.exports = SimpleGameLoopMixin;

}());
