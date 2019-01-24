import React, { Component } from 'react'
import { Navbar, Nav, FormGroup, Checkbox, Grid, PageHeader, Jumbotron, NavItem, Modal, Panel } from 'react-bootstrap';
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

import { Row, Col, Tabs, Card, Drawer, Menu, Icon, Button, Layout, Carousel } from 'antd';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const TabPane = Tabs.TabPane;

const tabListNoTitle = [{
  key: 'article',
  tab: 'article',
}, {
  key: 'app',
  tab: 'app',
}, {
  key: 'project',
  tab: 'project',
}];

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
        nitrogenLatest: '',
        nitrogenGraph: [],
        phosphorusAverage: [],
        phosphorusAvg: '',
        phosphorusGraph: [],
        phoshporusLatest: '',
        dissolvedOxygenAverage: [],
        dissolvedOxygenAvg: '',
        dissolvedOxygenGraph: [],
        dissolvedOxygenLatest: '',

        turbidityLatest: '',
        turbidityAverage: [],
        turbidityAvg: '',
        turbidityGraph: [],
        tssLatest: '',
        tssAverage: [],
        tssAvg: '',
        tssGraph: [],
        salinityLatest: '',
        salinityAverage: [],
        salinityAvg: '',
        salinityGraph: [],

        key: 'tab1',
        noTitleKey: 'app',

        //Inputs for Profile Page
        lakeName: '',
        locationCity: '',
        locationState: '',
        managementContact: '',
        hoaContact: '',
        managementContactNumber: '',
        hoaContactNumber: '',



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
        let tssAverage = [];
        let turbidityAverage = [];
        let salinityAverage = [];







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
      console.log(orders2)

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

        console.log(nitrogenReverse[0])
        this.setState({
          nitrogenLatest: nitrogenReverse[0],
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
            phosphorusLatest: phosphorusReverse[0],
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

            console.log(phosphorusReverse)
            this.setState({
              dissolvedOxygenLatest: dissolvedOxygenReverse[0],
              dissolvedOxygenAvg: dissolvedOxygen,
              dissolvedOxygenGraph: dissolvedOxygenGraph,
            })

            snapshot.forEach(ss => {
                tssAverage.push({tss: ss.child('tss').val(), date: ss.child('sampleDate').val()} );
                tssAverage.sort(function(a, b) {
                  if (a.date === b.date) {
                    return 0;
                  }
                  return a.date > b.date ? 1 : -1;
              });
                this.setState({
                  tssAverage: (tssAverage),
                })
              });

              let tssData = [];
              for (let i=0; i < tssAverage.length; i++) {
              //push send this data to the back of the chartData variable above.
              tssData.push(parseFloat(tssAverage[i].tss));

            }
              let tssReverse = tssData.reverse();

              let tssReverse2 = tssAverage.reverse();

              let tssGraph = ([{tss: tssReverse2[2].tss, date: tssReverse2[2].date}, {tss: tssReverse2[1].tss, date: tssReverse2[1].date}, {tss: tssReverse2[0].tss, date: tssReverse2[0].date} ]);
              console.log(tssGraph)



              let tss = ([tssReverse[0], tssReverse[1], tssReverse[2]].reduce((a, b) => a + b, 0)/ 3).toFixed(1);

              console.log(phosphorusReverse)
              this.setState({
                tssLatest: tssReverse[0],
                tssAvg: tss,
                tssGraph: tssGraph,
              })
              snapshot.forEach(ss => {
                  turbidityAverage.push({turbidity: ss.child('turbidity').val(), date: ss.child('sampleDate').val()} );
                  turbidityAverage.sort(function(a, b) {
                    if (a.date === b.date) {
                      return 0;
                    }
                    return a.date > b.date ? 1 : -1;
                });
                  this.setState({
                    turbidityAverage: (turbidityAverage),
                  })
                });

                let turbidityData = [];
                for (let i=0; i < turbidityAverage.length; i++) {
                //push send this data to the back of the chartData variable above.
                turbidityData.push(parseFloat(turbidityAverage[i].turbidity));

              }
                let turbidityReverse = turbidityData.reverse();

                let turbidityReverse2 = turbidityAverage.reverse();

                let turbidityGraph = ([{do: turbidityReverse2[2].turbidity, date: turbidityReverse2[2].date}, {do: turbidityReverse2[1].turbidity, date: turbidityReverse2[1].date}, {do: turbidityReverse2[0].turbidity, date: turbidityReverse2[0].date} ]);
                console.log(turbidityGraph)



                let turbidity = ([turbidityReverse[0], turbidityReverse[1], turbidityReverse[2]].reduce((a, b) => a + b, 0)/ 3).toFixed(1);

                console.log(phosphorusReverse)
                this.setState({
                  turbidityLatest: turbidityReverse[0],
                  turbidityAvg: turbidity,
                  turbidityGraph: turbidityGraph,
                })

                snapshot.forEach(ss => {
                    salinityAverage.push({salinity: ss.child('salinity').val(), date: ss.child('sampleDate').val()} );
                    salinityAverage.sort(function(a, b) {
                      if (a.date === b.date) {
                        return 0;
                      }
                      return a.date > b.date ? 1 : -1;
                  });
                    this.setState({
                      salinityAverage: (salinityAverage),
                    })
                  });

                  let salinityData = [];
                  for (let i=0; i < salinityAverage.length; i++) {
                  //push send this data to the back of the chartData variable above.
                  salinityData.push(parseFloat(salinityAverage[i].salinity));

                }
                  let salinityReverse = salinityData.reverse();

                  let salinityReverse2 = salinityAverage.reverse();

                  let salinityGraph = ([{do: salinityReverse2[2].salinity, date: salinityReverse2[2].date}, {do: salinityReverse2[1].salinity, date: salinityReverse2[1].date}, {do: salinityReverse2[0].salinity, date: salinityReverse2[0].date} ]);
                  console.log(salinityGraph)



                  let salinity = ([salinityReverse[0], salinityReverse[1], salinityReverse[2]].reduce((a, b) => a + b, 0)/ 3).toFixed(1);

                  console.log(phosphorusReverse)
                  this.setState({
                    salinityLatest: salinityReverse[0],
                    salinityAvg: salinity,
                    salinityGraph: salinityGraph,
                  })


    });
    const profileRef = fire.database().ref(`profileInformation/${user.uid}`);
    profileRef.on('value', (snapshot) => {


    this.setState({
      lakeName: snapshot.child('lakeName').val(),
      locationCity: snapshot.child('locationCity').val(),
      locationState: snapshot.child('locationState').val(),
      managementContact: snapshot.child('managementContact').val(),
      hoaContact: snapshot.child('hoaContact').val(),
      managementContactNumber: snapshot.child('managementContactNumber').val(),
      hoaContactNumber: snapshot.child('hoaContactNumber').val(),

    });


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

                      onTabChange = (key, type) => {
     console.log(key, type);
     this.setState({ [type]: key });
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

      <Layout>


        <div style={{ background: '#F0F0F0', padding: '5px' }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <div style={{position: 'relative'}}>
        <Col xs={18} sm={18} md={18} lg={18} xl={18}>
          <h1>Dashboard</h1>
          <h3><b>{this.state.lakeName}</b></h3>
        </Col>
        




      </div>
        </Row>
        </div>



        <Row style={{backgroundColor: '#F0F0F0'}}>
        <Col span={24}>
        <hr style={{backgroundColor: 'black', height: '0px', border: 0}}></hr>
        </Col>
        </Row>

        <div style={{ background: '#F0F0F0', padding: '5px' }}>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <div style={{position: 'relative'}}>
          <div style={{ position: 'absolute',
        top: '0%',
        left: '0%', backgroundColor: 'lightBlue', height: '100%', width: '4%', zIndex: 1}} />
        <Card  style={{textAlign: 'left'}} bordered={true}>
          <h3>{this.state.nitrogenLatest} mg/L</h3>
          <hr></hr>
          <p style={{lineHeight: '2px'}}><b>NITROGEN</b></p>
          <p style={{lineHeight: '2px'}}>LATEST SAMPLE</p>
        </Card>
        </div>
      </Col>
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <div style={{position: 'relative'}}>
          <div style={{ position: 'absolute',
        top: '0%',
        left: '0%', backgroundColor: '#086788', height: '100%', width: '4%', zIndex: 1}} />
        <Card  style={{textAlign: 'left'}} bordered={true}>
          <h3>{this.state.phosphorusLatest} mg/L</h3>
          <hr></hr>
            <p style={{lineHeight: '2px'}}><b>PHOSPHORUS</b></p>
            <p style={{lineHeight: '2px'}}>LATEST SAMPLE</p>
        </Card>
        </div>
      </Col>
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <div style={{position: 'relative'}}>
          <div style={{ position: 'absolute',
        top: '0%',
        left: '0%', backgroundColor: '#F0C808', height: '100%', width: '4%', zIndex: 1}} />
      <Card  style={{textAlign: 'left'}} bordered={true}>
          <h3>{this.state.dissolvedOxygenLatest} mg/L</h3>
          <hr></hr>
            <p style={{lineHeight: '2px'}}><b>DISSOLVED OXYGEN</b></p>
            <p style={{lineHeight: '2px'}}>LATEST SAMPLE</p>
        </Card>
        </div>
      </Col>


    </Row>
  </div>



  <div style={{ background: '#F0F0F0', paddingTop: '15px', paddingRight: '5px', paddingLeft: '5px'}}>
<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
<Col xs={24} sm={24} md={8} lg={8} xl={8}>
  <div style={{position: 'relative'}}>
    <div style={{ position: 'absolute',
  top: '0%',
  left: '0%', backgroundColor: '#5C80BC', height: '100%', width: '4%', zIndex: 1}} />
  <Card  style={{textAlign: 'left'}} bordered={true}>
    <h3>{this.state.tssLatest} mg/L</h3>
    <hr></hr>
    <p style={{lineHeight: '2px'}}><b>TSS</b></p>
    <p style={{lineHeight: '2px'}}>LATEST SAMPLE</p>
  </Card>
  </div>
</Col>
<Col xs={24} sm={24} md={8} lg={8} xl={8}>
  <div style={{position: 'relative'}}>
    <div style={{ position: 'absolute',
  top: '0%',
  left: '0%', backgroundColor: '#30323D', height: '100%', width: '4%', zIndex: 1}} />
  <Card  style={{textAlign: 'left'}} bordered={true}>
    <h3>{this.state.turbidityLatest} mg/L</h3>
    <hr></hr>
      <p style={{lineHeight: '2px'}}><b>TURBIDITY</b></p>
      <p style={{lineHeight: '2px'}}>LATEST SAMPLE</p>
  </Card>
  </div>
</Col>
<Col xs={24} sm={24} md={8} lg={8} xl={8}>
  <div style={{position: 'relative'}}>
    <div style={{ position: 'absolute',
  top: '0%',
  left: '0%', backgroundColor: '#CDD1C4', height: '100%', width: '4%', zIndex: 1}} />
<Card  style={{textAlign: 'left'}} bordered={true}>
    <h3>{this.state.salinityLatest} ppt</h3>
    <hr></hr>
      <p style={{lineHeight: '2px'}}><b>SALINITY</b></p>
      <p style={{lineHeight: '2px'}}>LATEST SAMPLE</p>
  </Card>
  </div>
</Col>


</Row>
</div>



<Row style={{backgroundColor: '#F0F0F0'}}>
<Col span={24}>
<hr style={{backgroundColor: 'black', height: '0px', border: 0}}></hr>
</Col>
</Row>

<div style={{ background: '#F0F0F0', paddingTop: '15px', paddingRight: '5px', paddingLeft: '5px' }}>
<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
<Col xs={24} sm={24} md={24} lg={24} xl={24}>


      <Card


      >
      <Tabs defaultActiveKey="1" >
  <TabPane tab="Nutrients" key="1">
    <Row style={{paddingTop: '15px'}}>
    <Col span={24} >

        <p style={{lineHeight: '2px'}}><b>NITROGEN AND PHOSPHORUS</b></p>
        <p style={{lineHeight: '2px'}}>18 MONTHS</p>
        <hr></hr>
  </Col>
</Row>

    <Row>
    <Col span={24}>
      <ResponsiveContainer width="100%" aspect={10/3.0} minHeight={200}>
        <AreaChart data={this.state.orders2}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#086788" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#086788" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#F0C808" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#F0C808" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="sampleDate" />
  <YAxis />
  <CartesianGrid strokeDasharray="6 6" />
  <Tooltip />

  <Area type="monotone" dataKey="nitrogen" stroke="#086788" fillOpacity={1} fill="url(#colorUv)" ><LabelList dataKey="nitrogen" position="top" /></Area>
  <Area type="monotone" dataKey="phosphorus" stroke="#F0C808" fillOpacity={1} fill="url(#colorPv)"><LabelList dataKey="phosphorus" position="top" /></Area>
  <Legend />
</AreaChart>
 </ResponsiveContainer>

</Col>
</Row>

  </TabPane>
  <TabPane tab="Salinity and TDS" key="2">
    <Row style={{paddingTop: '15px'}}>
    <Col span={24}>

        <p style={{lineHeight: '2px'}}><b>SALINITY AND TDS</b></p>
        <p style={{lineHeight: '2px'}}>18 MONTHS</p>
        <hr></hr>
  </Col>
</Row>

    <Row>
    <Col span={24}>
      <ResponsiveContainer width="100%" aspect={10/3.0} minHeight={200}>
        <AreaChart data={this.state.orders2}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#086788" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#086788" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#F0C808" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#F0C808" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="sampleDate" />
  <YAxis domain={[0, 10]}/>
  <CartesianGrid strokeDasharray="6 6" />
  <Tooltip />

  <Area type="monotone" dataKey="tds" stroke="#F0C808" fillOpacity={1} fill="url(#colorPv)"><LabelList dataKey="tds" position="top" /></Area>
  <Area type="monotone" dataKey="salinity" stroke="#086788" fillOpacity={1} fill="url(#colorUv)" ><LabelList dataKey="salinity" position="top" /></Area>

  <Legend />
</AreaChart>
 </ResponsiveContainer>

</Col>
</Row>



  </TabPane>
  <TabPane tab="Turbidity and Dissolved Oxygen" key="3">
    <Row style={{paddingTop: '15px'}}>
    <Col span={24}>

        <p style={{lineHeight: '2px'}}><b>TURBIDITY AND DISSOLVED OXYGEN</b></p>
        <p style={{lineHeight: '2px'}}>18 MONTHS</p>
        <hr></hr>
  </Col>
</Row>

    <Row>
    <Col span={24}>
      <ResponsiveContainer width="100%" aspect={10/3.0} minHeight={200}>
        <AreaChart data={this.state.orders2}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorTurbidity" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#809848" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#809848" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorDO" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#40798C" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#40798C" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="sampleDate" />
  <YAxis />
  <CartesianGrid strokeDasharray="6 6" />
  <Tooltip />

  <Area type="monotone" dataKey="turbidity" stroke="#809848" fillOpacity={1} fill="url(#colorTurbidity)"><LabelList dataKey="turbidity" position="top" /></Area>
  <Area type="monotone" dataKey="do" stroke="#40798C" fillOpacity={1} fill="url(#colorDO)" ><LabelList dataKey="do" position="top" /></Area>

  <Legend />
</AreaChart>
 </ResponsiveContainer>

</Col>
</Row>




  </TabPane>
</Tabs>

      </Card>
</Col>
</Row>
</div>











 <div style={{ background: '#F0F0F0', paddingTop: '15px', paddingRight: '5px', paddingLeft: '5px' }}>
<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
<Col xs={24} sm={24} md={8} lg={8} xl={8}>

<Card   bordered={true}>


  <Row>
  <Col span={16}>

      <p style={{lineHeight: '2px'}}><b>NITROGEN</b></p>
      <p style={{lineHeight: '2px'}}>LAST 3 MONTHS</p>
      <p style={{lineHeight: '2px'}}>AVERAGE</p>

</Col>
<Col span={8}>

    <p style={{lineHeight: '2px', paddingTop: '5px'}}><b style={{fontSize: '20px'}}>{this.state.nitrogenAvg}mg/L</b></p>


</Col>

<Row>
<Col span={24}>
<hr></hr>
</Col>
</Row>

</Row>

<Row>
<Col span={24}>

    <ResponsiveContainer  width='100%' aspect={5/3.0}>
      <BarChart    data={this.state.nitrogenGraph}
           margin={{top: 20, right: 0, left: 0, bottom: 5}}>
           <defs>
           <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
             <stop offset="5%" stopColor="#086788" stopOpacity={0.8}/>
             <stop offset="95%" stopColor="#086788" stopOpacity={0.3}/>
           </linearGradient>
           </defs>

      <XAxis dataKey="date" />

      <Tooltip/>

      <Bar barSize={30} dataKey="nitrogen" fillOpacity={1} fill="url(#colorBlue)">
      <LabelList dataKey="nitrogen" position="top" /></Bar>
       </BarChart>
       </ResponsiveContainer>
     </Col>
     </Row>
</Card>
</Col>


<Col xs={24} sm={24} md={8} lg={8} xl={8}>
<Card  bordered={true}>

  <Row>
  <Col span={16}>

      <p style={{lineHeight: '2px'}}><b>PHOSPHORUS</b></p>
      <p style={{lineHeight: '2px'}}>LAST 3 MONTHS</p>
      <p style={{lineHeight: '2px'}}>AVERAGE</p>

  </Col>
  <Col span={8}>

    <p style={{lineHeight: '2px', paddingTop: '5px'}}><b style={{fontSize: '20px'}}>{this.state.phosphorusAvg}mg/L</b></p>


  </Col>

  </Row>
  <Row>
  <Col span={24}>
  <hr></hr>
  </Col>
</Row>


  <Row> <Col span={24}>
    <ResponsiveContainer  width='100%' aspect={5/3.0}>
      <BarChart    data={this.state.phosphorusGraph}
           margin={{top: 20, right: 0, left: 0, bottom: 5}}>
           <defs>
           <linearGradient id="colorYellow" x1="0" y1="0" x2="0" y2="1">
             <stop offset="5%" stopColor="#F0C808" stopOpacity={0.8}/>
             <stop offset="95%" stopColor="#F0C808" stopOpacity={0.3}/>
           </linearGradient>
           </defs>
      <XAxis dataKey="date"/>

      <Tooltip/>

      <Bar barSize={30} dataKey="phosphorus" fillOpacity={1} fill="url(#colorYellow)">
      <LabelList dataKey="phosphorus" position="top" />
    </Bar>
       </BarChart>
       </ResponsiveContainer>
       </Col></Row>

</Card>
</Col>
<Col xs={24} sm={24} md={8} lg={8} xl={8}>
<Card   bordered={true}>


  <Row>
  <Col span={16}>

      <p style={{lineHeight: '2px'}}><b>DISSOLVED O<sub>2</sub></b></p>
      <p style={{lineHeight: '2px'}}>LAST 3 MONTHS</p>
      <p style={{lineHeight: '2px'}}>AVERAGE</p>

  </Col>
  <Col span={8}>

    <p style={{lineHeight: '2px', paddingTop: '5px'}}><b style={{fontSize: '20px'}}>{this.state.dissolvedOxygenAvg}mg/L</b></p>


  </Col>

  <Row>
  <Col span={24}>
  <hr></hr>
  </Col>
  </Row>

  </Row>

  <Row>
  <Col span={24}>


  <ResponsiveContainer  width='100%' aspect={5/3.0}>
    <BarChart    data={this.state.dissolvedOxygenGraph}
         margin={{top: 20, right: 0, left: 0, bottom: 5}}>
         <defs>
         <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
           <stop offset="5%" stopColor="#DD1C1A" stopOpacity={0.8}/>
           <stop offset="95%" stopColor="#DD1C1A" stopOpacity={0.3}/>
         </linearGradient>
         </defs>
    <XAxis dataKey="date"/>

    <Tooltip/>

    <Bar barSize={30} dataKey="do" fillOpacity={1} fill="url(#colorRed)"><LabelList dataKey="do" position="top" /></Bar>
     </BarChart>
     </ResponsiveContainer>

</Col></Row>
</Card>
</Col>
</Row>
</div>

<div style={{ background: '#F0F0F0', paddingTop: '15px', paddingRight: '5px', paddingLeft: '5px' }}>
<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
<Col xs={24} sm={24} md={8} lg={8} xl={8}>
 <Card  style={{textAlign: 'left'}} bordered={true} >
   <div style={{textAlign: 'center'}}>
   <h3>{this.state.currentCity}</h3>
     <img style={{width: '60px', height: '60px'}} src={this.state.currentIcon} />
     <h3>{this.state.currentDescription}</h3>
     <p>Temperature: {this.state.currentTemp} F</p>
     <p>Humidity: {this.state.currentHumidity}%</p>
     </div>
 </Card>
</Col>

<Col xs={24} sm={24} md={16} lg={16} xl={16}>
 <Card  style={{textAlign: 'left'}} bordered={true} >
   <div style={{ height: '29vh', width: '100%' }}>
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
 </Card>

</Col>


</Row>
</div>







      </Layout>



    )
  }
}
