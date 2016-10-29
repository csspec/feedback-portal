// view for single teacher
import React from 'react';
import RatingDetails from './RatingDetails';
import SingleQuestionResponses from '../SingleQuestionResponses';
import DetailedRatingForCourse from './DetailedRatingForCourse';
import { makeAjaxRequest } from '../../Ajax';
import config from '../../config';
import CourseRating from './CourseRating';

function fetchTemplate() {
	makeAjaxRequest({
		url: config.feedbackApi.templateLink,
		success: template => SingleTeacherResultsView.template = template,
		error: error => console.log(error)
	})
}

fetchTemplate();

export default class SingleTeacherResultsView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			courseToShow: null
		}
	}

	handleClick(courseId) {
		let val = null;
		const course = this.props.details.reduce((val, cur) => {
			if (cur.courseId === courseId)
				return cur;
			return val;
		});
		console.log(course);
		this.setState({courseToShow: course});
	}

	renderCourseList() {
		let details = this.props.details;
		if (details.length === 0)
			return (
				<h1><small>No response yet.</small></h1>
			);

		let responses = details;
		return responses.map((courseRating, key) => {
			console.log(courseRating);
			return (
				<CourseRating key={key} onClick={this.handleClick.bind(this)} courseId={courseRating.courseId} />
			)
		})
	}

	render() {
		if (this.state.courseToShow !== null) {
			return (
				<DetailedRatingForCourse template={SingleTeacherResultsView.template}
										 teacher={this.props.teacher}
										 courseId={this.state.courseToShow.courseId}
										 responses={this.state.courseToShow.responses}
				/>
			)
		}
		return (
			<div>
				<section className="row">
					<div className="col-xs-8">
						{this.props.teacher.userId}
					</div>
					<div className="col-xs-4">
						{this.props.teacher.userName}
					</div>
				</section>
				<section className="list-group">
					{ this.renderCourseList() }
				</section>
			</div>
		)
	}
}

