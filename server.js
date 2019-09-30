const express = require('express');
const app = express();
const path = require('path');
const moment = require('moment');
const log = require('loglevel');
const formidable = require('formidable');
const util = require('util');
const nodemailer = require("nodemailer");

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const config = require('./config/config.json');

log.setDefaultLevel(log.levels.DEBUG);

const port = process.env.PORT || 3000;

const oauth2Client = new OAuth2(
  config.clientID, // ClientID
  config.secretKey, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: config.refreshToken
});
const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
       type: "OAuth2",
       user: "apc.cic.unb@gmail.com", 
       clientId: config.clientID,
       clientSecret: config.secretKey,
       refreshToken: config.refreshToken,
       accessToken: accessToken
  }
});

const emailDefaultMessage = (taName, studentName) => {
  return (
    `Olá ${taName},
    
    O aluno ${studentName} fez um novo envio de trabalho. Você foi escalado para corrigi-lo.
    O trabalho encontra-se em anexo neste e-mail.
    
    Por favor confirme o recebimento deste email na plataforma do curso.
    
    Atenciosamente,
    Prof. Carla Castanho.
  `);
};
// Log requests for debug
app.use( (req, res, next) => {
  log.debug(`[${moment().format("DD/MM hh:mm:ss a")}] ${req.method} ${req.url}`);
  next();
});

// @POST
// Envio de trabalho
app.post('/envioDeTrabalho', (req, res) => {
  let form = new formidable.IncomingForm();
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

  form.parse(req, (err, fields, files) => {

    const studentName = fields.studentName;
    const studentID = fields.studentID;
    const trabNumber = fields.envio;

    if(err !== null){
      res.sendStatus(500).end(err.message);
    }

    // TODO: Get TA email from API
    taEmail = "giovanni.guidini@gmail.com";
    const message = {
      from: "apc.cic.unb@gmail.com",
      to: taEmail,
      subject: "Novo trabalho para ser corrigido",
      text: emailDefaultMessage("Fulano", studentName),
      attachments: [
        {
          name: files.file.name,
          path: files.file.path
        }
      ]
    }

    smtpTransport.sendMail(message, (error, response) => {
      error ? console.log(error) : console.log(response);
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