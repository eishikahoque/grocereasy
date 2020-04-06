import { Divider, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';

import OrderHistoryCard from '../elements/OrderHistoryCard';
import BottomNavBar from '../layout/BottomNavBar';
import NavBar from '../layout/NavBar';



const styles = () => ({
  context: {
    margin: '5rem 2rem',
  },
  title: {
    fontFamily: 'Lato',
    marginBottom: '1rem',
  }, 
})


class Orders extends Component {

  onCancel = () => {
    // delete from database
  }

  onViewDetails = () => {
    this.props.history.push('/orderDetail')
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <NavBar />
        <div className={classes.context}>
          <Typography variant="h4" className={classes.title}>
            Order History
          </Typography>
          <Divider />
          <OrderHistoryCard cancel={this.onCancel} viewDetails={this.onViewDetails} />
        </div>
        <BottomNavBar />
      </div>
    )
  }
}

export default withStyles(styles)(Orders)