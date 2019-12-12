import React from 'react';
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
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
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

  function createData(atividade, data, link, status) {
    return { atividade, data, link, status };
  }

  const rows = [
    createData('List 1', '12/12/2019', 'http://google.com', (1/2)),
    createData('List 2', '13/12/2019', 'http://google.com', (2/3)),
    createData('List 3', '14/12/2019', 'http://google.com', (0/3)),
  ];

  const statusSymbol = (status) => {
    const classes = useStyles();
    if(status < 0.4) 
      return <CloseIcon className={classes.red}/>;
    else if(status < 0.6)
      return <CheckOkIcon className={classes.yellow}/>;
    
    return <CheckFullIcon className={classes.mint}/>;
  }

export default function ProgressCard({ progress }) {
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
      <h2 className={styles.title}>Progresso ·&nbsp;
      <span className={progressColor()}>{((progress.done/progress.total) * 100).toFixed(2)}%</span></h2>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>Atividade</TableCell>
            <TableCell className={classes.tableHeader}>Data</TableCell>
            <TableCell className={classes.tableHeader}>Link</TableCell>
            <TableCell className={classes.tableHeader} align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" className={classes.tableText}>
                {row.atividade}
              </TableCell>
              <TableCell className={classes.tableText}>{row.data}</TableCell>
              <TableCell className={classes.tableText}>{row.link}</TableCell>
              <TableCell className={classes.tableText} align="center">{statusSymbol(row.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};