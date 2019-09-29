import React from 'react';

const Header = () => {
    return (
        <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" href="/index.html" style={{"padding": "5px", "marginRight": "10px"}}>
                    <img src="/assets/images/UnB-logo.png" alt="UnB" height="40" width="40" />
                </a>
            </div>
                <ul className="nav navbar-nav">
                    <li><a href="/alunos" className="nav-btn">Home</a></li>
                    <li><a href="/alunos/calendar.html" className="nav-btn">Calendário</a></li>
                    <li><a href="/alunos/provas.html" className="nav-btn">Provas</a></li>
                    <li><a href="trabalho.html" className="nav-btn">Trabalho</a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                <li><button onClick={() => logout()} className="btn navbar-btn btn-primary" style={{"margin-right": "10px"}}>
                    <span className="glyphicon glyphicon-log-out"></span>&nbsp;Sair
                </button>
                </li>
                </ul>
        </div>
    );
}

export default Header;