import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 16
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h3">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ProjectReceivedDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Seu Trabalho foi recebido
        </DialogTitle>
        <DialogContent dividers>
          <p>Seu trabalho foi enviado foi recebido e será enviado para o monitor que irá corrigi-lo em breve.</p>
          <p>Fique atento ao processo de correção:</p>
            <ul>
                <li>Created</li>
                <li>Pending</li>
                <li>Received</li>
                <li>Confirmed</li>
            </ul>
          <p variant="body1">Caso seu trabalho não mude para o status "Pending" em 24h fale com seu professor!</p>
          <p>Se o status estiver como "Failed" significa que algo deu errado e você deve reenviar o trabalho.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}  variant="contained" color="primary" className={styles.button}>
            Eu entendi
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}