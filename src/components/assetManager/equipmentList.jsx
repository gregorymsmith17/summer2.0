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



export default class equipmentList extends Component {


    constructor(props) {
        super(props);
        this.state = {


          //Contact Form Inputs
          equipmentName: '',
          equipmentType: '',
          equipmentManf: '',
          equipmentArea: '',

          equipmentNotes: '',

          //Random things for changing tabs
          id: '',
          key: 1,
          idKey: '',
          page: '',
          area: '',


          //put data into tables with these
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
        const samplesRef = fire.database().ref(`equipmentList/${user.uid}`);
        const orderID = fire.database().ref(`/equipmentList/${user.uid}/${orderID}`);


        const equipmentList = {

          equipmentName: this.state.equipmentName,
          equipmentType: this.state.equipmentType,
          equipmentManf: this.state.equipmentManf,
          equipmentArea: this.state.equipmentArea,

          equipmentNotes: this.state.equipmentNotes,

          id: this.state.id,
        }




        samplesRef.push(equipmentList);
        //this.setState is used to clear the text boxes after the form has been submitted.
        this.setState({
          visible: false,
          equipmentName: '',
          equipmentType: '',
          equipmentManf: '',
          equipmentArea: '',

          equipmentNotes: '',

        });
      });
      console.log("test");
    }

      componentDidMount() {
        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
          const samplesRef = fire.database().ref(`equipmentList/${user.uid}`);
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
              equipmentName: orders[order].equipmentName,
              equipmentType: orders[order].equipmentType,
              equipmentManf: orders[order].equipmentManf,
              equipmentArea: orders[order].equipmentArea,
              equipmentNotes: orders[order].equipmentNotes,
            });
            newState2.push({
              id: order,
              equipmentName: orders[order].equipmentName,
              equipmentType: orders[order].equipmentType,
              equipmentManf: orders[order].equipmentManf,
              equipmentArea: orders[order].equipmentArea,
              equipmentNotes: orders[order].equipmentNotes,
            });

          }

          newState2.sort(function(a, b) {

            if (a.equipmentName === b.equipmentName) {
              return 0;
            }
            return a.equipmentName > b.equipmentName ? 1 : -1;
        });
        newState.sort(function(a, b) {

          if (b.equipmentName === a.equipmentName) {
            return 0;
          }
          return b.equipmentName > a.equipmentName ? 1 : -1;
      });

          this.setState({
            orders: newState,
            orders2: newState2,
            dataList: newState,
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
      const sampleRef = fire.database().ref(`/equipmentList/${user.uid}/${itemId}`);

      sampleRef.on('value', (snapshot) => {

        this.setState({
          equipmentName: '',
          equipmentType: '',
          equipmentManf: '',
          equipmentArea: '',
          equipmentNotes: '',

        });

      let orders = snapshot.val();
      let id = fire.database().ref().child(`/equipmentList/${user.uid}/${itemId}`).key;

      let newState = [];
      for (let order in orders) {
        newState.push({
          id: order,

          equipmentName: orders[order].equipmentName,
          equipmentType: orders[order].equipmentType,
          equipmentManf: orders[order].equipmentManf,
          equipmentArea: orders[order].equipmentArea,
          equipmentNotes: orders[order].equipmentNotes,

        });
      }
      this.setState({

        id: id,
        key: 4,
        visible1: true,

        equipmentName: snapshot.child('equipmentName').val(),
        equipmentType: snapshot.child('equipmentType').val(),
        equipmentManf: snapshot.child('equipmentManf').val(),
        equipmentArea: snapshot.child('equipmentArea').val(),
        equipmentNotes: snapshot.child('equipmentNotes').val(),

      })

});

    });
  }


  writeStates = (itemId) => {

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/equipmentList/${user.uid}/${this.state.id}`);


    sampleRef.child("id").set(this.state.id);

    sampleRef.child("equipmentName").set(this.state.equipmentName);
    sampleRef.child("equipmentType").set(this.state.equipmentType);
    sampleRef.child("equipmentManf").set(this.state.equipmentManf);
    sampleRef.child("equipmentArea").set(this.state.equipmentArea);
    sampleRef.child("equipmentNotes").set(this.state.equipmentNotes);

  });


  }



  fillEmpty(itemId) {
    let area = '';
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/equipmentList/${user.uid}/${itemId}`);


    sampleRef.on('value', (snapshot) => {

    let orders = snapshot.val();

    let newState = [];
    for (let order in orders) {
      newState.push({
        id: order,

        equipmentName: orders[order].equipmentName,
        equipmentType: orders[order].equipmentType,
        equipmentManf: orders[order].equipmentManf,
        equipmentArea: orders[order].equipmentArea,
        equipmentNotes: orders[order].equipmentNotes,

      });
    }
    this.setState({

      id: '',
      key: 3,
      visible: true,
      equipmentName: '',
      equipmentType: '',
      equipmentManf: '',
      equipmentArea: '',
      equipmentNotes: '',


    })


});
  });
}

  createNewWorkOrder (itemId) {

      let area = '';
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const sampleRef = fire.database().ref(`/equipmentList/${user.uid}/${itemId}`);

      sampleRef.on('value', (snapshot) => {

      let orders = snapshot.val();

      let newState = [];
      for (let order in orders) {
        newState.push({
          id: order,

          equipmentName: orders[order].equipmentName,
          equipmentType: orders[order].equipmentType,
          equipmentManf: orders[order].equipmentManf,
          equipmentArea: orders[order].equipmentArea,
          equipmentNotes: orders[order].equipmentNotes,

        });
      }
      this.setState({

        id: snapshot.child('id').val(),
        key: 3,

        equipmentName: snapshot.child('equipmentName').val(),
        equipmentType: snapshot.child('equipmentType').val(),
        equipmentManf: snapshot.child('equipmentManf').val(),
        equipmentArea: snapshot.child('equipmentArea').val(),
        equipmentNotes: snapshot.child('equipmentNotes').val(),

      })


      });
    });
  }

    removesample(itemId) {
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const sampleRef = fire.database().ref(`/equipmentList/${user.uid}/${itemId}`);
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
  const samplesRef = fire.database().ref(`equipmentList/${user.uid}`);
  const orderID = fire.database().ref(`/equipmentList/${user.uid}/${this.state.id}`);
  const newCheckboxKey = firebase.database().ref().child('checkbox').push().key;

  let id = newCheckboxKey;
  let box = id;


  const equipmentList = {

    id: this.state.id,
    equipmentName: this.state.equipmentName,
    equipmentType: this.state.equipmentType,
    equipmentManf: this.state.equipmentManf,
    equipmentArea: this.state.equipmentArea,
    equipmentNotes: this.state.equipmentNotes,
  }

  samplesRef.child(this.state.id).set(equipmentList);

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
              <h1><b>Equipment List</b></h1>
              <h3><b>{this.state.lakeName}</b></h3>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{ textAlign: 'right'}}>
          <Button size="large" type="primary" onClick={() => this.fillEmpty()}>+ Add Equipment Item</Button>
            <Drawer
              title= "Fill in Equipment Item"
              placement={this.state.placement}
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
              width={500}
            >
            <form>
              <Row style={{textAlign: 'right'}}>
              <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Equipment Item</Icon>
              </Row>
              <Row style={{paddingTop: '10px'}}>
        <FormGroup>
          <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Equipment Name</b></Col>
          <Col xs={24} sm={18} md={18} lg={18} xl={18}>
          <FormControl name="equipmentName" onChange={this.handleChange} type="text" placeholder="Equipment Name" value={this.state.equipmentName} /></Col>
        </FormGroup>
        </Row>
              <Row style={{paddingTop: '10px'}}>
        <FormGroup>
          <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Equipment Type</b></Col>
          <Col xs={24} sm={18} md={18} lg={18} xl={18}>
          <FormControl name="equipmentType" onChange={this.handleChange} type="text" placeholder="Equipment Type" value={this.state.equipmentType} /></Col>
        </FormGroup>
        </Row>
        <Row style={{paddingTop: '10px'}}>
        <FormGroup>
          <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Equipment Manufacturer</b></Col>
          <Col xs={24} sm={18} md={18} lg={18} xl={18}>
          <FormControl name="equipmentManf" onChange={this.handleChange} type="text" placeholder="Manufacturer" value={this.state.equipmentManf} /></Col>
        </FormGroup>
        </Row>

        <Row style={{paddingTop: '10px'}}>
        <FormGroup>
          <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Equipment Area</b></Col>
          <Col xs={24} sm={18} md={18} lg={18} xl={18}>
          <FormControl name="equipmentArea" onChange={this.handleChange} type="text" placeholder="Equipment Area" value={this.state.equipmentArea} /></Col>
        </FormGroup>
        </Row>
        <Row style={{paddingTop: '10px'}}>
        <FormGroup>
          <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Equipment Notes</b></Col>
          <Col xs={24} sm={18} md={18} lg={18} xl={18}>
          <FormControl componentClass="textarea" name="equipmentNotes" onChange={this.handleChange} type="textarea" style={{ height: 80, width: 335}} placeholder="Notes" value={this.state.equipmentNotes} /></Col>
        </FormGroup>
        </Row>






        <Row style={{paddingTop: '10px', textAlign: 'right'}}>
        <Button type="primary" onClick={this.handleSubmit} bsStyle="primary">Add Equipment Item</Button>
        </Row>





        </form>



            </Drawer>

            <Drawer
              title= "Edit Equipment Item"
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
                <Row>
                  <FormGroup>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Equipment Name</b></Col>
                    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                    <FormControl name="equipmentName" onChange={this.handleChange} type="text" placeholder="Equipment Name" value={this.state.equipmentName} /></Col>
                  </FormGroup>
                  </Row>
                        <Row style={{paddingTop: '10px'}}>
                  <FormGroup>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Equipment Type</b></Col>
                    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                    <FormControl name="equipmentType" onChange={this.handleChange} type="text" placeholder="Equipment Type" value={this.state.equipmentType} /></Col>
                  </FormGroup>
                  </Row>
                  <Row style={{paddingTop: '10px'}}>
                  <FormGroup>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Equipment Manufacturer</b></Col>
                    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                    <FormControl name="equipmentManf" onChange={this.handleChange} type="text" placeholder="Manufacturer" value={this.state.equipmentManf} /></Col>
                  </FormGroup>
                  </Row>

                  <Row style={{paddingTop: '10px'}}>
                  <FormGroup>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Equipment Area</b></Col>
                    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                    <FormControl name="equipmentArea" onChange={this.handleChange} type="text" placeholder="Equipment Area" value={this.state.equipmentArea} /></Col>
                  </FormGroup>
                  </Row>
                  <Row style={{paddingTop: '10px'}}>
                  <FormGroup>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Equipment Notes</b></Col>
                    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                    <FormControl componentClass="textarea" name="equipmentNotes" onChange={this.handleChange} type="textarea" style={{ height: 80, width: 335}} placeholder="Notes" value={this.state.equipmentNotes} /></Col>
                  </FormGroup>
                  </Row>




        <Row style={{paddingTop: '10px', textAlign: 'right'}}>
        <Button type="primary" onClick={this.writeData} bsStyle="primary">Overwrite Equipment Info</Button>
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
              <TabPane tab="Equipment List" key="1">
                <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Row>

                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{paddingTop: '20px'}}>

                    <p style={{lineHeight: '2px', paddingLeft: '0px', fontSize: '32px'}}><b>EQUIPMENT LIST</b></p>


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

                  <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={{ whiteSpace: 'normal' }} width='150px'  dataField='equipmentName' isKey filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Equipment Name</TableHeaderColumn>
                  <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={{ whiteSpace: 'normal' }} width='150px'  dataField='equipmentType' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Equipment Type</TableHeaderColumn>
                  <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={{ whiteSpace: 'normal' }} width='150px'  dataField='equipmentManf' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Equipment Manufacturer</TableHeaderColumn>
                  <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={{ whiteSpace: 'normal' }} width='150px'  dataField='equipmentArea' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Equipment Area</TableHeaderColumn>
                  <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={{ whiteSpace: 'normal' }} width='150px' dataField='equipmentNotes' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Equipment Notes</TableHeaderColumn>


            <TableHeaderColumn
                  dataField='button'
                  width={45}
                  dataFormat={this.editRow.bind(this)}
                  >Edit</TableHeaderColumn>

              <TableHeaderColumn
                    dataField='button'
                      width={45}
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
