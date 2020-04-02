import React, { Component } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/styles'

import NavBar from '../layout/NavBar'
import BottomNavBar from '../layout/BottomNavBar'

const styles= () => ({
  searchIcon: {
    padding: '1rem',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(0, 0, 0, 0.23)'
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: '1rem 1rem 1rem 0 ',
    width: '100%'
  }

})
class SearchPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render() {
    const {classes} = this.props
    return (
      <div>
        <NavBar />
        <div className={classes.searchIcon}>
          <SearchIcon />  
          <InputBase
            placeholder="Search..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search'}}
          />
        </div>  
        <BottomNavBar />
      </div>
    )
  }
}
export default withStyles(styles)(SearchPage)