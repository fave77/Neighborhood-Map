import React from 'react';
import Home from './Home';
import Map from './Map';
import { Route } from 'react-router-dom';
import '../stylesheets/animate.css';
import '../stylesheets/App.css';

/* Enable binding of all the components with the help of React Router
	and holds Foursquare API user info & Google Maps API Key in its internal state */
class App extends React.Component {
	
	state = {
		API_KEY: 'AIzaSyBX9evWa0BS2B0EtIOgZz3uT6ngqcCd-QA',
		CLIENT_ID: 'T4M3U2PKKAR0CHXIJSTEHPI3VDDYM5C1GCTNEUXD4B5NUOEP',
		CLIENT_SECRET: 'HIKFWZOPVR1UWBZMMLQPQF40GOW3KZFRFYOIJAMMRUYUTSQN',
		ENDPOINT: 'https://api.foursquare.com/v2/venues/search',
		VERSION: '20181019',
		CENTER: {lat: 26.71004, lng: 88.42851},
		RADIUS: 10000,
		INTENT: 'checkin',
		LIMIT: 30
	}

	render() {
		return (
			<section className="container-fluid">
				<Route exact path="/" component={Home} />
				<Route exact path="/map" render={() => (
					<Map api_info={this.state} />
				)}/>
			</section>
		);
	}
}

export default App;
