import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, Radio,  Table, Popover, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import { PDFExport } from '@progress/kendo-react-pdf';
import { fire } from '../../fire';

import {BootstrapTable, BootstrapButton, TableHeaderColumn, ExportCSVButton} from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiPencil, TiTrash } from "react-icons/ti";

import domtoimage from 'dom-to-image';
import fileDownload from "js-file-download";


import { LineChart, ReferenceArea, AreaChart, Brush, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';

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
          sampleSuccess: '',

          //used for table data
          samples: [],
          orders: [],
          orders2: [],
          dataList: [],
          filter: "",
          blobUrl: null,

          //for drawers
          visible: false,
          visible1: false,

          //Inputs for Profile Page
          lakeName: '',
          locationCity: '',
          locationState: '',
          managementContact: '',
          hoaContact: '',
          managementContactNumber: '',
          hoaContactNumber: '',




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

          sampleSuccess: 'Sample Added Successfully!',
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
        visible1: true,


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
              visible: true,
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




        return (
          <Layout>

            <div style={{ background: '#F0F0F0', padding: '5px' }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <div style={{position: 'relative'}}>
            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
              <h1><b>Maintenance Reports</b></h1>
              <h3><b>{this.state.lakeName}</b></h3>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{ textAlign: 'right'}}>
          <Button size="large" type="primary" onClick={() => this.fillEmpty()}>+ Add Maintenance Report</Button>
            <Drawer
              title= "Fill in Maintenance Log"
              placement={this.state.placement}
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
              width={500}
            >
            <form>
              <Row style={{textAlign: 'right'}}>
              <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Maintenance Report</Icon>
              </Row>
              <Row>
        <FormGroup>
          <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Sample Date</b></Col>
          <Col xs={24} sm={18} md={18} lg={18} xl={18}>
          <FormControl name="maintenanceDate" onChange={this.handleChange} type="date" placeholder="Normal text" value={this.state.maintenanceDate} /></Col>
        </FormGroup>
        </Row>
        <Row style={{paddingTop: '10px'}}>
        <FormGroup>
          <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Sample Taker</b></Col>
          <Col xs={24} sm={18} md={18} lg={18} xl={18}>
          <FormControl name="maintenanceWorker" onChange={this.handleChange} type="text" placeholder="Sample Taker" value={this.state.maintenanceWorker} /></Col>
        </FormGroup>
        </Row>

        <Row style={{paddingTop: '10px'}}>
        <FormGroup>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Mechanical Notes</b></Col>
        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
        <FormControl name="mechanicalEquipmentNotes" onChange={this.handleChange} type="textarea" componentClass="textarea" style={{ height: 80, width: 335}} placeholder="Sample Notes" value={this.state.mechanicalEquipmentNotes} /></Col>
        </FormGroup>
        </Row>
        <Row style={{paddingTop: '10px'}}>
        <FormGroup>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Electrical Notes</b></Col>
        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
        <FormControl name="electricalEquipmentNotes" onChange={this.handleChange} type="textarea" componentClass="textarea" style={{ height: 80, width: 335}} placeholder="Sample Notes" value={this.state.electricalEquipmentNotes} /></Col>
        </FormGroup>
        </Row>
        <Row style={{paddingTop: '10px'}}>
        <FormGroup>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Aquatic Vegetation Notes</b></Col>
        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
        <FormControl name="aquaticVegetationNotes" onChange={this.handleChange} type="textarea" componentClass="textarea" style={{ height: 80, width: 335}} placeholder="Sample Notes" value={this.state.aquaticVegetationNotes} /></Col>
        </FormGroup>
        </Row>
        <Row style={{paddingTop: '10px'}}>
        <FormGroup>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Shorline Notes</b></Col>
        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
        <FormControl name="shorelineNotes" onChange={this.handleChange} type="textarea" componentClass="textarea" style={{ height: 80, width: 335}} placeholder="Sample Notes" value={this.state.shorelineNotes} /></Col>
        </FormGroup>
        </Row>
        <Row style={{paddingTop: '10px'}}>
        <FormGroup>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Shorline Notes</b></Col>
        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
        <FormControl name="miscNotes" onChange={this.handleChange} type="textarea" componentClass="textarea" style={{ height: 80, width: 335}} placeholder="Sample Notes" value={this.state.miscNotes} /></Col>
        </FormGroup>
        </Row>



        <Row style={{paddingTop: '10px', textAlign: 'right'}}>
        <Button type="primary" onClick={this.handleSubmit} bsStyle="primary">Add Maintenance Log</Button>
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
                    <FormControl name="maintenanceDate" onChange={this.handleChange} type="date" placeholder="Normal text" value={this.state.maintenanceDate} /></Col>
                  </FormGroup>
                  </Row>
                  <Row style={{paddingTop: '10px'}}>
                  <FormGroup>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Sample Taker</b></Col>
                    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                    <FormControl name="maintenanceWorker" onChange={this.handleChange} type="text" placeholder="Sample Taker" value={this.state.maintenanceWorker} /></Col>
                  </FormGroup>
                  </Row>

                  <Row style={{paddingTop: '10px'}}>
                  <FormGroup>
                  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Mechanical Notes</b></Col>
                  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                  <FormControl name="mechanicalEquipmentNotes" onChange={this.handleChange} type="textarea" componentClass="textarea" style={{ height: 80, width: 335}} placeholder="Sample Notes" value={this.state.mechanicalEquipmentNotes} /></Col>
                  </FormGroup>
                  </Row>
                  <Row style={{paddingTop: '10px'}}>
                  <FormGroup>
                  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Electrical Notes</b></Col>
                  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                  <FormControl name="electricalEquipmentNotes" onChange={this.handleChange} type="textarea" componentClass="textarea" style={{ height: 80, width: 335}} placeholder="Sample Notes" value={this.state.electricalEquipmentNotes} /></Col>
                  </FormGroup>
                  </Row>
                  <Row style={{paddingTop: '10px'}}>
                  <FormGroup>
                  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Aquatic Vegetation Notes</b></Col>
                  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                  <FormControl name="aquaticVegetationNotes" onChange={this.handleChange} type="textarea" componentClass="textarea" style={{ height: 80, width: 335}} placeholder="Sample Notes" value={this.state.aquaticVegetationNotes} /></Col>
                  </FormGroup>
                  </Row>
                  <Row style={{paddingTop: '10px'}}>
                  <FormGroup>
                  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Shorline Notes</b></Col>
                  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                  <FormControl name="shorelineNotes" onChange={this.handleChange} type="textarea" componentClass="textarea" style={{ height: 80, width: 335}} placeholder="Sample Notes" value={this.state.shorelineNotes} /></Col>
                  </FormGroup>
                  </Row>
                  <Row style={{paddingTop: '10px'}}>
                  <FormGroup>
                  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Shorline Notes</b></Col>
                  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                  <FormControl name="miscNotes" onChange={this.handleChange} type="textarea" componentClass="textarea" style={{ height: 80, width: 335}} placeholder="Sample Notes" value={this.state.miscNotes} /></Col>
                  </FormGroup>
                  </Row>



        <Row style={{paddingTop: '10px', textAlign: 'right'}}>
        <Button type="primary" onClick={this.writeData} bsStyle="primary">Overwrite Maintenance Report</Button>
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
              <TabPane tab="Maintenance Reports" key="1">
                <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Row>

                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{paddingTop: '20px'}}>

                    <p style={{lineHeight: '2px', paddingLeft: '0px', fontSize: '32px'}}><b>MAINTENANCE REPORTS</b></p>


              </Col>
            </Row>

                <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>

                  <BootstrapTable
                  data={ this.state.orders }
                  options={options}
                  exportCSV
                  pagination


                  >

                  <TableHeaderColumn width='130px' dataField='maintenanceDate' isKey filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Maintenance Date</TableHeaderColumn>

                  <TableHeaderColumn width='130px' dataField='mechanicalEquipmentNotes' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Mechanical Notes</TableHeaderColumn>
                  <TableHeaderColumn width='130px' dataField='electricalEquipmentNotes' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Electrical Notes</TableHeaderColumn>
                  <TableHeaderColumn width='130px' dataField='aquaticVegetationNotes' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Aquatic Vegetation Notes</TableHeaderColumn>
                  <TableHeaderColumn width='130px' dataField='shorelineNotes' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Shoreline Notes</TableHeaderColumn>
                  <TableHeaderColumn width='130px' dataField='miscNotes' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Miscellaneous Notes</TableHeaderColumn>

            <TableHeaderColumn
                  width='100px'
                  dataField='button'
                  dataFormat={this.editRow.bind(this)}
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


            </Tabs>

                  </Card>
            </Col>
            </Row>
            </div>





          </Layout>
        )
            }
          }
