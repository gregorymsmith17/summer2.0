import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button, ResponsiveEmbed, ButtonToolbar, Form, Grid, Row, FormGroup, Tab, Radio, Tabs, Col, Table, Popover, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import { PDFExport } from '@progress/kendo-react-pdf';
import { fire } from '../fire';

import {BootstrapTable, BootstrapButton, TableHeaderColumn, ExportCSVButton} from 'react-bootstrap-table';
import { TiArrowSortedDown, TiBrush, TiArrowSortedUp, TiPencil, TiTrash } from "react-icons/ti";

import domtoimage from 'dom-to-image';
import { ChromePicker } from 'react-color';
import fileDownload from "js-file-download";


import { LineChart, ReferenceArea, AreaChart, Brush, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';



const styles = {
  topPad: {
    paddingTop: "20px"
  },
};





export default class monthlySamples extends Component {


    constructor(props) {
        super(props);
        this.state = {

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

          //random id and key, key is for the tab number
          id: '',
          key: 1,
          idKey: '',
          page: '',
          area: '',
          displayColorPicker: false,

          //colors for graph lines
          tempColor: '',


          //this is the object array for the table
          samples: [],
          orders: [],
          orders2: [],
          dataList: [],
          filter: "",
          blobUrl: null,


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




        }
        //these are triggered events.  handleChange is for text box changes
        //handlesubmit is for the form being submitted.
        //every event trigger needs to be bound like is below with .bind
        //we might now have to do this anymore with the newest version of react, but i have it to be safe.
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.writeData = this.writeData.bind(this);





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
        const samplesRef = fire.database().ref(`monthlySamples/${user.uid}`);
        const orderID = fire.database().ref(`/monthlySamples/${user.uid}/${orderID}`);


        const sample = {

          sampleDate: this.state.sampleDate,
          sampleTaker: this.state.sampleTaker,
          temp: this.state.temp,
          do: this.state.do,
          conductivity: this.state.conductivity,
          tds: this.state.tds,
          salinity: this.state.salinity,
          pH: this.state.pH,
          turbidity: this.state.turbidity,
          nitrogen: this.state.nitrogen,
          phosphorus: this.state.phosphorus,
          totalHardness: this.state.totalHardness,
          tss: this.state.tss,
          sampleNotes: this.state.sampleNotes,

          id: this.state.id,
        }




        samplesRef.push(sample);
        //this.setState is used to clear the text boxes after the form has been submitted.
        this.setState({
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



        });
      });
    }





      //this function is constantly running after the initial render.  Snapshot is used to look into the database.
      //[] indicates an array value
      //.map(Number) changes an array of strings to an array of integers
      //snapshot.foreach(ss => {...}) **this looks in each "Sample" for the child of "user"**
      //child of user can be child of BOD or child of tss or whatever.  It finds the value that is a child to that label.

      componentDidMount() {
        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
          const samplesRef = fire.database().ref(`monthlySamples/${user.uid}`);
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
      console.log(this.state.color);


    }



    fillStates(itemId) {
      let area = '';
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const sampleRef = fire.database().ref(`/monthlySamples/${user.uid}/${itemId}`);

      sampleRef.on('value', (snapshot) => {

        this.setState({
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

        });

      let orders = snapshot.val();
      let id = fire.database().ref().child(`/monthlySamples/${user.uid}/${itemId}`).key;

      let newState = [];
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
      }
      this.setState({

        id: id,
        key: 4,

        sampleDate: snapshot.child('sampleDate').val(),
        sampleTaker: snapshot.child('sampleTaker').val(),
        temp: snapshot.child('temp').val(),
        do: snapshot.child('do').val(),
        conductivity: snapshot.child('conductivity').val(),
        tds: snapshot.child('tds').val(),
        salinity: snapshot.child('salinity').val(),
        pH: snapshot.child('pH').val(),
        turbidity: snapshot.child('turbidity').val(),
        nitrogen: snapshot.child('nitrogen').val(),
        phosphorus: snapshot.child('phosphorus').val(),
        totalHardness: snapshot.child('totalHardness').val(),
        tss: snapshot.child('tss').val(),
        sampleNotes: snapshot.child('sampleNotes').val(),


      })


});

    });
  }


  writeStates = (itemId) => {

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/monthlySamples/${user.uid}/${this.state.id}`);


    sampleRef.child("id").set(this.state.id);


    sampleRef.child("sampleDate").set(this.state.sampleDate);
    sampleRef.child("sampleTaker").set(this.state.sampleTaker);
    sampleRef.child("temp").set(this.state.temp);
    sampleRef.child("do").set(this.state.do);
    sampleRef.child("conductivity").set(this.state.conductivity);
    sampleRef.child("tds").set(this.state.tds);
    sampleRef.child("salinity").set(this.state.salinity);
    sampleRef.child("pH").set(this.state.pH);
    sampleRef.child("turbidity").set(this.state.turbidity);
    sampleRef.child("nitrogen").set(this.state.nitrogen);
    sampleRef.child("phosphorus").set(this.state.phosphorus);
    sampleRef.child("totalHardness").set(this.state.totalHardness);
    sampleRef.child("tss").set(this.state.tss);
    sampleRef.child("sampleNotes").set(this.state.sampleNotes);



  });


  }



  fillEmpty(itemId) {
    let area = '';
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/monthlySamples/${user.uid}/${itemId}`);


    sampleRef.on('value', (snapshot) => {

    let orders = snapshot.val();

    let newState = [];
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
    }
    this.setState({

      id: '',
      key: 3,
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


    })


});
  });
}



    removesample(itemId) {
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const sampleRef = fire.database().ref(`/monthlySamples/${user.uid}/${itemId}`);
      sampleRef.remove();
    });
    }

    handleSelect(key) {
  this.setState({key});
}


