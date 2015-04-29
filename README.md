# Js Kickstarter

This repository can be used to kickstart JavaScript Single Page Application development. The repository comes with a useful directory structure and a predefined package.json including inflect, Lodash, React and Nflux. Furthermore, the kickstarter comes with a gulp toolchain for SASS/Compass and Browserify out of the box.

## Installation

This installation guide assumes gulp is installed and globally accessible.

Run the following commands:

```
#!bash

git clone -b master --depth 1 git@bitbucket.org:nikovanmeurs/js-kickstarter.git
cd js-kickstarter
git remote remove origin
npm install
```

## Usage

Js Kickstarter comes with a simple testing server. This server runs locally on port 8989 and can be started by running `npm start`.

### Asset deployment

Assets can be compiled, minified and deployed by running the following commands:

```
#!bash

gulp sass
gulp js
gulp deploy
```

Alternatively, Gulp can listen to changes and deploy automatically by running `gulp watch`.