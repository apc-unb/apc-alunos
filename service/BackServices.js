const { APIHOST, APIPORT } = require('./api/Ambiente');
const axios = require('axios');

var Api = undefined;

function configApi(auth) {
    Api = axios.create({
        baseURL: 'http://' + APIHOST + ':' + APIPORT,
        headers: {
            'Authorization': 'Bearer ' + auth
        }
    });
}


async function updateProjectStatus(projectId, status) {
    let res;
    let err = null;
    try {
        res = await Api.put('/project/status', {
            "id": projectId,
            "status": status
        });
    } catch(error) {
        err = error;
    }
    return [err, res];
}

async function newProjectSubmission(projectInfo) {
    let res;
    let err = null;
    try {
        res = await Api.post('/project', projectInfo);
    } catch(error) {
        err = error;
    }
    return [err, res];
}

async function resendProject(projectId, fileName) {
    let res;
    let err = null;
    try {
        res = await Api.put('/project', {
            id: projectId,
            filename: fileName
        });
    } catch(error) {
        err = error;
    }
    return [err, res];
}

module.exports.configApi = configApi;
module.exports.updateProjectStatus = updateProjectStatus;
module.exports.newProjectSubmission = newProjectSubmission;
module.exports.resendProject = resendProject;
