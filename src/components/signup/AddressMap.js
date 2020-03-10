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

    handleLocationChange = (location) => {
        this.setState({location: location})
    }


    render() {
        console.log(this.state.location)
        return (
            <div>
                <AddressForm onLocationChange={this.handleLocationChange} />
                <GroceryMap isMarkerShown location={this.state.location} />
            </div>
        )
    }
}

export default AddressMap