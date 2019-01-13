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





export default class profilePage extends Component {


    constructor(props) {
        super(props);
        this.state = {


          //Inputs for Profile Page
          lakeName: '',
          location: '',
          managementContact: '',
          hoaContact: '',
          managementContactNumber: '',
          hoaContactNumber: '',


          //Misc. for chaing taps and id's
          id: '',
          key: 1,
          idKey: '',
          page: '',


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
        const samplesRef = fire.database().ref(`profileInformation/${user.uid}`);
        const orderID = fire.database().ref(`/profileInformation/${user.uid}/${orderID}`);


        const profileInformation = {

          lakeName: this.state.lakeName,
          location: this.state.location,
          managementContact: this.state.managementContact,
          hoaContact: this.state.hoaContact,
          managementContactNumber: this.state.managementContactNumber,
          hoaContactNumber: this.state.hoaContactNumber,

          id: this.state.id,
        }




        samplesRef.set(profileInformation);
        //this.setState is used to clear the text boxes after the form has been submitted.
        this.setState({





        });
      });
    }





      //this function is constantly running after the initial render.  Snapshot is used to look into the database.
      //[] indicates an array value
      //.map(Number) changes an array of strings to an array of integers
      //snapshot.foreach(ss => {...}) **this looks in each "Sample" for the child of "user"**
      //child of user can be child of BOD or child of tss or whatever.  It finds the value that is a child to that label.

      componentDidMount(itemId) {
        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
          const samplesRef = fire.database().ref(`profileInformation/${user.uid}`);
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
              lakeName: orders[order].lakeName,
              location: orders[order].location,
              managementContact: orders[order].managementContact,
              hoaContact: orders[order].hoaContact,
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

        const colorsRef = fire.database().ref(`profileInformation/${user.uid}`);

        colorsRef.on('value', (snapshot) => {
          let colorList = snapshot.val();

          this.setState({
            lakeName: snapshot.child('lakeName').val(),
            location: snapshot.child('location').val(),
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
      const sampleRef = fire.database().ref(`/profileInformation/${user.uid}/${itemId}`);

      sampleRef.on('value', (snapshot) => {

        this.setState({

          lakeName: '',
          location: '',
          managementContact: '',
          hoaContact: '',
          managementContactNumber: '',
          hoaContactNumber: '',

        });

      let orders = snapshot.val();
      let id = fire.database().ref().child(`/profileInformation/${user.uid}/${itemId}`).key;

      let newState = [];
      for (let order in orders) {
        newState.push({
          id: order,
          lakeName: orders[order].lakeName,
          location: orders[order].location,
          managementContact: orders[order].managementContact,
          hoaContact: orders[order].hoaContact,
          managementContactNumber: orders[order].managementContactNumber,
          hoaContactNumber: orders[order].hoaContactNumber,

        });
      }
      this.setState({

        id: id,
        key: 4,

        lakeName: snapshot.child('lakeName').val(),
        location: snapshot.child('location').val(),
        managementContact: snapshot.child('managementContact').val(),
        hoaContact: snapshot.child('hoaContact').val(),
        managementContactNumber: snapshot.child('managementContactNumber').val(),
        hoaContactNumber: snapshot.child('hoaContactNumber').val(),


      })

});

    });
  }


  writeStates = (itemId) => {

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/profileInformation/${user.uid}/${this.state.id}`);


    sampleRef.child("id").set(this.state.id);

    sampleRef.child("lakeName").set(this.state.lakeName);
    sampleRef.child("location").set(this.state.location);
    sampleRef.child("managementContact").set(this.state.managementContact);
    sampleRef.child("hoaContact").set(this.state.hoaContact);
    sampleRef.child("managementContactNumber").set(this.state.managementContactNumber);
    sampleRef.child("hoaContactNumber").set(this.state.hoaContactNumber);


    });
  }



  fillEmpty(itemId) {
    let area = '';
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/profileInformation/${user.uid}/${itemId}`);


    sampleRef.on('value', (snapshot) => {

    let orders = snapshot.val();

    let newState = [];
    for (let order in orders) {
      newState.push({
        id: order,

        lakeName: orders[order].lakeName,
        location: orders[order].location,
        managementContact: orders[order].managementContact,
        hoaContact: orders[order].hoaContact,
        managementContactNumber: orders[order].managementContactNumber,
        hoaContactNumber: orders[order].hoaContactNumber,


      });
    }
            this.setState({

              id: '',
              key: 3,
              lakeName: '',
              location: '',
              managementContact: '',
              hoaContact: '',
              managementContactNumber: '',
              hoaContactNumber: '',
            })
        });
  });
}

  createNewWorkOrder (itemId) {

      let area = '';
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const sampleRef = fire.database().ref(`/profileInformation/${user.uid}/${itemId}`);

      sampleRef.on('value', (snapshot) => {

      let orders = snapshot.val();

      let newState = [];
      for (let order in orders) {
        newState.push({
          id: order,

          lakeName: orders[order].lakeName,
          location: orders[order].location,
          managementContact: orders[order].managementContact,
          hoaContact: orders[order].hoaContact,
          managementContactNumber: orders[order].managementContactNumber,
          hoaContactNumber: orders[order].hoaContactNumber,

        });
      }
      this.setState({

        id: snapshot.child('id').val(),
        key: 3,

        lakeName: snapshot.child('lakeName').val(),
        location: snapshot.child('location').val(),
        managementContact: snapshot.child('managementContact').val(),
        hoaContact: snapshot.child('hoaContact').val(),
        managementContactNumber: snapshot.child('managementContactNumber').val(),
        hoaContactNumber: snapshot.child('hoaContactNumber').val(),

      })

});
    });




  }

    removesample(itemId) {
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const sampleRef = fire.database().ref(`/profileInformation/${user.uid}/${itemId}`);
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
  const samplesRef = fire.database().ref(`profileInformation/${user.uid}`);
  const orderID = fire.database().ref(`/profileInformation/${user.uid}/${this.state.id}`);
  const newCheckboxKey = firebase.database().ref().child('checkbox').push().key;

  let id = newCheckboxKey;
  let box = id;


  const profileInformation = {

    lakeName: this.state.lakeName,
    location: this.state.location,
    managementContact: this.state.managementContact,
    hoaContact: this.state.hoaContact,
    managementContactNumber: this.state.managementContactNumber,
    hoaContactNumber: this.state.hoaContactNumber,
  }

  samplesRef.child(this.state.id).set(profileInformation);



});
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

