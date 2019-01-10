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
  bottomPad: {
    paddingBottom: "40px"
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



export default class maintenanceReports extends Component {


    constructor(props) {
        super(props);
        this.state = {


          //Inputs for Maintenance Report
          maintenanceDate: '',
          maintenanceWorker: '',
          mechanicalEquipmentNotes: '',
          electricalEquipmentNotes: '',
          aquaticVegetationNotes: '',
          shorelineNotes: '',
          miscNotes: '',

          //Misc. for chaing taps and id's
          id: '',
          key: 1,
          idKey: '',
          page: '',
          area: '',

          //used for table data
          samples: [],
          orders: [],
          orders2: [],
          dataList: [],
          filter: "",
          blobUrl: null,








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
        const samplesRef = fire.database().ref(`maintenanceReport/${user.uid}`);
        const orderID = fire.database().ref(`/maintenanceReport/${user.uid}/${orderID}`);


        const maintenanceReport = {

          maintenanceDate: this.state.maintenanceDate,
          maintenanceWorker: this.state.maintenanceWorker,
          mechanicalEquipmentNotes: this.state.mechanicalEquipmentNotes,
          electricalEquipmentNotes: this.state.electricalEquipmentNotes,
          aquaticVegetationNotes: this.state.aquaticVegetationNotes,
          shorelineNotes: this.state.shorelineNotes,
          miscNotes: this.state.miscNotes,

          id: this.state.id,
        }




        samplesRef.push(maintenanceReport);
        //this.setState is used to clear the text boxes after the form has been submitted.
        this.setState({
          maintenanceDate: '',
          maintenanceWorker: '',
          mechanicalEquipmentNotes: '',
          electricalEquipmentNotes: '',
          aquaticVegetationNotes: '',
          shorelineNotes: '',
          miscNotes: '',



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
          const samplesRef = fire.database().ref(`maintenanceReport/${user.uid}`);
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
              maintenanceDate: orders[order].maintenanceDate,
              maintenanceWorker: orders[order].maintenanceWorker,
              mechanicalEquipmentNotes: orders[order].mechanicalEquipmentNotes,
              electricalEquipmentNotes: orders[order].electricalEquipmentNotes,
              aquaticVegetationNotes: orders[order].aquaticVegetationNotes,
              shorelineNotes: orders[order].shorelineNotes,
              miscNotes: orders[order].miscNotes,
            });





          }

          newState2.sort(function(a, b) {

            if (a.sampleDate === b.sampleDate) {
              return 0;
            }
            return a.sampleDate > b.sampleDate ? 1 : -1;
        });
        newState.sort(function(a, b) {

          if (b.maintenanceDate === a.maintenanceDate) {
            return 0;
          }
          return b.maintenanceDate > a.maintenanceDate ? 1 : -1;
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
      const sampleRef = fire.database().ref(`/maintenanceReport/${user.uid}/${itemId}`);

      sampleRef.on('value', (snapshot) => {

        this.setState({
          maintenanceDate: '',
          maintenanceWorker: '',
          mechanicalEquipmentNotes: '',
          electricalEquipmentNotes: '',
          aquaticVegetationNotes: '',
          shorelineNotes: '',
          miscNotes: '',

        });

      let orders = snapshot.val();
      let id = fire.database().ref().child(`/maintenanceReport/${user.uid}/${itemId}`).key;

      let newState = [];
      for (let order in orders) {
        newState.push({
          id: order,
          maintenanceDate: orders[order].maintenanceDate,
          maintenanceWorker: orders[order].maintenanceWorker,
          mechanicalEquipmentNotes: orders[order].mechanicalEquipmentNotes,
          electricalEquipmentNotes: orders[order].electricalEquipmentNotes,
          aquaticVegetationNotes: orders[order].aquaticVegetationNotes,
          shorelineNotes: orders[order].shorelineNotes,
          miscNotes: orders[order].miscNotes,

        });
      }
      this.setState({

        id: id,
        key: 4,


        maintenanceDate: snapshot.child('maintenanceDate').val(),
        maintenanceWorker: snapshot.child('maintenanceWorker').val(),
        mechanicalEquipmentNotes: snapshot.child('mechanicalEquipmentNotes').val(),
        electricalEquipmentNotes: snapshot.child('electricalEquipmentNotes').val(),
        aquaticVegetationNotes: snapshot.child('aquaticVegetationNotes').val(),
        shorelineNotes: snapshot.child('shorelineNotes').val(),
        miscNotes: snapshot.child('miscNotes').val(),


      })

});

    });
  }


  writeStates = (itemId) => {

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/maintenanceReport/${user.uid}/${this.state.id}`);


    sampleRef.child("id").set(this.state.id);



    sampleRef.child("maintenanceDate").set(this.state.sampleDate);
    sampleRef.child("maintenanceWorker").set(this.state.sampleDate);
    sampleRef.child("mechanicalEquipmentNotes").set(this.state.sampleDate);
    sampleRef.child("electricalEquipmentNotes").set(this.state.sampleDate);
    sampleRef.child("aquaticVegetationNotes").set(this.state.sampleDate);
    sampleRef.child("shorelineNotes").set(this.state.sampleDate);
    sampleRef.child("miscNotes").set(this.state.sampleDate);

    });
  }



  fillEmpty(itemId) {
    let area = '';
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/maintenanceReport/${user.uid}/${itemId}`);


    sampleRef.on('value', (snapshot) => {

    let orders = snapshot.val();

    let newState = [];
    for (let order in orders) {
      newState.push({
        id: order,

        maintenanceDate: orders[order].maintenanceDate,
        maintenanceWorker: orders[order].maintenanceWorker,
        mechanicalEquipmentNotes: orders[order].mechanicalEquipmentNotes,
        electricalEquipmentNotes: orders[order].electricalEquipmentNotes,
        aquaticVegetationNotes: orders[order].aquaticVegetationNotes,
        shorelineNotes: orders[order].shorelineNotes,
        miscNotes: orders[order].miscNotes,

      });
    }
            this.setState({

              id: '',
              key: 3,
              maintenanceDate: '',
              maintenanceWorker: '',
              mechanicalEquipmentNotes: '',
              electricalEquipmentNotes: '',
              aquaticVegetationNotes: '',
              shorelineNotes: '',
              miscNotes: '',
            })
        });
  });
}

  createNewWorkOrder (itemId) {

      let area = '';
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const sampleRef = fire.database().ref(`/maintenanceReport/${user.uid}/${itemId}`);

      sampleRef.on('value', (snapshot) => {

      let orders = snapshot.val();

      let newState = [];
      for (let order in orders) {
        newState.push({
          id: order,

          maintenanceDate: orders[order].maintenanceDate,
          maintenanceWorker: orders[order].maintenanceWorker,
          mechanicalEquipmentNotes: orders[order].mechanicalEquipmentNotes,
          electricalEquipmentNotes: orders[order].electricalEquipmentNotes,
          aquaticVegetationNotes: orders[order].aquaticVegetationNotes,
          shorelineNotes: orders[order].shorelineNotes,
          miscNotes: orders[order].miscNotes,

        });
      }
      this.setState({

        id: snapshot.child('id').val(),
        key: 3,

        maintenanceDate: snapshot.child('maintenanceDate').val(),
        maintenanceWorker: snapshot.child('maintenanceWorker').val(),
        mechanicalEquipmentNotes: snapshot.child('mechanicalEquipmentNotes').val(),
        electricalEquipmentNotes: snapshot.child('electricalEquipmentNotes').val(),
        aquaticVegetationNotes: snapshot.child('aquaticVegetationNotes').val(),
        shorelineNotes: snapshot.child('shorelineNotes').val(),
        miscNotes: snapshot.child('miscNotes').val(),

      })

});
    });




  }

    removesample(itemId) {
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const sampleRef = fire.database().ref(`/maintenanceReport/${user.uid}/${itemId}`);
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
  const samplesRef = fire.database().ref(`maintenanceReport/${user.uid}`);
  const orderID = fire.database().ref(`/maintenanceReport/${user.uid}/${this.state.id}`);
  const newCheckboxKey = firebase.database().ref().child('checkbox').push().key;

  let id = newCheckboxKey;
  let box = id;


  const maintenanceReport = {

    maintenanceDate: this.state.maintenanceDate,
    maintenanceWorker: this.state.maintenanceWorker,
    mechanicalEquipmentNotes: this.state.mechanicalEquipmentNotes,
    electricalEquipmentNotes: this.state.electricalEquipmentNotes,
    aquaticVegetationNotes: this.state.aquaticVegetationNotes,
    shorelineNotes: this.state.shorelineNotes,
    miscNotes: this.state.miscNotes,
  }

  samplesRef.child(this.state.id).set(maintenanceReport);






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
    <TiPencil size={20} type="button"
    onClick={() => this.fillStates(`${isSelected.id}`)}>
      Click me
    </TiPencil>
  )
}

