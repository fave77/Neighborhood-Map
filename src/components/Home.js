import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-materialize';
import '../stylesheets/Home.css';

/* Act as the index page for the map */
function Home() {
	return (
		<main>
			<h1 className="animated flipInX delay-1s">Neighborhood Map</h1>
			<h3 className="animated flipInX delay-1s">Siliguri</h3>
			<Link to="/map">
				<Button waves="light" tabIndex="1"
				className="btn-large blue-grey lighten-5 black-text button">
					View Map
				</Button>
      </Link>
		</main>
	);
}

export default Home;