preview = () => {
  this.setState({
    key: 5,
  })
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
          <h3>Profile</h3>

          </Col>

          </Row>
          <Col xs={12} sm={10} md={10}>


      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} defaultActiveKey={1} id="uncontrolled-tab-example">





      <Tab eventKey={1} title="Profile Information">
        <Grid>
          <Row>
            <Col xs={10} md={10}>
        <section className='add-item'>
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Col xs={4} sm={4} md={4}>
                <h2>Profile Information</h2>
                </Col>
                <Col smOffset={2} xs={4} sm={4} md={4}>

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
  <tbody tdstyle={{flex: 1, flexWrap: 'wrap', overflowY: 'auto'}}>
  <tr>
  <td>Lake Name</td>
  <td><input type="text" name="lakeName" placeholder="Lake Name" onChange={this.handleChange} value={this.state.lakeName} /></td>
  </tr>
  <tr>
  <td>Lake Location</td>
  <td><input type="location" name="location" placeholder="Lake Location" onChange={this.handleChange} value={this.state.location} /></td>
  </tr>
  <tr>
  <td>Lake Management Contact Name</td>
  <td><input type="text" name="managementContact" placeholder="Contact Name" onChange={this.handleChange} value={this.state.managementContact} /></td>
  </tr>
  <tr>
  <td>Lake Management Contact Number</td>
  <td><input type="phone" name="managementContactNumber" placeholder="Contact Number" onChange={this.handleChange} value={this.state.managementContactNumber} /></td>
  </tr>
  <tr>
  <td>HOA Contact</td>
  <td><input type="text" name="hoaContact" placeholder="HOA Contact" onChange={this.handleChange} value={this.state.hoaContact} /></td>
  </tr>
  <tr>
  <td>HOA Contact Number</td>
  <td><input type="phone" name="hoaContactNumber" placeholder="Contact Number" onChange={this.handleChange} value={this.state.hoaContactNumber} /></td>
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







    </Tabs>


    </Col>
    </Row>
    </Grid>

    </div>
        )
            }
          }
