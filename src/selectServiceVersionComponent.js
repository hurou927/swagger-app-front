
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import yaml from 'js-yaml';


import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import compareVersions from 'compare-versions';


import DrawerWithServices from './drawerWithServicesComponent';
import SelectVersion from './selectVersionComponent'


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
            selectedService: undefined,
            selectedServiceInfo: undefined,
            selectedServiceVersionInfo: undefined,
            // swaggerURL: "./swagger/auth/swagger0_0_1.yaml",
        };
        this.toggleSideBar = this.toggleSideBar.bind(this);
        this.TitleBar = this.TitleBar.bind(this);
        this.onSelectService = this.onSelectService.bind(this);
        // this.sortedServiceList = [];
    }

    componentWillReceiveProps(nextProps){
        // console.log(nextProps.serviceList);
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
        
        // console.log('path:', `${service.dir}/config.yaml`);
        fetch(`${service.dir}/config.yaml`)
            .then(res => res.text())
            .then(body => {
                const config = yaml.safeLoad(body);
                config.Releases = (config.Releases || []).sort((a, b) => compareVersions(b.Version, a.Version));
                console.log(service.name, config);
                this.setState({ 
                    selectedService: service,
                    selectedServiceInfo: config,
                    isOpenSideBar: false
                    // swaggerURL: `${service.dir}/${config.Releases[0].Path}`,
                });
                this.props.onSelectSwagger(`${service.dir}/${config.Releases[0].Path}`);
            }).catch(error=>{
                console.error(error);
            })
    };


    

    render(){
        const { classes } = this.props;

        console.log(this.state);

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
                        />
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            {this.TitleBar(classes)}
                        </Typography>
                    </Toolbar>
                </AppBar>



                {/* Left Side Drawer */}
                <DrawerWithServices  
                    serviceList={this.sortedServiceList} 
                    onSelect={
                        (service) => { 
                            console.log('select service');
                            this.onSelectService(service);
                    }} 
                    open={this.state.isOpenSideBar}
                />

                {/* select version */}
                <SelectVersion
                    onSelect={
                        (releaseInfo) => {
                            console.log('select!!!');
                            this.setState({ 
                                selectedServiceVersionInfo: releaseInfo,
                                // swaggerURL: `${this.state.selectedService.dir}/${releaseInfo.Path}`
                            })
                            this.props.onSelectSwagger(`${this.state.selectedService.dir}/${releaseInfo.Path}`)
                        }

                        
                    }
                    releases={this.state.selectedService ? 
                          this.state.selectedServiceInfo.Releases 
                        : []}
                />



            </div>
        );
    }
}

SelectServiceBarAndDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectServiceBarAndDrawer);