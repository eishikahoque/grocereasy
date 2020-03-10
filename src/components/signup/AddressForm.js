import React, { Component } from 'react'

class AddressForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: null, 
            longitude: null,
        }
        this.getCurrentLocation = this.getCurrentLocation.bind(this);
    }


    getCurrentLocation = async () => { // async is asynchronous function 
        await navigator.geolocation.getCurrentPosition( //await says to wait for response
            position => this.setState({ 
                latitude: position.coords.latitude.toFixed(3),
                longitude: position.coords.longitude.toFixed(3) // toFixed sets decimal value 
            }, () => this.handleLocationChange()), 
            err => console.log(err)
        );
    }

    handleLocationChange = () => {
        this.props.onLocationChange({
            latitude: this.state.latitude, 
            longitude: this.state.longitude
        })
    }
  

    render() {
        return (
            <div>
                <button onClick= {this.getCurrentLocation}>Use my current location</button>
                
            </div>
        )
    }
}

export default AddressForm

