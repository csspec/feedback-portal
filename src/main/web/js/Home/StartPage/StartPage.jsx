import React, { Component } from 'react';
import config from '../../config';
import './style.sass';

const authLink = config.authApi.authorizeLink + '?redirect_uri=' + config.authApi.redirectLink + '&client_id=feedback&response_type=token';
console.log(authLink);
export default class StartPage extends Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="panel panel-default" style={{padding: '1em', width: '100%'}}>
					<div className="jumbotron" style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'white' }}>
						<a className="btn btn-default btn-lg" href={authLink}>
							Start
						</a>
					</div>
				</div>
			</div>
		)
	}
}
