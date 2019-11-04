const axios = require('axios');

const APIHOST = process.env.NODE_ENV == "production" ? process.env.APIHOST : "localhost"
const APIPORT = process.env.NODE_ENV == "production" ? process.env.APIPORT : "8080"

module.exports = {
    APIHOST: APIHOST,
    APIPORT: APIPORT
};