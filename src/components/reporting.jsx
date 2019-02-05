import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, Radio,  Table, Popover, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import { PDFExport } from '@progress/kendo-react-pdf';
import { fire } from '../fire';

import {BootstrapTable, BootstrapButton, TableHeaderColumn, ExportCSVButton} from 'react-bootstrap-table';
import { TiArrowSortedDown, TiBrush, TiArrowSortedUp, TiPencil, TiTrash } from "react-icons/ti";

import domtoimage from 'dom-to-image';
import { ChromePicker } from 'react-color';
import fileDownload from "js-file-download";


import { ComposedChart, LineChart, LabelList, ResponsiveContainer, ReferenceArea, AreaChart, Brush, Area, Line, XAxis, YAxis, BarChart, Bar, CartesianGrid, Tooltip, Legend, Label} from 'recharts';

import { Row, Col, Tabs, message, Card, Drawer, Menu, Icon, Dropdown, Button, Layout, Carousel } from 'antd';




const TabPane = Tabs.TabPane;






const styles = {
  pdfPage: {
    padding: ".5in .5in"
  },
  topPad: {
    paddingTop: "20px"
  },
  bottomPad: {
    paddingBottom: "40px"
  },
};





export default class reporting extends Component {


  constructor(props) {
      super(props);
      this.state = {


        //report Inputs
        reportTitle: '',
        reportDate: '',
        reportOverview: '',
        reportAnalysis: '',


        //Random things for changing tabs
        id: '',
        key: "1",
        idKey: '',
        page: '',
        area: '',


        //put data into tables with these
        samples: [],
        orders: [],
        orders2: [],
        dataList: [],
        WQdataList: [],
        WQdataListLength: 0,
        filter: "",
        blobUrl: null,

        //drawers
        visible: false,
        visible1: false,
        visible2: false,

        //Inputs for Profile Page
        lakeName: '',
        locationCity: '',
        locationState: '',
        managementContact: '',
        hoaContact: '',
        managementContactNumber: '',
        hoaContactNumber: '',

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
        checkboxStatetemp: true,


        //data results
        sampleDate: '',
        sampleTaker: '',
        temp: '',
        do: '',
        conductivity: '',
        tds: '',
        salinity: '',
        pH: '',
        turbidity: '',
        nitrogen: '',
        phosphorus: '',
        totalHardness: '',
        tss: '',
        sampleNotes: '',


        //colors for graph lines
        tempColor: '#4C5B5C',
        doColor: '#6C698D',
        conductivityColor: '#DD1C1A',
        tdsColor: '#086788',
        salinityColor: '#F0C808',
        pHColor: '#4C5B5C',
        turbidityColor: '#6C698D',
        nitrogenColor: '#086788',
        phosphorusColor: '#F0C808',
        totalHardnessColor: '#DD1C1A',
        tssColor: '#086788',
        sampleNotesColor: '#',


        //these are for the graphs
        tempPlot: '',
        doPlot: '',
        conductivityPlot: '',
        tdsPlot: '',
        salinityPlot: '',
        pHPlot: '',
        turbidityPlot: '',
        nitrogenPlot: 'nitrogen',
        phosphorusPlot: 'phosphorus',
        totalHardnessPlot: '',
        tssPlot: '',




        //Graph 1
        parameterGraph1: 'salinity',
        parameterGraph2: 'tds',
        parameterGraph3: 'tss',
        parameterGraph4: 'turbidity',
        graphType: 'Area',
        graphType2: 'Area',
        graphType3: 'Bar',
        graphType4: 'Bar',


        //barLine
        barLine: '',
        lineLine: '',
        graphingType1: '',
        graphingType2: '',
        graphingType3: '',
        graphingType4: '',



        //testing
        test: '<Area',
        test1: '</Area>',


        //Brush Stuff
        endIndex: 0,
        startIndex: 0,



      }
      //these are triggered events.  handleChange is for text box changes
      //handlesubmit is for the form being submitted.
      //every event trigger needs to be bound like is below with .bind
      //we might now have to do this anymore with the newest version of react, but i have it to be safe.
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSelect = this.handleSelect.bind(this);
      this.writeData = this.writeData.bind(this);
      this.filter = this.filter.bind(this);





    }