writeData (e) {
  e.preventDefault();
  //fire.database().ref('samples') refers to the main title of the fire database.
  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
  const samplesRef = fire.database().ref(`monthlySamples/${user.uid}`);
  const orderID = fire.database().ref(`/monthlySamples/${user.uid}/${this.state.id}`);
  const newCheckboxKey = firebase.database().ref().child('checkbox').push().key;

  let id = newCheckboxKey;
  let box = id;


  const sample = {

    id: this.state.id,
    sampleDate: this.state.sampleDate,
    sampleTaker: this.state.sampleTaker,
    temp: this.state.temp,
    do: this.state.do,
    conductivity: this.state.conductivity,
    tds: this.state.tds,
    salinity: this.state.salinity,
    pH: this.state.pH,
    turbidity: this.state.turbidity,
    nitrogen: this.state.nitrogen,
    phosphorus: this.state.phosphorus,
    totalHardness: this.state.totalHardness,
    tss: this.state.tss,
    sampleNotes: this.state.sampleNotes,
  }

  samplesRef.child(this.state.id).set(sample);






  //this.setState is used to clear the text boxes after the form has been submitted.

});
}




exportPDF = () => {
  this.resume.save();
}

rawMarkup(){
  var rawMarkup = this.props.content
  return { __html: rawMarkup };
}





 nitrogenSort = (a, b, order) => {
   let dataList = this.state.dataList;   // order is desc or asc
  if (order === 'desc') {
    return a.nitrogen - b.nitrogen;
  } else {
    return b.nitrogen - a.nitrogen;
  }
}
phosphorusSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'desc') {
   return a.phosphorus - b.phosphorus;
 } else {
   return b.phosphorus - a.phosphorus;
 }
}
tdsSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'desc') {
   return a.tds - b.tds;
 } else {
   return b.tds - a.tds;
 }
}
tssSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'desc') {
   return a.tss - b.tss;
 } else {
   return b.tss - a.tss;
 }
}
salinitySort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'desc') {
   return a.salinity - b.salinity;
 } else {
   return b.salinity - a.salinity;
 }
}
turbiditySort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'desc') {
   return a.turbidity - b.turbidity;
 } else {
   return b.turbidity - a.turbidity;
 }
}
pHSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'desc') {
   return a.pH - b.pH;
 } else {
   return b.pH - a.pH;
 }
}
hardnessSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'desc') {
   return a.totalHardness - b.totalHardness;
 } else {
   return b.totalHardness - a.totalHardness;
 }
}
tempSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'desc') {
   return a.temp - b.temp;
 } else {
   return b.temp - a.temp;
 }
}
doSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'desc') {
   return a.do - b.do;
 } else {
   return b.do - a.do;
 }
}
conductivitySort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'desc') {
   return a.conductivity - b.conductivity;
 } else {
   return b.conductivity - a.conductivity;
 }
}



editRow(row, isSelected, e, id) {
  console.log(`${isSelected.id}`);
  return (
      <div style={{textAlign: 'center'}}>
    <TiPencil size={20} type="button"
    onClick={() => this.fillStates(`${isSelected.id}`)}>
      Click me
    </TiPencil>
    </div>
  )
}

