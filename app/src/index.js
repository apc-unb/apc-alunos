import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';


import AuthComponent from '../../app/src/components/Auth.jsx';

import HomeScreen from './screens/HomeScreen/Home.view.js';
import ExamScreen from './provas_react.jsx';
import ProjectScreen from './screens/ProjectScreen/Project.view.js';
import CalendarScreen from './screens/CalendarScreen/Calendar.view.js';
import Header from './components/Header.js';


const App = ({ startingPoint }) => {
    const [currScreen, setCurrScreen] = useState(startingPoint);

    const nextScreen = () => {
        switch (currScreen) {
            case 0:
                return <AuthComponent />
            case 1:
                return <HomeScreen />
            case 2:
                return <CalendarScreen />
            case 3:
                return <ExamScreen />
            case 4:
                return <ProjectScreen />
            default:
                return <AuthComponent />
        }
    }

    return (
        <div>
            <Header changeScreen={setCurrScreen}/>
            {nextScreen()}
        </div>
    );

}


// Verifica se esta com uma sessão acontecendo
const cookies = new Cookies();
const jwt = cookies.get('jwt');
// "Main"
const startOrContinue = (sessionStorage.APC_sessionStudent && jwt != null) ? 1 : 0;
ReactDOM.render(
    < App startingPoint={startOrContinue} />,
    document.getElementById('page-root')
);


