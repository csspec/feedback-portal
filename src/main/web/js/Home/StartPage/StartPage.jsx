import React, { Component } from 'react';
import config from '../../config';
import './style.sass';

export default class StartPage extends Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="panel panel-default" style={{padding: '1em', width: '100%'}}>
					<div className="jumbotron" style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'white' }}>
						<a className="btn btn-default btn-lg" href={config.authApi.redirectLink}>
							Start
						</a>
					</div>
				</div>
			</div>
		)
	}
}
