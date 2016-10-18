import React from 'react';

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
	render() {
		const course_id = this.props.course.id;
		const course_name = this.props.course.name;
		const instructor = this.props.instructor;
		const feedback = this.props.feedback;

		return (
			<a href={ (feedback.filled ? "#" : feedback.link) }
			   className={ "list-group-item " + (feedback.filled ? "disabled list-group-item-success" : "") }>
					<strong>{course_id}</strong>: {course_name}
			</a>
		)
	}
}
