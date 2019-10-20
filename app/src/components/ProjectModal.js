import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ProjectModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <h2 id="simple-modal-title">Seu Trabalho foi enviado</h2>
          <div id="simple-modal-description">
            <p>Seu trabalho foi enviado foi recebido e será enviado para o monitor que irá corrigi-lo em breve.</p>
                <p>Fique atento ao processo de correção:</p>
                <ul>
                    <li>Recebimento do trabalho</li>
                    <li>Trabalho enviado para o monitor</li>
                    <li>Trabalho aguardando correção pelo monitor</li>
                    <li>Trabalho corrigido</li>
                </ul>
                <p>Caso seu trabalho não mude para o status "Enviado para o monitor" em 24h fale com seu professor!</p>
          </div>
        </div>
      </Modal>
  );
}