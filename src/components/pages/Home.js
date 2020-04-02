import React, { Component } from 'react'
import NavBar from '../layout/NavBar'
import BottomNavigation from '../layout/BottomNavigation'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

import CategoryBtn from '../elements/CategoryBtn'
import ProduceBtn from '../elements/ProduceBtn'


const styles = () => ({
  root: {
    margin: '4rem 1rem',
  },
  categories: {
    display: 'flex',
    overflowX: 'scroll',
  }
})

class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <NavBar />
        <div className={classes.root}>
          <Typography variant="h5">
            Category
          </Typography>
          <div className={classes.categories}>
            <CategoryBtn />
            <CategoryBtn />
            <CategoryBtn />
            <CategoryBtn />
          </div>
  

          <Typography variant="h5">
            Produce
          </Typography>
          <div>
            <ProduceBtn />
          </div>
        </div>
        <BottomNavigation />
      </React.Fragment>
    )
  }
}
export default withStyles(styles)(Home)