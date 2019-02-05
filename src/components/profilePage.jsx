import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, Radio,  Table, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import { PDFExport } from '@progress/kendo-react-pdf';
import { fire } from '../fire';

import {BootstrapTable, BootstrapButton, TableHeaderColumn, ExportCSVButton} from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiPencil, TiTrash } from "react-icons/ti";

import domtoimage from 'dom-to-image';
import fileDownload from "js-file-download";


import { LineChart, ReferenceArea, AreaChart, Brush, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';

import { Row, Col, Popover, Tabs, message, Card, Drawer, Menu, Icon, Dropdown, Button, Layout, Carousel } from 'antd';




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

const gpsURL = (
  <div>
    <a style={{ textDecoration: 'none', color: 'Blue' }} target="_blank" href="https://www.gps-coordinates.net/"><span><Icon type="search" /><span>Click Here for Coordinates</span></span></a>
  </div>
);

const gpsLink = (
  <Popover content={gpsURL} title="Find GPS Cordinates" trigger="hover">
    <Icon style={{color: 'blue'}} type="info-circle" />
  </Popover>
)



export default class profilePage extends Component {


    constructor(props) {
        super(props);
        this.state = {


          //Inputs for Profile Page
          lakeName: '',
          locationCity: '',
          locationState: '',
          managementContact: '',
          hoaContact: '',
          managementContactNumber: '',
          hoaContactNumber: '',
          latitude: '',
          longitude: '',


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



        const profileInformation = {

          lakeName: this.state.lakeName,
          locationCity: this.state.locationCity,
          locationState: this.state.locationState,
          managementContact: this.state.managementContact,
          hoaContact: this.state.hoaContact,
          managementContactNumber: this.state.managementContactNumber,
          hoaContactNumber: this.state.hoaContactNumber,
          latitude: this.state.latitude,
          longitude: this.state.longitude,


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
            latitude: snapshot.child('latitude').val(),
            longitude: snapshot.child('longitude').val(),

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
          locationCity: '',
          locationState: '',
          managementContact: '',
          hoaContact: '',
          managementContactNumber: '',
          hoaContactNumber: '',
          latitude: '',
          longitude: '',

        });

      let orders = snapshot.val();
      let id = fire.database().ref().child(`/profileInformation/${user.uid}/${itemId}`).key;

      let newState = [];
      for (let order in orders) {
        newState.push({
          id: order,
          lakeName: orders[order].lakeName,
          locationCity: orders[order].locationCity,
          locationState: orders[order].locationState,
          managementContact: orders[order].managementContact,
          hoaContact: orders[order].hoaContact,
          managementContactNumber: orders[order].managementContactNumber,
          hoaContactNumber: orders[order].hoaContactNumber,
          latitude: orders[order].latitude,
          longitude: orders[order].longitude,

        });
      }
      this.setState({

        id: id,
        key: 4,

        lakeName: snapshot.child('lakeName').val(),
        locationCity: snapshot.child('locationCity').val(),
        locationState: snapshot.child('locationState').val(),
        managementContact: snapshot.child('managementContact').val(),
        hoaContact: snapshot.child('hoaContact').val(),
        managementContactNumber: snapshot.child('managementContactNumber').val(),
        hoaContactNumber: snapshot.child('hoaContactNumber').val(),
        latitude: snapshot.child('latitude').val(),
        longitude: snapshot.child('longitude').val(),


      })

});

    });
  }


  writeStates = (itemId) => {

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/profileInformation/${user.uid}/${this.state.id}`);


    sampleRef.child("id").set(this.state.id);

    sampleRef.child("lakeName").set(this.state.lakeName);
    sampleRef.child("locationCity").set(this.state.locationCity);
    sampleRef.child("locationState").set(this.state.locationState);
    sampleRef.child("managementContact").set(this.state.managementContact);
    sampleRef.child("hoaContact").set(this.state.hoaContact);
    sampleRef.child("managementContactNumber").set(this.state.managementContactNumber);
    sampleRef.child("hoaContactNumber").set(this.state.hoaContactNumber);
    sampleRef.child("latitude").set(this.state.latitude);
    sampleRef.child("longitude").set(this.state.longitude);

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
        locationCity: orders[order].locationCity,
        locationState: orders[order].locationState,
        managementContact: orders[order].managementContact,
        hoaContact: orders[order].hoaContact,
        managementContactNumber: orders[order].managementContactNumber,
        hoaContactNumber: orders[order].hoaContactNumber,
        latitude: orders[order].latitude,
        longitude: orders[order].longitude,


      });
    }
            this.setState({

              id: '',
              key: 3,
              lakeName: '',
              locationCity: '',
              locationState: '',
              managementContact: '',
              hoaContact: '',
              managementContactNumber: '',
              hoaContactNumber: '',
              latitude: '',
              longitude: '',

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
          locationCity: orders[order].locationCity,
          locationState: orders[order].locationState,
          managementContact: orders[order].managementContact,
          hoaContact: orders[order].hoaContact,
          managementContactNumber: orders[order].managementContactNumber,
          hoaContactNumber: orders[order].hoaContactNumber,
          latitude: orders[order].latitude,
          longitude: orders[order].longitude,

        });
      }
      this.setState({

        id: snapshot.child('id').val(),
        key: 3,

        lakeName: snapshot.child('lakeName').val(),
        locationCity: snapshot.child('locationCity').val(),
        locationState: snapshot.child('locationState').val(),
        managementContact: snapshot.child('managementContact').val(),
        hoaContact: snapshot.child('hoaContact').val(),
        managementContactNumber: snapshot.child('managementContactNumber').val(),
        hoaContactNumber: snapshot.child('hoaContactNumber').val(),
        latitude: snapshot.child('latitude').val(),
        longitude: snapshot.child('longitude').val(),
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
    locationCity: this.state.locationCity,
    locationState: this.state.locationState,
    managementContact: this.state.managementContact,
    hoaContact: this.state.hoaContact,
    managementContactNumber: this.state.managementContactNumber,
    hoaContactNumber: this.state.hoaContactNumber,
    latitude: this.state.latitude,
    longitude: this.state.longitude,

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
          <Layout>

            <div style={{ background: '#F0F0F0', padding: '5px' }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <div style={{position: 'relative'}}>
            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
              <h1><b>Profile Information</b></h1>

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
              <TabPane tab="Profile Information" key="1">
                <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Row>

                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{paddingTop: '20px'}}>

                    <p style={{lineHeight: '2px', paddingLeft: '0px', fontSize: '32px'}}><b>PROFILE INFORMATION</b></p>


              </Col>
            </Row>

                <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <form>

        <Row style={{paddingTop: '10px'}}>
          <FormGroup>
            <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Lake Name</b></Col>
            <Col xs={24} sm={18} md={18} lg={18} xl={18}>
            <FormControl name="lakeName" onChange={this.handleChange} type="text" placeholder="Lake Name" style={{ width: 350}} value={this.state.lakeName} /></Col>
          </FormGroup>
          </Row>
          <Row style={{paddingTop: '10px'}}>
            <FormGroup>
              <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>City</b></Col>
              <Col xs={24} sm={18} md={18} lg={18} xl={18}>
              <FormControl name="locationCity" onChange={this.handleChange} type="text" placeholder="Location"  style={{ width: 350}} value={this.state.locationCity} /></Col>
            </FormGroup>
            </Row>
            <Row style={{paddingTop: '10px'}}>
              <FormGroup>
                <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>State</b></Col>
                <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                <FormControl name="locationState" onChange={this.handleChange} type="text" placeholder="Location" style={{ width: 350}} value={this.state.locationState} /></Col>
              </FormGroup>
              </Row>
            <Row style={{paddingTop: '10px'}}>
              <FormGroup>
                <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Management Contact</b></Col>
                <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                <FormControl name="managementContact" onChange={this.handleChange} type="text" placeholder="Management Contact" style={{ width: 350}} value={this.state.managementContact} /></Col>
              </FormGroup>
              </Row>
              <Row style={{paddingTop: '10px'}}>
                <FormGroup>
                  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Management Contact Number</b></Col>
                  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                  <FormControl name="managementContactNumber" onChange={this.handleChange} type="text" placeholder="Management Number" style={{ width: 350}} value={this.state.managementContactNumber} /></Col>
                </FormGroup>
                </Row>
                <Row style={{paddingTop: '10px'}}>
                  <FormGroup>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>HOA Contact</b></Col>
                    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                    <FormControl name="hoaContact" onChange={this.handleChange} type="text" placeholder="HOA Contact" style={{ width: 350}} value={this.state.hoaContact} /></Col>
                  </FormGroup>
                  </Row>
                  <Row style={{paddingTop: '10px'}}>
                    <FormGroup>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>HOA Contact Number</b></Col>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                      <FormControl name="hoaContactNumber" onChange={this.handleChange} type="text" placeholder="HOA Number" style={{ width: 350}} value={this.state.hoaContactNumber} /></Col>
                    </FormGroup>
                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                      <FormGroup>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Latitude</b>   {gpsLink}</Col>
                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                        <FormControl name="latitude" onChange={this.handleChange} type="number" placeholder="Latitude" style={{ width: 350}} value={this.state.latitude} /></Col>
                      </FormGroup>
                      </Row>
                      <Row style={{paddingTop: '10px'}}>
                        <FormGroup>
                          <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Longitude</b> {gpsLink}
                        </Col>
                          <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                          <FormControl name="longitude" onChange={this.handleChange} type="number" placeholder="Longitude" style={{ width: 350}} value={this.state.longitude} /></Col>
                        </FormGroup>

                        </Row>






            <Row style={{paddingTop: '10px', textAlign: 'left'}}>
            <Button type="primary" onClick={this.handleSubmit} bsStyle="primary">Update Profile</Button>
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


            </Tabs>

                  </Card>
            </Col>
            </Row>
            </div>





          </Layout>

        )
            }
          }
