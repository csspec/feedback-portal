import React from 'react';
import ReactDOM from 'react-dom';
import QuestionList from '../../FeedbackView/QuestionList';
import { makeAjaxRequest } from '../../Ajax';
import config from '../../config';
import Loading from '../../Loading';
import { readCookie } from '../../Utils/Cookie';
import Button from '../../Button';

// expected props:
//    course
//			id
//	  		name
//    instructor
//			id;
//			name
//			department
//    feedback
//			filled
//			link
export default class CourseField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filled: false,
			busy: true
		};
	}
	handleClick() {
		if (this.state.filled)
			return;
		window.dispatchEvent(new CustomEvent('statechange', {
			detail: {
				instructor: this.props.instructor,
				course: this.props.course
			}
		}));
	}

	componentDidMount() {
		makeAjaxRequest({
			url: config.feedbackApi.statusLink + '/' + this.props.course.id + '/' + config.dummy.userId,
			success: response => {
				if (response.status) {
					this.setState({ busy: false, filled: true });
				}
				this.setState({busy: false});
			},
			error: error => {
				this.setState({ filled: true });
			}
		});
	}

	render() {
		const course_id = this.props.course.id;
		const course_name = this.props.course.name;
		const instructor = this.props.instructor;

		return (
			<Button className={ "list-group-item " + (this.state.filled || this.state.busy ? "disabled list-group-item-success" : "") }
					onClick={this.handleClick.bind(this)}
					style={{outline: 0, border: 'none', padding: '1em'}}>
					<div className="row">
						<div className="col-xs-2 col-sm-2" style={{display: 'flex', alignItems: 'center'}}>
							<span className="material-icons" style={{fontSize: '50px'}}>account_circle</span>
						</div>
						<div className="col-xs-6 col-sm-6">
							<strong style={{display: 'block'}}>{instructor.name}</strong>
							<small style={{display: 'block', color: 'gray'}}>{course_name}</small>
						</div>
						<div className="col-xs-4 col-sm-4">
						{
							!this.state.busy
							?	<small style={{display: 'block', color: 'gray'}}>
									{this.state.filled ? "filled" : "Not yet filled"}
								</small>
							:   <Loading height={50} />
						}
						</div>
					</div>
			</Button>
		);
	}
}
