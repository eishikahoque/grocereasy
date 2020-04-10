import { Button, Typography, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import groceryBag from '../../assets/groceryBag.svg';
import BottomNavBar from '../layout/BottomNavBar';
import NavBar from '../layout/NavBar';

const styles = () => ({
  context: {
    margin: '5rem 2rem',
  },
  backBtn: {
    '& MuiButtonBase-root MuiIconButton-root': {
      marginTop: '4rem'
    }
  },
  title: {
    fontFamily: 'Lato',
    marginBottom: '1rem'
  }, 
  image: {
    width: '80%',
    height: '80%',
    display: 'flex',
    margin: '2rem auto',
  },
  subheader: {
    fontWeight: 500
  },
  addBtn: {
    display: 'flex',
    margin: '2rem auto'
  }
})

class ShoppingListPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render() {
    const { classes } = this.props

    return (
      <div>
        <NavBar />
        <div className={classes.context}>
          <Typography variant="h4" className={classes.title}>
            Shopping List
          </Typography>
          <Divider/>
          <img src={groceryBag} alt="basket" className={classes.image} />
          <Typography variant="h5" className={classes.subheader} align="center">
            Your List is Empty
          </Typography>
          <Typography variant="body1" className={classes.subtitle} align="center">
            Add items to your list for an easier shopping experience
          </Typography>
          <Link to='/search' style={{textDecoration: 'none'}}>
            <Button variant="contained" color="primary" className={classes.addBtn}>
              Add Items
            </Button>
          </Link>
        </div>
        <BottomNavBar />
      </div>
    )
  }
}

export default withStyles(styles)(ShoppingListPage)
