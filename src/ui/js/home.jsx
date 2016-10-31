import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StartPage from './Home/StartPage';

ReactDOM.render(
	<App stickyFooter={true}>
		<StartPage />
	</App>,

	document.getElementById('react-mount-point')
)

