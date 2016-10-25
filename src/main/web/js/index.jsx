import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import CourseListView from './CourseListView';
import Footer from './Footer';
import QuestionList from './FeedbackView/QuestionList'
import '../sass/common.sass';


const VIEW_STATE = {
	FORM: 1,
	LIST: 2
}

const urls = {
	form: '/form',
	list: '/list'
}

function ViewManager(props) {
	if (props.view === VIEW_STATE.FORM) {
		return (
			<QuestionList {...props} />
		)
	}
	return (
		<CourseListView />
	)
}


class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			view: VIEW_STATE.LIST,
			url: urls.list,
			propsPassed: {}
		}

		window.history.pushState(this.state, null, this.state.url);
		// bind the history change event listener
		window.addEventListener('popstate', this.handlePopStateEvent.bind(this));
		window.addEventListener('statechange', this.handleStateChange.bind(this));
	}

	toggleState(props) {
		this.setState({
			view: this.state.view === VIEW_STATE.FORM ? VIEW_STATE.LIST : VIEW_STATE.FORM,
			url: this.state.url === urls.form ? urls.list : urls.form,
			propsPassed: props
		})
	}

	handleStateChange(event) {
		console.log("Handling event: 'statechange', event:", event);
		console.log("Current state: ", this.state);
		window.history.pushState(this.state, null, this.state.url === urls.form ? urls.list : urls.form);
		this.toggleState(event.detail);
	}

	handlePopStateEvent(event) {
		console.log("Handling event: 'popstate', event:", event);
		this.setState(event.state);
	}

  	render() {
    	return (
    		<div>
    			<Header />
				<ViewManager view={this.state.view} {...this.state.propsPassed} />
            	<Footer/>
      		</div>
    	)
  	}
}

ReactDOM.render(<App />, document.getElementById('react-mount-point'));
