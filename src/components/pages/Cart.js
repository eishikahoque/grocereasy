import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import NavBar from '../layout/NavBar'
import BottomNavBar from '../layout/BottomNavBar'

const styles = () => ({

})

class Cart extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render() {
    return (
      <div>
        <NavBar/>
        <Typography>Cart</Typography>
        <BottomNavBar/>
      </div>
    )
  }
}

export default withStyles(styles)(Cart)
