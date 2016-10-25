import React from 'react';
import OneTeacherResult from './OneTeacherResult';
import Loading from '../../Loading';
import config from '../../config';
import { makeAjaxRequest } from '../../Ajax';

export default class TeacherResultsView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		}
	}

    fetchResults() {
        makeAjaxRequest({
            url: config.feedbackApi.resultsApi + '/teachers',
            success: results => {
                results.loading = false;
                this.setState(results);
            },
            error: e => {}
        })
    }

    componentDidMount() {
        this.fetchResults();
    }

	render() {
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
		const items = this.props.results.map((element, key) => {
			return (
				<OneTeacherResult key={key} details={element} />
			)
		})

		return (
			<ul className="list-group">
				{items}
			</ul>
		)
	}
}