
import React, { Component } from 'react';



import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import DrawerWithServices from './drawerWithServicesComponent';
import { GoogleLogout } from 'react-google-login';
import { GoogleLogin } from 'react-google-login';

import Amplify, { Auth } from 'aws-amplify';
Amplify.configure({
    Auth: {
        identityPoolId: 'us-east-1:34bf31a3-034f-4b7f-87b5-11ec928c96e4',
        region: 'ue-east-1',
        identityPoolRegion: 'us-east-1'
    }
});


const getEmailInfo = email => {
    return {
        name: email.substring(0, email.lastIndexOf("@")),
        domain: email.substring(email.lastIndexOf("@") + 1)
    }
}

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});
class SelectServiceBarAndDrawer extends Component {

    constructor(props) {
        super(props);


        this.state = {
            isOpenSideBar: false,
            serviceList: [],
            isOpenSideBar: false,
            isNotLogin: true
        };
        this.toggleSideBar = this.toggleSideBar.bind(this);
        // this.TitleBar = this.TitleBar.bind(this);

        this.signInSuccess = this.signInSuccess.bind(this);
        this.signOutSuccess = this.signOutSuccess.bind(this);
        this.toggleLoginButton = this.toggleLoginButton.bind(this);

        Auth.currentAuthenticatedUser()
            .then(user => {
                const emailInfo = getEmailInfo(user.email);
                console.log(emailInfo);
                if (emailInfo.domain == 'worksap.co.jp') {
                    // this.setState({isNotLogin: false})
                    this.state.isNotLogin = false;
                }
            })
            .catch(err => console.log(err));
    }


    componentWillReceiveProps(nextProps) {
        this.sortedServiceList = nextProps.serviceList.sort((a, b) => a.name > b.name);
        this.setState({
            serviceList: this.sortedServiceList,
            isOpenSideBar: nextProps.isOpenSideBar
        });

    }
    toggleLoginButton(nextStatus) {
        this.setState({ isNotLogin: nextStatus })
    }
    toggleSideBar(nextStatus) {
        this.setState({ isOpenSideBar: nextStatus });
    }

    signInSuccess(response) {
        console.log(window.gapi.auth2);

        // https://developers.google.com/identity/sign-in/web/reference#googleusergetid
        const googleUser = window.gapi.auth2.getAuthInstance().currentUser.get();
        const profile = googleUser.getBasicProfile();
        const { id_token, expires_at } = googleUser.getAuthResponse();
        const user = {
            email: profile.getEmail(),
            name: profile.getName()
        };
        const emailInfo = getEmailInfo(user.email);
        if (emailInfo.domain === 'worksap.co.jp') {
            Auth.federatedSignIn('google', { token: id_token, expires_at }, user)
                .then(() => {
                    console.log(user);
                    this.setState({ isNotLogin: false });
                })
        } else {
            console.log('You must use works account');
        }
    }
    signOutSuccess() {
        console.log(window.gapi.auth2);
        this.setState({ isNotLogin: true });
        Auth.signOut({ global: true })
            .then(data => console.log('signOutSuccess:',data))
            .catch(err => console.log('signOutError:',err));
        const GoogleAuth = window.gapi.auth2.getAuthInstance();
        
        GoogleAuth.signOut().then(()=>{
            console.log('signOut????');
        })

        GoogleAuth.disconnect();
    }




    render() {
        const { classes } = this.props;

        console.log('selectServiceVersionComponent render', this.props, this.state);




        return (
            <div className={classes.root}>
                {/* <drawerWithServices> */}
                {/* TopBar */}
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                            onClick={
                                e => { console.log('toggle true'); this.toggleSideBar(true) }
                            }
                        >
                            <MenuIcon />
                        </IconButton>

                        <img
                            src="./huwager_icon.svg"
                            width="32" height="32"
                            alt=""
                            style={{ padding: "0 10px 0 0" }}
                            onClick={e => { this.props.onClickHome() }}
                        />
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            {/* {this.TitleBar(classes)} */}
                            HUwagger
                        </Typography>
                        {
                            this.state.isNotLogin ?
                                <GoogleLogin
                                    clientId="52834004980-3ik1kksh07j91i54cgp99brmkfdhr9pf.apps.googleusercontent.com"
                                    render={renderProps => (
                                        <Button variant="contained" onClick={renderProps.onClick}>Login</Button>
                                    )}
                                    buttonText="Login"
                                    onSuccess={res => { this.signInSuccess(res) }}
                                    onFailure={(response) => { console.log('error:', response) }}
                                />

                                :
                                <GoogleLogout
                                    buttonText="Logout"
                                    onLogoutSuccess={this.signOutSuccess}
                                    render={renderProps => (
                                        <Button variant="contained" onClick={renderProps.onClick}>Logout</Button>
                                    )}
                                />

                        }

                    </Toolbar>
                </AppBar>



                {/* Left Side Drawer */}
                <DrawerWithServices
                    serviceList={this.sortedServiceList}
                    onSelect={
                        (service) => {
                            console.log('select service', this.props);
                            this.props.onSelectService(service);
                            this.setState({ isOpenSideBar: false });
                        }}
                    open={this.state.isOpenSideBar}
                />

            </div>
        );
    }
}

// SelectServiceBarAndDrawer.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(SelectServiceBarAndDrawer);