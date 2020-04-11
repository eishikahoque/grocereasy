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

    const addressDetail = JSON.parse(sessionStorage.getItem('addressDetail'))
    const location = addressDetail && addressDetail.coordinates
  
    this.state = {
      location: {
        latitude: (location && parseFloat(location.latitude)) || '',
        longitude: (location && parseFloat(location.longitude)) || '',
      },
      stores: []
    }
    this.handleUpdatePlaces = this.handleUpdatePlaces.bind(this)
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