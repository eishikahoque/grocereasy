import React from 'react'
import LogoTitle from '../layout/LogoTitle'
import { Button , Typography , Card , CardActions , CardContent, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
  root: {
  },
  card: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    height: '80%',
    borderRadius: '2.75rem 2.75rem 0 0',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateRows: '5fr 1.5fr'
  },
  btn: {
    width: '75%',
    margin: '1rem auto',
    fontFamily: 'Raleway'
  },
});

function LandingPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LogoTitle />
      <Card className={classes.card}>
        <CardContent className={classes.cardContainer}>
            
        </CardContent>
      </Card>
     
    </div>
  )
}


export default LandingPage
