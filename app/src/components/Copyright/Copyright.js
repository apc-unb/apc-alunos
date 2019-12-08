import React from 'react'
import styles from './Copyright.module.css';

const Copyright = () => {

    return (
        <footer className={styles.copyright}>
            <span className={styles.poweredBy}>Powered by</span>
            <h4 className={styles.dragont}>DraGonT</h4>
        </footer>
    );
};

export default Copyright;