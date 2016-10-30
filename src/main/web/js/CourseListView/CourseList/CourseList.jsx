import React, { Component } from 'react';
import CourseField from '../CourseField';
import SlideInUp from '../../Transitions/SlideInUp';

export default class CourseList extends Component {
	constructor(props) {
		super(props);
	}

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
			<div className="list-group" style={{
				borderRadius: '2px',
				border: '1px solid lightgray',
				maxWidth: '400px',
				display: 'block',
				margin: 'auto'
			}}>
				<SlideInUp>
					{courseList}
				</SlideInUp>
			</div>
		)
	}
}
