import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button, ResponsiveEmbed, ButtonToolbar, Form, Grid, Row, FormGroup, Tab, Radio, Tabs, Col, Table, Popover, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import { PDFExport } from '@progress/kendo-react-pdf';
import { fire } from '../fire';

import {BootstrapTable, BootstrapButton, TableHeaderColumn, ExportCSVButton} from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiPencil, TiTrash } from "react-icons/ti";

import domtoimage from 'dom-to-image';
import fileDownload from "js-file-download";


import { LineChart, ReferenceArea, AreaChart, Brush, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';













const styles = {
  topPad: {
    paddingTop: "20px"
  },
};

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: .8
        }}
    />
);



export default class vendorContacts extends Component {


    constructor(props) {
        super(props);
        this.state = {



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

          id: '',
          key: 1,
          idKey: '',
          page: '',
          area: '',



          samples: [],
          orders: [],
          orders2: [],
          dataList: [],
          filter: "",
          blobUrl: null,

          ammoniaPlot: 'ammoniaResult',






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




          console.log(this.state.dataList);





        });

      });


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


    })


});
  });
}

  createNewWorkOrder (itemId) {

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

        });
      }
      this.setState({

        id: snapshot.child('id').val(),
        key: 3,

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
  }

  samplesRef.child(this.state.id).set(sample);






  //this.setState is used to clear the text boxes after the form has been submitted.

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







 DOSort = (a, b, order) => {
   let dataList = this.state.dataList;   // order is desc or asc
  if (order === 'desc') {
    return a.DOResult - b.DOResult;
  } else {
    return b.DOResult - a.DOResult;
  }
}



editRow(row, isSelected, e, id) {
  console.log(`${isSelected.id}`);
  return (
    <TiPencil type="button"
    onClick={() => this.fillStates(`${isSelected.id}`)}>
      Click me
    </TiPencil>
  )
}

deleteRow(row, isSelected, e, id) {
  console.log(`${isSelected.id}`);
  return (
    <TiTrash type="button"
    onClick={() => this.removesample(`${isSelected.id}`)}>
      Click me
    </TiTrash>
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
//...












      render() {
        function buttonFormatter(cell, row){
  return '<BootstrapButton type="submit"></BootstrapButton>';
}
const options = {
  exportCSVBtn: this.createCustomExportCSVButton
};




        return (
    <div>

      <Grid>
        <Row>
          <Row>
            <Col xs={6} md={6}>
          <h3>Maintenance Reports</h3>

          </Col>
          <Col xs={6} md={6}>
            <ButtonToolbar style={styles.topPad}>
          <Button  onClick={() => this.fillEmpty()} eventKey={3} bsSize="large">+ Create Maintenance Report</Button>
        </ButtonToolbar>
          </Col>
          </Row>
          <Col xs={12} sm={10} md={10}>


      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} defaultActiveKey={1} id="uncontrolled-tab-example">



        <Tab eventKey={1} title="+ Maintenance Reports">
          <Grid>

          <Row style={styles.topPad}>



            <Col xs={10} sm={10} md={10} lg={10}>


              <BootstrapTable
              data={ this.state.dataList }
              options={options}
              exportCSV
              pagination


              >

              <TableHeaderColumn width='110px' dataField='sampleDate' isKey filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Sample Date</TableHeaderColumn>
              <TableHeaderColumn dataField='temp' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Temperature</TableHeaderColumn>
              <TableHeaderColumn dataField='do' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Dissolved Oxygen</TableHeaderColumn>
              <TableHeaderColumn dataField='conductivity' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Conductivity</TableHeaderColumn>
              <TableHeaderColumn dataField='tds' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Total Dissolved Solids</TableHeaderColumn>
              <TableHeaderColumn dataField='salinity' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Salinity</TableHeaderColumn>
                <TableHeaderColumn dataField='nitrogen' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Total Nitrogen</TableHeaderColumn>
                  <TableHeaderColumn dataField='phosphorus' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Total Phosphorus</TableHeaderColumn>
                    <TableHeaderColumn dataField='totalHardness' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Hardness</TableHeaderColumn>
                      <TableHeaderColumn dataField='tss' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>TSS</TableHeaderColumn>

        <TableHeaderColumn
              dataField='button'
              dataFormat={this.editRow.bind(this)}
              >Edit</TableHeaderColumn>

          <TableHeaderColumn
                dataField='button'
                dataFormat={this.deleteRow.bind(this)}
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
  <th>Item</th>
  <th>Description</th>


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

                      <hr></hr>
                <button>Add sample</button>
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



</Col>
                  </Row>

                      <hr></hr>
                      <button>Overwrite Data</button>

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
