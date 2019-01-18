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


import { LineChart, LabelList, ResponsiveContainer, ReferenceArea, AreaChart, Brush, Area, Line, XAxis, YAxis, BarChart, Bar, CartesianGrid, Tooltip, Legend, Label} from 'recharts';

import { Row, Col, Tabs, Card, Drawer, Menu, Icon, Button, Layout, Carousel } from 'antd';

const TabPane = Tabs.TabPane;

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
          checkboxStatedo: true,




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

          //for drawers
          visible: false,
          visible1: false,




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
          visible1: true,
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



  fillEmpty = (itemId) => {
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

      visible: true,
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

  this.setState({
    visible1: false,
  })






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
  if (order === 'asc') {
    return a.nitrogen - b.nitrogen;
  } else {
    return b.nitrogen - a.nitrogen;
  }
}
phosphorusSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.phosphorus - b.phosphorus;
 } else {
   return b.phosphorus - a.phosphorus;
 }
}
tdsSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.tds - b.tds;
 } else {
   return b.tds - a.tds;
 }
}
tssSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.tss - b.tss;
 } else {
   return b.tss - a.tss;
 }
}
salinitySort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.salinity - b.salinity;
 } else {
   return b.salinity - a.salinity;
 }
}
turbiditySort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.turbidity - b.turbidity;
 } else {
   return b.turbidity - a.turbidity;
 }
}
pHSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.pH - b.pH;
 } else {
   return b.pH - a.pH;
 }
}
hardnessSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.totalHardness - b.totalHardness;
 } else {
   return b.totalHardness - a.totalHardness;
 }
}
tempSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.temp - b.temp;
 } else {
   return b.temp - a.temp;
 }
}
doSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.do - b.do;
 } else {
   return b.do - a.do;
 }
}
conductivitySort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.conductivity - b.conductivity;
 } else {
   return b.conductivity - a.conductivity;
 }
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













      render() {
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
    defaultChecked='true'
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
      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
        <h1><b>Monthly Samples</b></h1>
        <h3><b>Summer Lake Homeowners Association</b></h3>
      </Col>
      <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{ textAlign: 'right'}}>
    <Button size="large" type="primary" onClick={() => this.fillEmpty()}>+ Add Sample</Button>
      <Drawer
        title= "Fill in Sample Form"
        placement={this.state.placement}
        closable={false}
        onClose={this.onClose}
        visible={this.state.visible}
        width={500}
      >
      <form>
        <Row style={{textAlign: 'right'}}>
        <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Sample</Icon>
        </Row>
        <Row>
  <FormGroup>
    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Sample Date</b></Col>
    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
    <FormControl name="sampleDate" onChange={this.handleChange} type="date" placeholder="Normal text" value={this.state.sampleDate} /></Col>
  </FormGroup>
  </Row>
  <Row style={{paddingTop: '10px'}}>
  <FormGroup>
    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Sample Taker</b></Col>
    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
    <FormControl name="sampleTaker" onChange={this.handleChange} type="text" placeholder="Sample Taker" value={this.state.sampleTaker} /></Col>
  </FormGroup>
</Row>
<Row style={{paddingTop: '10px'}}>
<FormGroup>
  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Water Temp</b></Col>
  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
  <FormControl name="temp" onChange={this.handleChange} type="number" placeholder="Water Temperature" value={this.state.temp} /></Col>
</FormGroup>
</Row>
<Row style={{paddingTop: '10px'}}>
<FormGroup>
  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Dissolved O<sub>2</sub></b></Col>
  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
  <FormControl name="do" onChange={this.handleChange} type="number" placeholder="Dissolved Oxygen" value={this.state.do} /></Col>
</FormGroup>
</Row>
<Row style={{paddingTop: '10px'}}>
<FormGroup>
  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Conductivity</b></Col>
  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
  <FormControl name="conductivity" onChange={this.handleChange} type="number" placeholder="Conductivity" value={this.state.conductivity} /></Col>
</FormGroup>
</Row>
<Row style={{paddingTop: '10px'}}>
<FormGroup>
  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>TDS</b></Col>
  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
  <FormControl name="tds" onChange={this.handleChange} type="number" placeholder="TDS" value={this.state.tds} /></Col>
</FormGroup>
</Row>
<Row style={{paddingTop: '10px'}}>
<FormGroup>
  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Salinity</b></Col>
  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
  <FormControl name="salinity" onChange={this.handleChange} type="number" placeholder="Salinity" value={this.state.salinity} /></Col>
</FormGroup>
</Row>
<Row style={{paddingTop: '10px'}}>
<FormGroup>
  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>pH</b></Col>
  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
  <FormControl name="pH" onChange={this.handleChange} type="number" placeholder="pH" value={this.state.pH} /></Col>
