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
)

export default class CourseListView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			courseList: [],
			busy: true,
		}
	}

	componentDidMount() {
		makeAjaxRequest({
			url: config.academicApi.coursesOptedLink + '/' + readCookie('CSS_FEEDBACK_SESSION_USER_ID'),
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
				this.setState({ courseList: list, busy: false })
				console.log(list);
			},
			error: console.log
		})
	}
	
	render() {
		let view = !this.state.busy ? <CourseList key="courseList" courseList={this.state.courseList} /> : loader;
		return (
			<SlideInUp>
				{view}
			</SlideInUp>
		)
	}
}
