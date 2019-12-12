import React from 'react';
import moment from 'moment';
import styles from './EventList.module.css';

const EventList = ({events}) => {
    for(let month in events) {
        if(events.hasOwnProperty(month)){
            const compileList = events[month].map((item, idx) => {
                const eventStart = new Date(item.start.dateTime);
                const paddedDay = ('00' + eventStart.getDate()).slice(-2);
                const dayCss = [styles.padDay];
                let option;
                if(item.summary.toLowerCase().startsWith('prova')){
                    dayCss.push(styles.prova);
                    option = "Prova";
                } else if(item.summary.toLowerCase().startsWith('trabalho')){
                    dayCss.push(styles.trabalho);
                    option = "Trabalho";
                } else {
                    dayCss.push(styles.outro);
                    option = "Aviso";
                }
                return(
                <div key={idx} className={styles.eventItem}>
                    <span className={dayCss.join(' ')}>{paddedDay}</span>&nbsp;
                    <div className={styles.dayContent}>
                        <span className={styles.dayContentHeader}>{option}</span>
                        <span className={styles.dayContentText}>{item.summary}</span>
                    </div>
                </div>);
            });
            events[month] = compileList;
        }
    }

    const monthStrToNumber = (month) => {
        const months = [
            'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 
            'jul', 'ago', 'set', 'out', 'nov', 'dez'
        ];
        return months.indexOf(month);
    }

    const monthToFullName = (month) => {
        switch (month) {
            case "jan": return "Janeiro";
            case "fev": return "Fevereiro";
            case "mar": return "Março";
            case "abr": return "Abril";
            case "mai": return "Maio";
            case "jun": return "Junho";
            case "jul": return "Julho";
            case "ago": return "Agosto";
            case "set": return "Setembro";
            case "out": return "Outubro";
            case "nov": return "Novembro";
            case "dez": return "Dezembro";

        }
    }

    const eventList = Object.keys(events).map((key, idx) => {
            // TODO: Figure how to show only some months in list
            const thisMonth = moment().month();
            const eventMonth = moment();
            return (<div key={idx}>
                <span className={styles.monthHeader}>{monthToFullName(key)}</span>
                {events[key]}
            </div>)
    });

    return (
        <div className={styles.EventList}>
            {eventList}
        </div>
    )
}

export default EventList;