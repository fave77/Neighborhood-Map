import React from 'react';
import { SideNav } from 'react-materialize';
import escapeRegExp from 'escape-string-regexp';
import Listview from './Listview';
import '../stylesheets/Map.css';

/* Responsible for rendering Google Map and for interacting with it */
class Map extends React.Component {

	state = {
		map: null,
		infoWindow: null,
		markers: [],
		venues: [],
		query: '',
	}

	componentDidMount() {
		window.loadMap = this.loadMap.bind(this);
		this.initMap();
		this.getVenues();
	}

	//initializes the map by injecting the relevant script into the DOM
	initMap() {
		const root = document.getElementById('root');
		const script = document.createElement('script');
		script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBX9evWa0BS2B0EtIOgZz3uT6ngqcCd-QA&callback=loadMap';
		script.async = true;
		script.defer = true;
		script.onerror = () => alert('Google Maps can\'t be loaded!');
		root.insertAdjacentElement('afterend', script);
	}

	//loads the map
	loadMap() {
		const map = new window.google.maps.Map(document.getElementById('map'), {
			center: this.props.api_info.CENTER,
			zoom: 15
		});
		const infoWindow = new window.google.maps.InfoWindow({});
		this.setState({
			map: map,
			infoWindow: infoWindow
		});
	}

	//getting the list of all nearby venues from the centre of the map
	getVenues() {
		const api_info = this.props.api_info;
		const	req_url = `${api_info.ENDPOINT}?client_id=${api_info.CLIENT_ID}
			&client_secret=${api_info.CLIENT_SECRET}&v=${api_info.VERSION}
			&ll=${api_info.CENTER.lat},${api_info.CENTER.lng}&radius=${api_info.RADIUS}
			&intent=${api_info.INTENT}&limit=${api_info.LIMIT}`;
		fetch(req_url)
			.then(res => res.json())
			.then(data => {
				if(data.meta.code !== 200) alert('Venues can\'t be found!');
				else this.setState({
						venues: data.response.venues
					}, this.createMarkers);
			})
			.catch(err => alert(`Venues can't be loaded!\nError - ${err}`));
	}

	//creating the markers for each venue
	createMarkers() {
		const { map, markers, venues, infoWindow } = this.state;
		const api_info = this.props.api_info;
		venues.forEach(venue => {
			const marker = new window.google.maps.Marker({
				position: {lat: venue.location.lat, lng: venue.location.lng},
				map: map,
				animation: window.google.maps.Animation.DROP,
				title: `${venue.name}`
			});
			const req_url = `${api_info.ENDPOINT.slice(0, api_info.ENDPOINT.indexOf('search')) + venue.id}
				?client_id=${api_info.CLIENT_ID}&client_secret=${api_info.CLIENT_SECRET}&v=${api_info.VERSION}`;
			let contentString = '';
			fetch(req_url)
				.then(res => res.json())
				.then(data => {
					if(data.meta.code === 429)
						contentString = '<strong> Daily quota limit exceeded for Foursquare API! </strong>';
					else {
						let venue = data.response.venue;
						contentString = `<h5> ${venue.name} </h5> 
							<strong> ${venue.location.formattedAddress.join(', ')} </strong>
							<p> ${venue.likes.count || 0} Likes <br /> ${venue.rating || 0} Rating <br />
							<a href="${venue.canonicalUrl}" target="_blank"> View More on Foursquare </a> </p>`;
					}
				})
				.catch(err => {
					contentString = '<strong> Unable to view details! </strong>';
				});
			marker.addListener('click', function() {
				markers.forEach(marker => marker.setAnimation(null));
				this.setAnimation(window.google.maps.Animation.BOUNCE);
				setTimeout(() => this.setAnimation(null), 1000);
				infoWindow.setContent(contentString);
				infoWindow.open(map, this);
			});
			markers.push(marker);
		});
		this.loadMarkers();
	}

	//loading the filtered markers only
	loadMarkers() {
		const { markers, query } = this.state;
		const match = new RegExp(escapeRegExp(query),'i');
		this.setState({
			markers: markers.map(marker => {
				marker.setVisible(match.test(marker.title));
				return marker;
			})
		});
	}

	//handling the user input
	handleInput = event => {
		this.state.infoWindow.close();
		this.setState({
			query: event.target.value
		}, this.loadMarkers);
	}

	//displays the associated infoWindow corresponding to a venue in ListView
	handleClick() {
		window.google.maps.event.trigger(this, 'click');
	}

	//renders the ListView and the Map in the UI
	render() {
		return (
			<section className="row">
				<header>
					<SideNav options={{ closeOnClick: true }}
					trigger={<i className="material-icons side-bar white-text">menu</i>}>
						<Listview query={this.state.query} locations={this.state.markers}
						handleInput={this.handleInput} handleClick={this.handleClick} />
					</SideNav>
					<h4>Neighborhood Map</h4>
				</header>
				<Listview grid={'col m4 l3'} view={'small-screen'}
				query={this.state.query} locations={this.state.markers}
				handleInput={this.handleInput} handleClick={this.handleClick} />
				<main className="col s12 m8 l9" id="map" ></main>
			</section>
		);
	}
}

export default Map;