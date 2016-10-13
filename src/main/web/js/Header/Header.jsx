import React from 'react';

class Header extends React.Component {
	render() {
		return (
			<div className="navbar" style={{ padding: '1em' }}>
				<h2 className="text-primary"><i className="material-icons" style={{fontSize: '1em'}}>&#xE87F;</i> Feedback <small>PEC University of Technology</small></h2>
			</div>
		)
	}
}

export default Header;
