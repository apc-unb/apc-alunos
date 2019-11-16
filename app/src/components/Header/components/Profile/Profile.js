import React from 'react';
import styles from './Profile.module.css';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    open: {
      color: 'white',
      fontSize: 128,
      margin: '8px',
      transition: '0.5s'
    },

    close: {
      color: 'white',
      fontSize: 64,
      margin: '8px',
      transition: '0.5s'
    }
});

const Profile = ({ firstName, lastName, picture, matricula, open}) => {
    const classes = useStyles();
    const imgClass = open ? styles.pictureOpen : styles.pictureClose
    return (
        <div className={styles.Profile}>
            {
                picture ?
                <img src={picture} className={imgClass}/> : 
                <AccountIcon classes={{
                    root: open ? classes.open : classes.close
                }} />
            }

            <span className={styles.nome}>{open ? firstName + ' ' + lastName : firstName}</span>
            <span className={styles.matricula}>{matricula}</span>

        </div>
    )
};

export default Profile;