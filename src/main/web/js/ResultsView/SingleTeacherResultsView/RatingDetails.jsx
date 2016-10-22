import React from 'react';

export default class RatingDetails extends React.Component {
	constructor(props) {
		super(props);

		// why I am using state instead of props?
		// 	To support realtime updates
		this.state = props;
	}

	render() {
		const details = this.state.details;
		return (
			<div className="row">
				<div className="col-md-6">
					<div className="jumbotron" style={{backgroundColor: 'white'}}>
						<h1 style={{fontWeight: '900', fontSize: '8em'}}>{details.average_rating}</h1>
						<footer>{details.total_number_of_students}</footer>
					</div>
				</div>
				<div className="col-md-6">
					<div className="text-right">
						<h1>{details.instructor_name}</h1>
					</div>
				</div>
			</div>
		)
	}
}
