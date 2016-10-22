import React from 'react';
import { makeAjaxRequest } from '../Ajax';
import CourseList from './CourseList';
import config from '../config';
import { readCookie } from '../Utils/Cookie';

export default class CourseListView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			courseList: []
		}
	}

	componentDidMount() {
		makeAjaxRequest({
			url: config.academicApi.coursesOptedLink + '/' + 2,
			success: list => {
				list = list.map(course => {
					let item = {};
					item.course = {
						id: course.CourseId,
						name: course.CourseName
					};

					item.instructor = {
						id: course.TeacherId,
						name: course.TeacherName
					}
					return item;
				})
				this.setState({ courseList: list })
			},
			error: console.log
		})
	}
	
	render() {
		return (
			<CourseList courseList={this.state.courseList} />
		)
	}
}
