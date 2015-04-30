# The AI Games - Tetris Battle Frontend

This package contains the frontend code for Tetris Battle. 

## Setup

Just run `npm install`.

## Application flow

The game is bootstrapped in `assets/src/js/bootstrap.js`.

### Data handling

Data retrieval is managed by `AbstractGame`. Its implementation should take care of handling the data and managing the game loop.

### Rendering

State rendering is initiated by calling the render method in TetrisGame. This method parses the current state by calling `Parser.parseState` and subsequently renders the state to the DOM by utilising [React](https://facebook.github.io/react/) and [Omniscient](http://omniscientjs.github.io/).