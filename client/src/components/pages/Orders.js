import { Divider, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { withRouter } from 'react-router-dom';


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
       orders: []
    }
  }

  getOrders = () => {
    const userId = sessionStorage.getItem('userId')
    axios.get(`/api/user/${userId}/orders`, {
      baseURL: 'http://localhost:8000'
    }).then((response) => {
      const { data } = response.data
      this.setState({
        orders: data
      })
    })
  }
  
  componentDidMount(){
    this.getOrders()
  }

  onCancel = (props) => {
    axios.put(`/api/order/${props}`, {
      status: 'Cancelled'
    }, {
      baseURL: 'http://localhost:8000'
    }).then((response) => {
      if(response && response.data && response.status === 200){
        this.setState({
          orders: this.state.orders,
          status: 'Cancelled'
        })
      }
    }).catch((err) => console.log(err))
  }

  onViewDetails = (order) => {
    this.props.history.push('/orderDetail', order)
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
            this.state.orders.length === 0 && 
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
            this.state.orders.length > 0 &&
              this.state.orders.map((order, index) => (
                <div key={index}>
                  <OrderHistoryCard
                    cancel={this.onCancel} 
                    viewDetails={() => this.onViewDetails(order)}
                    item={order}
                  />
                </div>
              ))
          }
        </div>
        <BottomNavBar />
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Orders))