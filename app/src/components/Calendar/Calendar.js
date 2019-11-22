import React, { useState } from 'react';
import Calendar from 'react-calendar'
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './Calendar.module.css';

const calendar = ({ value, eventList }) => {

    const dayContent = ({activeStartDate, date, view }) => {
        const dateToFormat = moment(date);
        let returnList = [styles.tileClass]
        const type = eventList[dateToFormat.format('DD-MM-YYYY')];
        if(type === "prova"){
            returnList.push(styles.prova);
        } else if(type === "trabalho") {
            returnList.push(styles.trabalho);            
        } else if(type === "aviso"){
            returnList.push(styles.outro);        
        }
        return returnList.join(' ');
    };

    return <Calendar 
        defaultValue={value}
        minDetail="month"
        showFixedNumberOfWeeks={true}
        className={styles.calendarClass}
        tileClassName={dayContent}
        />
};

calendar.propTypes = {
    aviso: PropTypes.instanceOf(Date),
    eventList: PropTypes.object.isRequired
}

calendar.defaultProps = {
    value: new Date()
}

export default calendar;

// tileContent={({ activeStartDate, date, view }) => view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null}