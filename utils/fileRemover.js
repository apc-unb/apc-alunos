const fs = require('fs');
const log = require('loglevel');
const logFormat = require('loglevel-format');

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
    removeFileFromServer,
    removeAllFilesFromDir
}
  