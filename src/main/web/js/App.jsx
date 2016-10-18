import React from 'react';
import Header from './Header';
import Footer from './Footer';

import '../sass/common.sass';

export default class App extends React.Component {
	render() {
		return (
			<div className="container-fluid">
				<Header />
				{this.props.children}
				<Footer bottom={this.props.stickyFooter}/>
			</div>
		)
	}

}


App.defaultProps = {
	stickyFooter: false
}

