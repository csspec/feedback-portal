import React from 'react';
import { Link } from 'react-router';


export default class MainResultsPage extends React.Component {
	render() {
		return (
			<ul className="list-group">
				<li className="list-group-item">
					<Link to="/teachers">Teachers</Link>
				</li>
				<li className="list-group-item">
					<Link to="/courses">Courses</Link>
				</li>
			</ul>
		)
	}
} 
