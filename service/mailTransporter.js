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

const emailDefaultBody = (taName, studentName) => {
    return (
        `Olá ${taName},
        
        O aluno ${studentName} fez um novo envio de trabalho.
        Você foi escalado para corrigi-lo.
        O trabalho encontra-se em anexo neste e-mail.
        
        Por favor confirme o recebimento deste email na plataforma do curso.
        
        Atenciosamente,
        Prof. Carla Castanho.
    `);
};

const emailDefaultMessage = (data) => {
    return ({
        from: DEFAULT_SENDER,
        to: data.taEmail,
        subject: DEFAULT_SUBJECT,
        text: emailDefaultBody(data.taName, data.studentName),
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