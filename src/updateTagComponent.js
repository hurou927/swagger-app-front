import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import yaml from 'js-yaml';
import Modal from '@material-ui/core/Modal'
import AlertDialog from './alertDialogComponent';
const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        

    }
});

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
class UpdateTag extends Component {

    constructor(props){
        super(props);
        this.state = {
            serviceInfoDetail: props.serviceInfoDetail,
            buttonDisabled: true,
            open: false,
        }
        this.handleClose = this.handleClose.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.serviceInfoDetail.Service != nextProps.serviceInfoDetail.Service){
            this.setState({
                serviceInfoDetail: nextProps.serviceInfoDetail
            })
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    render(){
        const { classes } = this.props;
        const updatedServiceInfo = this.state.serviceInfoDetail;
        return(
            <div>
                <Button 
                    variant="contained"
                    onClick={ e=>{this.handleOpen()} }
                    style={{margin:"40px 0 0 40px"}}
                    color="primary"
                >Edit Tag</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>>
                            <Grid container spacing={24}>
                            <Grid item xs={4}>
                                Vergion
                        </Grid>
                            <Grid item xs={4}>
                                Tag(Environment)
                        </Grid>
                            <Grid item xs={4}>
                                Path
                        </Grid>
                        </Grid>
                        <hr />
                        {
                            this.state.serviceInfoDetail.Releases.map((r, index) => {
                                return (
                                    <Grid container spacing={24}>
                                        <Grid item xs={4}>
                                            {r.Version}
                                        </Grid>
                                        <Grid item xs={4}>
                                            {
                                                <TextField
                                                    defaultValue={r.Tag}
                                                    onChange={e => {
                                                        updatedServiceInfo.Releases[index].Tag = e.target.value;
                                                        this.setState({ buttonDisabled: false });
                                                    }}
                                                />
                                            }
                                        </Grid>
                                        <Grid item xs={4}>
                                            {r.Path}
                                        </Grid>
                                    </Grid>
                                );
                            })
                        }
                        <Grid container justify="center">
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                style={{ margin: '24px' }}
                                disabled={this.state.buttonDisabled}
                                onClick={e => {
                                    console.log(yaml.safeDump(updatedServiceInfo));
                                }}
                            >
                                Update
                            </Button>
                        </Grid>

                    </div>
                </Modal>


                {/* <AlertDialog /> */}

            </div>
        );
    }
}


export default withStyles(styles)(UpdateTag );