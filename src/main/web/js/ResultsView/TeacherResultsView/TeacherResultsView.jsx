import React from 'react';
import OneTeacherResult from './OneTeacherResult';
import SingleTeacherResultsView from '../SingleTeacherResultsView';
import Loading from '../../Loading';
import config from '../../config';
import { makeAjaxRequest } from '../../Ajax';

export default class TeacherResultsView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			teacherList: [],
			view: true,
		}
	}

    fetchTeachersList() {
    	makeAjaxRequest({
    		url: config.identityApi.teachers,
    		success: list => this.setState({ loading: false, teacherList: list }),
    		error: error => console.log(error)
    	});
    }

    componentDidMount() {
        this.fetchTeachersList();
    }

    handleClick(teacher, details) {
    	this.setState({ view: !this.state.view, teacher: teacher, details: details });
    }

    renderListView() {
    	const items = this.state.teacherList.map((teacher, key) => {
			return (
				<OneTeacherResult key={key} onClick={this.handleClick.bind(this)} teacher={ teacher } />
			)
		})

		return (
			<ul className="list-group">
				{items}
			</ul>
		)
    }

    renderDetailsView() {
    	return (
    		<SingleTeacherResultsView teacher={this.state.teacher} details={this.state.details} />
    	)
    }

	render() {
        if (this.state.loading) {
            return (
            	<div className="container" style={{height: '100px'}}>
	                <Loading />
	            </div>
            )
        }

        if (this.state.view) {
        	return this.renderListView();
        }
		
        return this.renderDetailsView();
	}
}