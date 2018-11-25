import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import  compareVersions from 'compare-versions';


import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';




const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    chip: {
        root: {
            padding: '5px',
        }
    }
});

class SelectVersion extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            releases: props.releases,
            selectedServiceVersion: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log('nextProps',nextProps)
        // const sortedReleases = (nextProps.releases || []).sort((a, b) => compareVersions(b.Version, a.Version));
        this.setState({
            releases: nextProps.releases,
            // selectedServiceVersion: sortedReleases[0]
        })
    }

    render(){
        const { classes } = this.props;
        console.log('select render',this.props, this.state);
        if( !this.state.releases || this.state.releases.length === 0) {
            return ( 
                <div style={{ margin: 24 }}>
                    NoVersion
                </div> )
        }
        return (

            <div style={{ margin: 24 }}>
                <FormControl className={classes.formControl}>
                    <InputLabel>Version</InputLabel>
                    <Select
                        value={this.state.selectedServiceVersion}
                        onChange={e => {
                                this.props.onSelect(JSON.parse(e.target.value));
                                this.setState({ selectedServiceVersion: e.target.value });
                            }
                        }
                    >
                        {
                            this.state.releases.map(
                                (releaseInfo, index)=>{
                                    const tagLowerCase = releaseInfo.Tag.toLowerCase();
                                    let color = 'default';
                                    if (['ir','internalrelease'].includes(tagLowerCase)){
                                        color='primary';
                                    } else if (['prod', 'production'].includes(tagLowerCase)){
                                        color = 'secondary';
                                    }
                                    
                                    return (
                                        <MenuItem 
                                            value={JSON.stringify(releaseInfo)} 
                                            key={index} 
                                        >
                                            {`${releaseInfo.Version}`}
                                            <Chip 
                                                className={classes.chip} 
                                                label={`${releaseInfo.Tag}`} 
                                                color={color}
                                                style={{height:'15px', fontSize:'10px', margin: '0 0 0 20px'}}/>
                                        </MenuItem>
                                    )
                                }
                            )
                        }
                    </Select>
                </FormControl>
            </div>
        );
    }
}

SelectVersion.propTypes = {
    versions: PropTypes.array,
    onSelect: PropTypes.func
};


export default withStyles(styles)(SelectVersion);