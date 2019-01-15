import React, { Component } from 'react'
import { Navbar, Nav, FormGroup, Checkbox, Grid, PageHeader, Jumbotron, Row, Col, NavItem, Button, Modal, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import FileSaver from 'file-saver';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import fileDownload from "js-file-download";
import Request from 'superagent';

import firebase from 'firebase';
import { fire } from '../fire';
import { ChromePicker } from 'react-color';
import GoogleMapReact from 'google-map-react';


import {BootstrapTable, BootstrapButton, TableHeaderColumn} from 'react-bootstrap-table';
import { TiArrowSortedDown, TiBrush, TiArrowSortedUp, TiPencil, TiTrash } from "react-icons/ti";

import { LineChart, LabelList, ResponsiveContainer, BarChart, Bar, Surface, ReferenceLine, ReferenceArea, AreaChart, Brush, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';



const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class Dashboard extends Component {

  static defaultProps = {
center: {
  lat: 37.987636425563075,
  lng: -121.63235758701154
},
zoom: 13
};


  constructor(props) {
      super(props);



      this.state = {

        //The data that goes into the table showing weather data
        weatherData: [],
        iconData: [],

        id: '',
        key: 1,

        currentCity: '',
        currentTemp: '',
        currentIcon: '',
        currentDescription: '',
        currentHumidity: '',

        //checkbox status
        checkboxState: true,
        checkboxState1: true,
        checkboxStatenitrogen: true,
        checkboxStatephosphorus: true,
        checkboxStatetds: true,
        checkboxStatepH: true,
        checkboxStatetss: true,
        checkboxStatesalinity: true,
        checkboxStateconductivity: true,
        checkboxStatehardness: true,
        checkboxStateturbidity: true,
        checkboxStatedo: true,

        //these are for the graphs
        tempPlot: 'temp',
        doPlot: 'do',
        conductivityPlot: 'conductivity',
        tdsPlot: 'tds',
        salinityPlot: 'salinity',
        pHPlot: 'pH',
        turbidityPlot: 'turbidity',
        nitrogenPlot: 'nitrogen',
        phosphorusPlot: 'phosphorus',
        totalHardnessPlot: 'totalHardness',
        tssPlot: 'tss',

        //this is the object array for the table
        samples: [],
        orders: [],
        orders2: [],
        dataList: [],
        filter: "",
        blobUrl: null,

        //averages
        nitrogenAverage: [],
        nitrogenAvg: '',
        nitrogenGraph: [],
        phosphorusAverage: [],
        phosphorusAvg: '',
        phosphorusGraph: [],
        dissolvedOxygenAverage: [],
        dissolvedOxygenAvg: '',
        dissolvedOxygenGraph: [],




      }

    }






    //async allows await to be used for API calls.  Without ASYNC an error will be called saying that await is a reserved word.

    //ComponentDidMount runs over and over again

  async componentDidMount() {
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const samplesRef = fire.database().ref(`monthlySamples/${user.uid}`);
      samplesRef.on('value', (snapshot) => {


        let dataList = snapshot.val();
        let filter = [];
        let orders = snapshot.val();

        let orders2 = snapshot.val();
        let orders3 = [snapshot.val()]
        console.log(orders3);

        let newState = [];
        let newState2 = [];
        let newState3 = [];

        let nitrogenAverage = [];
        let phosphorusAverage = [];
        let dissolvedOxygenAverage = [];





      for (let order in orders) {
        newState.push({
          id: order,
          sampleDate: orders[order].sampleDate,
          sampleTaker: orders[order].sampleTaker,
          temp: orders[order].temp,
          do: orders[order].do,
          conductivity: orders[order].conductivity,
          tds: orders[order].tds,
          salinity: orders[order].salinity,
          pH: orders[order].pH,
          turbidity: orders[order].turbidity,
          nitrogen: orders[order].nitrogen,
          phosphorus: orders[order].phosphorus,
          totalHardness: orders[order].totalHardness,
          tss: orders[order].tss,
          sampleNotes: orders[order].sampleNotes,
        });
        newState2.push({
          id: order,
          sampleDate: orders[order].sampleDate,
          sampleTaker: orders[order].sampleTaker,
          temp: orders[order].temp,
          do: orders[order].do,
          conductivity: orders[order].conductivity,
          tds: orders[order].tds,
          salinity: orders[order].salinity,
          pH: orders[order].pH,
          turbidity: orders[order].turbidity,
          nitrogen: orders[order].nitrogen,
          phosphorus: orders[order].phosphorus,
          totalHardness: orders[order].totalHardness,
          tss: orders[order].tss,
          sampleNotes: orders[order].sampleNotes,
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
        color: this.state.color,
      });

      snapshot.forEach(ss => {
          nitrogenAverage.push({nitrogen: ss.child('nitrogen').val(), date: ss.child('sampleDate').val()} );
          nitrogenAverage.sort(function(a, b) {
            if (a.date === b.date) {
              return 0;
            }
            return a.date > b.date ? 1 : -1;
        });
          this.setState({
            nitrogenAverage: (nitrogenAverage),
          })
        });

        let nitrogenData = [];
        for (let i=0; i < nitrogenAverage.length; i++) {
        //push send this data to the back of the chartData variable above.
        nitrogenData.push(parseFloat(nitrogenAverage[i].nitrogen));

      }


      let nitrogenReverse2 = nitrogenAverage.reverse();


      let nitrogenGraph = ([{nitrogen: nitrogenReverse2[2].nitrogen, date: nitrogenReverse2[2].date}, {nitrogen: nitrogenReverse2[1].nitrogen, date: nitrogenReverse2[1].date}, {nitrogen: nitrogenReverse2[0].nitrogen, date: nitrogenReverse2[0].date} ]);
      console.log(nitrogenGraph)




        let nitrogenReverse = nitrogenData.reverse();
        let nitrogen = ([nitrogenReverse[0], nitrogenReverse[1], nitrogenReverse[2]].reduce((a, b) => a + b, 0)/ 3).toFixed(2);

        console.log(nitrogenData)
        this.setState({
          nitrogenAvg: nitrogen,
          nitrogenGraph: nitrogenGraph,
        })
        snapshot.forEach(ss => {
            phosphorusAverage.push({phosphorus: ss.child('phosphorus').val(), date: ss.child('sampleDate').val()} );
            phosphorusAverage.sort(function(a, b) {
              if (a.date === b.date) {
                return 0;
              }
              return a.date > b.date ? 1 : -1;
          });
            this.setState({
              phosphorusAverage: (phosphorusAverage),
            })
          });


          let phosphorusReverse2 = phosphorusAverage.reverse();

          let phosphorusGraph = ([{phosphorus: phosphorusReverse2[2].phosphorus, date: phosphorusReverse2[2].date}, {phosphorus: phosphorusReverse2[1].phosphorus, date: phosphorusReverse2[1].date}, {phosphorus: phosphorusReverse2[0].phosphorus, date: phosphorusReverse2[0].date} ]);



          let phosphorusData = [];
          for (let i=0; i < phosphorusAverage.length; i++) {
          //push send this data to the back of the chartData variable above.
          phosphorusData.push(parseFloat(phosphorusAverage[i].phosphorus));

        }
          let phosphorusReverse = phosphorusData;
          let phosphorus = ([phosphorusReverse[0], phosphorusReverse[1], phosphorusReverse[2]].reduce((a, b) => a + b, 0)/ 3).toFixed(2);
          console.log(phosphorusReverse)
          this.setState({
            phosphorusAvg: phosphorus,
            phosphorusGraph: phosphorusGraph,
          })



          snapshot.forEach(ss => {
              dissolvedOxygenAverage.push({dissolvedOxygen: ss.child('do').val(), date: ss.child('sampleDate').val()} );
              dissolvedOxygenAverage.sort(function(a, b) {
                if (a.date === b.date) {
                  return 0;
                }
                return a.date > b.date ? 1 : -1;
            });
              this.setState({
                dissolvedOxygenAverage: (dissolvedOxygenAverage),
              })
            });

            let dissolvedOxygenData = [];
            for (let i=0; i < dissolvedOxygenAverage.length; i++) {
            //push send this data to the back of the chartData variable above.
            dissolvedOxygenData.push(parseFloat(dissolvedOxygenAverage[i].dissolvedOxygen));

          }
            let dissolvedOxygenReverse = dissolvedOxygenData.reverse();

            let dissolvedOxygenReverse2 = dissolvedOxygenAverage.reverse();

            let dissolvedOxygenGraph = ([{do: dissolvedOxygenReverse2[2].dissolvedOxygen, date: dissolvedOxygenReverse2[2].date}, {do: dissolvedOxygenReverse2[1].dissolvedOxygen, date: dissolvedOxygenReverse2[1].date}, {do: dissolvedOxygenReverse2[0].dissolvedOxygen, date: dissolvedOxygenReverse2[0].date} ]);
            console.log(dissolvedOxygenGraph)



            let dissolvedOxygen = ([dissolvedOxygenReverse[0], dissolvedOxygenReverse[1], dissolvedOxygenReverse[2]].reduce((a, b) => a + b, 0)/ 3).toFixed(1);

            console.log(dissolvedOxygenReverse)
            this.setState({
              dissolvedOxygenAvg: dissolvedOxygen,
              dissolvedOxygenGraph: dissolvedOxygenGraph,
            })


    });
    const colorsRef = fire.database().ref(`colors/${user.uid}`);

    colorsRef.on('value', (snapshot) => {
      let colorList = snapshot.val();
      console.log(colorList);
      this.setState({
        tempColor: snapshot.child('tempColor').val(),

      });


    });

  });
    let weatherData = [];
    let city = '';
    let temp = '';
    let icon = '';
    let description = '';
    let humidity = '';

    let api_callWeather =  await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${'37.997'}&lon=${'-121.71'}&units=${'imperial'}&appid=${'30573b68170d7f4400c7ac9c1c671ccf'}`);


    let weatherResponse = await api_callWeather.json();

    let symbol = weatherResponse.weather[0].icon;


    console.log(weatherResponse)

    this.setState({
      currentCity: weatherResponse.name,
      currentTemp: weatherResponse.main.temp,
      currentIcon: 'http://openweathermap.org/img/w/' + weatherResponse.weather[0].icon + '.png',

      currentDescription: weatherResponse.weather[0].main,
      currentHumidity: weatherResponse.main.humidity,

    })









    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

      const samplesRef = fire.database().ref(`dailySamples/${user.uid}`);
      samplesRef.on('value', (snapshot) => {


    });
  });
  }



   imageFormatter = (cell, row) => {
      return (
<span><img src={cell} /></span>
)
    }

    toggleNitrogen(event) {
        this.setState({
          checkboxState: !this.state.checkboxState
        });
        const checkboxState = this.state.checkboxState;
        if (checkboxState) {
          this.setState({
            nitrogenPlot: '',
          })
        } else {
          this.setState({
            nitrogenPlot: 'nitrogen',
          })
        }
      }
      togglePhosphorus(event) {
          this.setState({
            checkboxStatephosphorus: !this.state.checkboxStatephosphorus
          });
          const checkboxState = this.state.checkboxStatephosphorus;
          if (checkboxState) {
            this.setState({
              phosphorusPlot: '',
            })
          } else {
            this.setState({
              phosphorusPlot: 'phosphorus',
            })
          }
        }
        toggleTemp(event) {
            this.setState({
              checkboxStatenitrogen: !this.state.checkboxStatenitrogen
            });
            const checkboxState = this.state.checkboxStatenitrogen;
            if (checkboxState) {
              this.setState({
                tempPlot: '',
              })
            } else {
              this.setState({
                tempPlot: 'temp',
              })
            }
          }
          toggleTDS(event) {
              this.setState({
                checkboxStatetds: !this.state.checkboxStatetds
              });
              const checkboxState = this.state.checkboxStatetds;
              if (checkboxState) {
                this.setState({
                  tdsPlot: '',
                })
              } else {
                this.setState({
                  tdsPlot: 'tds',
                })
              }
            }
            togglepH(event) {
                this.setState({
                  checkboxStatepH: !this.state.checkboxStatepH
                });
                const checkboxState = this.state.checkboxStatepH;
                if (checkboxState) {
                  this.setState({
                    pHPlot: '',
                  })
                } else {
                  this.setState({
                    pHPlot: 'pH',
                  })
                }
              }
              toggletss(event) {
                  this.setState({
                    checkboxStatetss: !this.state.checkboxStatetss
                  });
                  const checkboxState = this.state.checkboxStatetss;
                  if (checkboxState) {
                    this.setState({
                      tssPlot: '',
                    })
                  } else {
                    this.setState({
                      tssPlot: 'tss',
                    })
                  }
                }
                togglesalinity(event) {
                    this.setState({
                      checkboxStatesalinity: !this.state.checkboxStatesalinity
                    });
                    const checkboxState = this.state.checkboxStatesalinity;
                    if (checkboxState) {
                      this.setState({
                        salinityPlot: '',
                      })
                    } else {
                      this.setState({
                        salinityPlot: 'salinity',
                      })
                    }
                  }
                  toggleHardness(event) {
                      this.setState({
                        checkboxStatehardness: !this.state.checkboxStatehardness
                      });
                      const checkboxState = this.state.checkboxStatehardness;
                      if (checkboxState) {
                        this.setState({
                          totalHardnessPlot: '',
                        })
                      } else {
                        this.setState({
                          totalHardnessPlot: 'totalHardness',
                        })
                      }
                    }
                    toggleTurbidity(event) {
                        this.setState({
                          checkboxStateturbidity: !this.state.checkboxStateturbidity
                        });
                        const checkboxState = this.state.checkboxStateturbidity;
                        if (checkboxState) {
                          this.setState({
                            turbidityPlot: '',
                          })
                        } else {
                          this.setState({
                            turbidityPlot: 'turbidity',
                          })
                        }
                      }
                      toggleDO(event) {
                          this.setState({
                            checkboxStatedo: !this.state.checkboxStatedo
                          });
                          const checkboxState = this.state.checkboxStatedo;
                          if (checkboxState) {
                            this.setState({
                              doPlot: '',
                            })
                          } else {
                            this.setState({
                              doPlot: 'do',
                            })
                          }
                        }

                      handleClick = () => {
                        this.setState({ displayColorPicker: !this.state.displayColorPicker })
                      };

                      handleClose = () => {
                        this.setState({ displayColorPicker: false })
                      };

                      tempColorChange = (color) => {

                          console.log(this.state.color);
                          this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
                          const samplesRef = fire.database().ref(`colors/${user.uid}`);
                          const orderID = fire.database().ref(`/colors/${user.uid}/${orderID}`);
                          const sample = {
                            tempColor: color.hex
                          }
                          samplesRef.set(sample);
                          this.setState({
                            tempColor: color.hex,
                           });
                          });
                      }

                      onSubmit(event) {
                        event.preventDefault();
                      }

  render() {

    const doCheckbox = (
      <span>
        <input
        type="checkbox"
        defaultChecked='true'
        onClick={this.toggleDO.bind(this)}
        />
      <label>DO</label>
      </span>
    );

    const nitrogenCheckbox = (
      <span>
        <input
          inline
        type="checkbox"
        defaultChecked='true'
        onClick={this.toggleNitrogen.bind(this)}
        />
      <label>Nitrogen</label>
      </span>
    );
    const phosphorusCheckbox = (
      <span><input type="checkbox" defaultChecked='true' onClick={this.togglePhosphorus.bind(this)}/>
      <label>Phosphorus</label>
      </span>
    );
    const tempCheckbox = (
      <span><input type="checkbox" defaultChecked='true' onClick={this.toggleTemp.bind(this)}/>
      <label>Temperature</label>
      </span>
    );
    const tdsCheckbox = (
      <span><input type="checkbox" defaultChecked='true' onClick={this.toggleTDS.bind(this)}/>
      <label>TDS</label>
      </span>
    );
    const pHCheckbox = (
      <span><input type="checkbox" defaultChecked='true' onClick={this.togglepH.bind(this)}/>
      <label>pH</label>
      </span>
    );
    const tssCheckbox = (
      <span><input type="checkbox" defaultChecked='true' onClick={this.toggletss.bind(this)}/>
      <label>TSS</label>
      </span>
    );
    const salinityCheckbox = (
      <span><input type="checkbox" defaultChecked='true' onClick={this.togglesalinity.bind(this)}/>
      <label>Salinity</label>
      </span>
    );
    const hardnessCheckbox = (
      <span><input type="checkbox" defaultChecked='true' onClick={this.toggleHardness.bind(this)}/>
      <label>Total Hardness</label>
      </span>
    );
    const turbidityCheckbox = (
      <span><input type="checkbox" defaultChecked='true' onClick={this.toggleTurbidity.bind(this)}/>
      <label>Turbidity</label>
      </span>
    );
    const popover = {
       position: 'absolute',
       zIndex: '2',
     }
     const cover = {
       position: 'fixed',
       top: '0px',
       right: '0px',
       bottom: '0px',
       left: '0px',
     }



    return (
      <Grid>
        <Row>
          <Col xs={12} sm={12} md={12} >
            <Row style={{paddingTop: '10px'}}>
              <Col xs={12} sm={12} md={12} >
                <PageHeader>
    Summer Lake <small>Home Owners Association</small>
  </PageHeader>
            </Col>
          </Row>

          <Row>
            <Col xs={4} sm={4} md={4} >

              <div>
      <Panel >
        <Panel.Heading>
          <Panel.Title style={{textAlign: 'left'}} componentClass="h3">WEATHER</Panel.Title>
        </Panel.Heading>
        <Panel.Body style={{textAlign: 'center'}}>
          <h2>{this.state.currentCity}</h2>
          <img style={{width: '75px', height: '75px'}} src={this.state.currentIcon} />
          <h3>{this.state.currentDescription}</h3>
          <h3>Temperature: {this.state.currentTemp} F</h3>
          <p>Humidity: {this.state.currentHumidity}%</p>

        </Panel.Body>
      </Panel>
    </div>
    </Col>
    <Col xs={8} sm={8} md={8} >
      <Panel >
    <Panel.Heading>
      <Panel.Title style={{textAlign: 'left'}} componentClass="h3">LOCATION</Panel.Title>
    </Panel.Heading>
    <Panel.Body>
      <div style={{ height: '39vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAqe1Z8I94AcnNb3VsOam1tnUd_8WdubV4'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={37.987636425563075}
            lng={-121.63235758701154}
            text={'Summer Lake'}
          />
        </GoogleMapReact>
      </div>


    </Panel.Body>
  </Panel>


</Col>

  </Row>
  <Row>
    <Col xs={12} sm={12} md={12}>
      <hr></hr>
      </Col>
    </Row>

  <Row>





<Col xs={4} sm={4} md={4}>
  <Panel>
     <Panel.Heading>
       <Panel.Title style={{textAlign: 'left'}} componentClass="h3">PHOSPHORUS</Panel.Title>
     </Panel.Heading>
     <Panel.Body style={{textAlign: 'center'}}>
     <h2>Phosphorus</h2>
     <p>Average</p>
     <h3>Last 3 months</h3>
     <h2>{this.state.phosphorusAvg} mg/L</h2>
       <ResponsiveContainer  width='100%' aspect={5/3.0}>
         <BarChart    data={this.state.phosphorusGraph}
              margin={{top: 20, right: 0, left: 0, bottom: 5}}>

         <XAxis dataKey="date"/>

         <Tooltip/>

         <Bar dataKey="phosphorus" fill="#F0C808">
         <LabelList dataKey="phosphorus" position="top" />
       </Bar>
          </BarChart>
          </ResponsiveContainer>

   </Panel.Body>
   </Panel>
</Col>
<Col xs={4} sm={4} md={4}>
  <Panel >
     <Panel.Heading>
       <Panel.Title style={{textAlign: 'left'}} componentClass="h3">NITROGEN</Panel.Title>
     </Panel.Heading>
     <Panel.Body style={{textAlign: 'center'}}>
     <h2>Nitrogen</h2>
     <p>Average</p>
     <h3>Last 3 months</h3>
     <h2>{this.state.nitrogenAvg} mg/L</h2>
       <ResponsiveContainer  width='100%' aspect={5/3.0}>
         <BarChart    data={this.state.nitrogenGraph}
              margin={{top: 20, right: 0, left: 0, bottom: 5}}>

         <XAxis dataKey="date"/>

         <Tooltip/>

         <Bar dataKey="nitrogen" fill="#086788" >
         <LabelList dataKey="nitrogen" position="top" /></Bar>
          </BarChart>
          </ResponsiveContainer>
   </Panel.Body>
   </Panel>
</Col>
<Col xs={4} sm={4} md={4}>
  <Panel >
     <Panel.Heading>
       <Panel.Title  componentClass="h3">DISSOLVED OXYGEN</Panel.Title>
     </Panel.Heading>
     <Panel.Body >
       <div style={{textAlign: 'center'}}>
     <h2>DO</h2>
     <p>Average</p>
     <h3>Last 3 months</h3>
     <h2>{this.state.dissolvedOxygenAvg} mg/L</h2>
     </div>

     <ResponsiveContainer  width='100%' aspect={5/3.0}>
       <BarChart    data={this.state.dissolvedOxygenGraph}
            margin={{top: 20, right: 0, left: 0, bottom: 5}}>

       <XAxis dataKey="date"/>

       <Tooltip/>

       <Bar dataKey="do" fill="#DD1C1A"><LabelList dataKey="do" position="top" /></Bar>
        </BarChart>
        </ResponsiveContainer>





   </Panel.Body>
   </Panel>
</Col>
</Row>


  <Row>
    <Col xs={11} sm={11} md={11}>
      <hr></hr>
      </Col>
    </Row>


  <Row>
    <Col xs={12} sm={12} md={12}>
    <div>
<Panel >
<Panel.Heading>
<Panel.Title style={{textAlign: 'left'}} componentClass="h3">WATER QUALITY</Panel.Title>
</Panel.Heading>
<Panel.Body>
<ResponsiveContainer width='100%' aspect={7/3.0}>
<LineChart

  data={this.state.orders2} syncId="anyId"
  margin={{top: 10, right: 30, left: 0, bottom: 0}}>

<XAxis dataKey="sampleDate"/>
<YAxis label={{ value: 'Measurement', angle: -90, position: 'insideLeft' }}/>
<Tooltip/>

<Line type="monotone" dataKey={this.state.nitrogenPlot}  stroke="#06AED5" activeDot={{r: 8}}/>
<Line type="monotone" dataKey={this.state.phosphorusPlot} stroke="#086788" activeDot={{r: 8}}/>
<Line type="monotone" dataKey={this.state.tdsPlot} stroke="#F0C808" activeDot={{r: 8}}/>
<Line type="monotone" dataKey={this.state.pHPlot} stroke="#06AED5" />
<Line type="monotone" dataKey={this.state.tempPlot}  stroke={this.state.tempColor} />
<Line type="monotone" dataKey={this.state.tssPlot} stroke="#DD1C1A" />
<Line type="monotone" dataKey={this.state.salinityPlot} stroke="#06AED5" />
<Line type="monotone" dataKey={this.state.totalHardnessPlot} stroke="#086788" />
<Line type="monotone" dataKey={this.state.turbidityPlot} stroke="#F0C808" />
<Line type="monotone" dataKey={this.state.doPlot} stroke="#06AED5" />

<Brush />
<Legend />
</LineChart>


</ResponsiveContainer>
<Row>
<Col smOffset={1} xs={11} sm={11} md={11} >

<Row>
<Col xs={4} sm={4} md={4} >
<form onSubmit={this.onSubmit.bind(this)}>{nitrogenCheckbox}</form>
</Col>
<Col xs={4} sm={4} md={4} >
<form onSubmit={this.onSubmit.bind(this)}>{phosphorusCheckbox}</form>
</Col>
<Col xs={4} sm={4} md={4} >
<form onSubmit={this.onSubmit.bind(this)}>{tempCheckbox}
  <TiBrush size={20}  onClick={ this.handleClick }>Color</TiBrush>
{ this.state.displayColorPicker ? <div style={ popover }>
  <div style={ cover } onClick={ this.handleClose }/>
  <ChromePicker color={ this.state.tempColor } onChangeComplete={ this.tempColorChange } />
</div> : null }</form>
  </Col>
</Row>
<Row>
<Col xs={4} sm={4} md={4} >
<form onSubmit={this.onSubmit.bind(this)}>{tdsCheckbox}</form>
</Col>
<Col xs={4} sm={4} md={4} >
  <form onSubmit={this.onSubmit.bind(this)}>{pHCheckbox}</form>
</Col>
<Col xs={4} sm={4} md={4} >
  <form onSubmit={this.onSubmit.bind(this)}>{tssCheckbox}</form>
</Col>
</Row>
<Row>
<Col xs={4} sm={4} md={4} >
  <form onSubmit={this.onSubmit.bind(this)}>{salinityCheckbox}</form>
</Col>
<Col xs={4} sm={4} md={4} >
  <form onSubmit={this.onSubmit.bind(this)}>{hardnessCheckbox}</form>
</Col>
<Col xs={4} sm={4} md={4} >
  <form onSubmit={this.onSubmit.bind(this)}>{turbidityCheckbox}</form>
</Col>
<form onSubmit={this.onSubmit.bind(this)}>{doCheckbox}</form>
</Row>
</Col>
</Row>

</Panel.Body>
</Panel>
</div>


  </Col></Row>




        </Col>
        </Row>
      </Grid>

    )
  }
}
