var Register = require('prom-client').register;  
var Counter = require('prom-client').Counter;  
var Histogram = require('prom-client').Histogram;  
var Summary = require('prom-client').Summary;  
var ResponseTime = require('response-time');  
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

/**
 * A Prometheus counter that counts the invocations with different paths
 * e.g. /foo and /bar will be counted as 2 different paths
 */
module.exports.pathsTaken = platformAccess = new Counter({  
    name: 'platformAccess',
    help: 'Access in the students platform',
    labelNames: ['origin']
});

module.exports.classesAccessed = classesAccessed = new Counter({
    name: 'classesAccessed',
    help: 'Classes accessed in the app (from static classes)',
    labelNames: ['aula']
});

module.exports.faqsAccessed = faqsAccessed = new Counter({
    name: 'faqsAccessed',
    help: 'FAQs accessed in the app (from static FAQs)',
    labelNames: ['FAQ']
});

/**
 * This function increments the counters that are executed on the request side of an invocation
 * Currently it increments the counters for numOfPaths and pathsTaken
 */
module.exports.requestCounters = function (req, res, next) {
    if (req.path != '/metrics') {
        if(req.path === '/alunos/'){
            platformAccess.inc({ origin: req.ip });
        } else if(req.path.startsWith("/aulas/aulas") && req.path.endsWith(".html")){
            classesAccessed.inc({ aula: req.path.substr(req.path.lastIndexOf('/') + 1) });
        } else if(req.path.startsWith("/FAQs/FAQs") && req.path.endsWith(".html")){
            faqsAccessed.inc({ FAQ: req.path.substr(req.path.lastIndexOf('/') + 1) });
        }
    }
    next();
}

/**
 * In order to have Prometheus get the data from this app a specific URL is registered
 */
module.exports.injectMetricsRoute = function (App) {  
    App.get('/metrics', (req, res) => {
        res.set('Content-Type', Register.contentType);
        res.end(Register.metrics());
    });
};