import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 200,
    backgroundColor: 'lightgreen'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CardView(props) {
  const classes = useStyles();
  let style;
  switch(props.title){
    case 'Total Flights':
    style = {backgroundColor: 'lightgrey'};
    break;
    case 'Total Passengers':
    style = {backgroundColor: 'lightblue'};
    break;
    case 'Total Seats':
    style = {backgroundColor: 'lightcoral'};
    break;
    default:
  }
  return (
    <Card style = {style} className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.title}
        </Typography>
        <p> {props.total} </p>
      </CardContent>
    </Card>
  );
}