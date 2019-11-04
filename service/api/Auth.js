// Verifica se esta com uma sessão acontecendo
import React from 'react';
import ReactDOM from 'react-dom';
import AuthComponent from '../../app/src/components/Auth.jsx';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const jwt = cookies.get('jwt');

export default function(screenComponent) {

    if (sessionStorage.APC_sessionStudent && jwt != null){
        ReactDOM.render(
            screenComponent,
            document.getElementById('page-root')
        );
    } else {
        console.log("Opening autentication")
        ReactDOM.render(
            < AuthComponent />,
            document.getElementById('page-root')
        );
    }
}