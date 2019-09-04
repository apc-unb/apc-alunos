'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Grades from './components/Grades.jsx';
import Activities from './components/Activities.jsx';
import News from './components/News.jsx';
import Profile from './components/Profile.jsx'

function ClassInfo(props) {
    return (
        <div className="panel panel-default panel-blue">
            <h4 className="panel-header">Turma&nbsp;{props.classname}</h4>
            <div className="container">
                <div className="media-left">
                    <span className="glyphicon glyphicon-apple media-object"></span>
                </div>
                <div className="media-body">
                    <p className="media-heading name-text">
                        {props.professorfirstname}&nbsp;{props.professorlastname}
                    </p>
                    <p className="handle-text">
                        {props.year + '/' + props.season}
                    </p>
                </div>
                <p>
                    <span className="handle-text">Local:</span>
                        &nbsp;{props.address}
                </p>
            </div>
        </div>
    )
}

// Probably needs more state intelligence than its parts
const MainScreen = ({ data }) => {
    console.log('Creating home page with info:', JSON.stringify(data.data));
    return (
        <div class="row">
            <div class="col-sm-8 container-fluid">
                <div class="media" id="news-root">
                    <News {...data.news}/>
                </div>

                <div class="media" id="activities-root">
                    <Activities />
                </div>
            </div>
            <div class="col-sm-4 container-fluid">
                <div class="media" id="student-root">
                    <Profile {...data.student} classInfo={data.class} _pwd={sessionStorage.__pwd}/>
                </div>
                <div class="media" id="class-root">
                    <ClassInfo {...data.class}/>
                </div>
                <div class="media" id="grades-root">
                    <Grades {...data.student.grades}/>
                </div>
            </div>
        </div> 
    );
}

export default MainScreen;