import { Card, CardContent, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';

import BottomNavBar from '../layout/BottomNavBar';
import NavBar from '../layout/NavBar';
import ShippingDetailForm from './ShippingDetail';


const styles = () => ({
  card: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    height: '85%',
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

const steps = [
  'Shipping Details',
  'Billing Details',
  'Payment Details',
  'Review Order'
]

const stepperTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#58C9BE',
      contrastText: '#fff'
    },
  }
});


class Payment extends Component {
  constructor(props){
    super(props)
    this.state = {
      step: 0,
      shippingDetail: {
        name: '',
        streetNumber: '',
        streetName: '',
        unitNumber: '',
        city: '',
        province: '',
        country: '',
        postalCode: '',
      },
      billingDetail: {
        streetNumber: '',
        streetName: '',
        unitNumber: '',
        city: '',
        province: '',
        country: '',
        postalCode: '',
      },
      paymentDetail: {
        fname: '',
        lname: '',
        cardNumber: '',
        cvv: '',
        expiration: {
          month: '',
          year: '',
        }
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value
    })
  }; 

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  goBack = () => {
    this.props.history.goBack()
  }
  
  handleShippingDetailComplete = (values) => {
    this.setState({
      shippingDetail: values,
      step: this.state.step + 1
    })
  }

  handleBillingDetailComplete = (billingDetail) => {
    this.setState({
      billingDetail,
      step: this.state.step + 1
    })
  }

  handlePaymentDetailComplete = (paymentDetail) => {
    this.setState({
      paymentDetail
    }, this.navigateNext)
  }

  navigateNext = () => {
    this.props.history.push('/confirmation', this.state)
  }

  handleFormBack = () => {
    this.setState({
      step: this.state.step - 1
    })
  }
  


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar />
        <Typography variant="h2" className={classes.title}>
          Checkout
        </Typography>
        <Card className={classes.card}>
          <CardContent className={classes.cardContainer}>
            <ThemeProvider theme={stepperTheme}>
              <Stepper activeStep={this.state.step}>
                {
                  steps.map((label) => {
                    return (
                      <Step key={label} >
                        <StepLabel></StepLabel>
                      </Step>
                    )
                  })
                }
              </Stepper>
            </ThemeProvider>

            {
              this.state.step === 0 &&
                <ShippingDetailForm shippingDetail={this.state.shippingDetail} onShippingDetailChange={this.handleShippingDetailComplete} onBack={this.goBack}/>
            }

            {   
              this.state.step === 1 &&
                <ShippingDetailForm addressDetail={this.state.billingDetail} onBillingDetailChange={this.handleBillingDetailComplete} onBillingBack={this.handleFormBack} />
            }
  {/* 
            {
              this.state.step === 2 &&
                <PaymentDetailForm paymentDetail={this.state.paymentDetail} onPaymentDetailChange={this.handlePaymentDetailComplete} onPaymentBack={this.handleFormBack} />
            }
            {
              this.state.step === 3 &&
                <ReviewOrder reviewDetail={this.state} onReviewChange={this.handleReviewDetailComplete} onReviewBack={this.handleFormBack} />
            } */}
          
          </CardContent>
        </Card>
        <BottomNavBar />
      </div>
    )
  }
}
export default withStyles(styles)(Payment)