</FormGroup>
</Row>
<Row style={{paddingTop: '10px'}}>
<FormGroup>
  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Turbidity</b></Col>
  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
  <FormControl name="turbidity" onChange={this.handleChange}type="number" placeholder="Turbidity" value={this.state.turbidity} /></Col>
</FormGroup>
</Row>
<Row style={{paddingTop: '10px'}}>
<FormGroup>
  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Total Nitrogen</b></Col>
  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
  <FormControl name="nitrogen" onChange={this.handleChange}type="number" placeholder="Total Nitrogen" value={this.state.nitrogen} /></Col>
</FormGroup>
</Row>
<Row style={{paddingTop: '10px'}}>
<FormGroup>
  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Total Phosphorus</b></Col>
  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
  <FormControl name="phosphorus" onChange={this.handleChange} type="number" placeholder="Total Phosphorus" value={this.state.phosphorus} /></Col>
</FormGroup>
</Row>
<Row style={{paddingTop: '10px'}}>
<FormGroup>
  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Total Hardness</b></Col>
  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
  <FormControl name="totalHardness" onChange={this.handleChange} type="number" placeholder="Total Hardness" value={this.state.totalHardness} /></Col>
</FormGroup>
</Row>
<Row style={{paddingTop: '10px'}}>
<FormGroup>
  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>TSS</b></Col>
  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
  <FormControl name="tss" onChange={this.handleChange} type="number" placeholder="TSS" value={this.state.tss} /></Col>
</FormGroup>
</Row>
<Row style={{paddingTop: '10px'}}>
<FormGroup>
  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Sample Notes</b></Col>
  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
  <FormControl name="sampleNotes" onChange={this.handleChange} type="textarea" placeholder="Sample Notes" value={this.state.sampleNotes} /></Col>
</FormGroup>
</Row>



<Row style={{paddingTop: '10px', textAlign: 'right'}}>
<Button type="primary" onClick={this.handleSubmit} bsStyle="primary">Add sample</Button>
</Row>





