import React, { Component } from 'react';
import CourseField from '../CourseField';

export default class CourseList extends Component {
	render() {
		const courseList = this.props.courseList.map((course, key) => {
			return (
				<CourseField key={key}
							 course={course.course}
							 instructor={course.instructor}
							 feedback={course.feedback} />
			)
		});

		return (
			<div className="list-group">
				{courseList}
			</div>
		)
	}
}
