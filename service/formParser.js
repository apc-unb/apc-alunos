const formidable = require('formidable');
const log = require('loglevel');

log.setDefaultLevel(log.levels.INFO);

form = new formidable.IncomingForm();
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

module.exports = form;