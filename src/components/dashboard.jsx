import React, { Component } from 'react'
import { Navbar, Nav, Grid, Jumbotron, Row, Col, NavItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import FileSaver from 'file-saver';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import fileDownload from "js-file-download";

import firebase from 'firebase';
import { fire } from '../fire';


import {BootstrapTable, BootstrapButton, TableHeaderColumn} from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiPencil, TiTrash } from "react-icons/ti";

import { LineChart, BarChart, Bar, Surface, ReferenceLine, ReferenceArea, AreaChart, Brush, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';



export default class Dashboard extends Component {

  constructor(props) {
      super(props);
      this.state = {
        sampleDate: '',
        sampleTime: '',
        operator: '',
        sampleLocation: '',
        temperatureResult: '',
        conductivityResult: '',
        pHResult: '',
        DOResult: '',
        nitrateResult: '',
        nitriteResult: '',
        ammoniaResult: '',
        totalInorganicNitrogen: '',
        turbidityResult: '',
        TSSResult: '',

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

        imageSource: '',

        ammoniaPlot: 'ammoniaResult',



      }
      //these are triggered events.  handleChange is for text box changes
      //handlesubmit is for the form being submitted.
      //every event trigger needs to be bound like is below with .bind
      //we might now have to do this anymore with the newest version of react, but i have it to be safe.

      this.filter = this.filter.bind(this);



    }


  componentDidMount() {
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
    console.log(this.state.file);
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


        </Jumbotron>
        <hr></hr>
          






<Row style={{paddingTop: "50px"}}>
  <Col xs={5} sm={5} md={5} >
<div id="my-node">
    <LineChart
      id="currentChart"
      ref={(chart) => this.currentChart = chart}
      width={500}
      height={300} data={this.state.orders2}
      margin={{top: 10, right: 30, left: 0, bottom: 0}}>
  <CartesianGrid strokeDasharray="3 3"/>
  <XAxis dataKey="sampleDate"/>
  <YAxis/>
  <Tooltip/>
    <Line type="monotone" dataKey="DOResult" stroke="#8884d8" activeDot={{r: 8}}/>
 <Line type="monotone" dataKey="nitrateResult" stroke="#82ca9d" />
   <Line type="monotone" title="Nitrite" dataKey="nitriteResult" stroke="#8884d8" activeDot={{r: 8}}/>
<Line type="monotone" dataKey={this.state.ammoniaPlot} stroke="#82ca9d" />
<Legend />
<ReferenceLine y={8} strokeDasharray="5 5" label="Reporting Limit" stroke="red"/>
<Brush />
</LineChart>
</div>

<button onClick={this.ammoniaOn}>Ammonia On</button>
<button onClick={this.ammoniaOff}>Ammonia Off</button>
</Col>

<Col xs={1} sm={1} md={1}></Col>

<Col xs={5} sm={5} md={5} >
<LineChart width={500} height={300} data={this.state.orders2}
margin={{top: 10, right: 30, left: 0, bottom: 0}}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="sampleDate"/>
<YAxis/>
<Tooltip/>
<Line type="monotone" dataKey="DOResult" stroke="#8884d8" activeDot={{r: 8}}/>
<Line type="monotone" dataKey="nitrateResult" stroke="#82ca9d" />
<Line type="monotone" title="Nitrite" dataKey="nitriteResult" stroke="#8884d8" activeDot={{r: 8}}/>
<Line type="monotone" dataKey={this.state.ammoniaPlot} stroke="#82ca9d" />
<Legend />
<ReferenceLine y={8} strokeDasharray="5 5" label="Reporting Limit" stroke="red"/>
<Brush />
</LineChart>
<button onClick={this.ammoniaOn}>Ammonia On</button>
<button onClick={this.ammoniaOff}>Ammonia Off</button>
</Col>

</Row>







        </Col>
        </Row>
      </Grid>

    )
  }
}
