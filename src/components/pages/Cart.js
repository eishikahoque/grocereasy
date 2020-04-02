import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'

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
        <BottomNavBar/>
      </div>
    )
  }
}

export default withStyles(styles)(Cart)
