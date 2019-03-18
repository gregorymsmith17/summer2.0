import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Request from 'superagent';

import firebase from 'firebase';
import { fire } from '../fire';

import { Row, Col, Tabs, Table, Divider, Tag, message, Card, Drawer, Menu, Dropdown, Button, Layout, Carousel, Input, Popover, Icon, Cascader, Switch, Select, AutoComplete, Radio } from 'antd';
import { WiDaySunny, WiNightFog, WiDayFog, WiDaySprinkle, WiNightAltSprinkle } from 'weather-icons-react';

const TabPane = Tabs.TabPane;


export default class dashForecast extends Component {

  constructor(props) {
      super(props);
        this.state = {
        userID: '',
        currentProject: '',


        weatherData: [],
        latitude: '',
        longitude: '',

      }
    }



   snapshotToArray(snapshot) {
      var returnArr = [];

      snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          returnArr.push(item);
      });
      return returnArr;
  };


  async componentDidMount() {
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

      this.setState({
        userID: user.uid,
      })

      const currentProjectRef = fire.database().ref(`${user.uid}/currentProject`);
      currentProjectRef.on('value', (snapshot) => {
        let project = snapshot.child('currentProject').val();
        console.log(project);
        this.setState({
          currentProject: project
        })

      const profileRef = fire.database().ref(`${user.uid}/${this.state.currentProject}/profileInformation`);
      profileRef.on('value', (snapshot) => {
        var that = this;


      this.setState({
        lakeName: snapshot.child('lakeName').val(),
        locationCity: snapshot.child('locationCity').val(),
        locationState: snapshot.child('locationState').val(),
        managementContact: snapshot.child('managementContact').val(),
        hoaContact: snapshot.child('hoaContact').val(),
        managementContactNumber: snapshot.child('managementContactNumber').val(),
        hoaContactNumber: snapshot.child('hoaContactNumber').val(),
        latitude: snapshot.child('latitude').val(),
        longitude: snapshot.child('longitude').val(),
        center: {
          lat: parseFloat(snapshot.child('latitude').val()),
          lng: parseFloat(snapshot.child('longitude').val())
        },

      });


      console.log(this.state.latitude);
      console.log(this.state.longitude);
                var myLat = `${this.state.latitude}`;
                  var myLon = `${this.state.longitude}`;
               let API_WEATHER = `https://api.weather.gov/points/${myLat},${myLon}/forecast`;


               fetch(API_WEATHER)
            .then(response => response.json())
            .then(responseJson => {
              console.log(responseJson);
              console.log(responseJson.properties.periods);
              this.setState({
                weatherData: responseJson.properties.periods,
              })
            })
            .catch(error => {
              console.log(error);
            });


    });

  });


      })

  }


  render() {




    return (

      <Layout>

        <Row>
        <Col>

          <Card title={this.state.lakeName} bordered={false} >
        {this.state.weatherData.map((parameter) => {
          const forecastCard = (
            <div>
          <p>{parameter.number}</p>
          <p>{parameter.name}</p>
          <p>{parameter.shortForecast}</p>
          <p>{parameter.temperature}</p>

          </div>
        )

          if (parameter.shortForecast == 'Sunny' & parameter.isDaytime == true) {
            console.log('something 1')
            const CustomTag = WiDaySunny;
            return (<Col span={2}>{forecastCard}<CustomTag size={36} color='#000' /></Col>)}

          if (parameter.shortForecast.includes('Patchy Fog') & parameter.isDaytime == false) {
            console.log('something 1')
            const CustomTag = WiNightFog;
            return (<Col span={2}>{forecastCard}<CustomTag size={36} color='#000' /></Col>)}

          if (parameter.shortForecast.includes('Patchy Fog') & parameter.isDaytime == true) {
            console.log('something 1')
            const CustomTag = WiDayFog;
            return (<Col span={2}>{forecastCard}<CustomTag size={36} color='#000' /></Col>)}

          if (parameter.shortForecast == 'Chance Light Rain' & parameter.isDaytime == false) {
            console.log('something 1')
            const CustomTag = WiNightAltSprinkle;
            return (<Col span={2}>{forecastCard}<CustomTag size={36} color='#000' /></Col>)}

          if (parameter.shortForecast == 'Chance Light Rain' & parameter.isDaytime == true) {
            console.log('something 1')
            const CustomTag = WiDaySprinkle;
            return (<Col span={2}>{forecastCard}<CustomTag size={36} color='#000' /></Col>)}

            if (parameter.shortForecast == 'Slight Chance Light Rain' & parameter.isDaytime == false) {
              console.log('something 1')
              const CustomTag = WiNightAltSprinkle;
              return (<Col span={2}>{forecastCard}<CustomTag size={36} color='#000' /></Col>)}

            if (parameter.shortForecast == 'Slight Chance Light Rain' & parameter.isDaytime == true) {
              console.log('something 1')
              const CustomTag = WiDaySprinkle;
              return (<Col span={2}>{forecastCard}<CustomTag size={36} color='#000' /></Col>)}


        })}
      </Card>

    </Col>
  </Row>



      </Layout>



    )
  }
}
