import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    text: {
        fontSize: '14px'
    },
    title: {
        fontSize: '18px',
        fontWeight: 700
    },
    button: {
        backgroundColor: "#323ca0",
        color: 'white',
    }
})

const AlertDialog = ({title, message, open, handleAccept, handleClose, handleRefuse}) => {
    const classes = useStyles();

    return (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title" classes={{root: classes.title}} disableTypography={true}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" disableTypography={true} classes={{root: classes.text}}>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRefuse} classes={{root: classes.button}} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleAccept} classes={{root: classes.button}} autoFocus>
            Aceitar
          </Button>
        </DialogActions>
      </Dialog>
    )
};

AlertDialog.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleAccept: PropTypes.func.isRequired,
    handleRefuse: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default AlertDialog;