import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

import GroceryMap from '../signup/GroceryMap'
import NavBar from '../layout/NavBar'
import GroceryStoreButton from '../elements/GroceryStoreButton'


const styles = () => ({
  map: {
    margin:'5rem 0 2rem 0',
    position: 'sticky',
    top: '80px',
  },
})


class GroceryStoreOption extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      location: {
        latitude: 43.83,
        longitude: -79.11,
      },
      stores: []
    }
    this.handleUpdatePlaces = this.handleUpdatePlaces.bind(this)
    console.log(this.props.history.location.state)
  }

  handleUpdatePlaces = (places) => {
    this.setState({
      stores: places.map((place) => ({
        name: place.name,
        address: place.vicinity
      }))
    })
  }
  
  render() {
    // console.log(this.state.stores)
    const { classes } = this.props;
    return (
      <div>
        <NavBar />
        <Paper elevation={3} className={classes.map}>
          { this.state.location && <GroceryMap isMarkerShown location={this.state.location} onUpdatedPlaces={this.handleUpdatePlaces} /> }
        </Paper>

        {
          this.state.stores.map((store, index) => <GroceryStoreButton key={index} store={store} />)
        }
      </div>
    )
  }
}

export default withStyles(styles)(GroceryStoreOption)