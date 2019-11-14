const formidable = require('formidable');
const log = require('loglevel');
const logFormat = require('loglevel-format');

const logDefaults = {
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


const newForm = () => {

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

    return form;
}

module.exports.newForm = newForm;