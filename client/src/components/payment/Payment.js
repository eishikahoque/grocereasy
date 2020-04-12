import { Card, CardContent, Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


import BottomNavBar from '../layout/BottomNavBar';
import NavBar from '../layout/NavBar';
import PayPalBtn from '../elements/PayPalBtn';

const styles = () => ({
  card: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    height: '80%',
    borderRadius: '2.75rem 2.75rem 0 0',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateRows: '1fr 1fr 5fr 1fr',
    height: '90%',
    overflowY: 'scroll',
    scrollBehavior: 'smooth',
    overflowX: 'hidden',
  },
  btn: {
    width: '75%',
    margin: '2rem auto',
    fontFamily: 'Raleway'
  },
  title: {
    textAlign: 'center',
    fontSize: '3rem',
    margin: '2rem auto',
    backgroundColor: '#FFD043',
    padding: '2rem',
    paddingBottom: '4rem',
    color: '#fff'
  },
  form: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginTop: '1rem',
  }, 
})


class Payment extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      shippingDetail: {
        streetNumber: '',
        streetName: '',
        unitNumber: '',
        city: '',
        province: '',
        country: '',
        postalCode: '',
      },
      payment_id: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value
    })
  }; 

  // goBack = () => {
  //   this.props.history.goBack()
  // }

  getShipping = () => {
    let addressDetail = JSON.parse(sessionStorage.getItem('addressDetail'))
    let personalDetail = JSON.parse(sessionStorage.getItem('personalDetail'))

    this.setState({
      name: personalDetail.name,
      shippingDetail: {
        streetNumber: addressDetail.streetNumber,
        streetName: addressDetail.streetName,
        unitNumber: addressDetail.unitNumber,
        city: addressDetail.city,
        province: addressDetail.province,
        country: addressDetail.country,
        postalCode: addressDetail.postalCode,
      }
    })
  }

  paymentHandler = (details, data) => {
    const user_id = sessionStorage.getItem('userId')
    this.setState({
      payment_id: details.id
    })
    axios.post(`/api/user/${user_id}/order`, {
      baseURL: 'http://localhost:8000',
      payment_id: this.state.payment_id
    }).then((response) => {
      if (response && response.data && response.status === 201) {
        this.props.history.push('/confirmation', this.state) //NEEDS TO BE FIXED
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  // getProducts = () => {}
  
  componentDidMount(){
    this.getShipping()
    //this.getProducts() //for getting product info from cart
  }

  render() {
    const { classes } = this.props;
    const shipping = this.state.shippingDetail

    return (
      <div className={classes.root}>
        <NavBar />
        <Typography variant="h2" className={classes.title}>
          Checkout
        </Typography>
        <Card className={classes.card}>
          <CardContent className={classes.cardContainer}>
            <Typography varaint ="h3"> Your Order Will Be Shipped To </Typography>
            <Typography>
                {this.state.name}
                <br />
                {' ' + shipping.streetNumber} 
                {' ' + shipping.streetName} 
                { shipping.unitNumber ? ' #' + shipping.unitNumber : '' }
                <br />
                {shipping.city}, {shipping.province} {' ' + shipping.postalCode} {' ' + shipping.country}
              </Typography>
            <PayPalBtn
              amount = {200}
              onSuccess = {this.paymentHandler}
            />
          
          </CardContent>
        </Card>
        <BottomNavBar />
      </div>
    )
  }
}
export default withRouter(withStyles(styles)(Payment))