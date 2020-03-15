import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { MAP } from 'react-google-maps/lib/constants';
import { compose, withHandlers, withProps, withState } from 'recompose';


const GroceryMapView = (props) => {
  if (props.location) {
    return (
      <GoogleMap
          onTilesLoaded={props.fetchPlaces}
          ref={props.onMapMounted}
          onBoundsChanged={props.fetchPlaces}
          defaultZoom={15}
          defaultCenter={{ lat: props.location.latitude, lng: props.location.longitude }}
      >
        {props.places && props.places.map((place, i) =>
          <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />
        )}
        {/* {props.isMarkerShown && <Marker position={{ lat: props.location.latitude, lng: props.location.longitude }} />} */}
      </GoogleMap>
    )
  }
  return null;
}

const GroceryMap = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAaGbwEvs_6LpdNoAwxXpl21TrBot3VIJ8&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  withState('places', 'updatePlaces', ''),
  withHandlers(() => {
      const refs = {
        map: undefined,
      }

      return {
          onMapMounted: () => ref => {
              refs.map = ref
          },
          fetchPlaces: ({ updatePlaces }) => {
              let places;
              const bounds = refs.map.getBounds();
              const service = new window.google.maps.places.PlacesService(refs.map.context[MAP]);
              const request = {
                  bounds: bounds,
                  radius: 50,
                  type: ['grocery_or_supermarket']
              }
              service.nearbySearch(request, (results, status) => {
                // console.log(results);
                // updatePlaces(results);
                  if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                      console.log(results);
                      updatePlaces(results);
                  }
              })
          } 
      }
  })
)(GroceryMapView)

export default GroceryMap
