import React, { Component } from 'react'
import { Navbar, Nav, Grid, Jumbotron, Row, Col, NavItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import FileSaver from 'file-saver';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import fileDownload from "js-file-download";
import Request from 'superagent';

import firebase from 'firebase';
import { fire } from '../fire';


import {BootstrapTable, BootstrapButton, TableHeaderColumn} from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiPencil, TiTrash } from "react-icons/ti";

import { LineChart, BarChart, Bar, Surface, ReferenceLine, ReferenceArea, AreaChart, Brush, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';



export default class Dashboard extends Component {

  constructor(props) {
      super(props);
      this.state = {

        //The data that goes into the table showing weather data
        weatherData: [],
        iconData: [],

        id: '',
        key: 1,





      }

    }






    //async allows await to be used for API calls.  Without ASYNC an error will be called saying that await is a reserved word.

    //ComponentDidMount runs over and over again

  async componentDidMount() {
    let weatherData = [];


    //api call for weather data.  "FORECAST" gives 5 days, if that was replaced with "WEATHER" it gives the realtime information. CITY ID, Units, and API KEY.

    //API Key retrived when signed up for api at openweathermap.com

    let api_call =  await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${'Oakland'}&units=${'imperial'}&appid=${'30573b68170d7f4400c7ac9c1c671ccf'}`);

    let response = await api_call.json();

    //to see the exact api call remove the // for the console.log(response) below
    console.log(response);

    for (let i=0; i < response.list.length; i++) {



      //.push adds temp values and date values to the weatherData array
      //weatherData.push({temp: response.list[i].main.temp, date: new Date(Date.parse(response.list[i].dt_txt)), description: response.list[i].weather[0].description, icon: response.list[i].weather[0].icon });

      weatherData.push({temp: response.list[i].main.temp, date: new Date(Date.parse(response.list[i].dt_txt)), description: response.list[i].weather[0].description, image: 'http://openweathermap.org/img/w/' + response.list[i].weather[0].icon + '.png'  });


      console.log(weatherData);

      this.setState({
        weatherData: weatherData,
        iconData: [{icon: '10n'}, {icon:'11n'}]
      })
    }


    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

      const samplesRef = fire.database().ref(`dailySamples/${user.uid}`);
      samplesRef.on('value', (snapshot) => {


    });
  });
  }

  editRow(row, isSelected, e, id) {
    console.log(`${isSelected.id}`);
    return (
        <div style={{textAlign: 'center'}}>
      <img src={'http://openweathermap.org/img/w/' + '10n' + '.png'} />


      </div>
    )

  }

   imageFormatter = (cell, row) => {
      return (
<span><img src={cell} /></span>
)
    }












  render() {



    return (
      <Grid>
        <Row>
          <Col xs={11} sm={11} md={11} >
        <Jumbotron>
          <h1>Summer Lake</h1>
          <p>
            Homeowners Association
          </p>
          <Button onClick={this.getWeather}>Get Weather</Button>



        </Jumbotron>
        <hr></hr>







<Row style={{paddingTop: "50px"}}>
  <Col xs={8} sm={8} md={8} >

    <BootstrapTable
    data={ this.state.weatherData }
    containerStyle={{width: '800px', overflowX: 'scroll'}}
    pagination
    >

    <TableHeaderColumn dataField='date' isKey> Date</TableHeaderColumn>
    <TableHeaderColumn dataField='temp' >Temp</TableHeaderColumn>
    <TableHeaderColumn dataField='description' >Description</TableHeaderColumn>
    <TableHeaderColumn dataField="image" dataFormat={this.imageFormatter}>Product Image</TableHeaderColumn>




    </BootstrapTable>




</Col>

</Row>







        </Col>
        </Row>
      </Grid>

    )
  }
}
