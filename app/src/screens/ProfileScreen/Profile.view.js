import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ApiServices from '../../../../service/api/ApiService';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import styles from './Profile.module.css';
import { makeStyles } from '@material-ui/core/styles';

import Profile from '../../components/Profile/Profile';

import SchoolIcon from '@material-ui/icons/School';
import ClassIcon from '@material-ui/icons/Class';
import PlaceIcon from '@material-ui/icons/Place';
import EmailIcon from '@material-ui/icons/Email';
import EditIcon from '@material-ui/icons/Edit';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const useStyles = makeStyles({
    Profile: {
        padding: '20px 12px',
        margin: '20px',
        width: 'inherit',
        height: '90%',
        maxWidth: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    button: {
        marginTop: '24px',
        width: '256px',
        fontSize: '14px',
        backgroundColor: '#323ca0',
        color: 'white'
    },
    buttonDisabled: {
        backgroundColor: '#f5f5f5'
    },
    blue: {
        color: '#323ca0'
    },
    iconButton: {
        padding: '0px'
    },
    input: {
        fontSize: '14px',
        padding: '0px',
        margin: '0px'
    },
    snackbar: {
        color: 'white',
        textAnchor: 'middle'
    },
    success: {
        backgroundColor: '#43a047',
    },
    fail: {
        backgroundColor: '#d32f2f',
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px'
    },
    descriptionText: {
        fontSize: '14px',
        textAlign: 'center'
    },
    descriptionTitle: {
        fontSize: '18px',
        fontWeight: 700
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});

const ProfileView = () => {
    const classes = useStyles();
    const sessionClass = JSON.parse(sessionStorage.getItem('APC_sessionClass'));
    const [sessionStudent, setSessionStudent] = useState(JSON.parse(sessionStorage.getItem('APC_sessionStudent')));
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [confirmPass, setConfirmPass] = useState(false);
    const [confirmAction, setConfirmAction] = useState("");
    const [password, setPassword] = useState("");
    const [newPassowrd, setNewPassowrd] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [editUri, setEditUri] = useState("");
    const [editCodeforces, setEditCodeforces] = useState("");

    const [emailInput, setEmailInput] = useState("");
    const [editEmail, setEditEmail] = useState(false);

    const [arg, setArg] = useState("");
    const [op, setOp] = useState("");

    const handleChange = (password) => {
        if(op === "email") {
            updateEmail(password, arg);
        } else if(op === "handle") {
            updateHandle(password, arg);
        } else if(op === "password") {
            updatePassword(password, newPassowrd);
            setNewPassowrd("");
        } else {
            setPassword("");
            setConfirmPass(false);
            return;
        }
    }
    const updatePassword = async (_password, newPassword) => {
        setConfirmPass(false);
        setPassword("");
        const [err, res] = await ApiServices.updatePassword(sessionStudent.ID, _password, newPassword);
        if(err !== null || res.status !== 201) {
            setError(true);
            setErrorMsg("Ops, algo deu errado atualizando a senha");
        } else {
            setSuccess(true);
            setSuccessMsg("Senha atualizada com sucesso.");
        }
    }

    const updateHandle = async (_password, args) => {
        setConfirmPass(false);
        setPassword("");
        const [handle, whichHandle] = args;
        let handleJson = {};
        if(whichHandle === "uri"){
            handleJson.uri = handle;
        } else {
            handleJson.codeforces = handle;
        }
        const [err, res] = await ApiServices.updateHandle(sessionStudent.ID, _password, handleJson);
        if(err !== null || res.status !== 201) {
            setError(true);
            setErrorMsg("Ops, algo deu errado atualizando handle");
        } else {
            setSuccess(true);
            setSuccessMsg(`Handle ${whichHandle} atualizado com sucesso.`);
            const infoUpdate = {...sessionStudent};
            infoUpdate.handles[whichHandle] = handle;
            console.log(infoUpdate);
            setSessionStudent(infoUpdate);
            sessionStorage.setItem('APC_sessionStudent', JSON.stringify(infoUpdate));
        }
    }

    const updateEmail = async (_password, email) => {  
        const [err, res] = await ApiServices.updateEmail(sessionStudent.ID, email, _password);
        if(err !== null || res.status !== 201) {
            setError(true);
            setErrorMsg("Ops, algo deu errado atualizando email");
            setConfirmPass(false);
            setPassword("");
        } else {
            setSuccess(true);
            setSuccessMsg(`Email atualizado com sucesso.`);
            const infoUpdate = {...sessionStudent};
            infoUpdate.email = email;
            setSessionStudent(infoUpdate);
            sessionStorage.setItem('APC_sessionStudent', JSON.stringify(infoUpdate));
            setConfirmPass(false);
            setPassword("");
            setEditEmail(false);
        }
    }

    const snack = error || success;
    const snackbarClass = success ? [classes.snackbar, classes.success] : [classes.snackbar, classes.fail];
    const snackbarIcon = success ? <CheckCircleIcon /> : <ErrorIcon />;
    const snackbarMsg = success ? successMsg : errorMsg;
    
    return (
        <div>
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snack}
        onClose={() => {setError(false); setSuccess(false)}}
        autoHideDuration={30000}
        >
            <SnackbarContent
            className={snackbarClass.join(' ')}
            message={
                <span id="client-snackbar" className={classes.message}>
                {snackbarIcon}&nbsp;
                {snackbarMsg}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={() => {setError(false); setSuccess(false)}}>
                <CloseIcon />
                </IconButton>,
            ]}
            />
        </Snackbar>

        <Dialog
            onClose={() => setConfirmPass(false)}
            aria-labelledby="confirm-password"
            open={confirmPass}
            maxWidth="xl"
        >
            <DialogTitle id="confirm-password" classes={{root: classes.descriptionTitle}} disableTypography={true}>
                Confirmar {confirmAction}
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText classes={{root: classes.descriptionText}}>
                    Digite sua senha para confirmar a alteração.
                </DialogContentText>
                {
                    op === "password" ?
                    <Input
                    id="adornment-password"
                    classes={{root: classes.input}}
                    multiline={false}
                    type={showPassword ? 'text' : 'password'}
                    value={newPassowrd}
                    placeholder="Nova Senha"
                    onChange={(event) => setNewPassowrd(event.target.value)}
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
                    /> :
                    null
                }
                <Input
                id="adornment-password"
                classes={{root: classes.input}}
                multiline={false}
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="Senha"
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
                <Button
                variant="contained"
                disabled={password === ""}
                onClick={() => handleChange(password)}
                classes={{root: classes.button, disabled: classes.buttonDisabled}}>
                    Confirmar
                </Button>
            </DialogContent>
        </Dialog>

        <Card role="article" classes={{root: classes.Profile}}>
            <Profile
                firstName={sessionStudent.firstname}
                lastName={sessionStudent.lastname}
                matricula={sessionStudent.matricula}
                picture={sessionStudent.photourl}
                invertColors={true}
                large={true}
            />
            <div className={styles.infoDiv}>
                <div className={styles.infoDetail}>
                    <span className={styles.infoText}>
                        <img src="/assets/images/codeforces_icon.png" width="22px" height="22px" alt="Codeforces"/>&nbsp;
                        {
                            sessionStudent.handles.codeforces !== "" ?
                            sessionStudent.handles.codeforces :
                            <div>
                            <InputBase
                                className={classes.input}
                                placeholder="Handle Codeforces"
                                inputProps={{ 'aria-label': 'atualizar handle URI' }}
                                value={editCodeforces}
                                onChange={(event) => setEditCodeforces(event.target.value)}
                            />
                            <IconButton
                                className={classes.iconButton}
                                aria-label="search"
                                onClick={() => {
                                    setConfirmPass(true);
                                    setConfirmAction("Alterar Handle Codeforces");
                                    setArg([editCodeforces, "codeforces"]);
                                    setOp("handle");
                                }}>
                                <SendIcon fontSize="large" classes={{root: classes.blue}}/>
                            </IconButton>
                        </div>
                        }
                    </span>
                    <span className={styles.infoText}>
                        <img src="/assets/images/uri_icon.png" width="20px" height="20px" alt="Codeforces"/>&nbsp;
                        {
                            sessionStudent.handles.uri !== "" ?
                            sessionStudent.handles.uri :
                            <div>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Handle URI"
                                    inputProps={{ 'aria-label': 'atualizar handle URI' }}
                                    value={editUri}
                                    onChange={(event) => setEditUri(event.target.value)}
                                />
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="search"
                                    onClick={() => {
                                        setConfirmPass(true);
                                        setConfirmAction("Alterar Handle Uri");
                                        setArg([editUri, "uri"]);
                                        setOp("handle");
                                    }}>
                                    <SendIcon fontSize="large" classes={{root: classes.blue}}/>
                                </IconButton>
                            </div>
                        }
                    </span>
                    <span className={styles.infoText}>
                        <EmailIcon fontSize="large" />&nbsp;
                        {
                            editEmail ?
                            <div>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Email"
                                    inputProps={{ 'aria-label': 'atualizar email' }}
                                    value={emailInput}
                                    onChange={(event) => setEmailInput(event.target.value)}
                                />
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="search"
                                    onClick={() => {
                                        setConfirmPass(true);
                                        setConfirmAction("Alterar Email");
                                        setArg(emailInput);
                                        setOp("email");
                                    }}>
                                    <SendIcon fontSize="large" classes={{root: classes.blue}}/>
                                </IconButton>
                            </div> :
                            <div>
                            {sessionStudent.email}&nbsp;
                            <IconButton
                                classes={{root: classes.iconButton}}
                                onClick={() => setEditEmail(true)}>
                                <EditIcon fontSize="large" classes={{root: classes.blue}}/>
                            </IconButton>
                            </div>
                        }
                    </span>
                </div>
                <div className={styles.infoDetail}>
                    <span className={styles.infoText}>
                        <ClassIcon fontSize="large" />&nbsp;Turma {sessionClass.classname + ' ' + sessionClass.year + '/' + sessionClass.season}
                    </span>
                    <span className={styles.infoText}>
                        <SchoolIcon fontSize="large"/>&nbsp;{sessionClass.professorfirstname + ' ' + sessionClass.professorlastname}
                    </span>
                    <span className={styles.infoText}>
                        <PlaceIcon fontSize="large"/>&nbsp; {sessionClass.address}
                    </span>
                </div>
            </div>
            <Button
            onClick={() => {
                setConfirmPass(true);
                setConfirmAction("Troca de senha");
                setOp("password");
            }}
            variant="contained"
            classes={{root: classes.button}}>
                Alterar Senha
            </Button>
        </Card>
        </div>
    )
    
}

export default ProfileView;