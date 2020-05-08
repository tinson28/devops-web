'use strict'
const API_SERVER = process.env.VUE_APP_APISERVER;
const APP_HOSTNAME = process.env.APP_HOSTNAME || '127.0.0.1'
const APPLICATION_PORT = process.env.APPLICATION_PORT || '8000'
console.log(process.env.BACKEN_SCHEMA)
const BACKEN_SCHEMA = process.env.BACKEN_SCHEMA || 'http'
const WS_SCHEMA = process.env.WS_SCHEMA || 'ws'
let BACKEN_HOST = process.env.BACKEN_API + ':' + APPLICATION_PORT
if(BACKEN_SCHEMA=='https'){
    BACKEN_HOST=process.env.BACKEN_API
}

module.exports = {
    NODE_ENV: '"production"',
    //NODE_ENV: '"development"',
    BACKEN_HOST: `'${BACKEN_HOST}'`,
    BASE_API: `'${BACKEN_SCHEMA}://${BACKEN_HOST}'`,
    APP_HOSTNAME: `'${APP_HOSTNAME}'`,
    WS_SCHEMA: `'${WS_SCHEMA}'`
    // BASE_API: `'http://${APP_HOSTNAME}:${APPLICATION_PORT}'`,
    // APP_HOSTNAME: `'${APP_HOSTNAME}'`,
}
