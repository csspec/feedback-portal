import React from 'react';
import ReactDOM from 'react-dom';
import CourseListView from './CourseListView';
import Header from './Header';
import Footer from './Footer';
import '../sass/common.sass';

class App extends React.Component {
	render() {
		return (
			<div className="container-fluid">
				<Header />
				<CourseListView />
				<Footer />
			</div>
		)
	}

}

ReactDOM.render(<App />, document.getElementById("react-mount-point"));
