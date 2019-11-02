import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    venues: []
  }

  componentDidMount() {
    this.getVenues()
  }

  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=your_key')
    window.initMap = this.initMap
  }

  getVenues = () => {

    const request = 'https://api.foursquare.com/v2/venues/explore?'

    const parameters = {
      client_id: 'your_client_id',
      client_secret: 'your_client_secret',
      v: '20182507', // https://developer.foursquare.com/docs/api/configuration/versioning
      near: 'San Diego', // or ll: '32.715738, -117.161084'
      query: 'surf shops',
    }

    axios.get(request + new URLSearchParams(parameters))
    .then(response =>{
      this.setState({
        venues: response.data.response.groups[0].items
      }, this.renderMap())
    })
    .catch(error => {
      console.log(`error: ${error}`)
    })

  }

  initMap = () => {

    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 32.715738, lng: -117.161084},
      zoom: 10
    })

    let infowindow = new window.google.maps.InfoWindow();

    this.state.venues.map(result =>{

      let contentString = `${result.venue.name}`

      let marker = new window.google.maps.Marker({
        position: {lat: result.venue.location.lat, lng: result.venue.location.lng},
        map: map,
        title: result.venue.name
      })

      marker.addListener('click', function() {
        infowindow.setContent(contentString)
        infowindow.open(map, marker);
      })

    // to avoid:  Expected to return a value in arrow function  array-callback-return
    // doc:       https://eslint.org/docs/rules/array-callback-return
      return result;

    }) // END map





  }

  render() {
    return (
      <main>
        <nav>
         <h1>Stuff Map</h1>
        </nav>

        <div id="map"></div>
        <aside id="sidebar">
        <section id="widget_1"></section>
        <section id="widget_2"></section>
        <section id="widget_3"></section>
        </aside>
      </main>
    )
  }
}

function loadScript(url) {
  let target = window.document.getElementsByTagName('script')[0]
  let script = window.document.createElement('script')

  script.src = url
  script.async = true
  script.defer = true
  target.parentNode.insertBefore(script, target)
}

export default App;
