import React, { useState, useEffect } from 'react';
import styles from './News.module.css';

import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    searchDiv: {
        backgroundColor: 'white',
        borderRadius: 50,
        heigth: '14px',
        width: '198px',
        margin: '4px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },

    searchIcon: {
        margin: '0px 4px'
    }
});

const News = () => {

    const newsList = JSON.parse(sessionStorage.getItem('APC_sessionNews')) || [];
    const [newsToShow, setNewsToShow] = useState(newsList);
    const classes = useStyles();

    const genNewsList = (newsList) => newsList.map((item, idx) => {
        return (
            <div className={styles.newsDiv} key={idx}>
                <span className={styles.newsTitle}>{item.title}</span>
                <span className={styles.newsTags}>{item.tags.join(" · ")}</span>
                <span className={styles.newsText}>{item.description}</span>
            </div>
        )
    });

    const filterNews = (filter) => {
        console.log("Filter news with", filter);
        if(filter === "") {
            setNewsToShow(newsList);
        } else {
            const news = newsList.filter((item) => 
                (item.tags.reduce((acc, curr) => {
                    return curr.toLowerCase().includes(filter) || acc;
                }, false) ||
                 item.title.toLowerCase().includes(filter))
            )
            setNewsToShow(news);
        }
    }

    return (
        <div className={styles.News}>
            <span className={styles.header}>Notificações</span>
            <Paper classes={{root: classes.searchDiv}}>
                <SearchIcon className={styles.searchIcon}/>
                <input
                    placeholder="Pesquisar"
                    className={styles.search}
                    onChange={(event) => filterNews(event.target.value)}
                    type="search"  
                />
            </Paper>
            {genNewsList(newsToShow)}
        </div>
    )

};

export default News;