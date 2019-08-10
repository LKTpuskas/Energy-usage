

### Dependencies

The main dependencies are listed below.

For the web application,

* [React](https://reactjs.org/) as web framework
* [Jest](https://facebook.github.io/jest/) for testing
* [webpack](https://webpack.js.org/) as bundler
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server) as a local dev server
* [recharts](http://recharts.org/#/en-US/) for charts

For the service,

* [Koa](https://koajs.com/) as the server framework,
* [Koa Router](https://github.com/alexmingoia/koa-router) for routing,
* [Mocha](https://mochajs.org/) as the test framework,
* [Chai](http://www.chaijs.com/) as the assertion library.

We use [yarn](https://yarnpkg.com/lang/en/docs/install/) to manage dependencies and we run node 8.9.x.

## Commands

For `webapp`,

* `yarn install` - install all dependencies
* `yarn build` - build the code
* `yarn start` - start a developer web server
* `yarn test` - run all unit tests

For `server`,

* `yarn install` - install all dependencies
* `yarn build` - compile the TypeScript to JavaScript
* `yarn start` - compile and run the web server, watching for updates and restarting as required
* `yarn serve` - start the web server using the compiled JS. The code must be compiled first. Useful for running in production.
* `yarn test` - run all unit tests

If you get a port conflict when running the server use the `PORT` environment variable to change it, e.g. `PORT=3001 yarn start` or in Windows:

```
set PORT=3001
yarn start
```
