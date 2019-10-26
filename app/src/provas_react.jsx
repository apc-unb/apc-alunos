'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header.js';
import Auth from '../../service/api/Auth';

const APIHOST = process.env.NODE_ENV == "production" ? process.env.APIHOST : "localhost"
const APIPORT = process.env.NODE_ENV == "production" ? process.env.APIPORT : "8080"

function Task(props) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const idx = letters.charAt(props._idx);

    return (
        <div className="panel-group">
        <div className="panel panel-default panel-blue">
            <div className="panel-header">
            <a data-toggle="collapse" href={'#' + props.ID}>
                <h3 className="panel-title">
                    {idx}.&nbsp;{props.title}
                    <span className="handle-text">
                        &nbsp;-&nbsp;{props.score}
                    </span>
                </h3>
            </a>
            </div>
            <div id={props.ID} className="panel-collapse collapse">
                <h4 className="text-center">{props.title}</h4>
                <p className="text-center tag-item">
                    {props.tags.join()}
                </p>
            <div className="panel-body">
                <div>
                    {props.statement.split("\n").map( (str, i) => {
                        return (<p key={i}>{str}</p>)
                    })}
                </div>
            </div>
            </div>
        </div>
        </div> 
    )
}

class Exam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "id": props.ID,
            "title": props.title,
            "loaded": false
        }
    }

    componentDidMount() {
        const url = 'http://' + APIHOST + ':' + APIPORT + '/task/' + this.state.id;
        axios.get(url).then( (response) => {
            this.setState({"tasks": response.data, "loaded": true});
        }).catch( (error) => {
            console.log(error);
        });
    }

    render() {
        const tasks = this.state.loaded ? Object.values(this.state.tasks) : Array();
        const task_items = tasks.map( (t, idx) => {return <Task {...t} _idx={idx}/>;});
        return (
            <div id={this.state.id} className="tab-pane fade">
                <h3>{this.state.title}</h3>
                <div className="container">
                    {task_items}
                </div>

            </div>
        )
    }
}

function ExamTab(props) {
    return (
        <li key={props.ID}><a data-toggle="tab" href={'#' + props.ID}>{props.title}</a></li>
    )
}
class ExamMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            "ready": false
        }
    }
    componentDidMount() {
        const sessionClass = JSON.parse(sessionStorage.getItem('APC_sessionClass'));
        const url = 'http://' + APIHOST + ':' + APIPORT + '/exam/' + sessionClass.ID;
        axios.get(url)
        .then( (response) => {
            this.setState({"data" : response.data, "ready": true});
        })
        .catch( (error) => {
            console.log(error);
        })
    }

    render() {

        const exams = this.state.ready ? Object.values(this.state.data) : Array();
        console.log("Exams:", exams);
        const exam_tabs = exams.map( (e) => {
            return ( <ExamTab {...e} /> );
        });
        const exam_items = exams.map( (e) => {
            return ( < Exam {...e} /> );
        });

        return (
            <div className="container">
                <ul className="nav nav-tabs">
                    {exam_tabs}
                </ul>
                
                <div className="tab-content">
                    {exam_items}
                </div>
            </div>
        );
    }
}

// Header bar
ReactDOM.render(<Header/>, document.getElementById('header-bar'));
Auth(<ExamMenu />)
