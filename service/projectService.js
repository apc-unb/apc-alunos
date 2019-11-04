const api = require('./api/Ambiente');
const log = require('loglevel');
const logFormat = require('loglevel-format');
const mailTransporter = require('../utils/mailTransporter.js');
const fileRemover = require('../utils/fileRemover.js');


async function updateProjectStatus(projectID, status) {
  const res = await api.put('/project/status', {
      "_id": projectID,
      "status": status
  });
  return res.data;
}

async function submitProject(projectInfo) {
  const res = await api.post('/project', projectInfo);
  return res.data;
}

var logDefaults = {
  template: '[%t] (%l): %m',
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

  async processProjectSubmission(fields, files) {
  
      const studentName = fields.studentName;
      // Send Project to API
      // To register submission and get TA email
      const projectInfo = {
        "StudentID": fields.StudentID,
        "ProjectTypeID": fields.ProjectTypeID,
        "ClassID": fields.ClassID,
        "filename": files.file.name,
      }
      
      const res = await submitProject(projectInfo);
        
      if(res.status === 200){
        const messageToSend = mailTransporter.emailDefaultMessage({
          "taEmail": res.data.content.monitorEmail,
          "taName": res.data.content.monitorName,
          "projectID": res.data.content.projectID,
          "studentName": studentName,
          "file": files.file
        });
        
        var file = files.file;
        const projectID = res.data.content.projectID;
        
        mailTransporter.smtpTransport.sendMail(messageToSend, (error, response) => {
            // Log
            error ? log.error("Erro enviando email: " + error.message) : log.debug("Email enviado: " + JSON.stringify(response));
            // Remove file from server
            if(error === null){
              // Remove o arquivo e fecha o transportador
              fileRemover.removeFileFromServer(file.path);
              smtpTransport.close();
              // Faz o update na API
              ApiServices.updateProjectStatus(projectID, "Pending");
            } else {
              // Avisa a API que nao conseguiu entregar o email
              ApiServices.updateProjectStatus(projectID, "Failed");
            }
        });
      } else {
          // Log
          log.error(err.message);
          // TODO: Pensar um jeito de avisar o aluno que não foi possível enviar o trabalho
      }

      return [true, `Received Upload: ${files.file.name}`]
  }
}

module.exports = {
  projectService
};