deleteRow(row, isSelected, e, id) {
  console.log(`${isSelected.id}`);
  return (
    <div style={{textAlign: 'center'}}>
    <TiTrash  size={20} type="button"
    onClick={() => this.removesample(`${isSelected.id}`)}>
      Click me
    </TiTrash>
    </div>
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

test = () => {
  console.log("test")
}















      render() {
        function buttonFormatter(cell, row){
  return '<BootstrapButton type="submit"></BootstrapButton>';
}
const options = {
  exportCSVBtn: this.createCustomExportCSVButton
};

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
    <div>

      <Grid>
        <Row>
          <Row>
            <Col xs={6} md={6}>
          <h3>Monthly Sample Logs</h3>

          </Col>
          <Col xs={6} md={6}>
            <ButtonToolbar style={styles.topPad}>
          <Button bsStyle="primary" onClick={() => this.fillEmpty()} eventKey={3} bsSize="large">+ Create New Sample Log</Button>
        </ButtonToolbar>
          </Col>
          </Row>
          <Col xs={12} sm={10} md={10}>


      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} defaultActiveKey={1} id="uncontrolled-tab-example">

        <Tab eventKey={1} title="+ Graphs">

          <Row style={styles.topPad}>

          <Col xs={7} sm={7} md={7} lg={7}>


          <div id="my-node">
          <LineChart
            width={750} height={400} data={this.state.orders2} syncId="anyId"
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="sampleDate"/>
        <YAxis/>
        <Tooltip/>

          <Line type="monotone" dataKey={this.state.nitrogenPlot}  stroke="#8884d8" activeDot={{r: 8}}/>
            <Line type="monotone" dataKey={this.state.phosphorusPlot} stroke="#8884d8" activeDot={{r: 8}}/>
         <Line type="monotone" dataKey={this.state.tdsPlot} stroke="#8884d8" activeDot={{r: 8}}/>
        <Line type="monotone" dataKey={this.state.pHPlot} stroke="#82ca9d" />
        <Line type="monotone" dataKey={this.state.tempPlot}  stroke={this.state.tempColor} />
        <Line type="monotone" dataKey={this.state.tssPlot} stroke="#82ca9d" />
        <Line type="monotone" dataKey={this.state.salinityPlot} stroke="#82ca9d" />
        <Line type="monotone" dataKey={this.state.totalHardnessPlot} stroke="#82ca9d" />
        <Line type="monotone" dataKey={this.state.turbidityPlot} stroke="#82ca9d" />
        <Brush />
        <Legend />
        </LineChart>

        </div>
      </Col>
        <Col smOffset={2} xs={3} sm={3} md={3} lg={3}>


      <form onSubmit={this.onSubmit.bind(this)}>{nitrogenCheckbox}</form>

      <form onSubmit={this.onSubmit.bind(this)}>{phosphorusCheckbox}</form>

      <form onSubmit={this.onSubmit.bind(this)}>{tempCheckbox}
        <TiBrush size={20}  onClick={ this.handleClick }>Color</TiBrush>
      { this.state.displayColorPicker ? <div style={ popover }>
        <div style={ cover } onClick={ this.handleClose }/>
        <ChromePicker color={ this.state.tempColor } onChangeComplete={ this.tempColorChange } />
      </div> : null }</form>


      <form onSubmit={this.onSubmit.bind(this)}>{tdsCheckbox}</form>
      <form onSubmit={this.onSubmit.bind(this)}>{pHCheckbox}</form>
      <form onSubmit={this.onSubmit.bind(this)}>{tssCheckbox}</form>
      <form onSubmit={this.onSubmit.bind(this)}>{salinityCheckbox}</form>
      <form onSubmit={this.onSubmit.bind(this)}>{hardnessCheckbox}</form>
      <form onSubmit={this.onSubmit.bind(this)}>{turbidityCheckbox}</form>

        </Col>



        </Row>




        </Tab>

        <Tab eventKey={2} title="+ Monthly Samples">
          <Grid>

          <Row style={styles.topPad}>



            <Col xs={10} sm={10} md={10} lg={10}>


              <BootstrapTable
              data={ this.state.dataList }
              options={options}
              exportCSV
              pagination
              containerStyle={{width: '1000px',overflowX: 'scroll'}}


              >

  <TableHeaderColumn width='110px' dataField='sampleDate' isKey filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Sample Date</TableHeaderColumn>
  <TableHeaderColumn width='110px' dataField='temp' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.tempSort }>Temperature</TableHeaderColumn>
  <TableHeaderColumn width='110px' dataField='do' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.doSort }>Dissolved Oxygen</TableHeaderColumn>
  <TableHeaderColumn width='110px' dataField='conductivity' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.conductivitySort }>Conductivity</TableHeaderColumn>
  <TableHeaderColumn width='110px' dataField='tds' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.tdsSort }>Total Dissolved Solids</TableHeaderColumn>
  <TableHeaderColumn width='110px' dataField='salinity' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.salinitySort }>Salinity</TableHeaderColumn>
    <TableHeaderColumn width='110px' dataField='nitrogen' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.nitrogenSort }>Total Nitrogen</TableHeaderColumn>
      <TableHeaderColumn width='110px' dataField='phosphorus' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.phosphorusSort }>Total Phosphorus</TableHeaderColumn>
        <TableHeaderColumn width='110px' dataField='totalHardness' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.hardnessSort }>Hardness</TableHeaderColumn>
          <TableHeaderColumn width='110px' dataField='tss' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.tssSort }>TSS</TableHeaderColumn>

        <TableHeaderColumn
              dataField='button'
              dataFormat={this.editRow.bind(this)}
              width='110px'
              >Edit</TableHeaderColumn>

          <TableHeaderColumn
                dataField='button'
                dataFormat={this.deleteRow.bind(this)}
                width='110px'
                >Delete</TableHeaderColumn>


              </BootstrapTable>
              </Col>

          </Row>
        </Grid>
          </Tab>






      <Tab eventKey={3} >
        <Grid>
          <Row>
            <Col xs={10} md={10}>
        <section className='add-item'>
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Col xs={4} sm={4} md={4}>
                <h2>Monthly Sample Log</h2>
                </Col>

                </Row>
                <hr></hr>
                <Row>
                  <Col xs={8} sm={8} md={8}>

  <Table striped bordered condensed hover>
  <thead>
  <tr>
  <th>Description</th>
  <th>Results</th>

  </tr>
  </thead>
  <tbody>
  <tr>
  <td>Date</td>
  <td><input type="date" name="sampleDate" placeholder="Date of Sample" onChange={this.handleChange} value={this.state.sampleDate} /></td>
  </tr>
  <tr>
  <td>Name</td>
  <td><input type="text" name="sampleTaker" placeholder="Your Name" onChange={this.handleChange} value={this.state.sampleTaker} /></td>
  </tr>
  <tr>
  <td>Water Temperature</td>
  <td><input type="number" name="temp" placeholder="Temp of Sample" onChange={this.handleChange} value={this.state.temp} /></td>
  </tr>
  <tr>
  <td>DO</td>
  <td><input type="number" name="do" placeholder="Dissolved Oxygen" onChange={this.handleChange} value={this.state.do} /></td>
  </tr>
  <tr>
  <td>Conductivity</td>
  <td><input type="number" name="conductivity" placeholder="Conductivity" onChange={this.handleChange} value={this.state.conductivity} /></td>
  </tr>
  <tr>
  <td>Total Dissolved Solids</td>
  <td><input type="number" name="tds" placeholder="Total Dissolved Solids" onChange={this.handleChange} value={this.state.tds} /></td>
  </tr>
  <tr>
  <td>Salinity</td>
  <td><input type="number" name="salinity" placeholder="Salinity" onChange={this.handleChange} value={this.state.salinity} /></td>
  </tr>
  <tr>
  <td>pH</td>
  <td><input type="number" name="pH" placeholder="pH" onChange={this.handleChange} value={this.state.pH} /></td>
  </tr>
  <tr>
  <td>Turbidity</td>
  <td><input type="number" name="turbidity" placeholder="Turbidity" onChange={this.handleChange} value={this.state.turbidity} /></td>
  </tr>
  <tr>
  <td>Total Nitrogen</td>
  <td><input type="number" name="nitrogen" placeholder="Total Nitrogen" onChange={this.handleChange} value={this.state.nitrogen} /></td>
  </tr>
  <tr>
  <td>Total Phosphorus</td>
  <td><input type="number" name="phosphorus" placeholder="Total Phosphorus" onChange={this.handleChange} value={this.state.phosphorus} /></td>
  </tr>
  <tr>
  <td>Total Hardness</td>
  <td><input type="number" name="totalHardness" placeholder="Total Hardness" onChange={this.handleChange} value={this.state.totalHardness} /></td>
  </tr>
  <tr>
  <td>Total Suspended Solids</td>
  <td><input type="number" name="tss" placeholder="Total Suspended Solids" onChange={this.handleChange} value={this.state.tss} /></td>
  </tr>
  <tr>
  <td>Sample Notes</td>
  <td><input  type="textArea" style={{ height: 80, width: 400 }}  name="sampleNotes" placeholder="Sample Notes" onChange={this.handleChange} value={this.state.sampleNotes} /></td>
  </tr>

  </tbody>
  </Table>

