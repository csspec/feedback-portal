import React from 'react';
import { makeAjaxRequest } from '../Ajax';
import CourseList from './CourseList';
import config from '../config';
import SlideInUp from '../Transitions/SlideInUp';
import Loading from '../Loading';
import { readCookie } from '../Utils/Cookie';

const loader = (
	<div key="loader" style={{
				borderRadius: '2px',
				border: '1px solid lightgray',
				maxWidth: '400px',
				display: 'block',
				margin: 'auto',
				padding: '3em'
			}}>
		<Loading height={50} />
	</div>
);

export default class CourseListView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			courseList: [],
			progress: 0,
			total: 1,
		};
	}

	componentDidMount() {
		let courseList = [];
		window.fbApi.getCoursesOptedByStudent(config.dummy.userId, list => {
				courseList = list.map(course => {
					let item = {};
					item.course = {
						id: course.courseId,
						name: course.name,
						department: course.offeredBy,
						credits: course.credits
					};
					item.teacherId = course.teacherId;
					return item;
				});

				this.setState((prevState, props) => ({
					progress: prevState.progress + 1,
					total: prevState.total + courseList.length,
					courseList: courseList
				}));

				courseList.forEach((course) => {
					console.log(course);
					window.fbApi.getTeacherByTeacherId(course.teacherId, (teacher) => {
						course.instructor = {
							name: teacher.common.userName,
							id: teacher.common.userId
						};
						this.setState((prevState, props) => ({
							progress: prevState.progress + 1
						}));

					}, console.log);
				
				});
				
				console.log(list);
			},
			console.log
		);
	}
	
	render() {
		let view = !(this.state.total - this.state.progress) ? <CourseList key="courseList" courseList={this.state.courseList} /> : loader;
		return (
			<SlideInUp>
				{view}
			</SlideInUp>
		);
	}
}