    //event triggered when text boxes of forms, values are changed
    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
      let filter = this.state.filter;
      let dataList = this.state.orders.filter(function (item) {
      return Object.values(item).map(function (value) {
      return String(value);
            }).find(function (value) {
                 return value.includes(filter);
      });

      });
      let newState = [];





    }
    //event triggered when form is submitted
    handleSubmit(e) {
      e.preventDefault();
      //fire.database().ref('samples') refers to the main title of the fire database.
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const samplesRef = fire.database().ref(`reporting/${user.uid}`);



      const reportingInfo = {

        reportTitle: this.state.reportTitle,
        reportDate: this.state.reportDate,
        reportOverview: this.state.reportOverview,
        reportAnalysis: this.state.reportAnalysis,

      }


      samplesRef.push(reportingInfo);
      //this.setState is used to clear the text boxes after the form has been submitted.
      this.setState({
        visible: false,
        reportTitle: '',
        reportDate: '',
        reportOverview: '',
        reportAnalysis: '',

      });
    });

  }

    componentDidMount() {
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

        this.setState({
          graphingType1: <Area strokeWidth={3} barSize={15} type="monotone" dataKey="salinity" stroke={this.state.salinityColor} fillOpacity={1} fill="url(#colorSalinity)" ><LabelList style={{fontSize:'11px'}} dataKey="salinity" position="top" /></Area>,

          graphingType2: <Area strokeWidth={3} barSize={15} type="monotone" dataKey="tds" stroke={this.state.tdsColor} fillOpacity={1} fill="url(#colorTDS)" ><LabelList style={{fontSize:'11px'}} dataKey="tds" position="top" /></Area>,

          graphingType3: <Bar strokeWidth={3} barSize={15} type="monotone" dataKey="tss" stroke={this.state.tssColor} fillOpacity={1} fill="url(#colorTSS)" ><LabelList style={{fontSize:'11px'}} dataKey="tss" position="top" /></Bar>,

          graphingType4: <Bar strokeWidth={3} barSize={15} type="monotone" dataKey="turbidity" stroke={this.state.turbidityColor} fillOpacity={1} fill="url(#colorTurbidity)" ><LabelList style={{fontSize:'11px'}} dataKey="turbidity" position="top" /></Bar>,

        })

        const samplesRef = fire.database().ref(`reporting/${user.uid}`);
        samplesRef.on('value', (snapshot) => {


        let dataList = snapshot.val();
        let filter = [];
        let orders = snapshot.val();
        let orders2 = snapshot.val();

        let newState = [];
        let newState2 = [];
        let newState3 = [];

        for (let order in orders) {
          newState.push({
            id: order,
            reportTitle: orders[order].reportTitle,
            reportDate: orders[order].reportDate,
            reportOverview: orders[order].reportOverview,
            reportAnalysis: orders[order].reportAnalysis,

          });
          newState2.push({
            id: order,
            reportTitle: orders[order].reportTitle,
            reportDate: orders[order].reportDate,
            reportOverview: orders[order].reportOverview,
            reportAnalysis: orders[order].reportAnalysis,
          });

        }

        newState2.sort(function(a, b) {

          if (a.reportDate === b.reportDate) {
            return 0;
          }
          return a.reportDate > b.reportDate ? 1 : -1;
      });
      newState.sort(function(a, b) {

        if (b.reportDate === a.reportDate) {
          return 0;
        }
        return b.reportDate > a.reportDate ? 1 : -1;
    });

        this.setState({
          orders: newState,
          orders2: newState2,
          dataList: newState,
        });


      });

      const waterQualityRef = fire.database().ref(`monthlySamples/${user.uid}`);
      waterQualityRef.on('value', (snapshot) => {


        let WQdataList = snapshot.val();
        let WQdataListLength = '';
        let filter = [];
        let orders = snapshot.val();
        let orders2 = snapshot.val();

        let newState = [];
        let newState2 = [];
        let newState3 = [];

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
        WQdataList: newState,

        color: this.state.color,

      });


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

    });


  }



  fillStates(itemId) {
    let area = '';
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/reporting/${user.uid}/${itemId}`);

    sampleRef.on('value', (snapshot) => {

      this.setState({
        reportTitle: '',
        reportDate: '',
        reportOverview: '',
        reportAnalysis: '',

      });

    let orders = snapshot.val();
    let id = fire.database().ref().child(`/reporting/${user.uid}/${itemId}`).key;

    let newState = [];
    for (let order in orders) {
      newState.push({
        id: order,

        reportTitle: orders[order].reportTitle,
        reportDate: orders[order].reportDate,
        reportOverview: orders[order].reportOverview,
        reportAnalysis: orders[order].reportAnalysis,

      });
    }
    this.setState({

      id: id,
      key: "1",
      visible1: true,

      reportTitle: snapshot.child('reportTitle').val(),
      reportDate: snapshot.child('reportDate').val(),
      reportOverview: snapshot.child('reportOverview').val(),
      reportAnalysis: snapshot.child('reportAnalysis').val(),

    })

});


  });
}
fillStates1(itemId) {
  let area = '';
  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
  const sampleRef = fire.database().ref(`/reporting/${user.uid}/${itemId}`);

  sampleRef.on('value', (snapshot) => {

    this.setState({
      reportTitle: '',
      reportDate: '',
      reportOverview: '',
      reportAnalysis: '',

    });

  let orders = snapshot.val();
  let id = fire.database().ref().child(`/reporting/${user.uid}/${itemId}`).key;

  let newState = [];
  for (let order in orders) {
    newState.push({
      id: order,

      reportTitle: orders[order].reportTitle,
      reportDate: orders[order].reportDate,
      reportOverview: orders[order].reportOverview,
      reportAnalysis: orders[order].reportAnalysis,

    });
  }
  this.setState({

    id: id,
    key: "6",

    reportTitle: snapshot.child('reportTitle').val(),
    reportDate: snapshot.child('reportDate').val(),
    reportOverview: snapshot.child('reportOverview').val(),
    reportAnalysis: snapshot.child('reportAnalysis').val(),

  })

});
domtoimage.toBlob(document.getElementById('my-node'))
    .then((blob) => {


        console.log(blob);
        const blobUrl = URL.createObjectURL(blob);

        console.log(blobUrl);

        this.setState({
          blobUrl: blobUrl,
        })

    });

});
}




fillEmpty(itemId) {
  let area = '';
  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
  const sampleRef = fire.database().ref(`/reporting/${user.uid}/${itemId}`);


  sampleRef.on('value', (snapshot) => {

  let orders = snapshot.val();

  let newState = [];
  for (let order in orders) {
    newState.push({
      id: order,

      reportTitle: orders[order].reportTitle,
      reportDate: orders[order].reportDate,
      reportOverview: orders[order].reportOverview,
      reportAnalysis: orders[order].reportAnalysis,

    });
  }
  this.setState({

    id: '',
    key: "5",

    reportTitle: '',
    reportDate: '',
    reportOverview: '',
    reportAnalysis: '',


  })


});
});
}



  removesample(itemId) {
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/reporting/${user.uid}/${itemId}`);
    sampleRef.remove();
  });
  }

  handleSelect(key) {

this.setState({key});
}

