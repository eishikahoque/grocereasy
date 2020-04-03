import React, { Component } from 'react'
import NavBar from '../layout/NavBar'
import BottomNavBar from '../layout/BottomNavBar'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

import CategoryBtn from '../elements/CategoryBtn'
import ProduceBtn from '../elements/ProduceBtn'
import ItemPrice from '../elements/ItemPrice'



const styles = () => ({
  root: {
    margin: '4rem 0',
  },
  categories: {
    display: 'flex',
    overflowX: 'scroll',
  },
  header: {
    marginLeft: '2rem',
  },
  products: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 'auto',
    width: '90%'
  },
  produce: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    margin: '1rem'
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
          <Typography variant="h5" className={classes.header}>
            Category
          </Typography>
          <div className={classes.categories}>
            <CategoryBtn />
            <CategoryBtn />
            <CategoryBtn />
            <CategoryBtn />
          </div>
  

          <Typography variant="h5" className={classes.header}>
            Produce
          </Typography>
          <div className={classes.products}>
            <div className={classes.produce}>
              <ProduceBtn />
              <ItemPrice />
            </div>
            <div className={classes.produce}>
              <ProduceBtn />
              <ItemPrice />
            </div>
            <div className={classes.produce}>
              <ProduceBtn />
              <ItemPrice />
            </div>
            <div className={classes.produce}>
              <ProduceBtn />
              <ItemPrice />
            </div>
            <div className={classes.produce}>
              <ProduceBtn />
              <ItemPrice />
            </div>
            <div className={classes.produce}>
              <ProduceBtn />
              <ItemPrice />
            </div>
            <div className={classes.produce}>
              <ProduceBtn />
              <ItemPrice />
            </div>
            <div className={classes.produce}>
              <ProduceBtn />
              <ItemPrice />
            </div>
            
            

          </div>
        </div>
        <BottomNavBar />
      </React.Fragment>
    )
  }
}
export default withStyles(styles)(Home)