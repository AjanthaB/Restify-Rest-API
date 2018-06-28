const restify = require("./restify")
const config = require("./env/default");

/**
 * @desc - create an instance of exress and invoke the callback
 */
module.exports.init = (callback) => {
  const server = restify.init();
  if (callback) callback(server);
}

/**
 * @desc - start the express application and listen on http://localhost:5000
 */
module.exports.start = () => {
  const _this = this;
  _this.init((server) => {
    server.listen(config.port, (err) => {
      if (err) console.log(err);
      console.log("Application is running on localhost port:5000");
    })
  })
}