import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header.js';
import Auth from '../../service/api/Auth';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
const APIHOST = process.env.NODE_ENV == "production" ? process.env.APIHOST : "localhost"
const APIPORT = process.env.NODE_ENV == "production" ? process.env.APIPORT : "8080"

const projectUrl = 'http://' + APIHOST + ':' + APIPORT + '/project/type';

const moment = require('moment');

import Submission from './components/Submission.js';
import FilePicker from './components/FilePicker';

import ApiService from '../../service/api/ApiService';

const ProjectView = (props) => {
    const [projectTypes, setProjectTypes] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const sessionStudent = JSON.parse(sessionStorage.getItem('APC_sessionStudent'));

    useState( async () => {
        const [err, res] = await ApiService.listProjects(sessionStudent.ID);
        const [errType, resType] = await ApiService.listProjectTypes();
        if(err !== null) {
            console.log(err);
        } else {
            setSubmissions(res.data);
        }
        if(errType !== null) {
            console.log(errType);
        } else {
            setProjectTypes(resType.data)
        }

    }, []);

    const projects = projectTypes.map( (value, index) => {

        const relatedSubmissions = [];
        for(let i = 0; i < submissions.length; i++){
            if(submissions[i].ProjectTypeID === value.ID){
                relatedSubmissions.push(submissions[i]);
            }
        }

        const submissionObjs = relatedSubmissions.map( (sub) => {
            return (
                <li>
                    < Submission {...sub} />
                </li>
            )
        });

        const infoParaEnvio = {
            "StudentID": sessionStudent.ID,
            "ProjectTypeID": value.ID,
            "ClassID": sessionStudent.ClassID,
            "studentName": sessionStudent.firstname + " " + sessionStudent.lastname
        }

        return (
            <li key={index} id={value.ID}>
                <h2>{value.name}</h2>
                <h4>Período de entrega: {moment(value.start).format("DD/MM/YYYY hh:mm")} à {moment(value.end).format("DD/MM/YYYY hh:mm")}</h4>
                {
                    moment().isBefore(moment(value.end)) ?
                    <p>Falta {moment().to(moment(value.end))}</p> :
                    <p>Prazo terminou {moment(value.end).from(moment())}</p>
                }
                <h4>Pontuação Máxima: {value.score}</h4>

                <p>{value.descripton}</p>
                <h4>Submissões</h4>
                <ul>
                    {submissionObjs}
                </ul>
                {
                    moment().isBetween(value.start, value.end) ?
                    <FilePicker {...infoParaEnvio}/> :
                    null
                }
            </li>
        )
    });

    return (
        <ul>
            {projects}
        </ul>
    )
}

// Header bar
export default ProjectView;
