import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.svg';
import ShoppingMan from '../../assets/shoppingMan.svg';
import mobileCar from '../../assets/mobileCar.svg'
import LogoTitle from '../layout/LogoTitle';


const useStyles = makeStyles({
  root: {
  },
  card: {
    position: 'fixed',
    top: '120px',
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
    scrollBehavior: 'smooth',
    borderRadius: '2.75rem 2.75rem 0 0',
  },
  cardContainer: {
    // display: 'grid',
    // gridTemplateRows: '5fr 1.5fr',
    height: '100%',
    overflowY: 'scroll',
    scrollBehavior: 'smooth',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  btn: {
    width: '75%',
    margin: '1rem auto',
    fontFamily: 'Raleway'
  },
  carousel: {
    '& .CarouselItem': {
      height: '90%',

      '& div': {
        display: 'grid',
        height: '100%',
        gridTemplateRows: '5fr 1fr'
      },
      
    },
    '& .Indicators > .Active.Indicator': {
      color: '#92C023 !important'
    }
    // .Carousel .Indicators .Indicator:active {
    //   color: #1f1f1f;
    // // margin: '2rem',
  },
  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '1rem',

  },
  carouselImage: {
    margin: 'auto',
    maxWidth: '100%'
  }, 
  carouselText: {
    margin: '1rem auto',
    fontFamily: 'Raleway',
    textAlign: 'center',
  }
});

const carouselText = [
  {
    id: 1,
    image: Logo,
    text: 'Welcome to GrocerEasy',
  },
  {
    id: 2,
    image: ShoppingMan,
    text: 'Quick and easy grocery',
  },
  {
    id: 3,
    image: mobileCar,
    text: 'Delivered straight to your doorsteps',
  },
]


function LandingCarousel() {
  const classes = useStyles();
  return (
    <Carousel animation='slide' className={classes.carousel}>
      {
        carouselText.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <img src={item.image} className={classes.carouselImage} alt="" />
              <Typography className={classes.carouselText} >{item.text}</Typography>
            </React.Fragment>
          )
        })
      }
    </Carousel>
  )
}

function LandingPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LogoTitle />
      <Card className={classes.card}>
        <CardContent className={classes.cardContainer}>

          <LandingCarousel />
          <div className={classes.btnContainer}>
            <Button variant="contained" color="primary" className={classes.btn} component={Link} to='/signup'>Register</Button>
            <Button variant="outlined" color="primary" className={classes.btn} component={Link} to='/login'>Login</Button>
          </div>
            
        </CardContent>
      </Card>
     
    </div>
  )
}


export default LandingPage
