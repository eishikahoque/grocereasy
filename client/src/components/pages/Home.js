import React, { Component } from 'react'
import NavBar from '../layout/NavBar'
import BottomNavBar from '../layout/BottomNavBar'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

import CategoryBtn from '../elements/CategoryBtn'
import ProduceBtn from '../elements/ProduceBtn'
import ItemPrice from '../elements/ItemPrice'
import ProductListMock from '../mockData/ProductListMock'


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

const ProductCategoryLabel = {
  
}

class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       productList: ProductListMock.products
    }
  }
  
  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <NavBar />
        <div className={classes.root}>
          {
            this.state.productList &&
            this.state.productList.length > 0 &&
            this.state.productList.map((productCategory, index) => (
                <div className={classes.products} key={index}>
                  <Typography variant="h5" className={classes.header}>
                    {Object.keys(productCategory)[0]}
                  </Typography>
                  {
                    Object.values(productCategory).map((products) => products.map((product, index) => (
                      <div className={classes.produce} key={index}>
                        <ProduceBtn productImage={product['image']} />
                        <ItemPrice itemName={product['name']} itemPrice={product['price']} />
                      </div>
                    )))
                  }
                </div>
            ))
          }
        </div>

        <BottomNavBar />
      </React.Fragment>
    )
  }
}
export default withStyles(styles)(Home)