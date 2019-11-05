import React from 'react';
import styles from './Calendar.module.css'

const Calendar = () => {

    const width = Math.max(window.screen.availWidth * 0.9, 300);
    const heigth = Math.max(window.screen.availHeight * 0.8, 300);

    return (
        <div className={styles.flexContainer}>
            <iframe className={styles.frame} src="https://calendar.google.com/calendar/embed?src=apc.cic.unb%40gmail.com&ctz=America%2FSao_Paulo" width={width} height={heigth}></iframe>
        </div>
    );
};

export default Calendar;