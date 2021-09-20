import React from 'react';
import { Button } from '@material-ui/core';
import { storeLoginData, logoutUser } from '../../actions/auth.actions'
import './login.css'
import { gapi } from 'gapi-script';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            auth2: null,
            userDetails: null,
            openMenu: null
        }
    }
      adminRoute = withRouter(({ history }) => (
        <MenuItem onClick={() => {
                    history.push('/admin');
                }}>Admin</MenuItem>
      ));
    componentDidMount() {
        window.gapi.load('auth2', () => {
            this.auth2=window.gapi.auth2.init({
                client_id: '48463723043-f8m6aqg7r909eempino5199v9mcmucnq.apps.googleusercontent.com',
                scope:'email'
            }).then(() => {
                this.setState({ isSignedIn: false, auth2: window.gapi.auth2.getAuthInstance() });
                this.OAuthChange(this.state.auth2.isSignedIn.get()); 
                this.state.auth2.isSignedIn.listen(this.OAuthChange);
            });

        })
    }

    OAuthChange = (isSignedIn) => {
        if(isSignedIn){
        const data = this.state.auth2.currentUser.get();
        if (data.getBasicProfile() !== undefined) {
            this.props.storeLoginData(data);
            this.getUserDetails(data);
        }
    } else {
        this.setState({ isSignedIn: false, userDetails: null, openMenu: null });
    }
    }
    signIn = () => {
        if (this.state.auth2) {
            this.state.auth2.signIn({prompt: 'select_account'} );
           
        }
    }
    menuOpenHandler = (event) => {
        event.persist();
        this.setState({
            openMenu: event.currentTarget
        });
    }
    signOut() {
        if (this.state.auth2) {
            this.state.auth2.signOut();
        }
        this.props.logoutUser(null);
        this.setState({ isSignedIn: false, userDetails: null, openMenu: null });
        this.props.history.push('/');
    }
    getUserDetails(currentUser) {
        this.setState(
            {
                userDetails: {
                    userName: currentUser.getBasicProfile().getName(),
                },
                isSignedIn: true
            }
        );
    }
    checkLoginStatus() {
        if ((this.state.isSignedIn === true) && this.state.userDetails !== null) {
            if(this.state.userDetails.userName){
            const data = this.state.auth2.currentUser.get();
            const profileUrl = data.w3;
            return (
                <div className="logout">
                    <Avatar onClick={this.menuOpenHandler} alt="Remy Sharp" src={profileUrl} />


                    <Menu
                        id="simple-menu"
                        keepMounted
                        anchorEl={this.state.openMenu}
                        open={Boolean(this.state.openMenu)}
                        onClose={() => {
                            this.setState({openMenu: null})
                        }}
                    >
                         <MenuItem onClick={() => {
                             this.setState({openMenu: null});
                             this.props.history.push('/admin');
                        }}>Admin</MenuItem>
                        <MenuItem onClick={() => this.signOut()}>Logout</MenuItem>
                    </Menu>

                </div>

            );
        }
     } else {
            return (
                <div className="login"><Button color="primary" variant = "contained"  onClick={() => this.signIn()}>Login</Button></div>

            );
        }
    }
    render() {
        return (
            <div className="col-6 px-4 py-2 logout-wrapper">
                {this.checkLoginStatus()}
            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        data: state.auth
    }
}
export default withRouter(connect(mapStateToProps, { storeLoginData, logoutUser })(Login));
