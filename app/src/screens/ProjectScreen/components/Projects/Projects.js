import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Submission from '../Submission/Submission.js';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import styles from './Projects.module.css';
import { makeStyles } from '@material-ui/core/styles';
import WarnIcon from '@material-ui/icons/Warning';
import ProjectDescription from '../ProjectDescription/ProjectDescription';
import FilePicker from '../FilePicker';

import moment from 'moment';
moment.locale('pt-br');

const useStyles = makeStyles({
    Project: {
        padding: '12px',
        margin: '10px 0px',
        width: 'inherit',
        maxWidth: 'inherit'
    }
})


const Project = ({ value, relatedSubmissions, index, sessionStudent }) => {
    const classes = useStyles();
    const [descriptionOpen, setDescriptionOpen] = useState(false);
    const [filePickerOpen, setFilePickerOpen] = useState(false);
    const submissionObjs = relatedSubmissions.map( (sub) => {
        return (
                < Submission {...sub} />
        )
    });

    // Goes to FilePicker
    const infoParaEnvio = {
        "StudentID": sessionStudent.ID,
        "ProjectTypeID": value.ID,
        "ClassID": sessionStudent.ClassID,
        "studentName": sessionStudent.firstname + " " + sessionStudent.lastname,
        "monitorName": relatedSubmissions.length > 0 ? relatedSubmissions[0].monitorname : null,
        "monitorEmail": relatedSubmissions.length > 0 ? relatedSubmissions[0].monitoremail : null,
        "projectID": relatedSubmissions.length > 0 ? relatedSubmissions[0].ID : null
    }

    const projectOpen = (start, end) => {

        const formatDate = (days, hours, minutes) => {
            if(days > 0){
                return days + " dias"
            } else {
                return ('00' + hours).substr(-2) + 'h' + ('00' + minutes).substr(-2)
            }
        }

        if(moment().isBefore(start)){
            const diffDays = moment(start).diff(moment(), 'days');
            const diffHours = moment(start).diff(moment(), 'hours');
            const diffMinutes = moment(start).diff(moment(), 'minutes');
            return <span className={styles.notOpenYet}>{"Abre em " + formatDate(diffDays, diffHours, diffMinutes)}</span>
        } else if(moment().isBefore(end)){
            const diffDays = moment(end).diff(moment(), 'days');
            const diffHours = moment(end).diff(moment(), 'hours');
            const diffMinutes = moment(end).diff(moment(), 'minutes');
            return <span className={styles.open}>{"Falta " + formatDate(diffDays, diffHours, diffMinutes)}</span>
        } else {
            const diffDays = moment().diff(end, 'days');
            const diffHours = moment().diff(end, 'hours');
            const diffMinutes = moment().diff(end, 'minutes');
            return <span className={styles.closed}>{"Fechado faz " + formatDate(diffDays, diffHours, diffMinutes)}</span>
        }
    }

    return (
        <Card classes={{root: classes.Project}} key={index} role="article">
            <ProjectDescription 
                open={descriptionOpen}
                onClose={() => setDescriptionOpen(false)}
                projectName={value.name}
                projectDescription={value.description}
            />
            <FilePicker 
                open={filePickerOpen}
                onClose={() => setFilePickerOpen()}
                projectName={value.name}
                infoToSend={infoParaEnvio}
                askResend={(relatedSubmissions.length > 0)}
            />
            <CardContent>
            <h2 className={styles.projectTitle}>
                {value.name} · {projectOpen(value.start, value.end)}
            </h2>
            <h4 className={styles.projectPeriodo}>
                Início: {moment(value.start).format("DD/MM/YYYY")}&nbsp;
                Fim: {moment(value.end).format("DD/MM/YYYY hh:mm")}
            </h4>

            {
                relatedSubmissions.length > 0 ?
                <table className={styles.tableSubmission}>
                    <thead className={styles.tableHead}>
                        <tr>
                            <th>Data de Envio</th>
                            <th>Nome do Arquivo</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {submissionObjs}
                    </tbody>
                </table>  :
                <span className={styles.semSubmissoes}>
                <WarnIcon fontSize="large"/>
                &nbsp;Não há submissões para este projeto
                </span>
            }
            </CardContent>
            <CardActions>
                <button onClick={() => setDescriptionOpen(true)} className={styles.actionButton}>Descrição</button>
                {
                    moment().isBetween(value.start, value.end) ?
                    <button className={styles.actionButton} onClick={() => setFilePickerOpen(true)}>Enviar Trabalho</button> :
                    null
                }
            </CardActions>
        </Card>
    );
}

Project.propTypes = {
    value: PropTypes.object.isRequired,
    relatedSubmissions: PropTypes.arrayOf(PropTypes.object),
    index: PropTypes.number.isRequired,
    sessionStudent: PropTypes.object.isRequired
}

export default Project;