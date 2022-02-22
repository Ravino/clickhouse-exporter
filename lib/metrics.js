"use strict";


const config = require("./config");
const eventEmitter = require("./emitter");
const { Gauge } = require("prom-client");
const { register } = require("prom-client");


const metrics = {};
for(let item of config.promMetrics) {
  const metric = new Gauge(item.settings);
  metrics[item.name] = metric;
}


eventEmitter.on("mapResult", (data) => {

  for(let item in data) {

    const metric = metrics[item];
    const value = data[item][metric.labelNames[0]];

    metric.set(value);
  }


  const registerMetrics = register.metrics();
  eventEmitter.emit("responseResult", registerMetrics);
  return undefined;
});


module.exports = {};
