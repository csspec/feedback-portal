import React from 'react';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import config from '../config';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Loading from '../Loading';
import { makeAjaxRequest } from '../Ajax';

injectTapEventPlugin();


const authLink = config.authApi.authorizeLink + '?redirect_uri=' + config.authApi.redirectLink + '&client_id=feedback&response_type=token';
console.log(authLink);
const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <FontIcon className="material-icons">
        more_vert
    </FontIcon>
  </IconButton>
);

class AccountMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            account: {},
            busy: true,
            notLoggedIn: false,
        }
    }

    componentDidMount() {
        if (typeof config.dummy.userId === 'undefined'
            || config.dummy.userId === null
            || config.dummy.userId.length < 1) {
            this.setState({notLoggedIn: true, busy: false});
        }
        makeAjaxRequest({
            url: config.identityApi.userLink + '/' + config.dummy.userId,
            success: (account) => {
                this.props.onUserInfo(account);
                this.setState({account: account, busy: false})
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    render() {
        if (this.state.busy) {
            return (
                <Loading height={20} />
            )
        } else if (this.state.notLoggedIn) {
            return (
                <MuiThemeProvider>
                <IconMenu iconButtonElement={iconButtonElement}>
                    <MenuItem onTouchTap={() => window.location = authLink} key="login">
                        <strong>
                            Login
                        </strong>
                    </MenuItem>
                </IconMenu>
                </MuiThemeProvider>
            );
        }
        return (
            <MuiThemeProvider>
                <IconMenu iconButtonElement={iconButtonElement}>
                    <MenuItem key="useraccount">
                        <strong onTouchTap={() => window.location = config.profileLink + '/' + this.state.account.userId}>
                            {this.state.account.userName}
                        </strong>
                    </MenuItem>
                    <MenuItem key="logout">
                        <div onTouchTap={() => window.location = authLink}>
                            Logout
                        </div>
                    </MenuItem>
                </IconMenu>
            </MuiThemeProvider>
        )
    }
}

class Header extends React.Component {
	render() {
		return (
			<nav className="navbar text-center">
                <div style={{maxWidth: '800px', display: 'block', margin: 'auto'}}>
                    <div className="row" style={{margin: 0}}>
                        <div className="col-xs-10 col-sm-10">
            				<h2 className="text-primary text-left">
                                <i className="material-icons" style={{fontSize: '1em', marginLeft: 0}}>&#xE87F;</i> Feedback
                            </h2>
                            <p className="text-left" style={{display: 'block', color: 'gray'}}>PEC University of Technology</p>
                        </div>
                        <div className="col-xs-2 col-sm-2">
                            <AccountMenu onUserInfo={(account) => console.log(account)} />
                        </div>
                    </div>
                </div>
			</nav>
		)
	}
}

export default Header;
