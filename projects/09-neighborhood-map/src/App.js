import React, { Component } from 'react';
import SquareAPI from './api/SquareAPI'
import Map from './components/Map';
import SideBar from './components/SideBar';
import './App.css';

export default class App extends Component {

	constructor() {
		super()
		this.state = {
			venues: [],
			markers: [],
			center: [],
			zoom: 12,
			updateSuperState: obj => {
				this.setState(obj)
			}
		}
	}

	closeMarker = () => {
		const markers = this.state.markers.map(marker => {
			marker.isOpen = false
			return marker
		})
		this.setState({markers: Object.assign(this.state.markers, markers)})
	}

	handleMarkersClick = (marker) => {
		this.closeMarker()
		marker.isOpen = true
		this.setState({markers: Object.assign(this.state.markers, marker)})
		const venue = this.state.venues.find(venue => venue.id === marker.id)

		SquareAPI.getVenueDatails(marker.id).then(res => {
			const newVenue = Object.assign(venue, res.response.venue)
			this.setState({venues: Object.assign(this.state.venues, newVenue)})
		})
	}

	handleListClick = (item) => {
		this.handleMarkersClick(
			this.state.markers.find(marker => marker.id === item.id)
		)
	}

	gm_authFailure(){
		window.alert("An error occurred during the Google Maps API authentication process, we are sorry for the inconvenience;\nif the problem persist please contact us at:\nsupport@thecoolestmaps.dude")
	}

	componentDidMount() {
		SquareAPI.search({
			near: 'San Diego',
			query: 'Park',
			limit: 6,
		}).then(results => {
			const {venues} = results.response
			const markers = venues.map(venue => {
				return {
					lat: venue.location.lat,
					lng: venue.location.lng,
					isOpen: false,
					isVisible: true,
					id: venue.id
				}
			})
			const {center} = results.response.geocode.feature.geometry
			this.setState({venues, markers, center})
		}).catch(error => {
			console.log(`error: ${error}`)
		})
		window.gm_authFailure = () => this.gm_authFailure();
	}

	render() {
		return (
			<div>
				<header>
					<h1 tabIndex="1">San Diego, Park</h1>
				</header>
				<main className="App" role="main">
					<SideBar  tabIndex="2" {...this.state} handleListClick={this.handleListClick}/>
					<Map role="application" aria-label="map" {...this.state} handleMarkersClick={this.handleMarkersClick}/>
				</main>
			</div>
		)
	}

}
