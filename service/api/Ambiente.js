const axios = require('axios');

const APIHOST = process.env.NODE_ENV == "production" ? process.env.APIHOST : "localhost"
const APIPORT = process.env.NODE_ENV == "production" ? process.env.APIPORT : "8080"

const Api =  axios.create({
    baseURL: 'http://' + APIHOST + ':' + APIPORT
});

module.exports = Api;