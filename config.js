"use strict";

const pathConf = global.process.env.CLICKHOUSE_EXPORTER_PATH_CONFIG || "./config.json";
const port = global.process.env.CLICKHOUSE_EXPORTER_PORT || 9333;
const host = global.process.env.CLICKHOUSE_EXPORTER_HOST || "0.0.0.0";
const endpoint = global.process.env.CLICKHOUSE_EXPORTER_ENDPOINT || "/metrics";
const debug = global.process.env.CLICKHOUSE_EXPORTER_DEBUG || false;
const refresh = global.process.env.CLICKHOUSE_EXPORTER_REFRESH || 60000;


const clickhouseHost = global.process.env.CLICKHOUSE_HOST || "127.0.0.1";
const clickhousePort = global.process.env.CLICKHOUSE_PORT || 8123;
const clickhouseUser = global.process.env.CLICKHOUSE_USER || "default";
const clickhousePassword = global.process.env.CLICKHOUSE_PASSWORD || "default";
const clickhouseDb = global.process.env.CLICKHOUSE_DB || "";


let conf = {};
try {
  conf = require(pathConf);
}
catch(err) {
  console.log("Config not found. Used default config");
}


const ch = conf.clickHouse || {};
const server = conf.server || {};
const queries = conf.queries || undefined;
const promMetrics = conf.promMetrics || undefined;


const config = {
  "server": {
    "port": server.port || port,
    "host": server.host || host,
    "endpoint": server.endpoint || endpoint,
    "debug": server.debug || debug,
    "refresh": server.refresh || refresh,
  },


  "clickHouse": {
    "host": ch.host || clickhouseHost,
    "port": ch.port || clickhousePort,
    "username": ch.username || clickhouseUser,
    "password": ch.password || clickhousePassword,
    "db": ch.db || clickhouseDb
  },


  "queries": conf.queries || [],


  "promMetrics": conf.promMetrics || [],
};


module.exports = config;
