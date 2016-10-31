import React from 'react';
import './styles.sass';

class StickyFooter extends React.Component {
    render() {
        return (
            <div className="well stickyFooter" style={{margin: 0, boxShadow: '0 0 0'}}>
                <div className="container">
                    <p>
                        For more information, please contact
                        <a href="mailto:admin@pec.edu.in">
                            admin@pec.edu.in
                        </a>
                    </p>
                    <footer>
                        <p>
                            This site is built and managed by Computer Science Society of PEC.
                            Please report any issue <a href="https://github.com/csspec/feedback-portal/issues">here</a>
                        </p>
                    </footer>
                </div>
            </div>
        )
    }
}

export default class Header extends React.Component {
    render() {
        if (this.props.bottom) {
            return (<StickyFooter />)
        }
        return (
            <div className="well" style={{margin: 0, boxShadow: '0 0 0'}}>
                <p>
                    For more information, please contact
                    <a href="mailto:admin@pec.edu.in">
                        admin@pec.edu.in
                    </a>
                </p>
                <footer>
                    <p>
                        This site is built and managed by Computer Science Society of PEC.
                        Please report any issue <a href="https://github.com/csspec/feedback-portal/issues">here</a>
                    </p>
                </footer>
            </div>
        )
    }
}
