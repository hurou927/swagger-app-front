import React, { Component } from 'react';
import compareVersions from 'compare-versions';

import SwaggerUI from './swagger-view';
import Home from './homeComponent'
import SelectServiceBarAndDrawer  from './selectServiceVersionComponent';
// import fetch from 'node-fetch';
import yaml from 'js-yaml';

// import config from './config.yaml';

// /home/hurou/react/swagger-project/node_modules/react-scripts/config/webpackDevServer.config.js
// disableDotRule: true -> false


class App extends Component {

  constructor(props){
    super(props);
    this.state={
      serviceList: [],
      swaggerURL: undefined,
      isOpenHome: true,
      selectedService: undefined,
      selectedServiceInfo: undefined,
      // selectedService: 'auth'
    };

    this.onSelectService = this.onSelectService.bind(this);

    fetch('./config.yaml')
      .then(res => res.text())
      .then(body => {
        const config = yaml.safeLoad(body);
        console.log(config)
        this.setState({serviceList: config})
      });


  }

  onSelectService(service) {
    
    fetch(`${service.dir}/config.yaml`)
      .then(res => res.text())
      .then(body => {
        const config = yaml.safeLoad(body);
        config.Releases = (config.Releases || []).sort((a, b) => compareVersions(b.Version, a.Version));
        this.setState({ 
          selectedService: service,
          selectedServiceInfo: config,
        });
        console.log('AppOnSelect',service.name, config);
      }).catch(error => {
        console.error('AppOnSelect',error);
      })
  };


  render() {
    console.log('App', this.state.selectedService)
    return (
      <div>

        
        <SelectServiceBarAndDrawer 
          isShowSelect={this.state.isOpenHome}
          serviceList={this.state.serviceList.Services}
          onSelectService={service=>{
            this.onSelectService(service);
          }}
          onSelectSwagger={ url => {this.setState({swaggerURL: url, isOpenHome: false})} }
          onClickHome={() => { }} 
        />
{/*       
        {
          this.state.isOpenHome ?
            <Home />
            : <SwaggerUI
                selectedServiceInfo={this.state.selectedService}
                url={this.state.swaggerURL}  
              />
        } */}

        <SwaggerUI
          selectedService={this.state.selectedService}
          selectedServiceInfo={this.state.selectedServiceInfo}
          url={this.state.swaggerURL}
        />

      </div>
    );
  }
}

export default App;
