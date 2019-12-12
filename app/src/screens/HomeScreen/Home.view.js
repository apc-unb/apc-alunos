import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';

import ProgressCard from './components/ProgressCard/ProgressCard';
// Probably needs more state intelligence than its parts
const MainScreen = () => {
    const sessionClass = JSON.parse(sessionStorage.getItem('APC_sessionClass'));
    const sessionNews = JSON.parse(sessionStorage.getItem('APC_sessionNews'));
    const sessionProgress = JSON.parse(sessionStorage.getItem('APC_sessionProgress'));
    const sessionStudent = JSON.parse(sessionStorage.getItem('APC_sessionStudent'));
    

    return (
        <section className={styles.HomeView}>
            <ProgressCard
                progress={sessionProgress}
            />
            
        </section> 
    );
}

export default MainScreen;