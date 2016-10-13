import React from 'react';
import './styles.sass';

export default class Header extends React.Component {
    render() {
        return (
            <div className="well">
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
