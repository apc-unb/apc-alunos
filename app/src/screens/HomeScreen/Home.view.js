'use strict';

import React, { Component, useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Grades from './components/Grades.js';
import Activities from './components/Activities.js';
import News from './components/News.js';
import Profile from '../../components/Profile.jsx'
import Calendar from '../../components/Calendar/Calendar';
import EventList from './components/EventList/EventList.js';
import styles from './Home.module.css';
import Icon from '@material-ui/core/Icon'
import ApiCalendar from '../../../../service/apiCalendar.js';
import moment from 'moment';

function ClassInfo(props) {
    return (
        <div className="panel panel-default panel-blue">
            <h4 className="panel-header">Turma&nbsp;{props.classname}</h4>
            <div className="container">
                <div className="media-left">
                    <span className="glyphicon glyphicon-apple media-object"></span>
                </div>
                <div className="media-body">
                    <p className="media-heading name-text">
                        {props.professorfirstname}&nbsp;{props.professorlastname}
                    </p>
                    <p className="handle-text">
                        {props.year + '/' + props.season}
                    </p>
                </div>
                <p>
                    <span className="handle-text">Local:</span>
                        &nbsp;{props.address}
                </p>
            </div>
        </div>
    )
}

// Probably needs more state intelligence than its parts
const MainScreen = () => {
    const sessionClass = JSON.parse(sessionStorage.getItem('APC_sessionClass'));
    const sessionNews = JSON.parse(sessionStorage.getItem('APC_sessionNews'));
    const sessionProgress = JSON.parse(sessionStorage.getItem('APC_sessionProgress'));
    const sessionStudent = JSON.parse(sessionStorage.getItem('APC_sessionStudent'));
    const [openCalendar, setOpenCalendar] = useState(true);
    const [calendarStatus, setCalendarStatus] = useState(null);
    const [events, setEvents] = useState({
        jan:[], fev:[], mar:[], abr:[], mai:[], jun:[], 
        jul:[], ago:[], set:[], out:[], nov:[], dez:[]
    });
    const [eventDates, setEventDates] = useState({});

    useEffect(() => {
        ApiCalendar.onLoad(() => {
            ApiCalendar.listenSign((sign) => setCalendarStatus(sign));
            const currDay = moment().date();
            ApiCalendar.listEventsFromDate(moment().subtract(currDay, 'days').toDate(), 20).then(({result}) => {
                for(let item of result.items) addEvent(item);
            });
        })
    }, []);

    const monthNumberToStr = (month) => {
        const months = [
            'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 
            'jul', 'ago', 'set', 'out', 'nov', 'dez'
        ];
        return months[month];
    }

    useEffect(() => {
        if(calendarStatus) {
            console.log("Listing events");
            ApiCalendar.listUpcomingEvents(10).then(({result}) => {
                console.log("Items from Calendar:", result.items);
            });
        }
    }, [calendarStatus]);

    const addEvent = (event) => {
        const eventStart = new Date(event.start.dateTime);
        const eventMonth = eventStart.getMonth();
        const monthStr = monthNumberToStr(eventMonth);
        // Update list of events by month
        let newObj = {...events};
        newObj[monthStr].push(event);
        setEvents(newObj);
        // Update list of events
        let type = "aviso";
        if(event.summary.toLowerCase().startsWith("prova")) type = "prova";
        else if(event.summary.toLowerCase().startsWith("trabalho")) type = "trabalho"
        const dateToFormat = moment(event.start.dateTime);
        eventDates[dateToFormat.format('DD-MM-YYYY')] = type;
        setEventDates({...eventDates});
    }

    const bottomBar = [styles.BottomBar];
    const calendarDiv = [styles.CalendarDiv];
    const eventsDiv = [styles.listOfEventsDiv];
    if(!openCalendar){
        bottomBar.push(styles.BottomClosed);
        calendarDiv.push(styles.BottomChildrenClosed);
        eventsDiv.push(styles.BottomChildrenClosed);
    }
    return (
        <section className={styles.HomeView}>
            <div className={styles.contentDiv}>
                Content Content Content
            </div>
            <div className={bottomBar.join(' ')}>
                <div className={styles.closeBottom} onClick={() => setOpenCalendar(!openCalendar)}>
                    <Icon color="inherit">calendar_today</Icon>
                </div>
                <div className={calendarDiv.join(' ')}>
                    <Calendar
                        eventList={eventDates}
                    />
                </div>
                <div className={eventsDiv.join(' ')}>
                    {
                        openCalendar ?
                        <span className={styles.agendaTitle}>Agenda</span> :
                        ""
                    }
                    <div className={styles.listOfEvents}>
                        {
                            openCalendar ?
                            <EventList events={{...events}} /> : 
                            ""
                        }
                    </div>
                </div>
            </div>
            {
                !openCalendar ?
                <div className={styles.openBottomBtn} onClick={() => setOpenCalendar(!openCalendar)}>
                    <Icon color="inherit">calendar_today</Icon>
                </div> :
                ""
            }
            
        </section> 
    );
}

export default MainScreen;