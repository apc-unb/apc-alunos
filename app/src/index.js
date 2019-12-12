import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';


import AuthComponent from './components/AuthDialog/Auth.js';

import HomeScreen from './screens/HomeScreen/Home.view.js';
import ExamScreen from './screens/ExamScreen/Exam.view.js';
import ProjectScreen from './screens/ProjectScreen/Project.view.js';
import ProfileScreen from './screens/ProfileScreen/Profile.view.js';

import Header from './components/Header/Header.js';
import News from './components/News/News.js';
import Agenda from './components/Agenda/Agenda.js';

import style from './index.css';
const cookies = new Cookies();
const jwt = cookies.get('jwt');

const App = ({ startingPoint }) => {
    const [currScreen, setCurrScreen] = useState(0);
    const [authenticated, setAuthenticated] = useState((sessionStorage.APC_sessionStudent && jwt != null));

    const nextScreen = () => {
        switch (currScreen) {
            case 0:
                return <HomeScreen />
            case 1:
                return <ProfileScreen />
            case 2:
                return <ExamScreen />
            case 3:
                return <ProjectScreen />
            default:
                return <AuthComponent />
        }
    }

    const contentTitle = () => {
        const titles = ["Home", "Perfil", "Provas", "Trabalhos"];
        if(currScreen <= 3){
            return titles[currScreen];
        }
        return ""
    }

    if(authenticated){
        return (
            <div className={style.App}>
                <div className={style.headerRoot}>
                    <Header
                        changeScreen={setCurrScreen}
                        currScreen={currScreen}
                        handleLogout={() => setAuthenticated(false)}
                    />
                </div>
                <main className={style.contentRoot}>
                    <header className={style.contentHeader}>
                        <h1 className={style.contentTitle}>{contentTitle()}</h1>
                    </header>
                    {nextScreen()}
                    <Agenda />
                </main>
                <div className={style.newsRoot}>
                    <News />
                </div>
            </div>
        );
    } else {
        return (
            <AuthComponent />
        )
    }

}

ReactDOM.render(
    < App />,
    document.getElementById('page-root')
);


