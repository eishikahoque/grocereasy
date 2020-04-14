import React, { Component } from 'react'
import { Stepper, Step, StepLabel, Typography, Divider, Card, CardContent, Avatar, Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { withStyles } from '@material-ui/styles'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import NavBar from '../layout/NavBar'
import BottomNavBar from '../layout/BottomNavBar'
import OrderHistoryCard from '../elements/OrderHistoryCard'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = () => ({
  context: {
    margin: '5rem 2rem',
  },
  title: {
    fontFamily: 'Lato',
    marginBottom: '1rem'
  },
  stepLabe: {
    fontSize: '1.5rem'
  },
  chatBtn: {
    display: 'flex',
    margin: 'auto',
    padding: '2rem 1rem',
    backgroundColor: '#F9F9F9'
  },
  chatAvatar: {
    marginRight: '1rem',
    fontSize: '2rem',
    backgroundColor: '#58C9BE',
    width: '4.375rem',
    height: '4.375rem'
  }
})

class Confirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: JSON.parse(sessionStorage.getItem('recentOrder')) || null,
      steps: ['Order is being processed', 'Your order is out for delivery', 'Your order has been delivered'],
      activeStep: 0,
      open: false,
      orderStatus: ''
    }
  }
  
  handleNavigation = () => {
    this.props.history.push('/chat')
  }

  onCancel = (props) => {
    axios.put(`/api/order/${props}`, {
      status: 'Cancelled'
    }, {
      baseURL: 'http://localhost:8000'
    }).then((response) => {
      if(response && response.data && response.status === 200) {
        const order = { ...this.state.order, status: response.data.status }
        sessionStorage.setItem('recentOrder', JSON.stringify(order))
        this.setState({
          order,
          open: true
        })
      }
    }).catch((err) => console.log(err))
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <NavBar />
        <div className={classes.context}>
          <Typography variant="h4" className={classes.title}>Order Confirmed</Typography>
          <Divider />
          <OrderHistoryCard 
            order={this.state.order}
            cancel={this.onCancel}
            hideDetails
          />
          <Stepper activeStep={this.state.activeStep} orientation="vertical">
            {this.state.steps.map((label, index) => (
              <Step key={label} className={classes.step}>
                <StepLabel className={classes.stepLabel}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Card onClick={this.handleNavigation}>
            <CardContent className={classes.chatBtn}>
              <Avatar className={classes.chatAvatar}>S</Avatar>
              <Typography>Your shopper is ready to take your questions</Typography>
            </CardContent>
          </Card>
        </div>
        <BottomNavBar />
        <Snackbar 
            open={this.state.open} 
            onClose={this.handleClose}
            autoHideDuration={2000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
          <Alert severity="success" style={{ backgroundColor: '#58C9BE'}} >
            Order Cancelled!
          </Alert>
        </Snackbar>
      </div>
    )
  }
}
export default withRouter(withStyles(styles)(Confirmation))