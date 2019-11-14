const { APIHOST, APIPORT } = require('./Ambiente');
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const jwt = cookies.get('jwt');
import axios from 'axios';

const Api =  axios.create({
    baseURL: 'http://' + APIHOST + ':' + APIPORT,
    headers: {
        'Authorization': 'Bearer ' + jwt
    }
});

const ApiServices = {
    // Profile
    updateEmail: async (id, email, password) => {
        let res;
        let err = null;
        try {
            res = await Api.put('/student', {
                id: id,
                email: email,
                password: password
            });
        } catch (error){
            err = error;
        }

        return [err, res];
    },
    updatePassword: async (id, password, newPassword) => {
        let res;
        let err = null;
        try {
            res = await Api.put('/student', {
                id: id,
                newpassword: newPassword,
                password: password
            });
        } catch (error){
            err = error;
        }

        return [err, res];
    },
    updateHandle: async (id, password, handleJson) => {
        let res;
        let err = null;
        try {
            res = await Api.put('/student', {
                id: id,
                password: password,
                handles: handleJson
            });
        } catch (error){
            err = error;
        }

        return [err, res];
    },
    // Home Screen
    // Exam Screen
    listExams: async (classID) => {
        let res;
        let err = null;
        try{
            res = await Api.get('/exam/' + classID);
        } catch(error) {
            err = error;
        }

        return [err, res];
    },
    listExamTasks: async (examId) => {
        let res;
        let err = null;
        try{
            res = await Api.get('/task/' + examId);
        } catch(error) {
            err = error;
        }

        return [err, res];
    },
    // Project Screen
    listProjectTypes: async () => {
        let res;
        let err = null;
        try {
            res = await Api.get('/project/type');
        } catch(error) {
            err = error;
        }
        return [err, res];
    },
    listProjects: async (studentId) => {
        let res;
        let err = null;
        try{
            res = await Api.get('/project/' + studentId);
        } catch(error) {
            err = error;
        }
        return [err, res];
    }

};

export default ApiServices;