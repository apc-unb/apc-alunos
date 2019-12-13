import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import styles from './ProgressCard.module.css';

import CheckOkIcon from '@material-ui/icons/CheckCircleOutline';
import CheckFullIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: '100%',
    overflowX: 'auto',
  },
  table: {
    maxWidth: 'inherit'
  },
  tableHeader: {
    fontSize: '14px',
    fontWeight: 550,
    color: 'black'
  },
  tableText: {
    fontSize: '14px',
    color: 'black'
  },
  mint: {
    fontSize: '32px',
    color: '#8affb0'
  },
  yellow: {
    fontSize: '32px',
    color: 'gold'
  },
  red: {
    fontSize: '32px',
    color: '#fb654c'
  }
});

  const statusSymbol = (status) => {
    const classes = useStyles();
    if(status < 0.4) 
      return <CloseIcon className={classes.red}/>;
    else if(status < 0.6)
      return <CheckOkIcon className={classes.yellow}/>;
    
    return <CheckFullIcon className={classes.mint}/>;
  }

export default function ProgressCard({ progress, data }) {
  const classes = useStyles();

  const progressColor = () => {
    const done = progress.done;
    const total = progress.total;

    if(done / total < 0.4) 
      return styles.doingBad;
    else if(done / total < 0.6)
      return styles.doingFine;
    
    return styles.doingGreat;
  }

  return (
    <Paper className={classes.root}>
      <h2 className={styles.title}>Atividades ·&nbsp;
        <span className={progressColor()}>{((progress.done/progress.total) * 100).toFixed(2)}%</span>
      </h2>
      <div className={styles.tableWrapper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>Atividade</TableCell>
            <TableCell className={classes.tableHeader}>Link</TableCell>
            <TableCell className={classes.tableHeader} align="center">Progresso</TableCell>
            <TableCell className={classes.tableHeader} align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.length > 0 ?
            data.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row" className={classes.tableText}>
                  {row.name}
                </TableCell>
                <TableCell className={classes.tableText}><a href={row.url}>{row.url.replace('https://', '')}</a></TableCell>
                <TableCell className={classes.tableText} align="center">{row.done}/{row.total}</TableCell>
                <TableCell className={classes.tableText} align="center">{statusSymbol(row.done / row.total)}</TableCell>
              </TableRow>
            )) :
            null
          }
        </TableBody>
      </Table>
      </div>
    </Paper>
  );
};