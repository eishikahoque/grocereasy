import React, { Component } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { Typography, InputBase } from '@material-ui/core/';
import { withStyles } from '@material-ui/styles'

import NavBar from '../layout/NavBar'
import BottomNavBar from '../layout/BottomNavBar'
import searchBasket from '../../assets/searchBasket.svg'

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
    width: '50%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
  }

})
class SearchPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       search: '',
    }
  }

  handleSearch = (_e, newValue) => {
    this.setState({
      search: newValue
    })
  }

  handleKeyPress = (e) => {
    if(e.keyCode === 13) {
      console.log('enter', e.target.value)
    }
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <NavBar />
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
        <img src={searchBasket} alt="search basket" className={classes.image} /> 
        <Typography align="center">
          Start searching for your groceries
        </Typography>
        <BottomNavBar />
      </div>
    )
  }
}
export default withStyles(styles)(SearchPage)