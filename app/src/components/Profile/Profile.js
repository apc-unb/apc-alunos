import React from 'react';
import styles from './Profile.module.css';
import FaceIcon from '@material-ui/icons/Face';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    open: {
      fontSize: 128,
      margin: '8px',
      transition: '0.5s'
    },

    close: {
      fontSize: 64,
      margin: '8px',
      transition: '0.5s'
    },

    large: {
        fontSize: 256
    }
});

const Profile = ({ firstName, lastName, picture, matricula, open, invertColors, large}) => {
    const classes = useStyles();
    const imgClass = large? styles.large : (open ? styles.pictureOpen : styles.pictureClose)
    const profileClass = invertColors ? [styles.Profile, styles.invertColors] : [styles.Profile];
    return (
        <div className={profileClass.join(' ')}>
            {
                (picture !== "" && picture !== undefined) ?
                <img src={picture} className={imgClass}/> : 
                <FaceIcon classes={{
                    root: large? classes.large : (open ? classes.open : classes.close)
                }} />
            }

            <span className={styles.nome}>{open ? firstName + ' ' + lastName : firstName}</span>
            <span className={styles.matricula}>{matricula}</span>

        </div>
    )
};

Profile.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    picture: PropTypes.string,
    matricula: PropTypes.string.isRequired,
    open: PropTypes.bool,
    invertColors: PropTypes.bool,
    large: PropTypes.bool
};

Profile.defaultProps = {
    open: true,
    invertColors: false,
    large: false
}

export default Profile;