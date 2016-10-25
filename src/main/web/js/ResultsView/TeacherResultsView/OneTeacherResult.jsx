import React from 'react';
import { makeAjaxRequest } from '../../Ajax';
import SingleTeacherResultsView from '../SingleTeacherResultsView';
import ReactDOM from 'react-dom';

export default class OneTeacherResult extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	componentDidMount() {
		makeAjaxRequest({
			url: '/feedback/teachers/' + this.props.teacher.id,
			success: details => {
				this.setState({loading: false});
				ReactDOM.render(<SingleTeacherResultsView details={details} />,
					document.getElementById('feedback-details'))
			}
		});
		this.setState({ loading: true});
	}

	render() {
		return (
			<li className="list-group-item" style={{cursor: 'pointer'}} onClick={this.handleClick.bind(this)}>
				<div className="row">
					<div className="col-xs-6">
						<strong>{this.props.teacher.name}</strong>
					</div>
					<div className="col-xs-4">
						{this.props.feedback.rating}
					</div>
					<div className="col-xs-2">
						<Loading style={{visibility: this.state.loading ? '' : 'hidden'}} />
					</div>
				</div>
			</li>
		)
	}
}
