"use strict";


const config = require("./lib/config");
const metrics = require("./lib/metrics");
const click = require("./lib/click");
const server = require("./lib/server");


server.listen(config.server.port, async () => {
  console.log("Start exporter");
  return undefined;
});
