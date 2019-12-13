import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import ApiServices from '../../../../service/api/ApiService';
import { makeStyles } from '@material-ui/core/styles';

import ProgressCard from './components/ProgressCard/ProgressCard';
import GradesCard from './components/GradesCard/GradesCard';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    progress: {
        fontSize: '128px',
        color: '#323ca0'
    }
});

// Probably needs more state intelligence than its parts
const MainScreen = () => {
    const sessionClass = JSON.parse(sessionStorage.getItem('APC_sessionClass'));
    const sessionNews = JSON.parse(sessionStorage.getItem('APC_sessionNews'));
    const sessionProgress = JSON.parse(sessionStorage.getItem('APC_sessionProgress'));
    const sessionStudent = JSON.parse(sessionStorage.getItem('APC_sessionStudent'));
    const [info, setInfo] = useState([]);
    const classes = useStyles();
    
    useEffect( () => {
        async function fetch() {
            const [err, res] = await ApiServices.contestInfo(sessionStudent.ID);
            if(err !== null){
              console.log(err);
            } else {
              console.log("Data:", res.data);
              setInfo(res.data);
            }
        }

        fetch();
    }, []);

    return (
        <section className={styles.HomeView}>
            {
                info.length > 0 ?
                <ProgressCard
                    progress={sessionProgress}
                    data={info}
                /> :
                <CircularProgress className={classes.progress} />
            }
            <GradesCard grades={sessionStudent.grades.exams} />
        </section> 
    );
}

export default MainScreen;