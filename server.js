const express = require('express');
const app = express();
const path = require('path');
const moment = require('moment');
const log = require('loglevel');
const formidable = require('formidable');
const util = require('util');
const mailTransporter = require('./service/mailTransporter.js');
const fs = require('fs');

log.setDefaultLevel(log.levels.DEBUG);

const port = process.env.PORT || 3000;

const form = new formidable.IncomingForm();
form.uploadDir = "./tmp/";
form.keepExtensions = true;
form.on('fileBegin', function (name, file){
  file.path = form.uploadDir + file.name;
});
form.on('error', (err) => {
  log.error("Error Uploading file:", err.message);
  request.resume();
});
form.on('aborted', (err) =>  {
    log.warn("User abroted upload");
});
form.on('end', () => {
    log.info('Upload completed');
});

// Log requests for debug
app.use( (req, res, next) => {
  log.debug(`[${moment().format("DD/MM hh:mm:ss a")}] ${req.method} ${req.url}`);
  next();
});

// @POST
// Envio de trabalho
app.post('/envioDeTrabalho', (req, res) => {

  form.parse(req, (err, fields, files) => {

    if(err !== null){
      res.sendStatus(500).end(err.message);
    }

    const studentName = fields.studentName;
    const trabNumber = fields.envio;

    // TODO: Get TA email from API
    taEmail = "giovanni.guidini@gmail.com";
    var messageToSend = mailTransporter.emailDefaultMessage({
      "taEmail": taEmail,
      "taName": "Fulano",
      "studentName": studentName,
      "envio": trabNumber,
      "file": files.file
    });
  
    var file = files.file;
    
    mailTransporter.smtpTransport.sendMail(messageToSend, (error, response) => {
        error ? console.log(error) : console.log(response);
        
        if(error === null){
          fs.access(file.path, err => {
            if(!err){
              fs.unlinkSync(file.path);
            } else {
              console.log(err.message);
            }
          })
          console.log("Trabalho removido do servidor.");
      }
      smtpTransport.close();
    });

    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));
  });
});

// Serve the bundled jsx files
app.use('/dist', express.static(path.join(__dirname, 'dist')));
// Students area
app.use('/alunos', express.static(path.join(__dirname, 'app')));
// Everything is static 😱
app.use('/', express.static(path.join(__dirname, 'static')));

app.listen(port, () => log.info(`Example app listening on port ${port}!`));