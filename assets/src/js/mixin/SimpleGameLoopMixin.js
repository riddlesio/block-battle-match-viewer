(function (undefined) {

	const 
        _ = require('lodash');

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

                    this.timer = window.setInterval(handleTimer, 1000);
                    PlaybackEvent.trigger(PlaybackEvent.PLAYING);
                },

                /**
                 * Stops the game loop
                 */
                pause: function () {

                    window.clearInterval(this.timer);
                    PlaybackEvent.trigger(PlaybackEvent.PAUSED);
                }
            };

            _.extend(context, mixin);
        }
	};

	module.exports = SimpleGameLoopMixin;

}());