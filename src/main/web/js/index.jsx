import React from 'react';
import ReactDOM from 'react-dom';
import Component from './Component';
import '../sass/common.sass'

class App extends React.Component {
  render() {
    return (
    	<div>
    		<Component />
	    	<h1>Hello</h1>
      	</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('react-mount-point'));
