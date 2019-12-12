import React, { useState, useEffect } from 'react';

import Calendar from '../Calendar/Calendar';
import EventList from '../EventList/EventList';
import Icon from '@material-ui/core/Icon'

import ApiCalendar from '../../../../service/apiCalendar';
import style from './Agenda.module.css';
import moment from 'moment';

const Agenda = () => {
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

    const bottomBar = [style.BottomBar];
    const calendarDiv = [style.CalendarDiv];
    const eventsDiv = [style.listOfEventsDiv];
    if(!openCalendar){
        bottomBar.push(style.BottomClosed);
        calendarDiv.push(style.BottomChildrenClosed);
        eventsDiv.push(style.BottomChildrenClosed);
    }


    return (
        <div className={style.Agenda}>
            {
                openCalendar ?
                <div className={bottomBar.join(' ')}>
                    <div className={calendarDiv.join(' ')}>
                        <Calendar
                            eventList={eventDates}
                        />
                    </div>
                        <div className={style.closeBottom} onClick={() => setOpenCalendar(!openCalendar)}>
                            <Icon color="inherit">calendar_today</Icon>
                        </div> 
                    <div className={eventsDiv.join(' ')}>
                            <span className={style.agendaTitle}>Agenda</span>
                        <div className={style.listOfEvents}>
                            <EventList events={{...events}} />
                        </div>
                    </div>
                </div> :

                <div className={style.openBottomBtn} onClick={() => setOpenCalendar(!openCalendar)}>
                    <Icon color="inherit">calendar_today</Icon>
                </div>
            }
        </div>

    )
};

export default Agenda;