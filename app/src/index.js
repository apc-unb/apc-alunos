import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';


import AuthComponent from './components/AuthDialog/Auth.js';

import HomeScreen from './screens/HomeScreen/Home.view.js';
import ExamScreen from './provas_react.jsx';
import ProjectScreen from './screens/ProjectScreen/Project.view.js';
import ProfileScreen from './components/Profile.jsx';

import Header from './components/Header/Header.js';
import News from './components/News/News.js';

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
                <div className={style.newsRoot}>
                    <News />
                </div>
                <div className={style.contentRoot}>
                    {nextScreen()}
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


