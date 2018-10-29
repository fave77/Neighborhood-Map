import React from 'react';
import '../stylesheets/Listview.css';

/* Represents the list of places in the map that are marked
	and includes a input field for filtering the required places */
function Listview(props) {
	return (
		<aside className={`${props.grid || ''} ${props.view || ''}`}>
			<section className="input-field">
				<h4>Neighborhood Map<br />Siliguri</h4>
				<input type="text" tabIndex="1"
				placeholder="Search for specific places"
				value={props.query} aria-label="text-input"
				onChange={props.handleInput} />
			</section>
			<section className="list-field">
				<ul aria-label="list of venues">
					{props.locations.filter(location => location.visible)
					.map((location, index) => (
						<li key={index} tabIndex={index + 2} aria-label={location.title}
						onClick={props.handleClick.bind(location)}
						onKeyPress={e => (e.charCode === 13) && props.handleClick.call(location)}>
							{location.title}
						</li>
					))}
				</ul>
			</section>
		</aside>
	);
}

export default Listview;