handleSelectIndex(startIndex, endIndex) {

this.setState({startIndex, endIndex});
}




writeData (e) {
e.preventDefault();
//fire.database().ref('samples') refers to the main title of the fire database.
this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
const samplesRef = fire.database().ref(`reporting/${user.uid}`);
const orderID = fire.database().ref(`/reporting/${user.uid}/${this.state.id}`);
const newCheckboxKey = firebase.database().ref().child('checkbox').push().key;

let id = newCheckboxKey;
let box = id;


const reportingInfo = {

  id: this.state.id,
  reportTitle: this.state.reportTitle,
  reportDate: this.state.reportDate,
  reportOverview: this.state.reportOverview,
  reportAnalysis: this.state.reportAnalysis,
}

samplesRef.child(this.state.id).set(reportingInfo);

this.setState({
  visible1: false,
})


});
}



handleBtnClick = () => {

let order = 'desc';
if (order === 'desc') {
  this.refs.table.handleSort('asc', 'name');
  order = 'asc';
} else {
  this.refs.table.handleSort('desc', 'name');
  order = 'desc';
}
}


exportPDF = () => {
this.resume.save();
}

rawMarkup(){
var rawMarkup = this.props.content
return { __html: rawMarkup };
}



editRow(row, isSelected, e, id) {
console.log(`${isSelected.id}`);
return (
    <div style={{textAlign: 'center'}}>
  <Icon type="edit" style={{fontSize: '24px'}}
  onClick={() => this.fillStates(`${isSelected.id}`)}>
    Click me
  </Icon>
  </div>
)
}

previewRow(row, isSelected, e, id) {
console.log(`${isSelected.id}`);

return (
    <div style={{textAlign: 'center'}}>
  <Icon type="copy" style={{fontSize: '24px'}}
  onClick={() => this.fillStates1(`${isSelected.id}`)}>
    Click me
  </Icon>
  </div>
)

}

deleteRow(row, isSelected, e, id) {
console.log(`${isSelected.id}`);
return (
  <div style={{textAlign: 'center'}}>
  <Icon type="delete" style={{fontSize: '24px'}}
  onClick={() => this.removesample(`${isSelected.id}`)}>
    Click me
  </Icon>
  </div>
)
}




onSubmit(event) {
  event.preventDefault();
}

handleExportCSVButtonClick = (onClick) => {
// Custom your onClick event here,
// it's not necessary to implement this function if you have no any process before onClick
console.log('This is my custom function for ExportCSVButton click event');
onClick();
}
createCustomExportCSVButton = (onClick) => {
return (
  <ExportCSVButton
    btnText='Down CSV'
    onClick={ () => this.handleExportCSVButtonClick(onClick) }/>
);
}


showDrawer = () => {
this.setState({
  visible: true,
});
};
onClose = () => {
this.setState({
  visible: false,
});
};
onClose1 = () => {
this.setState({
  visible1: false,
});
};



