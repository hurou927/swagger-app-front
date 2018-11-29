import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';


const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});


class DrawerWithServices extends Component {

    constructor(props){
        super(props);
        this.state = {
            // serviceList: [],this.props.serviceList,
            serviceList: [],
            filteredServiceList: [],
            isOpenSideBar: false
        }
        this.toggleSideBar = this.toggleSideBar.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            serviceList: nextProps.serviceList,
            filteredServiceList: nextProps.serviceList,
            isOpenSideBar: nextProps.open
        })
        // console.log(this.state)
    }



    toggleSideBar(nextStatus) {
        this.setState({ isOpenSideBar: nextStatus });
    }

    render() {
        const { classes } = this.props;

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
                            onChange={e => {
                                this.setState({ filteredServiceList: this.state.serviceList.filter(s => s.name.includes(e.target.value)) }) 
                            }}
                        />
                    </ListItem>
                    {this.state.filteredServiceList.map((service, index) => (
                        <ListItem
                            button key={service.name}
                            onClick={e => {
                                this.props.onSelect(service);
                            }}
                        >
                            <ListItemText primary={service.name} />
                            <Chip label={`${service.latestVersion}`} className={classes.chip} style={{ fontSize: '10px' }} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        return (
            
            <div>
                < Drawer 
                    open={this.state.isOpenSideBar} 
                    onClose={e => this.toggleSideBar(false)} >
                    <div
                        tabIndex={0}
                        role="button"
                    >
                        {sideList}
                    </div>
                </Drawer >
            </div>
        )
    }


}


DrawerWithServices.propTypes = {
    serviceList: PropTypes.array,
    onSelect: PropTypes.func,
    open: PropTypes.bool
};

export default withStyles(styles)(DrawerWithServices);