</Col>
                  </Row>

                  <Row>
                  <Col xs={10} sm={10} md={10}>
            <Button onClick={this.handleSubmit} bsStyle="primary">Add sample</Button>
            </Col></Row>
            <hr></hr>
          </form>
        </section>

        </Col>
        </Row>

        </Grid>
      </Tab>
      <Tab eventKey={4} >
        <Grid>
          <Row>
            <Col xs={10} md={10}>
        <section className='add-item'>
          <form onSubmit={this.writeData}>
            <Row>
              <Col xs={4} sm={4} md={4}>
                <h2>Monthly Sample Log</h2>
                </Col>

                </Row>
                <hr></hr>
                <Row>
                  <Col xs={8} sm={8} md={8}>

  <Table striped bordered condensed hover>
  <thead>
  <tr>
  <th>Description</th>
  <th>Results</th>

  </tr>
  </thead>
  <tbody>
  <tr>
  <td>Date</td>
  <td><input type="date" name="sampleDate" placeholder="Date of Sample" onChange={this.handleChange} value={this.state.sampleDate} /></td>
  </tr>
  <tr>
  <td>Name</td>
  <td><input type="text" name="sampleTaker" placeholder="Your Name" onChange={this.handleChange} value={this.state.sampleTaker} /></td>
  </tr>
  <tr>
  <td>Water Temperature</td>
  <td><input type="number" name="temp" placeholder="Temp of Sample" onChange={this.handleChange} value={this.state.temp} /></td>
  </tr>
  <tr>
  <td>DO</td>
  <td><input type="number" name="do" placeholder="Dissolved Oxygen" onChange={this.handleChange} value={this.state.do} /></td>
  </tr>
  <tr>
  <td>Conductivity</td>
  <td><input type="number" name="conductivity" placeholder="Conductivity" onChange={this.handleChange} value={this.state.conductivity} /></td>
  </tr>
  <tr>
  <td>Total Dissolved Solids</td>
  <td><input type="number" name="tds" placeholder="Total Dissolved Solids" onChange={this.handleChange} value={this.state.tds} /></td>
  </tr>
  <tr>
  <td>Salinity</td>
  <td><input type="number" name="salinity" placeholder="Salinity" onChange={this.handleChange} value={this.state.salinity} /></td>
  </tr>
  <tr>
  <td>pH</td>
  <td><input type="number" name="pH" placeholder="pH" onChange={this.handleChange} value={this.state.pH} /></td>
  </tr>
  <tr>
  <td>Turbidity</td>
  <td><input type="number" name="turbidity" placeholder="Turbidity" onChange={this.handleChange} value={this.state.turbidity} /></td>
  </tr>
  <tr>
  <td>Total Nitrogen</td>
  <td><input type="number" name="nitrogen" placeholder="Total Nitrogen" onChange={this.handleChange} value={this.state.nitrogen} /></td>
  </tr>
  <tr>
  <td>Total Phosphorus</td>
  <td><input type="number" name="phosphorus" placeholder="Total Phosphorus" onChange={this.handleChange} value={this.state.phosphorus} /></td>
  </tr>
  <tr>
  <td>Total Hardness</td>
  <td><input type="number" name="totalHardness" placeholder="Total Hardness" onChange={this.handleChange} value={this.state.totalHardness} /></td>
  </tr>
  <tr>
  <td>Total Suspended Solids</td>
  <td><input type="number" name="tss" placeholder="Total Suspended Solids" onChange={this.handleChange} value={this.state.tss} /></td>
  </tr>
  <tr>
  <td>Sample Notes</td>
  <td><input  type="textArea" style={{ height: 80, width: 400 }}  name="sampleNotes" placeholder="Sample Notes" onChange={this.handleChange} value={this.state.sampleNotes} /></td>
  </tr>


  </tbody>
  </Table>

</Col>
                  </Row>

                  <Row>
                  <Col xs={10} sm={10} md={10}>
            <Button onClick={this.writeData} bsStyle="primary">Overwrite sample</Button>
            </Col></Row>
            <hr></hr>
          </form>

        </section>

        </Col>
        </Row>

        </Grid>
      </Tab>




    </Tabs>


    </Col>
    </Row>
    </Grid>

    </div>
        )
            }
          }
