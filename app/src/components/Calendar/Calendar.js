import React, { useState } from 'react';
import Calendar from 'react-calendar'
import styles from './Calendar.module.css';

const calendar = ({ value }) => {

    return <Calendar 
        value={value}
        minDetail="month"
        showFixedNumberOfWeeks={true}
        tileClassName={styles.tileClass}
        className={styles.calendarClass}
        />
};

export default calendar;