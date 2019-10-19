import React from 'react';
import ReactDOM from 'react-dom';

import HomeScreen from './alunos_react.jsx';
import AuthComponent from './components/Auth.jsx';
import Header from './components/Header.js';

const axios = require('axios');
const APIHOST = process.env.NODE_ENV == "production" ? process.env.APIHOST : "localhost"
const APIPORT = process.env.NODE_ENV == "production" ? process.env.APIPORT : "8080"

const validateLogin = (login) => {
    return String(login).split('').reduce((isDigit, char) => {
        return '0123456789'.includes(char) & isDigit;
    }, true);
}

function auth(matricula, senha) {
    sessionStorage.__pwd = senha;
    if(validateLogin(matricula)) {
        const url = 'http://' + APIHOST + ':' + APIPORT + '/student/login';
        axios.post( url, {
            "matricula": matricula,
            "password": senha,
        }).then( function (response) {
            if (response.data.userexist == true) {
                // Saves data to session
                sessionStorage.setItem("connInfo", JSON.stringify(response.data));
                
                ReactDOM.render(
                    < HomeScreen data={JSON.parse(sessionStorage.connInfo)} />,
                    document.getElementById('page-root')
                );
            } else {
                document.getElementById('login-error-alert').classList.remove('hide');
                document.getElementById("pwd").value = '';
            }
        }).catch(function (error) {
            document.getElementById('network-error-alert').classList.remove('hide');
            console.log(error);
        });
    } else {
        document.getElementById('login-invalid-alert').classList.remove('hide');
    }
    return ;
}

// Adds header
ReactDOM.render(<Header/>, document.getElementById('header-bar'));
// Verifica se esta com uma sessão acontecendo
if (sessionStorage.connInfo){
    console.log("Continuing previous session")
    ReactDOM.render(
        < HomeScreen data={JSON.parse(sessionStorage.connInfo)} />,
        document.getElementById('page-root')
    );
} else {
    console.log("Opening autentication")
    ReactDOM.render(
        < AuthComponent onSubmit={auth} />,
        document.getElementById('page-root')
    );
}