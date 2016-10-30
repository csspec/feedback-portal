import React, { Component } from 'react';
import config from '../../config';
import Button from '../../Button';
import './style.sass';

const authLink = config.authApi.authorizeLink + '?redirect_uri=' + config.authApi.redirectLink + '&client_id=feedback&response_type=token';

export default class StartPage extends Component {
	render() {
		return (
			<div className="panel panel-default" style={{padding: '1em', width: '100%'}}>
				<div className="jumbotron" style={{ textAlign: 'center', backgroundColor: 'white' }}>
					<p>
						Please login in to continue.
					</p>
					<a href={authLink}>
						<Button>
						Start
						</Button>
					</a>
				</div>
			</div>
		)
	}
}
