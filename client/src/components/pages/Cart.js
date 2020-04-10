import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { Typography, Divider, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import NavBar from '../layout/NavBar'
import BottomNavBar from '../layout/BottomNavBar'
import GroupProductItem from '../elements/GroupProductItem'
import shoppingBasket from '../../assets/shoppingBasket.svg';




const styles = () => ({
  context: {
    margin: '5rem 2rem',
    paddingBottom: '12rem',
  },
  title: {
    fontFamily: 'Lato', 
    marginBottom: '1rem'
  }, 
  totalPrice: {
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  checkoutBtn: {
    display: 'flex',
    margin: '1rem auto',
  },
  totalCalculation: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    width: '100%',
    bottom: '55px',
    backgroundColor: '#F9F9F9',
    borderRadius: '1.25rem 1.25rem 0 0',
    paddingTop: '1rem'
  },
  additionalPrices: {
    width: '70%',
  },
  allPrices: {
    display: 'flex',
    justifyContent: 'space-between'
  }, 
  image: {
    width: '70%',
    margin: '5rem auto',
    display: 'flex',
    height: '70%',
  }
})

class Cart extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      tax: '1.13',
      shippingFee: '5.00',
      totalPrice: '0.00',
      products: []
    }
  }
  
  handleRemove = () => {
    // delete from database
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <NavBar/>
        <div className={classes.context}>
         
          <Typography variant="h4" className={classes.title}>Cart</Typography> 
         
          <Divider />
          <div className={classes.groceryLayout}>
            {
              this.state.products.length === 0 && 
              <div className={classes.searchImages}>
                <img src={shoppingBasket} alt="basket" className={classes.image} /> 
                <Typography align="center" variant="h5" style={{ fontWeight: 500,  marginTop: '2rem'}}>
                  Your cart is empty
                </Typography>
                <Typography align="center" style={{ maxWidth: '15ch', margin: 'auto' }}>
                  Start adding your groceries in now
                </Typography>
              </div>
            }
            {
              this.state.products.length > 0 &&
              this.state.products.map((product, index) => {
                return (
                  <div>
                    <div key={index} >
                      <GroupProductItem onRemove={this.handleRemove} />
                    </div>
                    <div className={classes.totalCalculation}>
                      <div className={classes.additionalPrices}>
                        <Typography className={classes.allPrices} > Tax (10%)  <span>${this.state.tax}</span>  </Typography>
                        <Typography className={classes.allPrices} >Delivery Fee <span>${this.state.shippingFee}</span> </Typography>
                        <Typography className={`${classes.totalPrice} ${classes.allPrices}`} >Total <span>${this.state.totalPrice}</span> </Typography>
                      </div>
                      

                      <Link to='/checkout' style={{ textDecoration: 'none'}}>
                        <Button variant="contained" color="primary" className={classes.checkoutBtn}>Proceed to Checkout</Button>
                      </Link>
                    </div>
                  </div>
                )
              })
            }
          </div> 
        </div>
        <BottomNavBar/>
      </div>
    )
  }
}

export default withStyles(styles)(Cart)
