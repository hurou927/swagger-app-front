
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';

import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

import SwaggerUI from './swagger-view';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    chip : {
        
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});
class ButtonAppBar extends Component {
// function ButtonAppBar(props) {
    constructor(props){
        super(props);
        this.state={
            isOpenSideBar: false,
            serviceList: [],
            selectedService: undefined
        };
        this.toggleSideBar = this.toggleSideBar.bind(this);
        this.ComponentVersionSelect = this.TitleBar.bind(this);
    }

    toggleSideBar(nextStatus) {
        this.setState({isOpenSideBar: nextStatus});
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.serviceList);
        this.allServiceList = nextProps.serviceList.sort( (a,b) => a.name > b.name );
        this.setState({ serviceList: this.allServiceList});
    }

    TitleBar(classes){

        if (!this.state.selectedService) {
            return (<div>HUwagger</div>)
        } else{
            return ( <div>{`HUwagger / ${this.state.selectedService.name}`}</div> );
        }
    }


    render(){
        const { classes } = this.props;
        console.log(this.state.age)
        const sideList = (
            <div className={classes.list}>
                <List>
                    <ListItem>
                        <TextField
                            id="standard-search"
                            label="Search field"
                            type="search"
                            className={classes.textField}
                            margin="normal"
                            onChange={e => { this.setState({serviceList: this.allServiceList.filter(s=>s.name.includes(e.target.value))}) }}
                        />
                    </ListItem>
                    {this.state.serviceList.map((service, index) => (
                        <ListItem
                            button key={service.name}
                            onClick={e => { 
                                this.props.onSelected(service); 
                                this.setState({selectedService:service});
                            }}
                        >
                            <ListItemText primary={service.name} />
                            <Chip label={`${service.latestVersion}`} className={classes.chip} style={{ fontSize: '10px' }}  />
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        


        return (
            <div className={classes.root}>

                {/* TopBar */}
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={ e => this.toggleSideBar(true) } >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            {this.TitleBar(classes)}
                        </Typography>
                    </Toolbar>
                </AppBar>



                {/* Left Side Drawer */}
                <Drawer open={this.state.isOpenSideBar} onClose={e =>  this.toggleSideBar(false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        // onClick={e => this.toggleSideBar(false)}
                        // onKeyDown={e => this.toggleSideBar(false)}
                    >

                        {sideList}
                    </div>
                </Drawer>

                <div style={{ margin: 24} }>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Version</InputLabel>
                        <Select
                            style={{ color: '' }}
                            value={this.state.selectedServiceVersion}
                            onChange={e => this.setState({ selectedServiceVersion: e.target.value })}
                        >

                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {/* ################SHOW SWAGGER################# */}

                <SwaggerUI url="./swagger/auth/swagger0_0_1.yaml" />


            </div>
        );
    }
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);