import React, { Component } from 'react'
import { Stepper, Step, StepLabel, Typography, Divider, Card, CardContent, Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { withRouter } from 'react-router-dom'

import NavBar from '../layout/NavBar'
import BottomNavBar from '../layout/BottomNavBar'
import OrderHistoryCard from '../elements/OrderHistoryCard'

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
      steps: ['Order is being processed', 'Your order is out for delivery', 'Your order has been delivered'],
      activeStep: 0,
    }
  }
  
  handleNavigation = () => {
    this.props.history.push('/chat')
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <NavBar />
        <div className={classes.context}>
          <Typography variant="h4" className={classes.title}>Order Confirmed</Typography>
          <Divider />
          <OrderHistoryCard />
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
      </div>
    )
  }
}
export default withRouter(withStyles(styles)(Confirmation))