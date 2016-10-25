import React from 'react';
import ReactDOM from 'react-dom';
import QuestionList from '../../FeedbackView/QuestionList';
import { makeAjaxRequest } from '../../Ajax';
import config from '../../config';
import Loading from '../../Loading';

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
		}
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
					this.setState({ busy: false, filled: true })
				}
				this.setState({busy: false});
			},
			error: error => {
				this.setState({ filled: true });
			}
		})
	}

	render() {
		const course_id = this.props.course.id;
		const course_name = this.props.course.name;
		const instructor = this.props.instructor;

		return (
			<button className={ "list-group-item " + (this.state.filled || this.state.busy ? "disabled list-group-item-success" : "") }
					onClick={this.handleClick.bind(this)}>
					<div className="row">
						<div className="col-xs-2">{course_id}</div>
						<div className="col-xs-4">{course_name}</div>
						<div className="col-xs-5">{instructor.name}</div>
						<div className="col-xs-1" style={{visibility: this.state.busy ? '' : 'hidden'}}>
							<Loading height="14px" />
						</div>
					</div>
			</button>
		)
	}
}
