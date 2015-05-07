(function (undefined) {

	var timer;

	const SimpleGameLoopMixin = {

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

            if (this.settings.maxRound == this.round)
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
         * Sets the round Number
         */
        setRoundNumber: function (round) {

            this.round = round;
            this.roundMove = 0;
            // this.drawnRound.attr({"text": "Round " + round});
        }
	};

	module.exports = SimpleGameLoopMixin;

}());