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

        weatherData: [],

        id: '',
        key: 1,
        idKey: '',
        page: '',
        area: '',
        areaData: [],
        responsibility: '',
        responsibilityData: [],
        startDate: '',
        startDateData: [],
        endDate: '',
        endDateData: [],
        description: '',
        descriptionData: [],
        checkbox: '',
        checkboxData: [],
        samples: [],
        orders: [],
        orders2: [],
        dataList: [],
        filter: "",
        blob: null,
        file:null,
        blobUrl: null,

        report: [],





      }
      //these are triggered events.  handleChange is for text box changes
      //handlesubmit is for the form being submitted.
      //every event trigger needs to be bound like is below with .bind
      //we might now have to do this anymore with the newest version of react, but i have it to be safe.

      this.filter = this.filter.bind(this);



    }







  async componentDidMount() {
    let weatherData = [];



    let api_call =  await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${'Oakland'}&units=${'imperial'}&appid=${'30573b68170d7f4400c7ac9c1c671ccf'}`);


    let response = await api_call.json();

    for (let i=0; i < response.list.length; i++) {

      weatherData.push({temp: response.list[i].main.temp, date: new Date(Date.parse(response.list[i].dt_txt))});


      console.log(weatherData);

      this.setState({
        weatherData: weatherData,
      })
    }
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{





      const samplesRef = fire.database().ref(`dailySamples/${user.uid}`);
      samplesRef.on('value', (snapshot) => {

        let startDateData = [];
        let endDateData = [];
        let descriptionData = [];
        let responsibilityData = [];
        let areaData = [];
        let checkboxData = [];
        let idData = [];
        let sampleDateData = [];
        let ammoniaResultData = [];

        let dataList = snapshot.val();
        let filter = [];


      let orders = snapshot.val();
      let orders2 = snapshot.val();
      let orders3 = snapshot.val();

      let newState = [];
      let newState2 = [];
      let newState3 = [];

      for (let order in orders) {
        newState.push({
          id: order,
          startDate: orders[order].startDate,
          endDate: orders[order].endDate,
          description: orders[order].description,
          responsibility: orders[order].responsibility,
          area: orders[order].area,

          sampleDate: orders[order].sampleDate,
          sampleTime: orders[order].sampleTime,
          operator: orders[order].operator,
          sampleLocation: orders[order].sampleLocation,
          temperatureResult: orders[order].temperatureResult,
          conductivityResult: orders[order].conductivityResult,
          pHResult: orders[order].pHResult,
          DOResult: orders[order].DOResult,
          nitrateResult: orders[order].nitrateResult,
          nitriteResult: orders[order].nitriteResult,
          ammoniaResult: orders[order].ammoniaResult,
          totalInorganicNitrogen: orders[order].totalInorganicNitrogen,
          turbidityResult: orders[order].turbidityResult,
          TSSResult: orders[order].TSSResult,

        });
      }
      for (let order2 in orders2) {
        newState2.push({

          sampleDate: orders2[order2].sampleDate,
          DOResult: orders2[order2].DOResult,
          nitrateResult: orders2[order2].nitrateResult,
          nitriteResult: orders2[order2].nitriteResult,
          ammoniaResult: orders2[order2].ammoniaResult,

        });
      }
      newState2.sort(function(a, b) {

        if (a.sampleDate === b.sampleDate) {
          return 0;
        }
        return a.sampleDate > b.sampleDate ? 1 : -1;
    });
    newState.sort(function(a, b) {

      if (b.sampleDate === a.sampleDate) {
        return 0;
      }
      return b.sampleDate > a.sampleDate ? 1 : -1;
  });


      this.setState({
        orders: newState,
        orders2: newState2,
        dataList: newState,
      });
    });
  });
  }

  ammoniaOn = () => {
    let ammonia = "ammoniaResult";
    this.setState({
      ammoniaPlot: ammonia,

    })
  }

  ammoniaOff = () => {
    let ammonia = '';
    this.setState({
      ammoniaPlot: ammonia,

    })

  }

  filter = (url) => {



    domtoimage.toBlob(document.getElementById('my-node'))
        .then((blob) => {


            console.log(blob);
            const blobUrl = URL.createObjectURL(blob);

            console.log(blobUrl);

            this.setState({
              blobUrl: blobUrl,
            })

        });


}

onDrag = event => {
  event.preventDefault()
}

onDrop = event => {
  event.preventDefault()
  let file = event.dataTransfer.files[0]
  this.setState({ file })
}








  render() {
    let { file } = this.state

    let url = file && URL.createObjectURL(file)


    let img = document.createElement("my-node");




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
    containerStyle={{width: '800px',overflowX: 'scroll'}}


    pagination


    >

    <TableHeaderColumn dataField='date' isKey> Date</TableHeaderColumn>

    <TableHeaderColumn dataField='temp' >Temp</TableHeaderColumn>





    </BootstrapTable>


</Col>

</Row>







        </Col>
        </Row>
      </Grid>

    )
  }
}
