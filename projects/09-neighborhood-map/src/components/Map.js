import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const location = {lat: 32.715738, lng: -117.161084}

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={8} zoom={props.zoom} defaultCenter={location} center={props.center}>
      {props.markers && props.markers.filter(marker => marker.isVisible).map((marker, id) => {
        const venueData = props.venues.find(venue => venue.id === marker.id)
        return (
        <Marker key={id} position={{lat: marker.lat, lng: marker.lng}} onClick={() => props.handleMarkersClick(marker)}>
          {marker.isOpen && venueData.bestPhoto && (
            <InfoWindow>
              <React.Fragment>
                <div className="infoWindow">
                  <h3>{venueData.name}</h3>
                  <img src={`${venueData.bestPhoto.prefix}200x200${venueData.bestPhoto.suffix}`} alt={"{venueData.name}"}/>
                </div>
              </React.Fragment>
            </InfoWindow>
          )}
        </Marker>
        )
      })}
    </GoogleMap>
  ))
)

export default class Map extends Component {

  render() {
    return (
		<MyMapComponent
		  {...this.props}
		  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBNMIYh8FdKk8KgLlcenTTVrCCjo9xfGCs"
		  loadingElement={<div style={{ height: `100%` }} />}
		  containerElement={<div style={{ height: `100%`, width: `70%`}} />}
		  mapElement={<div style={{ height: `100%` }} />}
		/>
    )
  }

}