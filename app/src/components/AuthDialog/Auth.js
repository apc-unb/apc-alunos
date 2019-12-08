// React
import React, { useState, useEffect } from 'react';
// Back-end
import Ambiente from '../../../../service/api/Ambiente';
const baseUrl = 'http://' + Ambiente.APIHOST + ':' + Ambiente.APIPORT;
import axios from 'axios';
// Third party
import Button from '@material-ui/core/Button';
import styles from './Auth.module.css';

import Dialog from '@material-ui/core/Dialog';
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
import WarnIcon from '@material-ui/icons/WarningOutlined';
import Paper from '@material-ui/core/Paper';


import Cookies from 'universal-cookie';
const cookies = new Cookies();

import { makeStyles } from '@material-ui/core/styles';
import { SnackbarContent } from '@material-ui/core';

const useStyles = makeStyles({
    icon: {
        fontSize: 32,
        color: '#323ca0',
        margin: '8px'
    },
    paper: {
        textAlign: 'left',
        margin: '0px 12px',
        padding: '8px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e9e9fc'
    },
    input: {
        width: '256px',
        fontSize: '16px',
        color: '#2d3264',
    },
    inputLabel: {
        fontSize: '16px',
        color: '#2d3264'
    },
    helpText: {
        fontSize: '12px',
        color: '#2d3264',
        marginBottom: '8px'
    },
    button: {
        marginTop: '12px',
        width: '256px',
        fontSize: '14px',
        backgroundColor: '#323ca0',
        color: 'white'
    },
    buttonDisabled: {
        backgroundColor: '#f5f5f5'
    },
    snackbar: {
        backgroundColor: '#d32f2f',
        color: 'white',
        textAnchor: 'middle'
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px'
      }
});

const AuthComponent = () => {
    const [matricula, setMatricula] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [infoIn, setInfoIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const open = true;
    const classes = useStyles();
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
            axios.post(baseUrl + '/student/login', {
                    "matricula": matricula,
                    "password": senha
            }).then(res => {
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
                    setLoading(false);
                }
            }).catch((err) => {
                if(err.status === 0){
                    setErrorMsg("Falha na conexão");
                } else {
                    setErrorMsg(err.message);
                }
                setError(true);
                setLoading(false);
                return;
            });
        } else {
            setLoginError(true);
            setLoading(false);
        }
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
            autoHideDuration={30000}
        >
            <SnackbarContent
            className={classes.snackbar}
            message={
                <span id="client-snackbar" className={classes.message}>
                  <ErrorIcon/>&nbsp;
                  {errorMsg}
                </span>
              }
              action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={() => setError(false)}>
                  <CloseIcon />
                </IconButton>,
              ]}
            />
        </Snackbar>

        <Dialog open={open} aria-labelledby="auth-modal">
            <div className={styles.authHeader}>
                <span id="form-dialog-title" className={styles.authTitle}>
                    Login
                </span>
            </div>
            <div>
            <Paper classes={{root: classes.paper}}>
                <WarnIcon classes={{root: classes.icon}} />
                <div>
                    <span className={styles.infoText}>
                        Esta página é somente para alunos matriculados na disciplina de APC.
                    </span>
                    <span className={styles.infoText}>
                        Se não souber sua senha entre em contato com seu professor.
                    </span>
                </div>
            </Paper>
                <div className={styles.formDiv}>
                    <FormControl error={loginError}>
                        <InputLabel classes={{root: classes.inputLabel}} htmlFor="component-helper">Login</InputLabel>
                        <Input
                        id="component-helper"
                        required={true}
                        value={matricula}
                        onChange={(event) => setMatricula(event.target.value)}
                        aria-describedby="component-helper-text"
                        multiline={false}
                        classes={{root: classes.input}}
                        />
                        <FormHelperText id="component-helper-text" classes={{root: classes.helpText}}>Matrícula sem barra</FormHelperText>
                    </FormControl>
                    <FormControl error={loginError}>
                        <InputLabel classes={{root: classes.inputLabel}} htmlFor="adornment-password">Senha</InputLabel>
                        <Input
                        id="adornment-password"
                        classes={{root: classes.input}}
                        multiline={false}
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
                    <Button 
                    onClick={() => {setLoading(true); auth(matricula, password)}}
                    variant="contained"
                    disabled={!infoIn}
                    classes={{root: classes.button, disabled: classes.buttonDisabled}}>
                        { loading ? <CircularProgress size={14} color="inherit"/> : "Entrar" }
                    </Button>
                </div>
            </div>
        </Dialog>
        </div>
    )
};

export default AuthComponent;