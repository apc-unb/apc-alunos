const express = require('express');
const app = express();
const path = require('path');
const moment = require('moment');
const log = require('loglevel');

const projectService = require('./service/projectService');
const projectProcessor = new projectService();
const form = require('./service/formParser');

log.setDefaultLevel(log.levels.DEBUG);

const port = process.env.PORT || 3000;

// Log requests for debug
app.use( (req, res, next) => {
  log.debug(`[${moment().format("DD/MM hh:mm:ss a")}] ${req.method} ${req.url}`);
  next();
});

// @POST
// Envio de trabalho
app.post('/envioDeTrabalho', async (req, res) => {
  r = await form.parse(req, projectProcessor.processProjectSubmission);

  if(r.error === null){
    res.end(r[1]);
  } else {
    res.sendStatus(500).end(r[1]);
  }
});

// Serve the bundled jsx files
app.use('/dist', express.static(path.join(__dirname, 'dist')));
// Students area
app.use('/alunos', express.static(path.join(__dirname, 'app')));
// Everything is static 😱
app.use('/', express.static(path.join(__dirname, 'static')));

app.listen(port, () => log.info(`Example app listening on port ${port}!`));