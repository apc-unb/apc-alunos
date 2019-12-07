import React from 'react';
import Icon from '@material-ui/core/Icon';
import styles from './MenuItem.module.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    open: {
      color: 'white',
      fontSize: 32,
    },

    close: {
        fontSize: 42,
    }
});

const MenuItem = ({ icon, text, action, open, selected}) => {
    const classes = useStyles();
    const buttonClasses = [styles.MenuItem];
    if(selected) buttonClasses.push(styles.MenuItemSelected);
    if(!open) buttonClasses.push(styles.closed);
    if(open) {
        return (
            <button onClick={action} className={buttonClasses.join(' ')} tabIndex="98">
                <Icon classes={{root: classes.open}}>{icon}</Icon>
                <span>&nbsp;&nbsp;{text}</span>
            </button>
        )
    } else {
        return (
            <button onClick={action} className={buttonClasses.join(' ')} tabIndex="98">
                <Icon classes={{root: classes.close}}>{icon}</Icon>
            </button>
        )
    }
};

export default MenuItem;