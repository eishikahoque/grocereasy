import React, { Component } from 'react'
import AddressForm from './AddressForm'
import GroceryMap from './GroceryMap'

class AddressMap extends Component {
  constructor() {
    super()
    this.state= {
      location: null
    }
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleLocationChange = (currentLocation) => {
    this.setState({location: currentLocation})
  }


  render() {
    return (
      <div>
        <AddressForm onLocationChange={this.handleLocationChange} />
        { this.state.location && <GroceryMap isMarkerShown location={this.state.location} /> }
      </div>
    )
  }
}

export default AddressMap
