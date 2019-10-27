// React
import React, { useState, useEffect } from 'react';
// Back-end
import ApiService from '../../../service/api/ApiService';
// Third party
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';



const AuthComponent = () => {
    const [matricula, setMatricula] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [infoIn, setInfoIn] = useState(false);
    const [open, setOpen] = useState(true);
    
    const handleClose = () => {
        setOpen(false);
    };

    const validateLogin = (login) => {
        if(login === "") return false;

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
        } else {
            setLoginError(true);
        }
    }

    useEffect( () => {
        if(matricula !== "" && password !== ""){
            setInfoIn(true);
        }
    }, [password, matricula]);

    return (
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
            <Button onClick={() => auth(matricula, password)} color="primary" disabled={!infoIn}>
                Entrar
            </Button>
            </DialogActions>
        </Dialog>
    )
};

export default AuthComponent;