deleteRow(row, isSelected, e, id) {
  console.log(`${isSelected.id}`);
  return (
    <TiTrash size={20} type="button"
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
          <Button bsStyle="primary"  onClick={() => this.fillEmpty()} eventKey={3} bsSize="large">+ Create Maintenance Report</Button>
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
              data={ this.state.orders }
              options={options}
              exportCSV
              pagination


              >

              <TableHeaderColumn dataField='maintenanceDate' isKey filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Maintenance Date</TableHeaderColumn>

              <TableHeaderColumn dataField='mechanicalEquipmentNotes' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Mechanical Notes</TableHeaderColumn>
              <TableHeaderColumn dataField='electricalEquipmentNotes' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Electrical Notes</TableHeaderColumn>
              <TableHeaderColumn dataField='aquaticVegetationNotes' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Aquatic Vegetation Notes</TableHeaderColumn>
              <TableHeaderColumn dataField='shorelineNotes' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Shoreline Notes</TableHeaderColumn>
              <TableHeaderColumn dataField='miscNotes' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Miscellaneous Notes</TableHeaderColumn>

        <TableHeaderColumn
              width={45}
              dataField='button'
              dataFormat={this.editRow.bind(this)}
              >Edit</TableHeaderColumn>

          <TableHeaderColumn
                width={45}
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
                <h2>Maintenance Report</h2>
                </Col>

                </Row>
                <hr></hr>
                <Row>
                  <Col xs={10} sm={10} md={10}>

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
  <td><input type="date" name="maintenanceDate" placeholder="Date of Maintenance" onChange={this.handleChange} value={this.state.maintenanceDate} /></td>
  </tr>
  <tr>
  <td>Name</td>
  <td><input type="text" name="maintenanceWorker" placeholder="Your Name" onChange={this.handleChange} value={this.state.maintenanceWorker} /></td>
  </tr>
  <tr>
  <td>Mechanical Equipment Notes</td>
  <td><input  type="textArea" style={{ height: 80, width: 600 }}  name="mechanicalEquipmentNotes" placeholder="Mechanical Notes" onChange={this.handleChange} value={this.state.mechanicalEquipmentNotes} /></td>
  </tr>
  <tr>
  <td>Electrical Equipment Notes</td>
  <td><input  type="textArea" style={{ height: 80, width: 600 }}  name="electricalEquipmentNotes" placeholder="Electrical Notes" onChange={this.handleChange} value={this.state.electricalEquipmentNotes} /></td>
  </tr>
  <tr>
  <td>Aquatic Vegetation Notes</td>
  <td><input  type="textArea" style={{ height: 80, width: 600 }}  name="aquaticVegetationNotes" placeholder="Aquatic Vegetation Notes" onChange={this.handleChange} value={this.state.aquaticVegetationNotes} /></td>
  </tr>
  <tr>
  <td>Shoreline Notes</td>
  <td><input  type="textArea" style={{ height: 80, width: 600 }}  name="shorelineNotes" placeholder="Shoreline Notes" onChange={this.handleChange} value={this.state.shorelineNotes} /></td>
  </tr>
  <tr>
  <td>Miscellaneous Notes</td>
  <td><input  type="textArea" style={{ height: 80, width: 600 }}  name="miscNotes" placeholder="Misc. Notes" onChange={this.handleChange} value={this.state.miscNotes} /></td>
  </tr>


  </tbody>
  </Table>

</Col>
                  </Row>


                      <Row>
                      <Col xs={10} sm={10} md={10}>
                <Button bsStyle="primary">Add sample</Button>
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
                <h2>Maintenance Report</h2>
                </Col>

                </Row>
                <hr></hr>
                <Row>
                  <Col xs={10} sm={10} md={10}>

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
  <td><input type="date" name="maintenanceDate" placeholder="Date of Maintenance" onChange={this.handleChange} value={this.state.maintenanceDate} /></td>
  </tr>
  <tr>
  <td>Name</td>
  <td><input type="text" name="maintenanceWorker" placeholder="Your Name" onChange={this.handleChange} value={this.state.maintenanceWorker} /></td>
  </tr>
  <tr>
  <td>Mechanical Equipment Notes</td>
  <td><input  type="textArea" style={{ height: 80, width: 600 }}  name="mechanicalEquipmentNotes" placeholder="Mechanical Notes" onChange={this.handleChange} value={this.state.mechanicalEquipmentNotes} /></td>
  </tr>
  <tr>
  <td>Electrical Equipment Notes</td>
  <td><input  type="textArea" style={{ height: 80, width: 600 }}  name="electricalEquipmentNotes" placeholder="Electrical Notes" onChange={this.handleChange} value={this.state.electricalEquipmentNotes} /></td>
  </tr>
  <tr>
  <td>Aquatic Vegetation Notes</td>
  <td><input  type="textArea" style={{ height: 80, width: 600 }}  name="aquaticVegetationNotes" placeholder="Aquatic Vegetation Notes" onChange={this.handleChange} value={this.state.aquaticVegetationNotes} /></td>
  </tr>
  <tr>
  <td>Shoreline Notes</td>
  <td><input  type="textArea" style={{ height: 80, width: 600 }}  name="shorelineNotes" placeholder="Shoreline Notes" onChange={this.handleChange} value={this.state.shorelineNotes} /></td>
  </tr>
  <tr>
  <td>Miscellaneous Notes</td>
  <td><input  type="textArea" style={{ height: 80, width: 600 }}  name="miscNotes" placeholder="Misc. Notes" onChange={this.handleChange} value={this.state.miscNotes} /></td>
  </tr>


  </tbody>
  </Table>

</Col>
                  </Row>

                  <Row>
                  <Col xs={10} sm={10} md={10}>
                      <Button bsStyle="primary">Overwrite Data</Button>
                      </Col>
                    </Row>
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
