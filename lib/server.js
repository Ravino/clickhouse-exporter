"use strict";


let result = null;


const config = require('../config');
const eventEmitter = require("./emitter");


const client = require('prom-client');
const Express = require('express');


const express = Express();
const register = client.register;


express.get(config.server.endpoint, async (req, res) => {
  res.send(result);
});


const requestResult = async () => {
  eventEmitter.emit("requestResult");
  return undefined;
};


eventEmitter.on("responseResult", async (data) => {
  result = data;
  console.log(result);
  return undefined;
});


requestResult();
setInterval(() => {
  requestResult();
  return undefined;
}, config.server.refresh);


module.exports = express;
