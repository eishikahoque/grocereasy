import React from 'react';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
import { MAP } from 'react-google-maps/lib/constants';
import { compose, withHandlers, withProps, withState } from 'recompose';


const GroceryMapView = (props) => {
  if (props.places.length > 0) {
    props.onUpdatedPlaces(props.places)
  }

  if (props.location) {
    return (
      <GoogleMap
          onTilesLoaded={props.fetchPlaces}
          ref={props.onMapMounted}
          onBoundsChanged={props.fetchPlaces}
          defaultZoom={14}
          defaultCenter={{ lat: props.location.latitude, lng: props.location.longitude }}
      >
        {props.places && props.places.map((place, i) =>
          <Marker key={i} title={place.name} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />
        )}
        {props.isMarkerShown && <Marker position={{ lat: props.location.latitude, lng: props.location.longitude }} />}
      </GoogleMap>
    )
  }
  return null;
}

const GroceryMap = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withGoogleMap,
  withState('places', 'updatePlaces', []),
  withHandlers(() => {
    const refs = {
      map: undefined,
    }

    return {
      onMapMounted: () => ref => {
        refs.map = ref
      },
      fetchPlaces: ({ updatePlaces }) => () => {
        const bounds = refs.map.getBounds();
        const service = new window.google.maps.places.PlacesService(refs.map.context[MAP]);
        const request = {
          bounds: bounds,
          radius: 200,
          type: ['grocery_or_supermarket']
        }
        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            if (results.length > 0) {
              updatePlaces(results)
            }

          }
        })
      }
    }
  })
)(GroceryMapView)

export default GroceryMap