</form>



      </Drawer>

      <Drawer
        title= "Edit Sample"
        placement={this.state.placement}
        closable={false}
        onClose={this.onClose1}
        visible={this.state.visible1}
        width={500}
      >
        <form>
          <Row style={{textAlign: 'right'}}>
          <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose1()}>+ Add Sample</Icon>
          </Row>
          <Row>
    <FormGroup>
      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Sample Date</b></Col>
      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
      <FormControl name="sampleDate" onChange={this.handleChange} type="date" placeholder="Normal text" value={this.state.sampleDate} /></Col>
    </FormGroup>
    </Row>
    <Row style={{paddingTop: '10px'}}>
    <FormGroup>
      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Sample Taker</b></Col>
      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
      <FormControl name="sampleTaker" onChange={this.handleChange} type="text" placeholder="Sample Taker" value={this.state.sampleTaker} /></Col>
    </FormGroup>
  </Row>
  <Row style={{paddingTop: '10px'}}>
  <FormGroup>
    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Water Temp</b></Col>
    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
    <FormControl name="temp" onChange={this.handleChange} type="number" placeholder="Water Temperature" value={this.state.temp} /></Col>
  </FormGroup>
  </Row>
  <Row style={{paddingTop: '10px'}}>
  <FormGroup>
    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Dissolved O<sub>2</sub></b></Col>
    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
    <FormControl name="do" onChange={this.handleChange} type="number" placeholder="Dissolved Oxygen" value={this.state.do} /></Col>
  </FormGroup>
  </Row>
  <Row style={{paddingTop: '10px'}}>
  <FormGroup>
    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Conductivity</b></Col>
    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
    <FormControl name="conductivity" onChange={this.handleChange} type="number" placeholder="Conductivity" value={this.state.conductivity} /></Col>
  </FormGroup>
  </Row>
  <Row style={{paddingTop: '10px'}}>
  <FormGroup>
    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>TDS</b></Col>
    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
    <FormControl name="tds" onChange={this.handleChange} type="number" placeholder="TDS" value={this.state.tds} /></Col>
  </FormGroup>
  </Row>
  <Row style={{paddingTop: '10px'}}>
  <FormGroup>
    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Salinity</b></Col>
    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
    <FormControl name="salinity" onChange={this.handleChange} type="number" placeholder="Salinity" value={this.state.salinity} /></Col>
  </FormGroup>
  </Row>
  <Row style={{paddingTop: '10px'}}>
  <FormGroup>
    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>pH</b></Col>
    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
    <FormControl name="pH" onChange={this.handleChange} type="number" placeholder="pH" value={this.state.pH} /></Col>
  </FormGroup>
  </Row>
  <Row style={{paddingTop: '10px'}}>
  <FormGroup>
    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Turbidity</b></Col>
    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
    <FormControl name="turbidity" onChange={this.handleChange}type="number" placeholder="Turbidity" value={this.state.turbidity} /></Col>
  </FormGroup>
  </Row>
  <Row style={{paddingTop: '10px'}}>
  <FormGroup>
    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Total Nitrogen</b></Col>
    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
    <FormControl name="nitrogen" onChange={this.handleChange}type="number" placeholder="Total Nitrogen" value={this.state.nitrogen} /></Col>
  </FormGroup>
  </Row>
  <Row style={{paddingTop: '10px'}}>
  <FormGroup>
    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Total Phosphorus</b></Col>
    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
    <FormControl name="phosphorus" onChange={this.handleChange} type="number" placeholder="Total Phosphorus" value={this.state.phosphorus} /></Col>
  </FormGroup>
  </Row>
  <Row style={{paddingTop: '10px'}}>
  <FormGroup>
    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Total Hardness</b></Col>
    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
    <FormControl name="totalHardness" onChange={this.handleChange} type="number" placeholder="Total Hardness" value={this.state.totalHardness} /></Col>
  </FormGroup>
  </Row>
  <Row style={{paddingTop: '10px'}}>
  <FormGroup>
    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>TSS</b></Col>
    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
    <FormControl name="tss" onChange={this.handleChange} type="number" placeholder="TSS" value={this.state.tss} /></Col>
  </FormGroup>
  </Row>
  <Row style={{paddingTop: '10px'}}>
  <FormGroup>
    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Sample Notes</b></Col>
    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
    <FormControl name="sampleNotes" onChange={this.handleChange} type="textarea" placeholder="Sample Notes" value={this.state.sampleNotes} /></Col>
  </FormGroup>
  </Row>



  <Row style={{paddingTop: '10px', textAlign: 'right'}}>
  <Button type="primary" onClick={this.writeData} bsStyle="primary">Overwrite Sample</Button>
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
            <Tabs defaultActiveKey="1" >
        <TabPane tab="GRAPHS" key="1">
          <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Row>

          <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{paddingTop: '20px'}}>

              <p style={{lineHeight: '2px', paddingLeft: '55px', fontSize: '32px'}}><b>NITROGEN AND PHOSPHORUS</b></p>


        </Col>
      </Row>

          <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <ResponsiveContainer width="100%" aspect={8/3.0} minHeight={200}>
              <AreaChart data={this.state.orders2}
        syncId="anyId">
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
        <YAxis domain={[0, 5]}/>
        <Tooltip />

        <Area type="monotone" dataKey="nitrogen" stroke="#086788" fillOpacity={1} fill="url(#colorUv)" ><LabelList dataKey="nitrogen" position="top" /></Area>
        <Area type="monotone" dataKey="phosphorus" stroke="#F0C808" fillOpacity={1} fill="url(#colorPv)"><LabelList dataKey="phosphorus" position="top" /></Area>
        <Legend />
        <Brush></Brush>
      </AreaChart>
       </ResponsiveContainer>

      </Col>
      </Row>
      <Row>
      <Col span={24}>
      <hr></hr>
      </Col>
      </Row>


      <Row>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Row>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{paddingTop: '15px'}}>
          <p style={{lineHeight: '2px', paddingLeft: '55px', fontSize: '32px'}}><b>SALINITY</b></p>

    </Col>
  </Row>

      <Row>
      <Col span={24}>
        <ResponsiveContainer width="100%" aspect={5/3.0} minHeight={200}>
          <BarChart data={this.state.orders2}

    syncId="anyId"
    >
    <defs>
      <linearGradient id="colorSalinity" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#9EC1A3" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#9EC1A3" stopOpacity={0.3}/>
      </linearGradient>

    </defs>
    <XAxis dataKey="sampleDate" />
    <YAxis />
    <Tooltip />


    <Bar barSize={15} type="monotone" dataKey="salinity" stroke="#9EC1A3" fillOpacity={1} fill="url(#colorSalinity)" ><LabelList style={{fontSize:'12px'}} dataKey="salinity" position="top" /></Bar>

    <Legend />
  </BarChart>
   </ResponsiveContainer>

  </Col>
  </Row>
</Col>

  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
    <Row>
<Col xs={24} sm={24} md={24} lg={24} xl={24} style={{paddingTop: '15px'}}>
    <p style={{lineHeight: '2px', paddingLeft: '55px', fontSize: '32px'}}><b>TDS</b></p>

</Col>
</Row>

<Row>
<Col span={24}>
  <ResponsiveContainer width="100%" aspect={5/3.0} minHeight={200}>
    <BarChart data={this.state.orders2}

