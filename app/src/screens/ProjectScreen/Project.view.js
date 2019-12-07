import React, {useState, useEffect} from 'react';

import 'react-toastify/dist/ReactToastify.css';

import Projects from './components/Projects/Projects';
import ApiService from '../../../../service/api/ApiService';
import styles from './Project.module.css';

const ProjectView = (props) => {
    const [projectTypes, setProjectTypes] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const sessionStudent = JSON.parse(sessionStorage.getItem('APC_sessionStudent'));

    useState( async () => {
        const [err, res] = await ApiService.listProjects(sessionStudent.ID);
        const [errType, resType] = await ApiService.listProjectTypes();
        if(err !== null) {
            console.log(err);
        } else {
            setSubmissions(res.data);
        }
        if(errType !== null) {
            console.log(errType);
        } else {
            setProjectTypes(resType.data)
        }

    }, []);

    const projects = projectTypes.map( (value, index) => {

        const relatedSubmissions = [];
        for(let i = 0; i < submissions.length; i++){
            if(submissions[i].ProjectTypeID === value.ID){
                relatedSubmissions.push(submissions[i]);
            }
        }

        return <Projects 
                value={value}
                relatedSubmissions={relatedSubmissions}
                index={index}
                sessionStudent={sessionStudent}
                />
    });

    return (
        <section className={styles.ProjectView}>
                {projects}
        </section>
    )
}

export default ProjectView;
