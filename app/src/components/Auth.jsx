// React
import React, { useState, useEffect } from 'react';
// Back-end
import ApiService from '../../../service/api/ApiService';
// Third party
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';


import Cookies from 'universal-cookie';
const cookies = new Cookies();


const AuthComponent = () => {
    const [matricula, setMatricula] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [infoIn, setInfoIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const open = true;

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const validateLogin = (login) => {
        if(login === "") return false;

        return String(login).split('').reduce((isDigit, char) => {
            return '0123456789'.includes(char) & isDigit;
        }, true);
    }

    async function auth(matricula, senha) {

        if(validateLogin(matricula)) {
            let res;
            try {
                res = await ApiService.login(matricula, senha);
            } catch(err) {
                setErrorMsg(err.message);
                setError(true);
                setLoading(false);
                return;
            }

            if(res.status === 200){
                const sessionClass = res.data.class;
                const sessionNews = res.data.news;
                const sessionProgress = res.data.progress;
                const sessionStudent = res.data.student;
                const jwt = res.data.jwt;
                cookies.set("jwt", jwt, {path: "/"});
                sessionStorage.setItem('APC_sessionClass', JSON.stringify(sessionClass));
                sessionStorage.setItem('APC_sessionNews', JSON.stringify(sessionNews));
                sessionStorage.setItem('APC_sessionProgress', JSON.stringify(sessionProgress));
                sessionStorage.setItem('APC_sessionStudent', JSON.stringify(sessionStudent));
                // Redirects to HomePage
                window.location= '/alunos'
            } else {
                setErrorMsg("Usuário ou senha inválidos.");
                setError(true);
                document.getElementById("pwd").value = '';
            }
        } else {
            setLoginError(true);
        }
        setLoading(false);
    }

    useEffect( () => {
        if(matricula !== "" && password !== ""){
            setInfoIn(true);
        } else {
            setInfoIn(false);
        }
    }, [password, matricula]);

    return (
        <div>
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={error}
            onClose={() => setError(false)}
            ContentProps={{
            'aria-describedby': 'message-id',
            }}
            autoHideDuration={30000}
            message={
                <span id="message-id">
                <ErrorIcon />
                {errorMsg} 
                </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={() => setError(false)}>
                    <CloseIcon />
                </IconButton>
            ]}
        />

        <Dialog open={open} aria-labelledby="auth-modal">
            <DialogTitle id="form-dialog-title">Seção restrita</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Esta página é somente para alunos.
                Se não souber sua senha entre em contato com seu professor.
            </DialogContentText>
            <FormControl error={loginError}>
                <InputLabel htmlFor="component-helper">Login</InputLabel>
                <Input
                id="component-helper"
                required={true}
                value={matricula}
                onChange={(event) => setMatricula(event.target.value)}
                aria-describedby="component-helper-text"
                />
                <FormHelperText id="component-helper-text">Matrícula sem barra</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="adornment-password">Senha</InputLabel>
                <Input
                id="adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                    </InputAdornment>
                }
                />
            </FormControl>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => {setLoading(true); auth(matricula, password)}} color="primary" disabled={!infoIn}>
                { loading ? <CircularProgress/> : "Entrar" }
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    )
};

export default AuthComponent;