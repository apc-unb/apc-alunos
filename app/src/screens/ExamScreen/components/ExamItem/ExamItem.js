import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import ApiService from '../../../../../../service/api/ApiService';
import styles from './ExamItem.module.css';
import { makeStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
    Exam: {
        padding: '12px',
        margin: '10px 0px',
        width: 'inherit',
        maxWidth: 'inherit'
    },
    ExamDetail: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'strech',
        padding: '0px'
    }
})


const Question = ({questionInfo}) => {
    
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <header className={styles.questionHeader}>
                    <p className={styles.questionIcon}>{questionInfo.title}&nbsp;<span className={styles.questionScore}>{questionInfo.score}</span></p>
                    <span className={styles.questionTags}>{questionInfo.tags.join(" · ")}</span>
                </header>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <p className={styles.questionDescription}>
                {questionInfo.statement}
                </p>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

const ExamItem = ({exam}) => {
    const classes = useStyles();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function fetch() {
            const [err, res] = await ApiService.listExamTasks(exam.ID);
            if(err !== null){
                console.log(err);
            } else {
                setQuestions(res.data);
            }
        }
        fetch();
    })

    const questionComponent = questions.map((item, idx) => <Question questionInfo={item} key={idx} />);

    return (
        <ExpansionPanel classes={{root: classes.Exam}} role="article">
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
            <h2 className={styles.examTitle}>
                {exam.title}
            </h2>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.ExamDetail}>
                {questionComponent}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default ExamItem;