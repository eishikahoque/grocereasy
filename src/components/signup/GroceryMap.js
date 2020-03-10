import React, { Component } from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const GroceryMap = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAaGbwEvs_6LpdNoAwxXpl21TrBot3VIJ8&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) => {debugger;
    if (props.location) {
        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: props.location.latitude, lng: props.location.longitude }}
            >
                {props.isMarkerShown && <Marker position={{ lat: props.location.latitude, lng: props.location.longitude }} />}
            </GoogleMap>
        )
    }
    return null;
})

export default GroceryMap
