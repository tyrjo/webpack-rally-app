# ES6+ Agile Central App Development

A simple port of the Dave Thomas [BasicRallyGrid sample application](https://help.rallydev.com/intro-build-apps-videos) into a Webpack environment.

## Features
* ES6+ transpiling: Use ES6, 7, etc syntax in your Javascript (modules, classes, destructuring, etc).
* Hot-reloading: Changes in source are automatically reflected in your browser.
* ESLint: Uses the widely used AirBnB lint rules (without the React goo)
* [AVA](https://github.com/avajs/ava): Concurrent, ES6 test runner
   * no in-browser support (see [Setting up AVA for browser testing](https://github.com/avajs/ava/blob/master/docs/recipes/browser-testing.md))

## Setup
* `git clone https://github.com/tyrjo/webpack-rally-app.git`
* (Optional) Install [yarn](https://yarnpkg.com/lang/en/docs/install/) for faster package management
* `cd webpack-rally-app`
* `yarn` (or `npm install`)

## Usage
* `npm start` - launch a development server, and open the application in a web browser
* `npm run build` - create the `dist` directory and the production files that can be used for an application (currently unminified)
* `npm run lint:fix` - Automatically fix any 'fixable' ESLint errors like indenting and trailing commas
* `npm run test:watch` - Watch for changes and retest

## Questions
* how to unit test SDK code?