syncId="anyId"
>
<defs>
<linearGradient id="colorTDS" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor="#DC965A" stopOpacity={0.8}/>
  <stop offset="95%" stopColor="#DC965A" stopOpacity={0.3}/>
</linearGradient>

</defs>
<XAxis dataKey="sampleDate" />
<YAxis />
<Tooltip />


<Bar barSize={15} type="monotone" dataKey="tds" stroke="#DC965A" fillOpacity={1} fill="url(#colorTDS)" ><LabelList style={{fontSize:'12px'}} dataKey="tds" position="top" /></Bar>

<Legend />
</BarChart>
</ResponsiveContainer>

</Col>
</Row>
</Col>
</Row>


<Row>
  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
    <Row>
<Col xs={24} sm={24} md={24} lg={24} xl={24} style={{paddingTop: '15px'}}>
    <p style={{lineHeight: '2px', paddingLeft: '55px', fontSize: '32px'}}><b>TSS</b></p>

</Col>
</Row>

<Row>
<Col span={24}>
  <ResponsiveContainer width="100%" aspect={5/3.0} minHeight={200}>
    <LineChart data={this.state.orders2}

syncId="anyId"
>

<XAxis dataKey="sampleDate" />
<YAxis />
<Tooltip />


<Line strokeWidth={3} type="monotone" dataKey="tss" stroke="#22333B" ><LabelList style={{fontSize:'12px'}} dataKey="tss" position="top" /></Line>

<Legend />
</LineChart>
</ResponsiveContainer>

</Col>
</Row>
</Col>

<Col xs={24} sm={12} md={12} lg={12} xl={12}>
<Row>
<Col xs={24} sm={24} md={24} lg={24} xl={24} style={{paddingTop: '15px'}}>
<p style={{lineHeight: '2px', paddingLeft: '55px', fontSize: '32px'}}><b>TURBIDITY</b></p>

</Col>
</Row>

<Row>
<Col span={24}>
<ResponsiveContainer width="100%" aspect={5/3.0} minHeight={200}>
<LineChart data={this.state.orders2}

syncId="anyId"
>

<XAxis dataKey="sampleDate" />
<YAxis domain={[0,50]}/>
<Tooltip />


<Line strokeWidth={3} type="monotone" dataKey="turbidity" stroke="#89A7A7" ><LabelList style={{fontSize:'12px'}} dataKey="turbidity" position="top" /></Line>

<Legend />
</LineChart>
</ResponsiveContainer>

</Col>
</Row>
</Col>
</Row>









      </Col>
    </Row>

        </TabPane>
        <TabPane tab="DATA TABLE" key="2">
          <Row>
          <Col span={24} style={{paddingTop: '15px'}}>

              <p style={{lineHeight: '2px'}}><b>DATA TABLE</b></p>

              <hr></hr>
        </Col>
      </Row>

          <Row>
          <Col span={24}>
            <BootstrapTable
            data={ this.state.dataList }
            options={options}
            exportCSV
            pagination



            >

            <TableHeaderColumn width='130px' dataField='sampleDate' isKey filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Sample Date</TableHeaderColumn>
            <TableHeaderColumn width='130px' dataField='temp' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.tempSort }>Temperature</TableHeaderColumn>
            <TableHeaderColumn width='130px' dataField='do' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.doSort }>Dissolved O<sub>2</sub></TableHeaderColumn>
            <TableHeaderColumn width='130px' dataField='conductivity' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.conductivitySort }>Conductivity</TableHeaderColumn>
            <TableHeaderColumn width='130px' dataField='tds' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.tdsSort }>TDS</TableHeaderColumn>
            <TableHeaderColumn width='130px' dataField='salinity' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.salinitySort }>Salinity</TableHeaderColumn>
            <TableHeaderColumn width='130px' dataField='nitrogen' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.nitrogenSort }>Total Nitrogen</TableHeaderColumn>
            <TableHeaderColumn width='145px' dataField='phosphorus' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.phosphorusSort }>Total Phosphorus</TableHeaderColumn>
            <TableHeaderColumn width='130px' dataField='totalHardness' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.hardnessSort }>Hardness</TableHeaderColumn>
            <TableHeaderColumn width='130px' dataField='tss' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort sortFunc={ this.tssSort }>TSS</TableHeaderColumn>

            <TableHeaderColumn
            dataField='button'
            dataFormat={this.editRow.bind(this)}
            width='80px'
            >Edit</TableHeaderColumn>

            <TableHeaderColumn
              dataField='button'
              dataFormat={this.deleteRow.bind(this)}
              width='80px'
              >Delete</TableHeaderColumn>


            </BootstrapTable>

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
