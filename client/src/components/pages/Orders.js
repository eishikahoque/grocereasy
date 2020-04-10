import { Divider, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import React, { Component } from 'react'

import OrderHistoryCard from '../elements/OrderHistoryCard'
import BottomNavBar from '../layout/BottomNavBar'
import NavBar from '../layout/NavBar'
import mobileCar from '../../assets/mobileCar.svg'



const styles = () => ({
  context: {
    margin: '5rem 2rem',
  },
  title: {
    fontFamily: 'Lato',
    marginBottom: '1rem',
  }, 
  image: {
    width: '90%',
    height: '90%',
    margin: '2rem auto',
    display: 'flex',
  }
})


class Orders extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       order: []
    }
  }
  

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
          {
            this.state.order.length === 0 && 
            <div>
              <img src={mobileCar} alt="basket" className={classes.image} />
              <Typography variant="h5" className={classes.subheader} align="center">
                You don't have any order history
              </Typography>
              <Typography variant="body1" className={classes.subtitle} align="center">
                Purchase groceries to view order history here
              </Typography>
            </div>
          }   
          {
            this.state.order.length > 0 &&
            <div>
              <OrderHistoryCard cancel={this.onCancel} viewDetails={this.onViewDetails} />
              
              {/* when pulling information from database bring them in as props from the group product item */}
            </div>
          }
        </div>
        <BottomNavBar />
      </div>
    )
  }
}

export default withStyles(styles)(Orders)