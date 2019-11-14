const express = require('express');
const app = express();
const path = require('path');
const moment = require('moment');
const log = require('loglevel');

const projectService = require('./service/projectService');
const form = require('./utils/formParser');
const fileRemover = require('./utils/fileRemover.js');
var Prometheus = require('./utils/prometheus');  

log.setDefaultLevel(log.levels.DEBUG);

const port = process.env.PORT || 4000;

// Log requests for debug
app.use( (req, res, next) => {
  log.debug(`${req.method} ${req.url}`);
  next();
});

// Metrics
app.use(Prometheus.requestCounters);  
// Metrics endpoint
Prometheus.injectMetricsRoute(app);

// @POST
// Envio de trabalho
app.post('/envioDeTrabalho', (req, res) => {
  const theForm = form.newForm();
  theForm.parse(req, (err, fields, files) => {
    if(err) {
      log.error("Não foi possível enviar o trabalho:", err.message);
      res.sendStatus(500).end(err.message);
      return;
    } else {
      log.debug("Processing upload...", files.file.name);
      projectService.processProjectSubmission(fields, files);
      res.end("Upload completed.");
      return;
    }
  });
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
  fileRemover.removeAllFilesFromDir();
  // Interval of 24hours
  setInterval(() => {
    log.warn('Removendo arquivos de tmp/');
    fileRemover.removeAllFilesFromDir();
  }, 86400000);
}, tomorrow5am.diff(now));

app.listen(port, () => log.info(`Example app listening on port ${port}!`));