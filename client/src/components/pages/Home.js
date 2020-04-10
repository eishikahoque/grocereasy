import React, { Component } from 'react'
import NavBar from '../layout/NavBar'
import BottomNavBar from '../layout/BottomNavBar'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { withRouter } from 'react-router-dom'

import CategoryBtn from '../elements/CategoryBtn'
import ProduceBtn from '../elements/ProduceBtn'
import ItemPrice from '../elements/ItemPrice'
import ProductListMock from '../mockData/ProductListMock'


const styles = () => ({
  root: {
    margin: '4rem 0',
  },
  header: {
    margin: '1rem 2rem',
    textTransform: 'capitalize'
  },
  productRow: {
    display: 'flex',
    overflowX: 'scroll',
    scrollBehaviour: 'smooth',
    margin: '0 4px',
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

  onProductSelected = (product) => {
    this.props.history.push('/productDetail', product)
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
                  <div className={classes.productRow}>
                    {
                      Object.values(productCategory).map((products) => products.map((product, index) => (
                        <div className={classes.produce} key={index}>
                          <ProduceBtn productImage={product['image']} productSelected={() => this.onProductSelected(product)} />
                          <ItemPrice itemName={product['name']} itemPrice={product['price']} />
                        </div>
                      )))
                    }

                  </div>
                </div>
            ))
          }
        </div>

        <BottomNavBar />
      </React.Fragment>
    )
  }
}
export default withRouter(withStyles(styles)(Home))