const express = require('express');
const app = express();
const path = require('path');
const moment = require('moment');
const log = require('loglevel');

const { projectService, removeAllFilesFromDir } = require('./service/projectService');
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

// CREATE AN INTERVAL TO REMOVE FILES FROM tmp/ DIR
// Deletes files at 5am, everyday
// This directory is the uploads for projects, and given that the process of erasing them after sending
// the project via email to the monitor may fail, it's a good idea to have a failsafe.
// First we create a timeout for the first hit to be at the time we want.
// Then we create an interval of 24h periods to do the same thing

let now = moment();
// Today very close to midnight (very close = less than a minute off)
let tomorrow5am = moment().subtract(now.hour().toString(), 'hours').subtract(now.minute().toString(), 'minutes');
// tomorrow very close to midnight
tomorrow5am.add(1, 'day');
// tomorrow very close to 5am
tomorrow5am.add(5, 'hours');
// Set the timeout the first time
// To remove the files from the dir and then create an interval of 1 day
setTimeout( () => {
  log.warn('Removendo arquivos de tmp/');
  removeAllFilesFromDir();
  // Interval of 24hours
  setInterval(() => {
    log.warn('Removendo arquivos de tmp/');
    removeAllFilesFromDir();
  }, 86400000);
}, tomorrow5am.diff(now));

app.listen(port, () => log.info(`Example app listening on port ${port}!`));