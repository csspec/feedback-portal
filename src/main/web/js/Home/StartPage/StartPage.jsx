import React, { Component } from 'react';
import config from '../../config';
import './style.sass';

export default class StartPage extends Component {
	render() {
		return (
			<div className="jumbotron" style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'white' }}>
				<a className="btn btn-default btn-lg" href={config.authApi.redirectLink}>
					Start
				</a>
			</div>
		)
	}
}
