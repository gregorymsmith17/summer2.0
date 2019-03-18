import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Request from 'superagent';

import firebase from 'firebase';
import { fire } from '../fire';

import './dashForecast.css';

import { Row, Col, Tabs, Table, Divider, Tag, message, Card, Drawer, Menu, Dropdown, Button, Layout, Carousel, Input, Popover, Icon, Cascader, Switch, Select, AutoComplete, Radio } from 'antd';
import { WiDaySunny, WiNightFog, WiDayFog, WiDaySprinkle, WiNightAltSprinkle, WiNightSprinkle, WiNightClear, WiNightAltCloudy, WiNightAltCloud, WiDayCloudy, WiNightAltCloudyWindy, WiDayWindy, WiSnow, WiRain, WiThunderstorm, WiTornado, WiSmoke, WiFog, WiSnowWind, WiDayCloudyWindy, WiSleet, WiRainMix, WiDust, WiCloud, WiHot, WiSnowflakeCold, WiRaindrops, WiSprinkle } from 'weather-icons-react';

const TabPane = Tabs.TabPane;


class dashForecast extends React.Component {

  constructor(props) {
      super(props);
        this.state = {
        userID: '',
        currentProject: '',


        weatherData: [],
        tonight: '',
        currentWeather: [],
        currentTemp: '',
        currentIcon: '',



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
              console.log([responseJson.properties.periods[0]]);
              this.setState({
                weatherData: [
                  responseJson.properties.periods[1],
                  responseJson.properties.periods[2],
                  responseJson.properties.periods[3],
                  responseJson.properties.periods[4],
                  responseJson.properties.periods[5],
                  responseJson.properties.periods[6],
                  responseJson.properties.periods[7],
                  responseJson.properties.periods[8],
                  responseJson.properties.periods[9],
                  responseJson.properties.periods[10],
                  responseJson.properties.periods[11],
                  responseJson.properties.periods[12],
                  responseJson.properties.periods[13],
                ],
                currentWeather: [responseJson.properties.periods[0]],

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
        <Col span={14}>

          <Card>
            <Row>


                {this.state.currentWeather.map((parameter) => {

                  if (parameter.icon.includes('fog') & parameter.icon.includes('night') ) {
                    const CustomTag = WiNightFog;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('rain,30') & parameter.icon.includes('night') ) {
                    const CustomTag = WiNightAltSprinkle;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('skc') & parameter.icon.includes('night') ) {
                    const CustomTag = WiNightClear;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('skc') & parameter.icon.includes('day') ) {
                    const CustomTag = WiDaySunny;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('few') & parameter.icon.includes('night') ) {
                    const CustomTag = WiNightClear;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('few') & parameter.icon.includes('day') ) {
                    const CustomTag = WiDaySunny;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('sct') & parameter.icon.includes('night') ) {
                    const CustomTag = WiNightClear;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('sct') & parameter.icon.includes('day') ) {
                    const CustomTag = WiDaySunny;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('bkn') & parameter.icon.includes('night') ) {
                    const CustomTag = WiNightAltCloudy;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('bkn') & parameter.icon.includes('day') ) {
                    const CustomTag = WiDayCloudy;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('ovc') & parameter.icon.includes('night') ) {
                    const CustomTag = WiNightAltCloudy;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('ovc') & parameter.icon.includes('day') ) {
                    const CustomTag = WiDayCloudy;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('wind_skc') & parameter.icon.includes('night') ) {
                    const CustomTag = WiNightAltCloudyWindy;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('wind_skc') & parameter.icon.includes('day') ) {
                    const CustomTag = WiDayWindy;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('wind_few') & parameter.icon.includes('night') ) {
                    const CustomTag = WiNightAltCloudyWindy;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('wind_few') & parameter.icon.includes('day') ) {
                    const CustomTag = WiDayWindy;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('wind_sct') & parameter.icon.includes('night') ) {
                    const CustomTag = WiNightAltCloudyWindy;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('wind_sct') & parameter.icon.includes('day') ) {
                    const CustomTag = WiDayCloudyWindy;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('wind_bkn') & parameter.icon.includes('night') ) {
                    const CustomTag = WiNightAltCloudyWindy;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('wind_bkn') & parameter.icon.includes('day') ) {
                    const CustomTag = WiDayCloudyWindy;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('wind_ovc') & parameter.icon.includes('night') ) {
                    const CustomTag = WiNightAltCloudyWindy;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('wind_ovc') & parameter.icon.includes('day') ) {
                    const CustomTag = WiDayCloudyWindy;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('snow') & parameter.icon.includes('night') ) {
                    const CustomTag = WiSnow;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('snow') & parameter.icon.includes('day') ) {
                    const CustomTag = WiSnow;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('rain_snow') & parameter.icon.includes('night') ) {
                    const CustomTag = WiSnow;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('rain_snow') & parameter.icon.includes('day') ) {
                    const CustomTag = WiSnow;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('rain_sleet') & parameter.icon.includes('night') ) {
                    const CustomTag = WiSleet;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('rain_sleet') & parameter.icon.includes('day') ) {
                    const CustomTag = WiSleet;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('snow_sleet') & parameter.icon.includes('night') ) {
                    const CustomTag = WiSnow;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('snow_sleet') & parameter.icon.includes('day') ) {
                    const CustomTag = WiSnow;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('fzra') & parameter.icon.includes('night') ) {
                    const CustomTag = WiRainMix;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('fzra') & parameter.icon.includes('day') ) {
                    const CustomTag = WiRainMix;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('rain_fzra') & parameter.icon.includes('night') ) {
                    const CustomTag = WiRainMix;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('rain_fzra') & parameter.icon.includes('day') ) {
                    const CustomTag = WiRainMix;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('snow_fzra') & parameter.icon.includes('night') ) {
                    const CustomTag = WiRainMix;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('snow_fzra') & parameter.icon.includes('day') ) {
                    const CustomTag = WiRainMix;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('sleet') & parameter.icon.includes('night') ) {
                    const CustomTag = WiRainMix;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('sleet') & parameter.icon.includes('day') ) {
                    const CustomTag = WiRainMix;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('rain') & parameter.icon.includes('night') ) {
                    const CustomTag = WiRain;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('rain') & parameter.icon.includes('day') ) {
                    const CustomTag = WiRain;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('rain_showers') & parameter.icon.includes('night') ) {
                    const CustomTag = WiRain;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('rain_showers') & parameter.icon.includes('day') ) {
                    const CustomTag = WiRain;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('rain_showers_hi') & parameter.icon.includes('night') ) {
                    const CustomTag = WiRain;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('rain_showers_hi') & parameter.icon.includes('day') ) {
                    const CustomTag = WiRain;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('tsra') & parameter.icon.includes('night') ) {
                    const CustomTag = WiThunderstorm;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('tsra') & parameter.icon.includes('day') ) {
                    const CustomTag = WiThunderstorm;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('tsra_sct') & parameter.icon.includes('night') ) {
                    const CustomTag = WiThunderstorm;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('tsra_sct') & parameter.icon.includes('day') ) {
                    const CustomTag = WiThunderstorm;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('tsra_hi') & parameter.icon.includes('night') ) {
                    const CustomTag = WiThunderstorm;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('tsra_hi') & parameter.icon.includes('day') ) {
                    const CustomTag = WiThunderstorm;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('tornado') & parameter.icon.includes('night') ) {
                    const CustomTag = WiTornado;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('tornado') & parameter.icon.includes('day') ) {
                    const CustomTag = WiTornado;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('hurricane') & parameter.icon.includes('night') ) {
                    const CustomTag = WiThunderstorm;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('hurricane') & parameter.icon.includes('day') ) {
                    const CustomTag = WiThunderstorm;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('tropical_storm') & parameter.icon.includes('night') ) {
                    const CustomTag = WiThunderstorm;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('tropical_storm') & parameter.icon.includes('day') ) {
                    const CustomTag = WiThunderstorm;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('dust') & parameter.icon.includes('night') ) {
                    const CustomTag = WiDust;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('dust') & parameter.icon.includes('day') ) {
                    const CustomTag = WiDust;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('smoke') & parameter.icon.includes('night') ) {
                    const CustomTag = WiSmoke;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('smoke') & parameter.icon.includes('day') ) {
                    const CustomTag = WiSmoke;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('haze') & parameter.icon.includes('night') ) {
                    const CustomTag = WiSmoke;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('haze') & parameter.icon.includes('day') ) {
                    const CustomTag = WiCloud;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('hot') & parameter.icon.includes('night') ) {
                    const CustomTag = WiHot;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('hot') & parameter.icon.includes('day') ) {
                    const CustomTag = WiHot;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('cold') & parameter.icon.includes('night') ) {
                    const CustomTag = WiSnowflakeCold;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('cold') & parameter.icon.includes('day') ) {
                    const CustomTag = WiSnowflakeCold;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('blizzard') & parameter.icon.includes('night') ) {
                    const CustomTag = WiSnowWind;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('blizzard') & parameter.icon.includes('day') ) {
                    const CustomTag = WiSnowWind;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('fog') & parameter.icon.includes('night') ) {
                    const CustomTag = WiFog;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}

                  if (parameter.icon.includes('fog') & parameter.icon.includes('day') ) {
                    const CustomTag = WiFog;
                    return (<Col span={24}><Col offset={1} span={8}><p style={{fontSize: 24, paddingLeft: 30}}><b>{parameter.name}</b></p><p style={{fontSize: 24, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}</p></Col> <Col span={15} style={{textAlign: 'left'}}><CustomTag size={200} color='#000' /></Col></Col>)}


              })}

            </Row>
            <Row>
        {this.state.weatherData.map((parameter) => {
          const forecastCard = (
            <div>

          <p>{parameter.name}</p>
          <p>{parameter.temperature}</p>

          </div>
        )

        if (parameter.name.includes('Night') ) {
          const CustomTag = WiNightFog;
          return (null)}

          if (parameter.icon.includes('fog') & parameter.icon.includes('night') ) {
            const CustomTag = WiNightFog;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('rain,10')  ) {
            const CustomTag = WiDaySprinkle;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

            if (parameter.icon.includes('rain,20')  ) {
              const CustomTag = WiDaySprinkle;
              return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

              if (parameter.icon.includes('rain,30')  ) {
                const CustomTag = WiDaySprinkle;
                return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

                if (parameter.icon.includes('rain,40')  ) {
                  const CustomTag = WiDaySprinkle;
                  return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

                  if (parameter.icon.includes('rain,50')  ) {
                    const CustomTag = WiDaySprinkle;
                    return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

                    if (parameter.icon.includes('rain,60')  ) {
                      const CustomTag = WiRain;
                      return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('rain,70') ) {
                        const CustomTag = WiRain;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

                        if (parameter.icon.includes('rain,80')  ) {
                          const CustomTag = WiRain;
                          return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

                          if (parameter.icon.includes('rain,90')  ) {
                            const CustomTag = WiRain;
                            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

                            if (parameter.icon.includes('rain,100') ) {
                              const CustomTag = WiRain;
                              return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col> )}

          if (parameter.icon.includes('snow,10')  ) {
            const CustomTag = WiCloud;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

            if (parameter.icon.includes('snow,20')  ) {
              const CustomTag = WiCloud;
              return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

              if (parameter.icon.includes('snow,30')  ) {
                const CustomTag = WiCloud;
                return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

                if (parameter.icon.includes('snow,40')  ) {
                  const CustomTag = WiDaySprinkle;
                  return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

                  if (parameter.icon.includes('snow,50')  ) {
                    const CustomTag = WiDaySprinkle;
                    return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

                    if (parameter.icon.includes('snow,60')  ) {
                      const CustomTag = WiSnow;
                      return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('snow,70') ) {
                        const CustomTag = WiSnow;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

                        if (parameter.icon.includes('snow,80')  ) {
                          const CustomTag = WiSnow;
                          return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

                          if (parameter.icon.includes('snow,90')  ) {
                            const CustomTag = WiSnow;
                            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

                            if (parameter.icon.includes('snow,100') ) {
                              const CustomTag = WiSnow;
                              return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col> )}

          if (parameter.icon.includes('skc') & parameter.icon.includes('night') ) {
            const CustomTag = WiNightClear;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('skc') & parameter.icon.includes('day') ) {
            const CustomTag = WiDaySunny;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('few') & parameter.icon.includes('night') ) {
            const CustomTag = WiNightClear;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('few') & parameter.icon.includes('day') ) {
            const CustomTag = WiDaySunny;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('sct') & parameter.icon.includes('night') ) {
            const CustomTag = WiNightClear;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('sct') & parameter.icon.includes('day') ) {
            const CustomTag = WiDaySunny;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('bkn') & parameter.icon.includes('night') ) {
            const CustomTag = WiNightAltCloudy;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('bkn') & parameter.icon.includes('day') ) {
            const CustomTag = WiDayCloudy;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('ovc') & parameter.icon.includes('night') ) {
            const CustomTag = WiNightAltCloudy;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('ovc') & parameter.icon.includes('day') ) {
            const CustomTag = WiDayCloudy;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('wind_skc') & parameter.icon.includes('night') ) {
            const CustomTag = WiNightAltCloudyWindy;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('wind_skc') & parameter.icon.includes('day') ) {
            const CustomTag = WiDayWindy;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('wind_few') & parameter.icon.includes('night') ) {
            const CustomTag = WiNightAltCloudyWindy;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('wind_few') & parameter.icon.includes('day') ) {
            const CustomTag = WiDayWindy;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('wind_sct') & parameter.icon.includes('night') ) {
            const CustomTag = WiNightAltCloudyWindy;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('wind_sct') & parameter.icon.includes('day') ) {
            const CustomTag = WiDayCloudyWindy;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('wind_bkn') & parameter.icon.includes('night') ) {
            const CustomTag = WiNightAltCloudyWindy;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('wind_bkn') & parameter.icon.includes('day') ) {
            const CustomTag = WiDayCloudyWindy;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('wind_ovc') & parameter.icon.includes('night') ) {
            const CustomTag = WiNightAltCloudyWindy;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('wind_ovc') & parameter.icon.includes('day') ) {
            const CustomTag = WiDayCloudyWindy;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('snow') & parameter.icon.includes('night') ) {
            const CustomTag = WiSnow;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('snow') & parameter.icon.includes('day') ) {
            const CustomTag = WiSnow;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('rain_snow') & parameter.icon.includes('night') ) {
            const CustomTag = WiSnow;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('rain_snow') & parameter.icon.includes('day') ) {
            const CustomTag = WiSnow;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('rain_sleet') & parameter.icon.includes('night') ) {
            const CustomTag = WiSleet;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('rain_sleet') & parameter.icon.includes('day') ) {
            const CustomTag = WiSleet;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('snow_sleet') & parameter.icon.includes('night') ) {
            const CustomTag = WiSnow;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('snow_sleet') & parameter.icon.includes('day') ) {
            const CustomTag = WiSnow;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('fzra') & parameter.icon.includes('night') ) {
            const CustomTag = WiRainMix;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('fzra') & parameter.icon.includes('day') ) {
            const CustomTag = WiRainMix;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('rain_fzra') & parameter.icon.includes('night') ) {
            const CustomTag = WiRainMix;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('rain_fzra') & parameter.icon.includes('day') ) {
            const CustomTag = WiRainMix;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('snow_fzra') & parameter.icon.includes('night') ) {
            const CustomTag = WiRainMix;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('snow_fzra') & parameter.icon.includes('day') ) {
            const CustomTag = WiRainMix;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('sleet') & parameter.icon.includes('night') ) {
            const CustomTag = WiRainMix;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('sleet') & parameter.icon.includes('day') ) {
            const CustomTag = WiRainMix;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('rain') & parameter.icon.includes('night') ) {
            const CustomTag = WiRain;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('rain') & parameter.icon.includes('day') ) {
            const CustomTag = WiRain;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('rain_showers') & parameter.icon.includes('night') ) {
            const CustomTag = WiRain;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('rain_showers') & parameter.icon.includes('day') ) {
            const CustomTag = WiRain;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('rain_showers_hi') & parameter.icon.includes('night') ) {
            const CustomTag = WiRain;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('rain_showers_hi') & parameter.icon.includes('day') ) {
            const CustomTag = WiRain;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('tsra') & parameter.icon.includes('night') ) {
            const CustomTag = WiThunderstorm;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('tsra') & parameter.icon.includes('day') ) {
            const CustomTag = WiThunderstorm;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('tsra_sct') & parameter.icon.includes('night') ) {
            const CustomTag = WiThunderstorm;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('tsra_sct') & parameter.icon.includes('day') ) {
            const CustomTag = WiThunderstorm;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('tsra_hi') & parameter.icon.includes('night') ) {
            const CustomTag = WiThunderstorm;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('tsra_hi') & parameter.icon.includes('day') ) {
            const CustomTag = WiThunderstorm;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('tornado') & parameter.icon.includes('night') ) {
            const CustomTag = WiTornado;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('tornado') & parameter.icon.includes('day') ) {
            const CustomTag = WiTornado;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('hurricane') & parameter.icon.includes('night') ) {
            const CustomTag = WiThunderstorm;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('hurricane') & parameter.icon.includes('day') ) {
            const CustomTag = WiThunderstorm;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('tropical_storm') & parameter.icon.includes('night') ) {
            const CustomTag = WiThunderstorm;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('tropical_storm') & parameter.icon.includes('day') ) {
            const CustomTag = WiThunderstorm;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('dust') & parameter.icon.includes('night') ) {
            const CustomTag = WiDust;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('dust') & parameter.icon.includes('day') ) {
            const CustomTag = WiDust;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('smoke') & parameter.icon.includes('night') ) {
            const CustomTag = WiSmoke;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('smoke') & parameter.icon.includes('day') ) {
            const CustomTag = WiSmoke;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('haze') & parameter.icon.includes('night') ) {
            const CustomTag = WiSmoke;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('haze') & parameter.icon.includes('day') ) {
            const CustomTag = WiCloud;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('hot') & parameter.icon.includes('night') ) {
            const CustomTag = WiHot;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('hot') & parameter.icon.includes('day') ) {
            const CustomTag = WiHot;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('cold') & parameter.icon.includes('night') ) {
            const CustomTag = WiSnowflakeCold;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('cold') & parameter.icon.includes('day') ) {
            const CustomTag = WiSnowflakeCold;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('blizzard') & parameter.icon.includes('night') ) {
            const CustomTag = WiSnowWind;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('blizzard') & parameter.icon.includes('day') ) {
            const CustomTag = WiSnowWind;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('fog') & parameter.icon.includes('night') ) {
            const CustomTag = WiFog;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}

          if (parameter.icon.includes('fog') & parameter.icon.includes('day') ) {
            const CustomTag = WiFog;
            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name}</p><CustomTag size={36} color='#000' /><p>{parameter.temperature}</p></Col>)}







        })}
        </Row>
        </Card>


    </Col>
  </Row>



      </Layout>



    )
  }
}
export default dashForecast;
