
const log = require('loglevel');
const logFormat = require('loglevel-format');
const mailTransporter = require('../utils/mailTransporter.js');
const fileRemover = require('../utils/fileRemover.js');
const Api = require('./BackServices');

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

async function processProjectSubmission(fields, files) {

  Api.configApi(fields.auth);
  const studentName = fields.studentName;
  // Send Project to API
  // To register submission and get TA email
  const projectInfo = {
    "StudentID": fields.StudentID,
    "ProjectTypeID": fields.ProjectTypeID,
    "ClassID": fields.ClassID,
    "filename": files.file.name,
  }

  var response;
  var error;
  let messageToSend;
  if(fields.resend === 'true'){
    log.debug("Resend. File:", projectInfo.filename);
    [err, res] = await Api.resendProject(fields.projectID, files.file.name);
    response = res;
    error = err;
    messageToSend = mailTransporter.emailDefaultMessage({
      "taEmail": fields.monitorEmail,
      "taName": fields.monitorName,
      "projectID": fields.projectID,
      "studentName": studentName,
      "file": files.file
    });
  } else {
    log.debug("Create new");
    [err, res] = await Api.newProjectSubmission(projectInfo);
    response = res;
    error = err;
    messageToSend = mailTransporter.emailDefaultMessage({
      "taEmail": res.data.content.monitorEmail,
      "taName": res.data.content.monitorName,
      "projectID": res.data.content.projectID,
      "studentName": studentName,
      "file": files.file
    });
  }
    
  if(response.status === 201 || response.status === 200){

    var file = files.file;
    const projectID = messageToSend.projectID;
    
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
      log.error(error.message);
      // TODO: Pensar um jeito de avisar o aluno que não foi possível enviar o trabalho
  }

  return [true, `Received Upload: ${files.file.name}`]
}

module.exports.processProjectSubmission = processProjectSubmission;