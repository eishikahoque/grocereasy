import { Card, CardContent, Typography, TextField } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    textAlign: 'center',
    overflowY: 'scroll',
    overflowX: 'hidden',
    scrollBehavior: 'smooth',
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
    padding: '3rem',
    paddingBottom: '10rem',
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
  datePicker: {
    padding: '0.75rem 1rem',
    fontSize: '1.25rem',
    color: 'white',
    backgroundColor: '#92C023',
    fontFamily: 'Raleway'
  },
  paypalBtn: {
    margin: '3rem 0'
  }
})


class Payment extends Component {
  constructor(props){
    super(props)
    this.state = {
      dateSelected: false,
      isProcessing: false,
      data: {},
      startDate: new Date(),
      name: '',
      payment_id: '',
      shippingDetail: {
        streetNumber: '',
        streetName: '',
        unitNumber: '',
        city: '',
        province: '',
        country: '',
        postalCode: '',
      },
      orderDetail: {
        total_price: '',
        products:[],
      },
      recentOrder: {
        _id: '',
        status: '',
        order_date: '',
        delivery_date: '',
        order_summary: {
          total: ''
        }
      }
    }
  }

  getShipping = () => {
    let addressDetail = JSON.parse(sessionStorage.getItem('addressDetail'))
    let personalDetail = JSON.parse(sessionStorage.getItem('personalDetail'))
    let cartProductList = JSON.parse(sessionStorage.getItem('cartProductList'))

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
      },
      orderDetail: {
        products: cartProductList,
        total_price: this.props.history.location.state
      }
    })
  }

  paymentHandler = (details) => {
    const user_id = sessionStorage.getItem('userId')
    this.setState({
      payment_id: details.id,
      isProcessing: true
    })
    axios.post(`/api/user/${user_id}/order`, {
      baseURL: 'http://localhost:8000',
      payment_id: this.state.payment_id,
      products: this.state.orderDetail.products,
      order_summary: {
        total: this.state.orderDetail.total_price
      },
      delivery_date: this.state.startDate
    }).then((response) => {
      if (response && response.data && response.status === 201) {
        this.setState({
          recentOrder: {
            _id: response.data.id,
            status: response.data.status,
            order_date: response.data.order_date,
            delivery_date: response.data.delivery_date,
            order_summary: {
              total: response.data.total
            }
          }
        })
        sessionStorage.setItem('recentOrder', JSON.stringify(this.state.recentOrder))
        this.props.history.push('/confirmation', this.state)
        this.clearCartProducts()
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  clearCartProducts = () => {
    axios.put('/api/user/cart/update', {
      user_id: sessionStorage.getItem('userId'),
      products: []
    }, {
      baseURL: 'http://localhost:8000'
    }).then((response) => {
      if (response && response.status === 200) {
        sessionStorage.setItem('cartProductList', JSON.stringify([]))
      }
    }).catch((err) => console.log(err))
  }

  handleChange = date => {
    this.setState({
      startDate: date,
      dateSelected: true
    });
    console.log(this.state.orderDetail.total_price)
  };
  
  componentDidMount(){
    this.getShipping()
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
          
          { this.state.isProcessing === true && 
            <CardContent className={classes.cardContainer}>
              <Typography varaint ="h3"> Your Order is Processing </Typography>
              <Typography> Please don't leave this page while your order is processing </Typography>
            </CardContent>
          }
          { this.state.isProcessing === false &&
            <CardContent className={classes.cardContainer}>
              <Typography variant="h5" paragraph>
                Your Order Will Be Shipped To
              </Typography>
              <Typography variant="h6">{this.state.name}</Typography>
              <Typography>{shipping.streetNumber + ' ' + shipping.streetName} </Typography>
              <Typography>{shipping.unitNumber ? ' #' + shipping.unitNumber : ''} </Typography>
              <Typography>{shipping.city + ' ' + shipping.province} </Typography>
              <Typography>{shipping.postalCode} </Typography>
              <Typography>{shipping.country} </Typography>
              
              <Typography variant="h5" paragraph> Select a Delivery Date </Typography>
              <DatePicker
                className = {classes.datePicker}
                selected={this.state.startDate}
                onChange={this.handleChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="Time"
                minDate={new Date()}
                dateFormat="MMMM d, yyyy h:mm aa"
                calendarClassName = "DatePicker"
              />
              { this.state.dateSelected === false &&
                ""
              }
              { this.state.dateSelected === true &&
                <PayPalBtn
                className={classes.paypalBtn}
                amount = {parseFloat(this.state.orderDetail.total_price)}
                onSuccess = {this.paymentHandler}
              />
              }
            </CardContent>
          }
        </Card>
        <BottomNavBar />
      </div>
    )
  }
}
export default withRouter(withStyles(styles)(Payment))