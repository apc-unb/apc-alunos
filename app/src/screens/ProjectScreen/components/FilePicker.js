import React, {useState, useRef, Fragment} from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import AlertDialog from '../../../components/AlertDialog';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const jwt = cookies.get('jwt');
import axios from 'axios';

const useStyles = makeStyles({
    descriptionText: {
        fontSize: '14px'
    },
    descriptionTitle: {
        fontSize: '18px',
        fontWeight: 700
    },
    button: {
        backgroundColor: "#323ca0",
        color: 'white',
        borderRadius: '0px 0px 4px 4px'
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px'
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
    }
});

const FilePicker = ({infoToSend, projectName, askResend, open, onClose}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loaded, setLoaded] = useState(0);
    const [openResendDialog, setOpenResendDialog] = useState(false);

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const input = useRef(null);
    const classes = useStyles();

    const onChangeHandler = (event) => {
        if(checkMimeType(event.target.files[0]) && checkFileSize(event.target.files[0])){
            setSelectedFile(event.target.files[0]);
        } else {
            event.target.value = null;
        }
    }

    const checkMimeType = (file) => {
        //define message container
        let err = '';
        // list allow mime type
        const types = ['application/x-compressed', 'application/x-gzip', 'application/zip']
        // compare file type find doesn't matach
        if (types.every(type => file.type !== type)) {
            // create error message and assign to container   
            err = file.type + ' is not a supported format';
        };
        
        if (err !== '') {
            setErrorMsg(err);
            setError(true);
            return false; 
        }
        return true;
    }

    const checkFileSize = (file) => {
        let maxSize = 3145728; // 3MiB 
        let err = '';
        if (file.size > maxSize) {
            err = file.name + ' is too large, please pick a smaller file';
        }
        if (err !== '') {
            setErrorMsg(err);
            setError(true);
            return false;
        }
        return true;
    }

    const onClickHandler = (event, resendConfirm = false) => {
        if(event !== null)
            event.preventDefault();
        // Cria o formulario com todas as infos do aluno
        // E o trabalho
        if(selectedFile === null){
            setErrorMsg("Selecione um arquivo para enviar.");
            setError(true);
            return;
        }
        const data = new FormData();
        data.append('StudentID', infoToSend.StudentID);
        data.append('studentName', infoToSend.studentName);
        data.append('file', selectedFile);
        data.append('ProjectTypeID', infoToSend.ProjectTypeID);
        data.append('ClassID', infoToSend.ClassID);
        data.append('monitorName', infoToSend.monitorName);
        data.append('monitorEmail', infoToSend.monitorEmail);
        data.append('resend', askResend)
        data.append('auth', jwt);
        data.append('projectID', infoToSend.projectID);

        if(!askResend || resendConfirm){
            // Envia o formulario
            axios.post('/envioDeTrabalho', data, {
                onUploadProgress: ProgressEvent => setLoaded((ProgressEvent.loaded / ProgressEvent.total)*100),
            }).then( res => {
                setSuccess(true);
                setSuccessMsg("Trabalho enviado com sucesso");
                setSelectedFile(null);
                input.current.value = null;
            }).catch( err => {
                setError(true);
                setErrorMsg('Ocorreu um erro: ' + err.message);
                setLoaded(0);
            });
        } else if(askResend){
            setOpenResendDialog(true);
        }
    }

    const snack = error || success;
    const snackbarClass = success ? [classes.snackbar, classes.success] : [classes.snackbar, classes.fail];
    const snackbarIcon = success ? <CheckCircleIcon /> : <ErrorIcon />;
    const snackbarMsg = success ? successMsg : errorMsg;

    return (
        <Fragment>
            <AlertDialog
                open={openResendDialog}
                handleClose={() => setOpenResendDialog(false)}
                handleRefuse={() => setOpenResendDialog(false)}
                handleAccept={() => {setOpenResendDialog(false); onClickHandler(null, true)}}
                title="Reenviar trabalho?"
                message="Atenção, você está reenviando o trabalho. Caso continue, a submissão anterior será desconsiderada."
            />
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
                    <IconButton key="close" aria-label="close" color="inherit" onClick={() => setError(false)}>
                        <CloseIcon />
                    </IconButton>,
                ]}
                />
            </Snackbar>
            <Dialog
                onClose={onClose}
                aria-labelledby="project-description"
                open={open}
                maxWidth="xl"
            >
                <DialogTitle classes={{root: classes.descriptionTitle}} disableTypography={true}>
                    Enviar&nbsp;{projectName}
                </DialogTitle>
                <DialogContent>
                    <form method="post" action="#" id={'envio_' + projectName}>
                        <div className="form-group files">
                        <input
                            ref={input}
                            type="file"
                            className="form-control"
                            onChange={(event) => onChangeHandler(event)}
                        />
                        <LinearProgress variant="determinate" value={loaded} />
                        <Button
                            variant="contained"
                            classes={{root: classes.button}}
                            onClick={(event) => onClickHandler(event)}
                            disabled={selectedFile === null}
                            fullWidth={true}
                            endIcon={<SendIcon />}
                        >
                            Enviar
                        </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};


FilePicker.propTypes = {
    infoToSend: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    projectName: PropTypes.string,
    askResend: PropTypes.bool.isRequired
};

export default FilePicker;