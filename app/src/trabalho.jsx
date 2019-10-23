import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header.js';

import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
const APIHOST = process.env.NODE_ENV == "production" ? process.env.APIHOST : "localhost"
const APIPORT = process.env.NODE_ENV == "production" ? process.env.APIPORT : "8080"

const projectUrl = 'http://' + APIHOST + ':' + APIPORT + '/project/type';
const submissionUrl = 'http://' + APIHOST + ':' + APIPORT + '/project';
const moment = require('moment');

import Submission from './components/Submission.js';
import FilePicker from './components/FilePicker';

const ProjectView = (props) => {
    const [projectTypes, setProjectTypes] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const connInfo = JSON.parse(sessionStorage.connInfo);

    useState( () => {
        let connInfo = JSON.parse(sessionStorage.connInfo);
        axios.all([
            axios.get(projectUrl),
            axios.get(submissionUrl + '/' + connInfo.student.ID)
        ]).then(axios.spread((res1, res2) => {
            setProjectTypes(res1.data);
            setSubmissions(res2.data);
        }));
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
            "StudentID": connInfo.student.ID,
            "ProjectTypeID": value.ID,
            "ClassID": connInfo.student.ClassID,
            "studentName": connInfo.student.firstname + " " + connInfo.student.lastname
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
ReactDOM.render(<Header/>, document.getElementById('header-bar'));
// Verifies if page can be leaded
if(!sessionStorage.connInfo){
    console.log("Error: you are not logged in.");
    let nogo = document.createElement('div');
    nogo.classList.add("alert", "alert-danger");
    nogo.innerHTML = '<p><strong>Atenção!</strong>&nbsp;Você deve fazer o <a href="alunos.html" class="alert-link">login</a> para prosseguir.</p>';
    document.getElementById('page-root').appendChild(nogo);
} else {
    ReactDOM.render(<ProjectView/>, document.getElementById('page-root'));
}
