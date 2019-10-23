const logFormat = require('loglevel-format');


const mailTransporter = require('./mailTransporter.js');
const fs = require('fs');
const axios = require('axios');
const APIHOST = process.env.NODE_ENV == "production" ? process.env.APIHOST : "localhost"
const APIPORT = process.env.NODE_ENV == "production" ? process.env.APIPORT : "8080"

const sendProjectUrl = 'http://' + APIHOST + ':' + APIPORT + '/project'

const log = require('loglevel');

var logDefaults = {
  template: '[%t] <%l>: %m',
  messageFormatter: function(data){
    return data;  
  },
  timestampFormatter: function (date) {
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
  },
  levelFormatter: function (level) {
    return level.toUpperCase();
  },
  appendExtraArguments: false
};

log.setDefaultLevel(log.levels.INFO);
logFormat.apply(log, logDefaults);
class projectService {
  
  constructor() {  }

  processProjectSubmission(err, fields, files) {

      if(err !== null){
        log.error("Não foi possível enviar o trabalho:", err.message);
        return [false, err.message];
      }
  
      const studentName = fields.studentName;
  
      // Send Project to API
      // To register submission and get TA email
      const projectInfo = {
        "StudentID": fields.StudentID,
        "ProjectTypeID": fields.ProjectTypeID,
        "ClassID": fields.ClassID,
        "filename": files.file.name,
        "status": "Entrega ao monitor não confirmada"
      }

      axios.post(sendProjectUrl, projectInfo).then( res => {

        const messageToSend = mailTransporter.emailDefaultMessage({
          "taEmail": res.data.content.monitorEmail,
          "taName": res.data.content.monitorName,
          "studentName": studentName,
          "file": files.file
        });
      
        var file = files.file;
        
        mailTransporter.smtpTransport.sendMail(messageToSend, (error, response) => {
            // Log
            error ? log.error("Erro enviando email: " + error.message) : log.debug("Email enviado: " + JSON.stringify(response));
            // Remove file from server
            if(error === null){
              // Remove o arquivo e fecha o transportador
              removeFileFromServer(file.path);
              smtpTransport.close();
              // TODO: Avisa a api que o email foi entregue
            } else {
              // TODO: Avisa a API que nao conseguiu entregar o email
            }
        });
      }).catch(err => {
          // Log
          log.error(err.message);
      });

      return [true, `Received Upload: ${files.file.name}`]
  }
}

const removeFileFromServer = (path) => {
  fs.access(path, err => {
    if(!err){
      try{
        fs.unlinkSync(path);
      } catch(err) {
        log.error("Não foi possível remover o trabalho "+ path +" do servidor: " + err.message);
      }
      log.info("Trabalho " + path + " removido do servidor.");
    } else {
      log.error("Não foi possível acessar o trabalho " + path + " no servidor:" + err.message);
    }
  })
};

const DEFAULT_DIR = 'tmp';
const removeAllFilesFromDir = () => {
  fs.readdir(DEFAULT_DIR, (err, files) => {
    if (err) {
      log.error(err.message);
    };
  
    for (const file of files) {
      fs.unlinkSync(path.join(DEFAULT_DIR, file), err => {
        if (err) 
        log.error(err.message);
      });
    }
  });
}

module.exports = {
  projectService,
  removeAllFilesFromDir
};