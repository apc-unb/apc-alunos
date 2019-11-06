import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Header = ({ changeScreen }) => {

    const logout = () => {
        cookies.remove('jwt');
        sessionStorage.removeItem('APC_sessionClass');
        sessionStorage.removeItem('APC_sessionNews');
        sessionStorage.removeItem('APC_sessionStudent');
        sessionStorage.removeItem('APC_sessionProgress');
        changeScreen(0);
    }

    return (
    <nav className="navbar navbar-default navbar-blue" id="header-bar">
        <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" href="/index.html" style={{"padding": "5px", "marginRight": "10px"}}>
                    <img src="/assets/images/UnB-logo.png" alt="UnB" height="40" width="40" />
                </a>
            </div>
                <ul className="nav navbar-nav">
                    <li><a onClick={() => changeScreen(1)} className="nav-btn">Home</a></li>
                    <li><a onClick={() => changeScreen(2)} className="nav-btn">Calendário</a></li>
                    <li><a onClick={() => changeScreen(3)} className="nav-btn">Provas</a></li>
                    <li><a onClick={() => changeScreen(4)} className="nav-btn">Trabalho</a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                <li><button onClick={() => logout()} className="btn navbar-btn btn-primary" style={{"marginRight": "10px"}}>
                    <span className="glyphicon glyphicon-log-out"></span>&nbsp;Sair
                </button>
                </li>
                </ul>
        </div>
    </nav>
    );
}

export default Header;