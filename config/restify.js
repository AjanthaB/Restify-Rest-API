const config = require('./env/default');
const restify = require('restify');
const restifyPlugins = require('restify-plugins');

const db = require("./mongoose");

module.exports.initConfigs = (server) => {
  /**
  * Middleware
  */
  server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
  server.use(restifyPlugins.acceptParser(server.acceptable));
  server.use(restifyPlugins.queryParser({ mapParams: true }));
  server.use(restifyPlugins.fullResponse());
}

module.exports.initRoutes = (server) => {
  require('../routes/user.routes')(server)
}

module.exports.initDbAndRouted = (server) => {
  db.init(() => {

    // import all mongoose models here
    require('../models/user');

    // init all routes here
    this.initRoutes(server)
  })
}


module.exports.init = () => {
  /**
  * Initialize Server
  */
  const server = restify.createServer({
    name: config.name,
    version: config.version,
  });

  this.initConfigs(server);
  this.initDbAndRouted(server);

  return server;
}