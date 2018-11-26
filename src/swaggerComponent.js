import React, {Component} from 'react';
import PropTypes from 'prop-types';

import SwaggerUi, {presets} from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';
import SelectVersion from './selectVersionComponent'

class SwaggerUI extends Component {

    constructor(props) {
        super(props);

        this.state={
            // selectedService: props.selectedService,
            selectedServiceInfo: props.selectedServiceInfo,
            selectedServiceVersionInfo: undefined,
        }


        this.displaySwagger = this.displaySwagger.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.selectedServiceInfo.base.name != nextProps.selectedServiceInfo.base.name){
            this.setState({
                // selectedService: nextProps.selectedService,
                selectedServiceInfo: nextProps.selectedServiceInfo,
                selectedServiceVersionInfo: undefined,
            })
        }
    }

    componentDidMount() {
        this.displaySwagger(); 
    }

    componentDidUpdate() {
        this.displaySwagger();
    }


    displaySwagger(){
        let swaggerURL = '';
        
        if (this.state.selectedServiceInfo) {
            const dirname = this.state.selectedServiceInfo.base.dir;
            if (this.state.selectedServiceVersionInfo) {
                swaggerURL = `${dirname }/${this.state.selectedServiceVersionInfo.Path}`;
            } else {
                swaggerURL = `${dirname }/${this.state.selectedServiceInfo.detail.Releases[0].Path}`;
            }
        }
        console.log('displaySwagger', this.state, swaggerURL);
        SwaggerUi({
            dom_id: '#swaggerContainer',
            url: swaggerURL,
            spec: this.props.spec,
            presets: [presets.apis]
        });
    }


    render() {

        console.log('SwaggerUI render', this.state, this.props);
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
                        this.state.selectedServiceInfo.detail.Releases : []}
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