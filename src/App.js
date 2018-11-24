import React, { Component } from 'react';

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
      // selectedService: 'auth'
    };
    fetch('./config.yaml')
      .then(res => res.text())
      .then(body => {
        const config = yaml.safeLoad(body);
        console.log(config)
        this.setState({serviceList: config})
      });
  }

  render() {
    return (
      <div>
        <SelectServiceBarAndDrawer 
          serviceList={this.state.serviceList.Services} 
          onSelectSwagger={ url => {console.log('App',url);this.setState({swaggerURL: url})} }
        />
      
        {
          this.state.swaggerURL ?
            <SwaggerUI url={this.state.swaggerURL} />
            : <Home />
        }

      </div>
    );
  }
}

export default App;
