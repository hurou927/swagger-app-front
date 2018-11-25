import React, {Component} from 'react';
import PropTypes from 'prop-types';

import SwaggerUi, {presets} from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';
import SelectVersion from './selectVersionComponent'

class SwaggerUI extends Component {

    constructor(props) {
        super(props);

        this.state={
            selectedService: props.selectedService,
            selectedServiceInfo: props.selectedServiceInfo,
            selectedServiceVersionInfo: undefined,
        }


        this.displaySwagger = this.displaySwagger.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            selectedService: nextProps.selectedService,
            selectedServiceInfo: nextProps.selectedServiceInfo
        })
    }

    componentDidMount() {
        this.displaySwagger(); 
    }

    componentDidUpdate() {
        this.displaySwagger();
    }


    displaySwagger(){
        let swaggerURL = '';
        if (this.state.selectedService) {
            if (this.state.selectedServiceVersionInfo) {
                swaggerURL = `${this.state.selectedService.dir}/${this.state.selectedServiceVersionInfo.Path}`;
            } else {
                swaggerURL = `${this.state.selectedService.dir}/${this.state.selectedServiceInfo.Releases[0].Path}`;
            }
        }
        // console.log('SwaggerUI', this.state,swaggerURL);
        SwaggerUi({
            dom_id: '#swaggerContainer',
            url: swaggerURL,
            spec: this.props.spec,
            presets: [presets.apis]
        });
    }


    render() {

        console.log('SwaggerUI render', this.state, this.props);
        console.log(this.state.selectedServiceInfo ?
            this.state.selectedServiceInfo.Releases : []);
        return (
            <div>
                <SelectVersion
                    onSelect={
                        (releaseInfo) => {
                            console.log('select!!!');
                            this.setState({
                                selectedServiceVersionInfo: releaseInfo,
                            })
                            // this.props.onSelectSwagger(`${this.state.selectedService.dir}/${releaseInfo.Path}`)
                        }
                    }
                    releases={
                        this.state.selectedServiceInfo ?
                        this.state.selectedServiceInfo.Releases : []}
                />
                <div id="swaggerContainer" />
            </div>
        );
    }
}

SwaggerUI.propTypes = {
    url: PropTypes.string,
    spec: PropTypes.object
};

// SwaggerUI.defaultProps = {
//     url: `http://petstore.swagger.io/v2/swagger.json`
// };

export default SwaggerUI;