preview = () => {
  this.setState({
    key: "7",
  })
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

editChart = (itemId) => {
  let area = '';

  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
  const sampleRef = fire.database().ref(`/monthlySamples/${user.uid}/${itemId}`);


  sampleRef.on('value', (snapshot) => {

  let orders = snapshot.val();

  let newState = [];

  this.setState({

    visible2: true,



  })


});
});
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
          checkboxStatetemp: !this.state.checkboxStatetemp
        });
        const checkboxState = this.state.checkboxStatetemp;
        if (checkboxState) {
          this.setState({
            tempPlot: 'temp',
          })
        } else {
          this.setState({
            tempPlot: '',
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
              tdsPlot: 'tds',
            })
          } else {
            this.setState({
              tdsPlot: '',
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
                pHPlot: 'pH',
              })
            } else {
              this.setState({
                pHPlot: '',
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
                  tssPlot: 'tss',
                })
              } else {
                this.setState({
                  tssPlot: '',
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
                    salinityPlot: 'salinity',
                  })
                } else {
                  this.setState({
                    salinityPlot: '',
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
                      totalHardnessPlot: 'totalHardness',
                    })
                  } else {
                    this.setState({
                      totalHardnessPlot: '',
                    })
                  }
                }
                toggleTurbidity(event) {
                    this.setState({
                      checkboxStateturbidity: !this.state.checkboxStateturbidity,

                    });
                    const checkboxState = this.state.checkboxStateturbidity;
                    if (checkboxState) {
                      this.setState({
                        turbidityPlot: 'turbidity',

                      })
                    } else {
                      this.setState({
                        turbidityPlot: '',

                      })
                    }
                  }
                  toggleTurbidity(event) {
                      this.setState({
                        checkboxStateturbidity: !this.state.checkboxStateturbidity,

                      });
                      const checkboxState = this.state.checkboxStateturbidity;
                      if (checkboxState) {
                        this.setState({
                          turbidityPlot: 'turbidity',

                        })
                      } else {
                        this.setState({
                          turbidityPlot: '',

                        })
                      }
                    }
                    toggleConductivity(event) {
                        this.setState({
                          checkboxStateconductivity: !this.state.checkboxStateconductivity,

                        });
                        const checkboxState = this.state.checkboxStateconductivity;
                        if (checkboxState) {
                          this.setState({
                            conductivityPlot: 'conductivity',

                          })
                        } else {
                          this.setState({
                            conductivityPlot: '',

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
                          doPlot: 'do',
                        })
                      } else {
                        this.setState({
                          doPlot: '',
                        })
                      }
                    }

                    showDrawer = () => {
                      this.setState({
                        visible: true,
                      });
                    };
                    onClose = () => {
                      this.setState({
                        visible: false,
                        visible1: false,
                        visible2: false,
                      });
                    };



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




    render() {
      let { file } = this.state
      console.log(this.state.file);
      let url = file && URL.createObjectURL(file)


      let img = document.createElement("my-node");

      function handleButtonClick(e) {

        console.log('click left button', e);
      }

      function handleMenuClick(e) {

        console.log('click', e);
      }

      const menu = (
        <Menu onClick={handleMenuClick}>

          <Menu.Item key="1" onClick={this.graph1Line}>Line Graph</Menu.Item>
          <Menu.Item key="2" onClick={this.graph1Area}>Area Graph</Menu.Item>
          <Menu.Item key="3" onClick={this.graph1Bar}>Bar Graph</Menu.Item>
        </Menu>
      );

      const menu2 = (
        <Menu onClick={handleMenuClick}>

          <Menu.Item key="1" onClick={this.graph2Line}>Line Graph</Menu.Item>
          <Menu.Item key="2" onClick={this.graph2Area}>Area Graph</Menu.Item>
          <Menu.Item key="3" onClick={this.graph2Bar}>Bar Graph</Menu.Item>
        </Menu>
      );
      const menu3 = (
        <Menu onClick={handleMenuClick}>

          <Menu.Item key="1" onClick={this.graph3Line}>Line Graph</Menu.Item>
          <Menu.Item key="2" onClick={this.graph3Area}>Area Graph</Menu.Item>
          <Menu.Item key="3" onClick={this.graph3Bar}>Bar Graph</Menu.Item>
        </Menu>
      );
      const menu4 = (
        <Menu onClick={handleMenuClick}>

          <Menu.Item key="1" onClick={this.graph4Line}>Line Graph</Menu.Item>
          <Menu.Item key="2" onClick={this.graph4Area}>Area Graph</Menu.Item>
          <Menu.Item key="3" onClick={this.graph4Bar}>Bar Graph</Menu.Item>
        </Menu>
      );


      function buttonFormatter(cell, row){
return '<BootstrapButton type="submit"></BootstrapButton>';
}
const options = {
exportCSVBtn: this.createCustomExportCSVButton
};
const doCheckbox = (
<span>
  <input
  type="checkbox"

  onClick={this.toggleDO.bind(this)}
  />
<label>DO</label>
</span>
);
 const nitrogenCheckbox = (
   <span>
     <input
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
   <span><input type="checkbox"  onClick={this.toggleTemp.bind(this)}/>
   <label>Temperature</label>
   </span>
 );
 const tdsCheckbox = (
   <span><input type="checkbox"  onClick={this.toggleTDS.bind(this)}/>
   <label>TDS</label>
   </span>
 );
 const pHCheckbox = (
   <span><input type="checkbox"  onClick={this.togglepH.bind(this)}/>
   <label>pH</label>
   </span>
 );
 const tssCheckbox = (
   <span><input type="checkbox"  onClick={this.toggletss.bind(this)}/>
   <label>TSS</label>
   </span>
 );
 const salinityCheckbox = (
   <span><input type="checkbox"  onClick={this.togglesalinity.bind(this)}/>
   <label>Salinity</label>
   </span>
 );
 const hardnessCheckbox = (
   <span><input type="checkbox"  onClick={this.toggleHardness.bind(this)}/>
   <label>Total Hardness</label>
   </span>
 );
 const turbidityCheckbox = (
   <span><input type="checkbox"  onClick={this.toggleTurbidity.bind(this)}/>
   <label>Turbidity</label>
   </span>
 );
 const conductivityCheckbox = (
   <span><input type="checkbox"  onClick={this.toggleConductivity.bind(this)}/>
   <label>Conductivity</label>
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

  const chart = (


    <ResponsiveContainer width="100%" aspect={8/3.0} minHeight={200}>
    <AreaChart data={this.state.WQdataList}
syncId="anyId">
<defs>
<linearGradient id="colorNitrogen" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor={this.state.nitrogenColor} stopOpacity={0.8}/>
  <stop offset="95%" stopColor={this.state.nitrogenColor} stopOpacity={0}/>
</linearGradient>
<linearGradient id="colorPhosphorus" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor={this.state.phosphorusColor} stopOpacity={0.8}/>
  <stop offset="95%" stopColor={this.state.phosphorusColor} stopOpacity={0}/>
</linearGradient>
<linearGradient id="colorDO" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor={this.state.doColor} stopOpacity={0.8}/>
  <stop offset="95%" stopColor={this.state.doColor} stopOpacity={0}/>
</linearGradient>
<linearGradient id="colorTDS" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor={this.state.tdsColor} stopOpacity={0.8}/>
  <stop offset="95%" stopColor={this.state.tdsColor}  stopOpacity={0}/>
</linearGradient>
<linearGradient id="colorSalinity" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor={this.state.salinityColor}  stopOpacity={0.8}/>
  <stop offset="95%" stopColor={this.state.salinityColor}  stopOpacity={0}/>
</linearGradient>
<linearGradient id="colorTurbidity" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor={this.state.turbidityColor}  stopOpacity={0.8}/>
  <stop offset="95%" stopColor={this.state.turbidityColor}stopOpacity={0}/>
</linearGradient>
<linearGradient id="colorHardness" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor={this.state.totalHardnessColor} stopOpacity={0.8}/>
  <stop offset="95%" stopColor={this.state.totalHardnessColor} stopOpacity={0}/>
</linearGradient>
<linearGradient id="colorpH" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor={this.state.pHColor} stopOpacity={0.8}/>
  <stop offset="95%" stopColor={this.state.pHColor} stopOpacity={0}/>
</linearGradient>
<linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor={this.state.tempColor} stopOpacity={0.8}/>
  <stop offset="95%" stopColor={this.state.tempColor} stopOpacity={0}/>
</linearGradient>
<linearGradient id="colorConductivity" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor={this.state.conductivityColor} stopOpacity={0.8}/>
  <stop offset="95%" stopColor={this.state.conductivityColor} stopOpacity={0}/>
</linearGradient>
<linearGradient id="colorTSS" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor={this.state.tssColor} stopOpacity={0.8}/>
  <stop offset="95%" stopColor={this.state.tssColor} stopOpacity={0}/>
</linearGradient>
</defs>
<XAxis dataKey="sampleDate" />
<YAxis domain={[0, 5]}/>
<Tooltip />

<Area type="monotone" dataKey={this.state.nitrogenPlot} stroke={this.state.nitrogenColor} fillOpacity={1} fill="url(#colorNitrogen)"><LabelList dataKey={this.state.nitrogenPlot} position="top" /></Area>

<Area type="monotone" dataKey={this.state.phosphorusPlot} stroke={this.state.phosphorusColor} fillOpacity={1} fill="url(#colorPhosphorus)"><LabelList dataKey={this.state.phosphorusPlot} position="top" /></Area>

<Area type="monotone" dataKey={this.state.tdsPlot} stroke={this.state.tdsColor} fillOpacity={1} fill="url(#colorTDS)"><LabelList dataKey={this.state.tdsPlot} position="top" /></Area>

<Area type="monotone" dataKey={this.state.salinityPlot} stroke={this.state.salinityColor} fillOpacity={1} fill="url(#colorSalinity)"><LabelList dataKey={this.state.salinityPlot} position="top" /></Area>

<Area type="monotone" dataKey={this.state.turbidityPlot} stroke={this.state.turbidityColor}fillOpacity={1} fill="url(#colorTurbidity)"><LabelList dataKey={this.state.turbidityPlot} position="top" /></Area>

<Area type="monotone" dataKey={this.state.totalHardnessPlot} stroke={this.state.totalHardnessColor} fillOpacity={1} fill="url(#colorHardness)"><LabelList dataKey={this.state.totalHardnessPlot} position="top" /></Area>

<Area type="monotone" dataKey={this.state.pHPlot} stroke={this.state.pHColor} fillOpacity={1} fill="url(#colorpH)"><LabelList dataKey={this.state.pHPlot} position="top" /></Area>

<Area type="monotone" dataKey={this.state.tempPlot} stroke={this.state.tempColor} fillOpacity={1} fill="url(#colorTemp)"><LabelList dataKey={this.state.tempPlot} position="top" /></Area>

<Area type="monotone" dataKey={this.state.conductivityPlot} stroke={this.state.conductivityColor} fillOpacity={1} fill="url(#colorConductivity)"><LabelList dataKey={this.state.conductivityPlot} position="top" /></Area>

<Area type="monotone" dataKey={this.state.tssPlot} stroke={this.state.tssColor} fillOpacity={1} fill="url(#colorTSS)"><LabelList dataKey={this.state.tssPlot} position="top" /></Area>

<Area type="monotone" dataKey={this.state.doPlot} stroke={this.state.doColor} fillOpacity={1} fill="url(#colorDO)"><LabelList dataKey={this.state.doPlot} position="top" /></Area>





<Legend />

<Brush

></Brush>
</AreaChart>
</ResponsiveContainer>

);




      return (

        <Layout>
          <Drawer
            title= "Edit Chart"
            placement={this.state.placement}
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible2}
            width={500}
          >
            <form>
              <Row style={{textAlign: 'right'}}>
              <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Sample</Icon>
              </Row>


      <Row style={{paddingTop: '10px'}}>
      <FormGroup>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}><b>Turbidity</b></Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
        {turbidityCheckbox}
      </Col>
      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
        <div>
          <TiBrush size={20}  onClick={ this.handleClick }>Color</TiBrush>
        { this.state.displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handleClose }/>
          <ChromePicker color={ this.state.turbidityColor } onChangeComplete={ this.tempColorChange } />
        </div> : null }
            </div>
          </Col>
      </FormGroup>
      </Row>
      <Row style={{paddingTop: '10px'}}>
      <FormGroup>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Total Hardness</b></Col>
        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
        {hardnessCheckbox}
      </Col>
      </FormGroup>
      </Row>
      <Row style={{paddingTop: '10px'}}>
      <FormGroup>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>pH</b></Col>
        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
        {pHCheckbox}
      </Col>
      </FormGroup>
      </Row>
      <Row style={{paddingTop: '10px'}}>
      <FormGroup>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>TDS</b></Col>
        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
        {tdsCheckbox}
      </Col>
      </FormGroup>
      </Row>
      <Row style={{paddingTop: '10px'}}>
      <FormGroup>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>TSS</b></Col>
        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
        {tssCheckbox}
      </Col>
      </FormGroup>
      </Row>
      <Row style={{paddingTop: '10px'}}>
      <FormGroup>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Conductivity</b></Col>
        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
        {conductivityCheckbox}
      </Col>
      </FormGroup>
      </Row>
      <Row style={{paddingTop: '10px'}}>
      <FormGroup>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>DO</b></Col>
        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
        {doCheckbox}
      </Col>
      </FormGroup>
      </Row>
      <Row style={{paddingTop: '10px'}}>
      <FormGroup>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Temp</b></Col>
        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
        {tempCheckbox}
      </Col>
      </FormGroup>
      </Row>
      <Row style={{paddingTop: '10px'}}>
      <FormGroup>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Salinity</b></Col>
        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
        {salinityCheckbox}
      </Col>
      </FormGroup>
      </Row>
      <Row style={{paddingTop: '10px'}}>
      <FormGroup>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Phosphorus</b></Col>
        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
        {phosphorusCheckbox}
      </Col>
      </FormGroup>
      </Row>
      <Row style={{paddingTop: '10px'}}>
      <FormGroup>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Nitrogen</b></Col>
        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
        {nitrogenCheckbox}
      </Col>
      </FormGroup>
      </Row>




      <Row style={{paddingTop: '10px', textAlign: 'right'}}>
      <Button type="primary" onClick={this.writeData} bsStyle="primary">Overwrite Sample</Button>
      </Row>





      </form>
          </Drawer>

          <div style={{ background: '#F0F0F0', padding: '5px' }}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <div style={{position: 'relative'}}>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <h1><b>REPORTING</b></h1>
            <h3><b>{this.state.lakeName}</b></h3>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{ textAlign: 'right'}}>
        <Button size="large" type="primary" onClick={() => this.fillEmpty()}>+ Add Report</Button>
          <Drawer
            title= "Fill in Report"
            placement={this.state.placement}
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
            width={500}
          >
          <form>
            <Row style={{textAlign: 'right'}}>
            <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Report</Icon>
            </Row>
            <Row style={{paddingTop: '10px'}}>
              <FormGroup>
                <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Title</b></Col>
                <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                <FormControl name="reportTitle" onChange={this.handleChange} type="text" placeholder="Report Title" value={this.state.reportTitle} /></Col>
              </FormGroup>
              </Row>
                    <Row style={{paddingTop: '10px'}}>
              <FormGroup>
                <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Date</b></Col>
                <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                <FormControl name="reportDate" onChange={this.handleChange} type="date" placeholder="Report Date" value={this.state.reportDate} /></Col>
              </FormGroup>
              </Row>
              <Row style={{paddingTop: '10px'}}>
              <FormGroup>
                <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Overview</b></Col>
                <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                <FormControl name="reportOverview" onChange={this.handleChange} type="textarea"  componentClass="textarea" style={{ height: 80, width: 335}}placeholder="Report Overview" value={this.state.reportOverview} /></Col>
              </FormGroup>
              </Row>
              <Row style={{paddingTop: '10px'}}>
              <FormGroup>
                <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Analysis</b></Col>
                <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                <FormControl name="reportAnalysis" onChange={this.handleChange} type="textarea"  componentClass="textarea" style={{ height: 80, width: 335}}placeholder="Report Analysis" value={this.state.reportAnalysis} /></Col>
              </FormGroup>
              </Row>





      <Row style={{paddingTop: '10px', textAlign: 'right'}}>
      <Button type="primary" onClick={this.handleSubmit} bsStyle="primary">Add Report</Button>
      </Row>





      </form>



          </Drawer>

          <Drawer
            title= "Edit Report"
            placement={this.state.placement}
            closable={false}
            onClose={this.onClose1}
            visible={this.state.visible1}
            width={500}
          >
            <form>
              <Row style={{textAlign: 'right'}}>
              <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose1()}>+ Add Application Report</Icon>
              </Row>
              <Row style={{paddingTop: '10px'}}>
                <FormGroup>
                  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Title</b></Col>
                  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                  <FormControl name="reportTitle" onChange={this.handleChange} type="text" placeholder="Report Title" value={this.state.reportTitle} /></Col>
                </FormGroup>
                </Row>
                      <Row style={{paddingTop: '10px'}}>
                <FormGroup>
                  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Date</b></Col>
                  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                  <FormControl name="reportDate" onChange={this.handleChange} type="date" placeholder="Report Date" value={this.state.reportDate} /></Col>
                </FormGroup>
                </Row>
                <Row style={{paddingTop: '10px'}}>
                <FormGroup>
                  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Overview</b></Col>
                  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                  <FormControl name="reportOverview" onChange={this.handleChange} type="textarea"  componentClass="textarea" style={{ height: 80, width: 335}}placeholder="Report Overview" value={this.state.reportOverview} /></Col>
                </FormGroup>
                </Row>
                <Row style={{paddingTop: '10px'}}>
                <FormGroup>
                  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Analysis</b></Col>
                  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                  <FormControl name="reportAnalysis" onChange={this.handleChange} type="textarea"  componentClass="textarea" style={{ height: 80, width: 335}}placeholder="Report Analysis" value={this.state.reportAnalysis} /></Col>
                </FormGroup>
                </Row>





      <Row style={{paddingTop: '10px', textAlign: 'right'}}>
      <Button type="primary" onClick={this.writeData} bsStyle="primary">Overwrite Report</Button>
      </Row>





      </form>
          </Drawer>
          </Col>

        </div>
          </Row>

          </div>

          <div style={{ background: '#F0F0F0', paddingTop: '15px', paddingRight: '5px', paddingLeft: '5px' }}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>


                <Card


                >
                <Tabs defaultActiveKey="1"  activeKey={this.state.key} onChange={this.handleSelect}>
            <TabPane tab="REPORTS" key="1">
              <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Row>

              <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{paddingTop: '20px'}}>

                  <p style={{lineHeight: '2px', paddingLeft: '0px', fontSize: '32px'}}><b>REPORTS</b></p>


            </Col>
          </Row>

              <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <BootstrapTable
                data={ this.state.dataList }
                options={options}
                exportCSV
                pagination


                >

                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={{ whiteSpace: 'normal' }} width='150px'  dataField='reportTitle'  filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Report Title</TableHeaderColumn>
                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={{ whiteSpace: 'normal' }} width='150px'  dataField='reportDate' isKey filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Report Date</TableHeaderColumn>
                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={{ whiteSpace: 'normal' }} width='150px'  dataField='reportOverview' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Report Overview</TableHeaderColumn>
                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={{ whiteSpace: 'normal' }} width='150px'  dataField='reportAnalysis' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Report Analysis</TableHeaderColumn>


          <TableHeaderColumn
                width='100px'
                dataField='button'
                dataFormat={this.previewRow.bind(this)}
                >Edit</TableHeaderColumn>




            <TableHeaderColumn
                  width='100px'
                  dataField='button'
                  dataFormat={this.deleteRow.bind(this)}
                  >Delete</TableHeaderColumn>


                </BootstrapTable>


          </Col>
          </Row>
          <Row>
          <Col span={24}>
          <hr></hr>
          </Col>
          </Row>






          </Col>
        </Row>

            </TabPane>


            <TabPane tab="" key="5">
              <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Row>

              <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{paddingTop: '20px'}}>

                  <p style={{lineHeight: '2px', paddingLeft: '0px', fontSize: '32px'}}><b>REPORT</b></p>


            </Col>
          </Row>

              <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>

                <form>
                  <Row style={{textAlign: 'right'}}>
                  <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Report</Icon>
                  </Row>
                  <Row style={{paddingTop: '10px'}}>
                    <FormGroup>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Title</b></Col>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                      <FormControl name="reportTitle" onChange={this.handleChange} type="text" placeholder="Report Title" value={this.state.reportTitle} /></Col>
                    </FormGroup>
                    </Row>
                          <Row style={{paddingTop: '10px'}}>
                    <FormGroup>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Date</b></Col>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                      <FormControl name="reportDate" onChange={this.handleChange} type="date" placeholder="Report Date" value={this.state.reportDate} /></Col>
                    </FormGroup>
                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                    <FormGroup>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Overview</b></Col>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                      <FormControl name="reportOverview" onChange={this.handleChange} type="textarea"  componentClass="textarea" style={{ height: 80, width: 335}}placeholder="Report Overview" value={this.state.reportOverview} /></Col>
                    </FormGroup>
                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                    <FormGroup>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Analysis</b></Col>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                      <FormControl name="reportAnalysis" onChange={this.handleChange} type="textarea"  componentClass="textarea" style={{ height: 80, width: 335}}placeholder="Report Analysis" value={this.state.reportAnalysis} /></Col>
                    </FormGroup>

                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                    <FormGroup>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Water Quality Data</b></Col>
                    </FormGroup>
                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                    <FormGroup>
                      <Row>

                      <Col xs={18} sm={18} md={18} lg={18} xl={18} style={{paddingTop: '20px'}}>

                          <p style={{lineHeight: '2px', paddingLeft: '55px', fontSize: '32px'}}><b>WATER QUALITY</b></p>


                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} style={{paddingTop: '20px'}}>

                        <Button  type="default" onClick={() => this.editChart()}>+ Edit Chart</Button>


                  </Col>
                  </Row>

                      <Row>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div id="my-node">{chart}</div>

                  </Col>
                  </Row>
                    </FormGroup>
                    </Row>





            <Row style={{paddingTop: '10px', textAlign: 'right'}}>
            <Button type="primary" onClick={this.handleSubmit} bsStyle="primary">Add Report</Button>
            </Row>





            </form>


          </Col>
          </Row>
          <Row>
          <Col span={24}>
          <hr></hr>
          </Col>
          </Row>






          </Col>
        </Row>

            </TabPane>
            <TabPane tab="Report" key="6">
              <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Row>

              <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{paddingTop: '20px'}}>

                  <p style={{lineHeight: '2px', paddingLeft: '0px', fontSize: '32px'}}><b>REPORT</b></p>


            </Col>
          </Row>

              <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>

                <form>
                  <Row style={{textAlign: 'right'}}>
                  <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.preview()}></Icon>
                  </Row>
                  <Row style={{paddingTop: '10px'}}>
                    <FormGroup>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Title</b></Col>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                      <FormControl name="reportTitle" onChange={this.handleChange} type="text" placeholder="Report Title" value={this.state.reportTitle} /></Col>
                    </FormGroup>
                    </Row>
                          <Row style={{paddingTop: '10px'}}>
                    <FormGroup>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Date</b></Col>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                      <FormControl name="reportDate" onChange={this.handleChange} type="date" placeholder="Report Date" value={this.state.reportDate} /></Col>
                    </FormGroup>
                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                    <FormGroup>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Overview</b></Col>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                      <FormControl name="reportOverview" onChange={this.handleChange} type="textarea"  componentClass="textarea" style={{ height: 80, width: 335}}placeholder="Report Overview" value={this.state.reportOverview} /></Col>
                    </FormGroup>
                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                    <FormGroup>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Analysis</b></Col>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                      <FormControl name="reportAnalysis" onChange={this.handleChange} type="textarea"  componentClass="textarea" style={{ height: 80, width: 335}}placeholder="Report Analysis" value={this.state.reportAnalysis} /></Col>
                    </FormGroup>

                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                    <FormGroup>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Water Quality Data</b></Col>
                    </FormGroup>
                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                    <FormGroup>
                      <Row>

                      <Col xs={18} sm={18} md={18} lg={18} xl={18} style={{paddingTop: '20px'}}>

                          <p style={{lineHeight: '2px', paddingLeft: '55px', fontSize: '32px'}}><b>WATER QUALITY</b></p>


                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} style={{paddingTop: '20px'}}>

                        <Button  type="default" onClick={() => this.editChart()}>+ Edit Chart</Button>


                  </Col>
                  </Row>

                      <Row>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div id="my-node">{chart}</div>

                  </Col>
                  </Row>
                    </FormGroup>
                    </Row>





            <Row style={{paddingTop: '10px', textAlign: 'right'}}>
            <Button type="primary" onClick={this.writeData} bsStyle="primary">Overwrite Report</Button>
            </Row>





            </form>


          </Col>
          </Row>
          <Row>
          <Col span={24}>
          <hr></hr>
          </Col>
          </Row>






          </Col>
        </Row>

            </TabPane>

            <TabPane tab="Preview" key="7">
              <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Row>

              <Col xs={18} sm={18} md={18} lg={18} xl={18} style={{paddingTop: '20px'}}>

                  <p style={{lineHeight: '2px', paddingLeft: '0px', fontSize: '32px'}}><b>REPORT PREVIEW</b></p>


            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6} style={{paddingTop: '20px'}}>

            <button onClick={() => { this.pdfExportComponent.save(); }}>
                        Export PDF
                    </button>
                  </Col>

          </Row>
          <Row>
          <Col span={24}>
          <hr></hr>
          </Col>
          </Row>

              <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <PDFExport          fileName={this.state.reportDate +' ' + 'Report'}
                              title=""
                              style={{
                                  margin: '30px',
                                  padding: '100px'}}
                              paperSize={'Letter'}
                              forcePageBreak=".page-break"
                              margin={30}
                              ref={(component) => this.pdfExportComponent = component}
                          >

                <form>

                  <Row style={{paddingTop: '10px'}}>
                    <FormGroup>

                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <p style={{lineHeight: '2px', paddingLeft: '0px', fontSize: '20px'}}><b>{this.state.reportTitle}</b></p>
                       </Col>
                    </FormGroup>
                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                      <FormGroup>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                          <p style={{lineHeight: '2px', paddingLeft: '0px', fontSize: '20px'}}><b>{this.state.lakeName}</b></p>
                         </Col>
                      </FormGroup>
                      </Row>
                    <Row style={{paddingTop: '10px'}}>
                      <FormGroup>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                          <p style={{lineHeight: '2px', paddingLeft: '0px', fontSize: '20px'}}><b>{this.state.reportDate}</b></p>
                         </Col>
                      </FormGroup>
                      </Row>
                      <Row style={{paddingTop: '10px'}}>
                        <FormGroup>

                          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Table striped bordered condensed hover>
  <thead>
    <tr>
      <th style={{ fontSize: '18px', width: '100px'}}>Item</th>
      <th style={{ fontSize: '18px', width: '450px'}}>Description</th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <td style={{ fontSize: '15px', width: '100px'}}><b>Report Overview</b></td>
      <td style={{ fontSize: '15px', width: '500px'}}>{this.state.reportOverview}</td>
    </tr>
    <tr>
      <td style={{ fontSize: '15px', width: '100px'}}><b>Report Analysis</b></td>
      <td style={{ fontSize: '15px', width: '500px'}}>{this.state.reportAnalysis}</td>
    </tr>

  </tbody>
