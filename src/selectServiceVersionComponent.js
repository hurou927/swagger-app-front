
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import yaml from 'js-yaml';


import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import compareVersions from 'compare-versions';


import DrawerWithServices from './drawerWithServicesComponent';
// import SelectVersion from './selectVersionComponent'


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

    constructor(props){
        super(props);
        this.state={
            isOpenSideBar: false,
            serviceList: [], 
        };
        this.toggleSideBar = this.toggleSideBar.bind(this);
        // this.TitleBar = this.TitleBar.bind(this);

    }

    componentWillReceiveProps(nextProps){
        this.sortedServiceList = nextProps.serviceList.sort( (a,b) => a.name > b.name );
        this.setState({ 
            serviceList: this.sortedServiceList, 
        });
        
    }

    toggleSideBar(nextStatus) {
        this.setState({ isOpenSideBar: nextStatus });
    }



    render(){
        const { classes } = this.props;

        console.log(this.props,this.state);

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
                                e => {console.log('toggle true');this.toggleSideBar(true)} 
                            } 
                        >
                        <MenuIcon />
                        </IconButton>
                        
                        <img
                            src="./huwager_icon.svg"
                            width="32" height="32"
                            alt=""
                            style={{padding: "0 10px 0 0"}}
                            onClick={e=>{this.props.onClickHome()}}
                        />
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            {/* {this.TitleBar(classes)} */}
                            HUwagger
                        </Typography>
                    </Toolbar>
                </AppBar>



                {/* Left Side Drawer */}
                <DrawerWithServices  
                    serviceList={this.sortedServiceList} 
                    onSelect={
                        (service) => { 
                            
                            console.log('select service', this.props);
                            this.props.onSelectService(service);
                            
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