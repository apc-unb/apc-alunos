import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import styles from './GradesCard.module.css';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: '100%',
    overflowX: 'auto',
    margin: '20px 0px'
  }
});

export default function GradesCard({ grades }) {
  const classes = useStyles();

  const gradeComponent = grades.map((item, key) => {
    return (
        <div key={key} className={styles.gradeComponent}>
            <span className={styles.grade}>{item.toFixed(1)}</span>
            <span className={styles.subtitle}>Prova {key+1}</span>
        </div>
    )
  });
  return (
    <Paper className={classes.root}>
      <h2 className={styles.title}>Notas das Provas</h2>
      <div className={styles.content}>
        {gradeComponent}
      </div>
    </Paper>
  );
};