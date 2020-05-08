'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const API_SERVER = process.env.VUE_APP_APISERVER;
const APP_HOSTNAME = process.env.APP_HOSTNAME || '127.0.0.1'
const APPLICATION_PORT = process.env.APPLICATION_PORT || '8000'
console.log(process.env.BACKEN_SCHEMA)
const BACKEN_SCHEMA = process.env.BACKEN_SCHEMA || 'http'
const WS_SCHEMA = process.env.WS_SCHEMA || 'ws'
const BACKEN_HOST = APP_HOSTNAME + ':' + APPLICATION_PORT
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BACKEN_HOST: `'${BACKEN_HOST}'`,
    BASE_API: `'${BACKEN_SCHEMA}://${BACKEN_HOST}'`,
    APP_HOSTNAME: `'${APP_HOSTNAME}'`,
    WS_SCHEMA: `'${WS_SCHEMA}'`
    // BASE_API: '"http://127.0.0.1:8000"'
})
