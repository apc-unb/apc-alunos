import React, { Component } from 'react';

class Activities extends React.Component {
    // state = {};

    componenDidMount() {
        // TODO: Make API call to Codeforces
    }

    render() {
        return (
            <div className="panel-group">
            <div className="panel panel-default panel-blue">
                <a data-toggle="collapse" href="#activity-list">
                    <h4 className="panel-header">
                    Atividades
                    </h4>
                </a>
              <div id="activity-list" className="panel-collapse collapse in">
                    <ul className="list-group">
                    <li className="list-group-item">Não sei pegar as listas ainda</li>
                    </ul>
              </div>
            </div>
          </div> 
        );
    } 
}

export default Activities;