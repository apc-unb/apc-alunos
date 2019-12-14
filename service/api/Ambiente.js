const env = require('../../config/env.json');

const APIHOST = env.NODE_ENV == "production" ? env.APIHOST : "localhost"
const APIPORT = env.NODE_ENV == "production" ? env.APIPORT : "8080"
const LOGLEVEL = env.LOGLEVEL

module.exports = {
    APIHOST: APIHOST,
    APIPORT: APIPORT,
    LOGLEVEL: LOGLEVEL
};