import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { Typography, Divider, Button, Backdrop, CircularProgress } from '@material-ui/core'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NumberFormat from 'react-number-format'

import NavBar from '../layout/NavBar'
import BottomNavBar from '../layout/BottomNavBar'
import GroupProductItem from '../elements/GroupProductItem'
import shoppingBasket from '../../assets/shoppingBasket.svg';



const styles = () => ({
  context: {
    margin: '5rem auto',
    paddingBottom: '12rem',
  },
  title: {
    fontFamily: 'Lato', 
    margin: '0 2rem',
    marginBottom: '1rem',
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
    width: '40%',
    margin: '5rem auto',
    display: 'flex',
    height: '40%',
  },
  backdrop: {
    zIndex: 1,
    color: '#92C023',
  },
  groceryCart: {
    margin: '0 2rem',
  }
})

const round = (value, decimals) => Number(Math.round(value +'e'+ decimals) +'e-'+ decimals).toFixed(decimals)

class Cart extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      tax: 0,
      shippingFee: 5,
      totalPrice: 0,
      productTotal: 0,
      products: JSON.parse(sessionStorage.getItem('cartProductList')) || [],
      changeLoading: false,
    }
  }

  componentDidMount = () => {
    this.calculatePrices()
  }

  handleQuantityUpdated = (product, quantity) => {
    const itemIdx = this.state.products.findIndex((p) => p.name = product.name)
    if (itemIdx > -1) {
      this.state.products[itemIdx].quantity = quantity
      this.updateCart()
    }
  }

  calculatePrices = () => {
    if (this.state.products && this.state.products.length > 0) {
      const productTotal = this.state.products
        .map((product) => product.price * product.quantity)
        .reduce((prev, next) => prev + next)
      this.setState({
        productTotal: round(productTotal, 2),
        tax: round(0.13 * productTotal, 2),
        totalPrice: round((1.13 * productTotal) + this.state.shippingFee, 2)
      })
    }
  }
  
  handleRemove = (product) => {
    this.state.products = this.state.products
      .filter((p) => p.name !== product.name)
    this.updateCart()
  }
  
  handleProductSelected = (product) => {
    this.props.history.push('/productDetail', product)
  } 

  updateCart() {
    this.setState({ changeLoading: true })
    axios.put('/api/user/cart/update', {
      user_id: sessionStorage.getItem('userId'),
      products: this.state.products
    }, {
      baseURL: 'http://localhost:8000'
    }).then((response) => {
      if (response && response.data && response.status === 200) {
        this.calculatePrices()
        sessionStorage.setItem('cartProductList', JSON.stringify(this.state.products))
        this.setState({
          products: this.state.products,
          changeLoading: false,
        })
      }
    }).catch((err) => {
      console.log(err)
      this.setState({ changeLoading: false })
    })
  }


  render() {
    const { classes } = this.props
    return (
      <div>
        <NavBar/>
        <div className={classes.context}>
          <Typography variant="h4" className={classes.title}>Cart</Typography> 
          <Divider style={{margin: '0 2rem'}} />
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
              <div>
                {
                  this.state.products.map((product, index) => (
                    <div key={index} className={classes.groceryCart}>
                      <GroupProductItem 
                        item={product} 
                        onRemove={() => this.handleRemove(product)}
                        productSelected={() => this.handleProductSelected(product)}
                        quantityUpdated={(value) => this.handleQuantityUpdated(product, value)} 
                      />
                    </div>
                  ))
                }
                <div className={classes.totalCalculation}>
                  <div className={classes.additionalPrices}>
                    <Typography className={classes.allPrices} > Tax (13%)  
                      <span>
                        <NumberFormat 
                          value={this.state.tax}
                          displayType={'text'}
                          thousandSeparator
                          fixedDecimalScale
                          prefix={'$'}
                          decimalScale={2}
                        /> 
                      </span>  
                    </Typography>
                    <Typography className={classes.allPrices} >Delivery Fee 
                      <span>
                        <NumberFormat 
                          value={this.state.shippingFee}
                          displayType={'text'}
                          thousandSeparator
                          fixedDecimalScale
                          prefix={'$'}
                          decimalScale={2}
                        /> 
                      </span> 
                    </Typography>
                    <Typography className={`${classes.totalPrice} ${classes.allPrices}`} >Total 
                      <span>
                        <NumberFormat 
                          value={this.state.totalPrice}
                          displayType={'text'}
                          thousandSeparator
                          fixedDecimalScale
                          prefix={'$'}
                          decimalScale={2}
                        /> 
                      </span> 
                    </Typography>
                  </div>
                  <Link to='/checkout' style={{ textDecoration: 'none'}}>
                    <Button variant="contained" color="primary" className={classes.checkoutBtn}>Proceed to Checkout</Button>
                  </Link>
                </div>
              </div>
            }
          </div> 
        </div>
        <BottomNavBar/>
        <Backdrop className={classes.backdrop} open={this.state.changeLoading}>
          <CircularProgress color="inherit" />
        </Backdrop> 
      </div>
    )
  }
}

export default withStyles(styles)(Cart)
