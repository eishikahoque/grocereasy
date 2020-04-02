import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { Button, Typography, } from '@material-ui/core'

import BackBtn from '../elements/BackBtn'
import BottomNavigation from '../layout/BottomNavigation'
import NavBar from '../layout/NavBar'
import shoppingBasket from '../../assets/shoppingBasket.svg'

const styles = () => ({
  context: {
    margin: '4rem 2rem',
  },
  backBtn: {
    '& MuiButtonBase-root MuiIconButton-root': {
      marginTop: '4rem'
    }
  },
  title: {
    fontFamily: 'Lato',
  }, 
  image: {
    width: '60%',
    display: 'flex',
    margin: '5rem auto',
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
          <BackBtn />
          <Typography variant="h4" className={classes.title}>
            Shopping Lists
          </Typography>
          <img src={shoppingBasket} alt="basket" className={classes.image} />
          <Typography variant="h5" className={classes.subheader} align="center">
            Your List is Empty
          </Typography>
          <Typography variant="body1" className={classes.subtitle} align="center">
            Create lists and add them to your basket for an easier shopping experience
          </Typography>
          <Button variant="contained" color="primary" className={classes.addBtn}>
            Add List
          </Button>
        </div>
        <BottomNavigation />
      </div>
    )
  }
}

export default withStyles(styles)(ShoppingListPage)