</Table>




                           </Col>
                        </FormGroup>
                        </Row>



                    

                    <Row style={{paddingTop: '10px'}}>
                    <FormGroup>
                      <Row>

                      <Col xs={18} sm={18} md={18} lg={18} xl={18} style={{paddingTop: '20px'}}>

                          <p style={{lineHeight: '2px', paddingLeft: '55px', fontSize: '32px'}}><b>WATER QUALITY</b></p>


                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} style={{paddingTop: '20px'}}>




                  </Col>
                  </Row>

                      <Row>
                      <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                        <ResponsiveContainer width="100%" aspect={8/3.0} height={600}>
                        <img src={this.state.blobUrl} />
                        </ResponsiveContainer>

                  </Col>
                  </Row>
                    </FormGroup>
                    </Row>





            <Row style={{paddingTop: '10px', textAlign: 'right'}}>
            <Button type="primary" onClick={this.handleSubmit} bsStyle="primary">Add Report</Button>
            </Row>





            </form>


          </PDFExport>


          </Col>
          </Row>
          <Row>
          <Col span={24}>
          <hr></hr>
          </Col>
          </Row>






          </Col>
        </Row>

            </TabPane>


          </Tabs>

                </Card>
          </Col>
          </Row>
          </div>





        </Layout>

      )
          }
        }
