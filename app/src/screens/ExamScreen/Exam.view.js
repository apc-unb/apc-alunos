import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import ApiService from '../../../../service/api/ApiService';
import styles from './ExamScreen.module.css';

import ExamItem from './components/ExamItem/ExamItem';

const ExamScreen = () => {
    const sessionClass = JSON.parse(sessionStorage.getItem('APC_sessionClass'));
    const [exams, setExams] = useState([]);

    useEffect(() => {
        async function fetch() {
            const [err, res] = await ApiService.listExams(sessionClass.ID);
            if(err !== null){
                console.log(err);
            } else {
                setExams(res.data);
            }
        };
        fetch();
    }, []);

    const examItems = exams.map((item, idx) => <ExamItem exam={item} key={idx} />);

    return (
        <section className={styles.ExamView}>
            {examItems}
        </section>
    )
};

export default ExamScreen;