import { Button, Divider, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import groceryBag from '../../assets/groceryBag.svg';
import GroupProductItem from '../elements/GroupProductItem';
import BottomNavBar from '../layout/BottomNavBar';
import NavBar from '../layout/NavBar';


const styles = () => ({
  context: {
    margin: '5rem 2rem',
  },
  title: {
    fontFamily: 'Lato',
    marginBottom: '1rem'
  }, 
  image: {
    width: '40%',
    height: '40%',
    display: 'flex',
    margin: '2rem auto',
  },
  subheader: {
    fontWeight: 500
  },
  addBtn: {
    display: 'flex',
    margin: '2rem auto'
  }
})

class ShoppingListPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       products: JSON.parse(sessionStorage.getItem('productList')) || []
    }
  }

  handleRedirect = () => {
    this.props.history.push('/search')
  }

  handleProductSelected = (product) => {
    this.props.history.push('/productDetail', product)
  } 
  
  handleRemove = (product) => {
    this.state.products = this.state.products
      .filter((p) => p.name !== product.name)
    this.updateList()
  }

  updateList = () => {
    axios.put('/api/user/list/update', {
      user_id: sessionStorage.getItem('userId'),
      products: this.state.products
    }, {
      baseURL: 'http://localhost:8000'
    }).then((response) => {
      if (response && response.data && response.status === 200) {
        sessionStorage.setItem('productList', JSON.stringify(this.state.products))
        this.setState({
          products: this.state.products
        })
      }
    }).catch((err) => console.log(err))
  }
  
  
  render() {
    const { classes } = this.props

    return (
      <div>
        <NavBar />
        <div className={classes.context}>
          <Typography variant="h4" className={classes.title}>
            Shopping List
          </Typography>
          <Divider/>
          {
            this.state.products.length === 0 && 
            <div>
              <img src={groceryBag} alt="basket" className={classes.image} />
              <Typography variant="h5" className={classes.subheader} align="center">
                Your List is Empty
              </Typography>
              <Typography variant="body1" className={classes.subtitle} align="center">
                Add items to your list for an easier shopping experience
              </Typography>
              <Button variant="contained" color="primary" className={classes.addBtn} onClick={this.handleRedirect}>
                Add Items
              </Button>
            </div>
          }   
          {
            this.state.products.length > 0 &&
              this.state.products.map((product, index) => (
                <div key={index}>
                  <GroupProductItem 
                    item={product} 
                    onRemove={() => this.handleRemove(product)}
                    productSelected={() => this.handleProductSelected(product)}
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

export default withRouter(withStyles(styles)(ShoppingListPage))
