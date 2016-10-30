import React from 'react';
import Header from './Header';
import Footer from './Footer';

import '../sass/common.sass';

export default class App extends React.Component {
	render() {
		return (
			<div style={{minHeight: '100%'}}>
				<Header />
				<div className="container" style={{minHeight: '100%'}}>
					{this.props.children}
				</div>
			</div>
		)
	}

}


App.defaultProps = {
	stickyFooter: false
}

