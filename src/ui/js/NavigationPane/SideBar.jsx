import React from 'react';
import NavigationPane from './NavigationPane';
import NavigationOption from './NavigationOption';

export default class SideBar extends React.Component {
    render() {
        return (
            <NavigationPane style={ {
                backgroundColor: 'lightgray',
                color: 'gray'
            }}>
                <NavigationOption for="/" nostyle={true}>
                    <span className="material-icons" style={{
                        display: 'block',
                        margin: 'auto',
                        fontSize: '75px',
                        textAlign: 'center'
                    }}>feedback</span>
                    <h3 style={{textAlign: 'center'}}>Feedback</h3>
                    <small style={{textAlign: 'center',display: 'block'}}>ADMIN CONSOLE</small>
                </NavigationOption>
                <li className="separator" style={{height: 1}}></li>
                <NavigationOption for="/teachers">
                    <span className="material-icons" style={{
                        marginRight: '1em'
                    }}>account_circle</span><span> Teachers</span>
                </NavigationOption>
                <NavigationOption for="/courses">
                    <span className="material-icons">books</span> <span> Courses</span>
                </NavigationOption>
                <li className="separator" style={{height: 1, backgroundColor: 'lightgray'}}></li>
                <NavigationOption for="/settings">
                    <span className="material-icons" style={{
                        marginRight: '1em'
                    }}>settings</span> <span>Settings</span>
                </NavigationOption>
                <li className="separator"></li>
                <li style={{
                    position: 'absolute',
                    bottom: 0,
                    marginBottom: 0,
                    width: '100%'
                }}>
                    <a href="/logout" style={{color: 'gray'}}>
                    <span> Logout</span>
                    </a>
                </li>
            </NavigationPane>
        );
    }
}
