// view for single teacher
import React from 'react';
import RatingDetails from './RatingDetails';
import ReactPieChart from '../ReactPieChart';

export default class SingleTeacherResultsView extends React.Component {
	constructor(props) {
		super(props);
		this.state = props;
	}

	render() {
		const details = this.state.details;
		return (
			<section className="row" style={{verticalAlign: 'middle'}}>
				<div className="col-md-4">
					<ReactPieChart
						data={details.chart_data}
					/>
				</div>
				<div className="col-md-8">
					<RatingDetails
						details={details}
					/>
				</div>
			</section>
		)
	}
}

