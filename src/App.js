import React, { Component } from 'react';
import compareVersions from 'compare-versions';

import SwaggerUI from './swaggerComponent';
import SelectServiceBarAndDrawer  from './selectServiceBarAndDrawerComponent';
import Home from './homeComponent';

import yaml from 'js-yaml';


//
// 開始直後renderが2回走る （2回目はconfig.yamlを読んだあと）
// 


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
          isOpenHome: false,
          isOpenSideBar : false
        });
      }).catch(error => {
        console.error('AppOnSelect',error);
      })
  };


  render() {
    console.log('App Render', this.props, this.state)
    return (
      <div>

        
        <SelectServiceBarAndDrawer 
          serviceList={this.state.serviceList.Services}
          onSelectService={service=>{
            // this.setState({ isOpenHome: false });
            this.onSelectService(service);
          }}
          isOpenSideBar={this.state.isOpenSideBar}
          onSelectSwagger={ url => {this.setState({swaggerURL: url, isOpenHome: false})} }
          onClickHome={() => {
            this.setState({
              isOpenSideBar: false,
              isOpenHome: true})   
          }} 
        />
       
        {
          this.state.isOpenHome ?
              <Home />
            : <SwaggerUI
                selectedService={this.state.selectedService}
                selectedServiceInfo={this.state.selectedServiceInfo}
                url={this.state.swaggerURL}
                
              />
        } 

      </div>
    );
  }
}

export default App;
