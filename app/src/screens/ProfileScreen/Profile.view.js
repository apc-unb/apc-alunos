import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import styles from './Profile.module.css';
import { makeStyles } from '@material-ui/core/styles';

import Profile from '../../components/Profile/Profile';

const useStyles = makeStyles({
    Profile: {
        padding: '12px',
        margin: '20px',
        width: 'inherit',
        height: '90%',
        maxWidth: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});

const ProfileView = ({ classInfo }) => {
    const classes = useStyles();
    const sessionStudent = JSON.parse(sessionStorage.getItem('APC_sessionStudent'));
    const sessionClass = JSON.parse(sessionStorage.getItem('APC_sessionClass'));
    
    return (
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

            </div>
        </Card>
    )
    
}

export default ProfileView;