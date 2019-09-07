const express = require('express');
const app = express();
const path = require('path');
const moment = require('moment');
const log = require('loglevel');
log.setDefaultLevel(log.levels.INFO);

const port = process.env.PORT || 3000;

// Log requests for debug
app.use( (req, res, next) => {
  log.debug(`[${moment().format("DD/MM hh:mm:ss a")}] ${req.method} ${req.url}`);
  next();
});

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// Serve the bundled jsx files
app.use('/dist', express.static(path.join(__dirname, 'dist')));
// Students area
app.use('/alunos', express.static(path.join(__dirname, 'area_restrita')));
// Everything is static 😱
app.use('/', express.static(path.join(__dirname, 'static')));

app.listen(port, () => log.info(`Example app listening on port ${port}!`));