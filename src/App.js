import React, { Component } from 'react';
import SwaggerUI from './swagger-view';

import ButtonAppBar from './serviceList';
import fetch from 'node-fetch';
import yaml from 'js-yaml';

// import config from './config.yaml';

// /home/hurou/react/swagger-project/node_modules/react-scripts/config/webpackDevServer.config.js
// disableDotRule: true -> false


class App extends Component {

  constructor(props){
    super(props);
    this.state={
      serviceList: []
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
        <ButtonAppBar 
          serviceList={this.state.serviceList.Services} 
          onSelected={ e=> { console.log(e); this.setState({service:e}) } }
        />
        <SwaggerUI url="./swagger/auth/swagger0_0_1.yaml"/>
      </div>
    );
  }
}

export default App;
