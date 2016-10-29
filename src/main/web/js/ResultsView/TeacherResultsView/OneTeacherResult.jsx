import React from 'react';
import { makeAjaxRequest } from '../../Ajax';
import SingleTeacherResultsView from '../SingleTeacherResultsView';
import ReactDOM from 'react-dom';
import config from '../../config';
import Loading from '../../Loading';

export default class OneTeacherResult extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			dots: 0
		}

		this.state.timer = setInterval(() => {
			this.setState({dots: ++this.state.dots % 3});
			console.log("Timer still working");
		}, 200);
	}

	retry() {
		makeAjaxRequest({
			url: config.feedbackApi.resultsApi + '/teachers/' + this.props.teacher.userId,
			success: details => {
				this.setState({loading: false, details: details });
			},
			error: error => {
				this.setState({ error: true, loading: false });
			}
		});
	}

	componentDidMount() {
		this.retry();
	}

	loadingOrResults() {
		if (this.state.loading || this.state.error) {
			return (
				<small className="disabled">
				{ 
					(this.state.error
									? "error loading the results"
									: ("fetching" + ".".repeat(this.state.dots)))
				}
				</small>
			)
		}

		return (
			<div className="success">
				Done
			</div>
		)
	}

	componentWillUnmount() {
		window.clearInterval(this.state.timer);
	}

	handleClick() {
		if (this.state.loading) {
			return;
		} else if (this.state.error) {
			this.retry();
			this.setState({ loading: true, error: false });
			return;
		}

		this.props.onClick(this.props.teacher, this.state.details);
	}

	render() {
		const c = "list-group-item " + (this.state.loading ? "disabled" : "");
		return (
			<li className={c} style={{cursor: 'pointer'}} onClick={this.handleClick.bind(this)}>
				<div className="row">
					<div className="col-xs-6">
						<strong>{this.props.teacher.userName}</strong>
					</div>
					<div className="col-xs-4">
						{this.loadingOrResults()}
					</div>
					<div className="col-xs-2">
						<div style={{visibility: this.state.loading ? "" : "hidden" }}>
							<Loading height="1em" />
						</div>
					</div>
				</div>
			</li>
		)
	}
}
