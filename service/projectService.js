
const mailTransporter = require('./mailTransporter.js');
const fs = require('fs');
const axios = require('axios');
const APIHOST = process.env.NODE_ENV == "production" ? process.env.APIHOST : "localhost"
const APIPORT = process.env.NODE_ENV == "production" ? process.env.APIPORT : "8080"

const sendProjectUrl = 'http://' + APIHOST + ':' + APIPORT + '/project'

class projectService {
  
  constructor() {  }

  processProjectSubmission(err, fields, files) {

      if(err !== null){
        // TODO: Log the error.
        // TODO: Update project submission as failed.
        return [false, err.message];
      }
  
      const studentName = fields.studentName;
      const trabNumber = fields.ProjectTypeID;
  
      // Send Project to API
      // To register submission and get TA email
      const projectInfo = {
        "StudentID": fields.StudentID,
        "ProjectTypeID": fields.ProjectTypeID,
        "ClassID": fields.ClassID,
        "filename": files.file.name,
        "status": "Entrega ao monitor não confirmada"
      }

      console.log(projectInfo);
      axios.post(sendProjectUrl, projectInfo).then( res => {

        // TODO: Add error handling for this response

        var messageToSend = mailTransporter.emailDefaultMessage({
          "taEmail": res.data.content.monitorEmail,
          "taName": res.data.content.monitorName,
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
      });
      return [true, `Received Upload: ${files.file.name}`]
  }
}

module.exports = projectService;