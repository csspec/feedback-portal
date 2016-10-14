import React from 'react';
import CourseList from './CourseList';

const courseList = [
	{
		course: {
			id: "CSN 301",
			name: "Theory of Computation"
		},
		instructor: {
			id: "some_user_id",
			name: "Alka Jindal"
		},
		feedback: {
			filled: false,
			link: "/feedback/"
		}
	},
	{
		course: {
			id: "CSN 302",
			name: "Computer Graphics"
		},
		instructor: {
			id: "some_user_id",
			name: "Shefali Aggarwal"
		},
		feedback: {
			filled: false,
			link: "/feedback/"
		}
	},
	{
		course: {
			id: "CSN 303",
			name: "Microprocessor"
		},
		instructor: {
			id: "some_user_id",
			name: "Sandeep Harit"
		},
		feedback: {
			filled: false,
			link: "/feedback/"
		}
	},
	{
		course: {
			id: "CSN 304",
			name: "Software Engineering"
		},
		instructor: {
			id: "some_user_id",
			name: "Shilpa"
		},
		feedback: {
			filled: false,
			link: "/feedback/"
		}
	}
]

export default class CourseListView extends React.Component {
	render() {
		return (
			<CourseList courseList={courseList} />
		)
	}
}
