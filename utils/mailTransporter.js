const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const config = require('../config/config.json');
const nodemailer = require("nodemailer");

const DEFAULT_SENDER = "apc.cic.unb@gmail.com";
const DEFAULT_SUBJECT = "Novo trabalho para ser corrigido";

const oauth2Client = new OAuth2(
    config.clientID, // ClientID
    config.secretKey, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);
  
oauth2Client.setCredentials({
    refresh_token: config.refreshToken
});

const accessToken = oauth2Client.getAccessToken();

const emailDefaultBody = (taName, studentName, projectID) => {
    return (
        `<html>
            <body>
                <h3>Olá ${taName},</h3>

                <p>O aluno ${studentName} fez uma nova submissão de trabalho e você foi escalado para corrigí-lo.</p>
                <p>O trabalho está em anexo.</p>
                <p>Lembre-se de confirmar o recebimento do trabalho clicando no botão abaixo.</p>

                <form action="http://localhost:8080/project/status" method="PUT">
                    <input type="hidden" name="_id" value=${projectID}>
                    <input type="hidden" name="status" value="Received">
                    <input type="submit" value="Confirmar Recebimento">
                </form>

                <p>Caso haja algum problema, a submissão do trabalho possui ID <code>${projectID}</code></p>
            </body>
        </html>`
    );
};

const emailDefaultMessage = (data) => {
    return ({
        from: DEFAULT_SENDER,
        to: data.taEmail,
        subject: DEFAULT_SUBJECT,
        html: emailDefaultBody(data.taName, data.studentName, data.projectID),
        attachments: [
          {
            name: data.file.name,
            path: data.file.path
          }
        ]
    });
};

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
  
module.exports = {
    emailDefaultMessage,
    smtpTransport
};