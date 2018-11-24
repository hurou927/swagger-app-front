
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import yaml from 'js-yaml';


import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



import SwaggerUI from './swagger-view';
import DrawerWithServices from './drawerWithServicesComponent';
import SelectVersion from './selectVersionComponent'

// import drawerWithServices from './drawerWithServicesComponent';

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
});
class ButtonAppBar extends Component {

    constructor(props){
        super(props);
        this.state={
            isOpenSideBar: false,
            serviceList: [],
            selectedService: undefined
        };
        this.toggleSideBar = this.toggleSideBar.bind(this);
        this.TitleBar = this.TitleBar.bind(this);
        this.onSelectService = this.onSelectService.bind(this);
        // this.sortedServiceList = [];
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.serviceList);
        this.sortedServiceList = nextProps.serviceList.sort( (a,b) => a.name > b.name );
        this.setState({ serviceList: this.sortedServiceList});
    }

    toggleSideBar(nextStatus) {
        this.setState({ isOpenSideBar: nextStatus });
    }


    TitleBar(classes){

        if (!this.state.selectedService) {
            return (<div>HUwagger</div>)
        } else{
            return ( <div>{`HUwagger / ${this.state.selectedService.name}`}</div> );
        }
    }


    onSelectService(service){
        // this.props.onSelected(service);
        this.setState({ selectedService: service });
        console.log('path:', `${service.dir}/config.yaml`);
        fetch(`${service.dir}/config.yaml`)
            .then(res => res.text())
            .then(body => {
                const config = yaml.safeLoad(body);
                console.log(service.name,config)
        });

    }


    render(){
        const { classes } = this.props;


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
                            onClick={ e => {console.log('AppBarClick');this.toggleSideBar(true)} } 
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            {this.TitleBar(classes)}
                        </Typography>
                    </Toolbar>
                </AppBar>



                {/* Left Side Drawer */}
                <DrawerWithServices  
                    serviceList={this.sortedServiceList} 
                    onSelect={(service) => { this.onSelectService(service); }} 
                    open={this.state.isOpenSideBar}
                />

                {/* select version */}
                <SelectVersion />


                {/* show swagger */}

                <SwaggerUI url="./swagger/auth/swagger0_0_1.yaml" />


            </div>
        );
    }
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);