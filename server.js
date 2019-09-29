const express = require('express');
const app = express();
const path = require('path');
const moment = require('moment');
const log = require('loglevel');
const formidable = require('formidable');
const util = require('util');

log.setDefaultLevel(log.levels.INFO);

const port = process.env.PORT || 3000;

// Log requests for debug
app.use( (req, res, next) => {
  log.debug(`[${moment().format("DD/MM hh:mm:ss a")}] ${req.method} ${req.url}`);
  next();
});

app.post('/envioDeTrabalho', (req, res) => {
  let form = new formidable.IncomingForm();
  form.uploadDir = "./tmp/";
  form.keepExtensions = true;

  form.parse(req, function(err, fields, files) {

    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));
  });
});

// Serve the bundled jsx files
app.use('/dist', express.static(path.join(__dirname, 'dist')));
// Students area
app.use('/alunos', express.static(path.join(__dirname, 'area_restrita')));
// Everything is static 😱
app.use('/', express.static(path.join(__dirname, 'static')));

app.listen(port, () => log.info(`Example app listening on port ${port}!`));