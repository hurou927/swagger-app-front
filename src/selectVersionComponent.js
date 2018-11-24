import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class SelectVersion extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedServiceVersion : ''
        }
    }
    render(){
        const { classes } = this.props;
        return (
            <div style={{ margin: 24 }}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-version">Version</InputLabel>
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
        );
    }
}


export default withStyles(styles)(SelectVersion);