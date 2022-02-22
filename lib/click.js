"use strict";


const config = require("../config.js");
const eventEmitter = require("./emitter");
const {ClickHouse} = require("clickhouse");


let basicAuth = null;
if(config.clickHouse.user && config.clickHouse.password) {
  basicAuth = {
    username: config.clickHouse.user,
    password: config.clickHouse.password,
  };
}


const clickHouse = new ClickHouse({
  url: config.clickHouse.host,
  port: config.clickHouse.port,
  debug: config.clickHouse.debug,
  basicAuth: basicAuth,
  isUseGzip: false,
  format: "json", // "json" || "csv" || "tsv"
  raw: false,
  config: {
//    session_id: 'session_id if neeed',
    session_timeout: 60,
    output_format_json_quote_64bit_integers: 0,
    enable_http_compression                 : 0,
    database: config.clickHouse.db || '',
  },
});


const requestResult = async (query) => {
  const result = await clickHouse.query(query).toPromise();
  return result;
};


eventEmitter.on("requestResult", async (data) => {

  const result = {};


  for (let queryItem of config.queries) {
    const tmp = await requestResult(queryItem.query);
    const metric = config.promMetrics[queryItem.counterPosition];
    result[queryItem.name] = tmp[0];
  }


  eventEmitter.emit("mapResult", result);
  return undefined;
});


module.exports = {};
