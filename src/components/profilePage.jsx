import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, Table, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import { PDFExport } from '@progress/kendo-react-pdf';
import { fire } from '../fire';

import {BootstrapTable, BootstrapButton, TableHeaderColumn, ExportCSVButton} from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiPencil, TiTrash } from "react-icons/ti";

import domtoimage from 'dom-to-image';
import fileDownload from "js-file-download";


import { LineChart, ReferenceArea, AreaChart, Brush, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';

import { Row, Col, Popover, Tabs, message, Card, Drawer, Menu, Icon, Dropdown, Button, Layout, Carousel, Radio } from 'antd';

import GoogleMapReact from 'google-map-react';



const TabPane = Tabs.TabPane;


var buttonStyle = {

    background: 'linear-gradient(to top right, #ff5263 0%, #ff7381 35%, #fcbd01 100%)',
    fontSize: '15px',
    color: "#ffffff",
    textShadow: "0 -1px 0 rgba(0, 0, 0, 0.25)"
}



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
    <Icon style={{color: 'F4F7FA'}} type="info-circle" />
  </Popover>
)

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class profilePage extends Component {

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


          //Inputs for Profile Page
          lakeName: '',
          locationCity: '',
          locationState: '',
          managementContact: '',
          hoaContact: '',
          managementContactNumber: '',
          hoaContactNumber: '',
          isLoading: true,
          dataSource: [],
          latitude: 33.6595,
          longitude: null,
          error: null,
          weather: -117.998970,
          center: {
            lat: 33.6595,
            lng: -117.998970
          },
          successfulUpdate: '',


          //Misc. for chaing taps and id's
          id: '',
          key: 1,
          idKey: '',
          page: '',
          currentProject: '',


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
        this.setState({
          successfulUpdate: ''
        });
        let newState = [];





      }
      //event triggered when form is submitted
      handleSubmit(e) {
        e.preventDefault();
        //fire.database().ref('samples') refers to the main title of the fire database.
        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
        const samplesRef = fire.database().ref(`${user.uid}/${this.state.currentProject}/profileInformation`);



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
          successfulUpdate: 'Profile Updated'
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
          const currentProjectRef = fire.database().ref(`${user.uid}/currentProject`);
          currentProjectRef.on('value', (snapshot) => {

          this.setState({
            currentProject: snapshot.child('currentProject').val(),
          });

          console.log(this.state.currentProject)
          const profileRef = fire.database().ref(`${user.uid}/${this.state.currentProject}/profileInformation`);
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
            center: {
              lat: parseFloat(snapshot.child('latitude').val()),
              lng: parseFloat(snapshot.child('longitude').val())
            },

          });

          if (this.state.lakeName === null) {

            this.setState({
              lakeName: '',
              locationCity: '',
              locationState: '',
              managementContact: '',
              hoaContact: '',
              managementContactNumber: '',
              hoaContactNumber: '',
              latitude: '',
              longitude:  '',

            });

          }

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

_onClick = (obj) => {
  console.log(obj.lat, obj.lng);

  this.setState({
    latitude: obj.lat,
    longitude: obj.lng
  })
}









      render() {
        function buttonFormatter(cell, row){
  return '<BootstrapButton type="submit"></BootstrapButton>';
}
const options = {
  exportCSVBtn: this.createCustomExportCSVButton
};

const content = (

    <Card  style={{textAlign: 'left', height: 350,}} bordered={true} >
     <div style={{  height: 300, width: '100%' }}>
       <GoogleMapReact
         onClick={this._onClick}
         bootstrapURLKeys={{ key: 'AIzaSyAqe1Z8I94AcnNb3VsOam1tnUd_8WdubV4'}}
         center={this.state.center
         }
         defaultZoom={this.props.zoom}
       >
         <AnyReactComponent
           lat={this.state.latitude}
           lng={this.state.longitude}
           text={this.state.lakeName}
         />
       </GoogleMapReact>
     </div>
    </Card>



);




        return (
          <Layout>



            <div style={{ background: '#F4F7FA', padding: '5px' }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>


                  <Card


                  >
                  <Tabs defaultActiveKey="1" >
              <TabPane tab="PROJECT INFORMATION" key="1">
                <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>


                <Row style={{paddingTop: '10px'}} type="flex" justify="center">
                <Col xs={24} sm={18} md={16} lg={16} xl={16}>
                  <form>

        <Row style={{paddingTop: '10px'}}>




          <FormGroup>
            <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Lake Name</b></Col>
            <Col offset={1} xs={24} sm={12} md={12} lg={12} xl={12}>
            <FormControl name="lakeName" onChange={this.handleChange} type="text" placeholder="Lake Name"  value={this.state.lakeName} /></Col>
          </FormGroup>
          </Row>
          <Row style={{paddingTop: '10px'}}>
            <FormGroup>
              <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>City</b></Col>
              <Col offset={1} xs={24} sm={12} md={12} lg={12} xl={12}>
              <FormControl name="locationCity" onChange={this.handleChange} type="text" placeholder="Location"  value={this.state.locationCity} /></Col>
            </FormGroup>
            </Row>
            <Row style={{paddingTop: '10px'}}>
              <FormGroup>
                <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>State</b></Col>
                <Col offset={1} xs={24} sm={12} md={12} lg={12} xl={12}>
                <FormControl name="locationState" onChange={this.handleChange} type="text" placeholder="Location"  value={this.state.locationState} /></Col>
              </FormGroup>
              </Row>
            <Row style={{paddingTop: '10px'}}>
              <FormGroup>
                <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Management Contact</b></Col>
                <Col offset={1} xs={24} sm={12} md={12} lg={12} xl={12}>
                <FormControl name="managementContact" onChange={this.handleChange} type="text" placeholder="Management Contact"  value={this.state.managementContact} /></Col>
              </FormGroup>
              </Row>
              <Row style={{paddingTop: '10px'}}>
                <FormGroup>
                  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Management Contact Number</b></Col>
                  <Col offset={1} xs={24} sm={12} md={12} lg={12} xl={12}>
                  <FormControl name="managementContactNumber" onChange={this.handleChange} type="text" placeholder="Management Number"  value={this.state.managementContactNumber} /></Col>
                </FormGroup>
                </Row>
                <Row style={{paddingTop: '10px'}}>
                  <FormGroup>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>HOA Contact</b></Col>
                    <Col offset={1} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <FormControl name="hoaContact" onChange={this.handleChange} type="text" placeholder="HOA Contact"  value={this.state.hoaContact} /></Col>
                  </FormGroup>
                  </Row>
                  <Row style={{paddingTop: '10px'}}>
                    <FormGroup>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>HOA Contact Number</b></Col>
                      <Col offset={1} xs={24} sm={12} md={12} lg={12} xl={12}>
                      <FormControl name="hoaContactNumber" onChange={this.handleChange} type="text" placeholder="HOA Number"  value={this.state.hoaContactNumber} /></Col>
                    </FormGroup>
                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                    <FormGroup>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Latitude</b>   {gpsLink}</Col>
                      <Col offset={1} xs={24} sm={12} md={12} lg={12} xl={12}>
                      <FormControl name="latitude" onChange={this.handleChange} type="number" placeholder="Latitude"  value={this.state.latitude} /></Col>
                    </FormGroup>
                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                      <FormGroup>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Longitude</b> {gpsLink}
                      </Col>
                        <Col offset={1} xs={24} sm={12} md={12} lg={12} xl={12}>
                        <FormControl name="longitude" onChange={this.handleChange} type="number" placeholder="Longitude"  value={this.state.longitude} /></Col>
                      </FormGroup>
                    </Row>


                    <Row style={{paddingTop: '20px'}}>

                      <Card  style={{textAlign: 'left', height: 350,}} bordered={true} >
                       <div style={{  height: 300, width: '100%' }}>
                         <GoogleMapReact
                           onClick={this._onClick}
                           bootstrapURLKeys={{ key: 'AIzaSyAqe1Z8I94AcnNb3VsOam1tnUd_8WdubV4'}}
                           center={this.state.center
                           }
                           defaultZoom={this.props.zoom}
                         >
                           <AnyReactComponent
                             lat={this.state.latitude}
                             lng={this.state.longitude}
                             text={this.state.lakeName}
                           />
                         </GoogleMapReact>
                       </div>
                      </Card>

                        </Row>

            <Row style={{paddingTop: '20px', textAlign: 'left'}}>
            <Button type="primary" onClick={this.handleSubmit} bsStyle="primary">Update Profile</Button>
            </Row>
            <Row style={{paddingTop: '20px', textAlign: 'left'}}>
            <p><b>{this.state.successfulUpdate}</b></p>
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
