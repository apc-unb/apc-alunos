import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ApiService from '../../../service/api/ApiService';


const AuthComponent = () => {
    const [matricula, setMatricula] = useState('');
    const [password, setPassword] = useState('');
    const [infoIn, setInfoIn] = useState(false);

    const validateLogin = (login) => {
        return String(login).split('').reduce((isDigit, char) => {
            return '0123456789'.includes(char) & isDigit;
        }, true);
    }

    async function auth(matricula, senha) {

        if(validateLogin(matricula)) {
            const status = await ApiService.login(matricula, senha);
            if(status === 200){
                window.location= '/alunos'
            } else {
                document.getElementById('login-error-alert').classList.remove('hide');
                document.getElementById("pwd").value = '';
            }
        }
        return;
    }

    useEffect( () => {
        if(matricula != '' && password != ''){
            setInfoIn(true);
        }
    }, [password, matricula]);

    return (
        <div id="auth-modal" className="modal show">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header" style={{textAlign: "center"}}>
                <h3 className="modal-title" style={{marginBottom: "10px"}}>Seção restrita</h3>
                <p className="handle-text">Esta página é somente para alunos.</p>
                <p className="handle-text">Se não souber sua senha entre em contato com seu professor.</p>
            </div>
            <div className="modal-body">
            <div className="form-horizontal">
                <div className="form-group">
                    <p className="login-error hide" id="login-invalid-alert">
                        <span className="glyphicon glyphicon-alert"></span>
                        <strong> Login inválido.</strong>
                            Seu login é a matrícula sem barra.
                    </p>
                    <label className="control-label col-sm-2" htmlFor="email">Login:</label>
                    <div className="col-sm-10">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Matrícula sem barra"
                        onChange={(event) => setMatricula(event.target.value)}
                    />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="pwd">Senha:</label>
                    <div className="col-sm-10">
                    <input
                        type="password"
                        className="form-control"
                        id="pwd"
                        placeholder="Senha"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                    <button
                        className="btn btn-blue"
                        onClick={() => auth(matricula, password)}
                        disabled={!infoIn}
                    >Submit</button>
                    </div>
                </div>
            </div> 
        </div>
        <div className="modal-footer">
            <div className="alert alert-danger alert-dismissable hide" style={{textAlign: "left"}} id="login-error-alert">
                <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong>Erro!</strong> Usuário não encontrado. <p>Se você não lembra sua senha, contate seu professor.</p>
            </div>
            <div className="alert alert-danger alert-dismissable hide" style={{textAlign: "left"}} id="network-error-alert">
                <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong>Erro!</strong> Alguma coisa deu errado. Verifique sua conexão de internet e tente novamente.
            </div>
        </div>
        </div>
    
    </div>
    </div>
    )
};

export default AuthComponent;