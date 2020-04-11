import { InputBase, Typography, Backdrop, CircularProgress } from '@material-ui/core/'
import SearchIcon from '@material-ui/icons/Search'
import { withStyles } from '@material-ui/styles'
import axios from 'axios'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import searchBasket from '../../assets/searchBasket.svg'
import BottomNavBar from '../layout/BottomNavBar'
import NavBar from '../layout/NavBar'
import ProduceBtn from '../elements/ProduceBtn'
import ItemPrice from '../elements/ItemPrice'

const styles= () => ({
  search: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flexStart',
    color: 'rgba(0, 0, 0, 0.23)',
    margin: '5rem 2rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    padding: '0 0.625rem',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)'
  },
  inputRoot: {
    color: '#222222',
  },
  inputInput: {
    padding: '1rem 1rem 1rem 0 ',
    width: '100%'
  },
  image: {
    width: '40%',
    height: '40%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
  searchImages: {
    marginTop: '1rem'
  },
  groceryLayout: {
    paddingTop: '1rem',
    paddingBottom: '6rem',
  },
  backdrop: {
    zIndex: 1,
    color: '#92C023',
  },

})
class SearchPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       search: '',
       intolerances: [],
       products: [],
       backdropOpen: false,
    }
  
  }

  componentDidMount = () => {
    const allergies = sessionStorage.getItem('allergies')
    if (allergies && allergies.length > 0) {
      this.setState({
        intolerances: allergies
      })
    }
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  getSearchResults = async (query) => {
    this.setState({
      backdropOpen: true
    })
    try {
      const response = await axios.get('/food/ingredients/autocomplete', {
        baseURL: 'https://api.spoonacular.com',
        params: {
          query,
          metaInformation: true,
          // intolerances: this.state.intolerances.join(', '),
          apiKey: '54c611d72e5e443cba5a8aa69c24b1c8'
        },
      })
      if (response && response.data && response.status === 200) {
        this.setState({
          search: query,
          products: response.data,
          backdropOpen: false
        })
      }
    } catch (error) {
      this.setState({
        backdropOpen: false
      })
      console.error(error)
    }
  }

  handleKeyPress = (e) => {
    if(e.keyCode === 13) {
      this.getSearchResults(e.target.value)
    }
  }

  onProductSelected = (product) => {
    this.props.history.push('/productDetail', product)
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <NavBar />
        <div>
          <div className={classes.search}>
            <SearchIcon />  
            <InputBase
              placeholder="Search..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyDown={this.handleKeyPress}
              onChange={this.handleSearch}
              inputProps={{ 'aria-label': 'search'}}
            />
          </div> 
          <div className={classes.groceryLayout}>
            {
              this.state.products.length === 0 && 
              <div className={classes.searchImages}>
                <img src={searchBasket} alt="search basket" className={classes.image} /> 
                <Typography align="center" variant="h5" style={{ fontWeight: 500,  marginTop: '2rem'}}>
                  Begin your search
                </Typography>
                <Typography align="center" style={{ maxWidth: '15ch', margin: 'auto' }}>
                  Start searching for your groceries
                </Typography>
              </div>
            }
            {
              this.state.products.length > 0 &&
              this.state.products.map((product, index) => {
                return (
                  <div key={index} >
                    <ProduceBtn productImage={product.image} productSelected={() => this.onProductSelected(product)} />
                    <ItemPrice itemName={product.name} />
                  </div>
                )
              })
            }
          </div>
        </div>
        <BottomNavBar />
        <Backdrop className={classes.backdrop} open={this.state.backdropOpen}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    )
  }
}
export default withRouter(withStyles(styles)(SearchPage))