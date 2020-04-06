import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { Typography, Divider, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import NavBar from '../layout/NavBar'
import BottomNavBar from '../layout/BottomNavBar'
import ProduceBtn from '../elements/ProduceBtn'
import ItemPrice from '../elements/ItemPrice'
import QuantityBtn from '../elements/QuantityBtn'


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
  items: {
    display: 'flex',
    margin: '1rem 0',
    justifyContent: 'space-between'
  },
  priceQuantity: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'flex-end',
  },
  price: {
    margin: 'none',
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
  imageBtn: {
    display: 'flex',
    flexDirection: 'column',
  },
  removeBtn: {
    color: '#F4626C',
    fontSize: '0.55rem',
    borderColor: '#F4626C',
    padding: 0,
    maxWidth: '50%',
    margin: 'auto',
    marginTop: '0.25rem',
  }
})

class Cart extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      tax: '1.13',
      shippingFee: '5.00',
      totalPrice: '0.00'
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
          <div className={classes.items}>
            <div className={classes.imageBtn}>
              <ProduceBtn />
              <Button variant="outlined" onClick={this.handleRemove} size="small" className={classes.removeBtn}>Remove</Button>
            </div>
            <div className={classes.priceQuantity}>
              fuisnfuidf
              <ItemPrice className={classes.price} />
              <QuantityBtn />
            </div>
          </div>
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
        <BottomNavBar/>
      </div>
    )
  }
}

export default withStyles(styles)(Cart)
