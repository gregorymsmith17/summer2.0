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


          //Contact Form Inputs
          vendorName: '',
          vendorCompany: '',
          vendorCompanyDescription: '',
          vendorEmail: '',
          vendorPhone: '',
          vendorNotes: '',

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
        const samplesRef = fire.database().ref(`vendorContacts/${user.uid}`);
        const orderID = fire.database().ref(`/vendorContacts/${user.uid}/${orderID}`);


        const vendorContact = {

          vendorName: this.state.vendorName,
          vendorCompany: this.state.vendorCompany,
          vendorCompanyDescription: this.state.vendorCompanyDescription,
          vendorEmail: this.state.vendorEmail,
          vendorPhone: this.state.vendorPhone,
          vendorNotes: this.state.vendorNotes,

          id: this.state.id,
        }




        samplesRef.push(vendorContact);
        //this.setState is used to clear the text boxes after the form has been submitted.
        this.setState({
          vendorName: '',
          vendorCompany: '',
          vendorCompanyDescription: '',
          vendorEmail: '',
          vendorPhone: '',
          vendorNotes: '',

        });
      });
      console.log("test");
    }

      componentDidMount() {
        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
          const samplesRef = fire.database().ref(`vendorContacts/${user.uid}`);
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
              vendorName: orders[order].vendorName,
              vendorCompany: orders[order].vendorCompany,
              vendorCompanyDescription: orders[order].vendorCompanyDescription,
              vendorEmail: orders[order].vendorEmail,
              vendorPhone: orders[order].vendorPhone,
              vendorNotes: orders[order].vendorNotes,
            });
            newState2.push({
              id: order,
              vendorName: orders[order].vendorName,
              vendorCompany: orders[order].vendorCompany,
              vendorCompanyDescription: orders[order].vendorCompanyDescription,
              vendorEmail: orders[order].vendorEmail,
              vendorPhone: orders[order].vendorPhone,
              vendorNotes: orders[order].vendorNotes,
            });

          }

          newState2.sort(function(a, b) {

            if (a.vendorName === b.vendorName) {
              return 0;
            }
            return a.vendorName > b.vendorName ? 1 : -1;
        });
        newState.sort(function(a, b) {

          if (b.vendorName === a.vendorName) {
            return 0;
          }
          return b.vendorName > a.vendorName ? 1 : -1;
      });

          this.setState({
            orders: newState,
            orders2: newState2,
            dataList: newState,
          });


        });

      });


    }



    fillStates(itemId) {
      let area = '';
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const sampleRef = fire.database().ref(`/vendorContacts/${user.uid}/${itemId}`);

      sampleRef.on('value', (snapshot) => {

        this.setState({
          vendorName: '',
          vendorCompany: '',
          vendorCompanyDescription: '',
          vendorEmail: '',
          vendorPhone: '',
          vendorNotes: '',

        });

      let orders = snapshot.val();
      let id = fire.database().ref().child(`/vendorContacts/${user.uid}/${itemId}`).key;

      let newState = [];
      for (let order in orders) {
        newState.push({
          id: order,

          vendorName: orders[order].vendorName,
          vendorCompany: orders[order].vendorCompany,
          vendorCompanyDescription: orders[order].vendorCompanyDescription,
          vendorEmail: orders[order].vendorEmail,
          vendorPhone: orders[order].vendorPhone,
          vendorNotes: orders[order].vendorNotes,

        });
      }
      this.setState({

        id: id,
        key: 4,

        vendorName: snapshot.child('vendorName').val(),
        vendorCompany: snapshot.child('vendorCompany').val(),
        vendorCompanyDescription: snapshot.child('vendorCompanyDescription').val(),
        vendorEmail: snapshot.child('vendorEmail').val(),
        vendorPhone: snapshot.child('vendorPhone').val(),
        vendorNotes: snapshot.child('vendorNotes').val(),

      })

});

    });
  }


  writeStates = (itemId) => {

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/vendorContacts/${user.uid}/${this.state.id}`);


    sampleRef.child("id").set(this.state.id);

    sampleRef.child("vendorName").set(this.state.vendorName);
    sampleRef.child("vendorCompany").set(this.state.vendorCompany);
    sampleRef.child("vendorCompanyDescription").set(this.state.vendorCompanyDescription);
    sampleRef.child("vendorEmail").set(this.state.vendorEmail);
    sampleRef.child("vendorPhone").set(this.state.vendorPhone);
    sampleRef.child("vendorNotes").set(this.state.vendorNotes);

  });


  }



  fillEmpty(itemId) {
    let area = '';
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/vendorContacts/${user.uid}/${itemId}`);


    sampleRef.on('value', (snapshot) => {

    let orders = snapshot.val();

    let newState = [];
    for (let order in orders) {
      newState.push({
        id: order,

        vendorName: orders[order].vendorName,
        vendorCompany: orders[order].vendorCompany,
        vendorCompanyDescription: orders[order].vendorCompanyDescription,
        vendorEmail: orders[order].vendorEmail,
        vendorPhone: orders[order].vendorPhone,
        vendorNotes: orders[order].vendorNotes,

      });
    }
    this.setState({

      id: '',
      key: 3,
      vendorName: '',
      vendorCompany: '',
      vendorCompanyDescription: '',
      vendorEmail: '',
      vendorPhone: '',
      vendorNotes: '',


    })


});
  });
}

  createNewWorkOrder (itemId) {

      let area = '';
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const sampleRef = fire.database().ref(`/vendorContacts/${user.uid}/${itemId}`);

      sampleRef.on('value', (snapshot) => {

      let orders = snapshot.val();

      let newState = [];
      for (let order in orders) {
        newState.push({
          id: order,

          vendorName: orders[order].vendorName,
          vendorCompany: orders[order].vendorCompany,
          vendorCompanyDescription: orders[order].vendorCompanyDescription,
          vendorEmail: orders[order].vendorEmail,
          vendorPhone: orders[order].vendorPhone,
          vendorNotes: orders[order].vendorNotes,

        });
      }
      this.setState({

        id: snapshot.child('id').val(),
        key: 3,

        vendorName: snapshot.child('vendorName').val(),
        vendorCompany: snapshot.child('vendorCompany').val(),
        vendorCompanyDescription: snapshot.child('vendorCompanyDescription').val(),
        vendorEmail: snapshot.child('vendorEmail').val(),
        vendorPhone: snapshot.child('vendorPhone').val(),
        vendorNotes: snapshot.child('vendorNotes').val(),

      })


      });
    });
  }

    removesample(itemId) {
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const sampleRef = fire.database().ref(`/vendorContacts/${user.uid}/${itemId}`);
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
  const samplesRef = fire.database().ref(`vendorContacts/${user.uid}`);
  const orderID = fire.database().ref(`/vendorContacts/${user.uid}/${this.state.id}`);
  const newCheckboxKey = firebase.database().ref().child('checkbox').push().key;

  let id = newCheckboxKey;
  let box = id;


  const vendorContact = {

    id: this.state.id,
    vendorName: this.state.vendorName,
    vendorCompany: this.state.vendorCompany,
    vendorCompanyDescription: this.state.vendorCompanyDescription,
    vendorEmail: this.state.vendorEmail,
    vendorPhone: this.state.vendorPhone,
    vendorNotes: this.state.vendorNotes,
  }

  samplesRef.child(this.state.id).set(vendorContact);


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
          <h3>Vendor Contacts</h3>

          </Col>
          <Col xs={6} md={6}>
            <ButtonToolbar style={styles.topPad}>
          <Button bsStyle="primary"  onClick={() => this.fillEmpty()} eventKey={3} bsSize="large">+ Create Contact</Button>
        </ButtonToolbar>
          </Col>
          </Row>
          <Col xs={12} sm={10} md={10}>


      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} defaultActiveKey={1} id="uncontrolled-tab-example">



        <Tab eventKey={1} title="+ Vendor Contacts">
          <Grid>

          <Row style={styles.topPad}>



            <Col xs={10} sm={10} md={10} lg={10}>


              <BootstrapTable
              data={ this.state.dataList }
              options={options}
              exportCSV
              pagination


              >

              <TableHeaderColumn dataField='vendorName' isKey filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Vendor Name</TableHeaderColumn>
              <TableHeaderColumn dataField='vendorCompany' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Vendor Company</TableHeaderColumn>
              <TableHeaderColumn dataField='vendorCompanyDescription' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Company Description</TableHeaderColumn>
              <TableHeaderColumn dataField='vendorEmail' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Vendor Email</TableHeaderColumn>
              <TableHeaderColumn dataField='vendorPhone' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Vendor Phone</TableHeaderColumn>


        <TableHeaderColumn
              dataField='button'
              width={45}
              dataFormat={this.editRow.bind(this)}
              ></TableHeaderColumn>

          <TableHeaderColumn
                dataField='button'
                  width={45}
                dataFormat={this.deleteRow.bind(this)}
                ></TableHeaderColumn>


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
                <h2>Vendor Contact</h2>
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
  <td>Vendor Name</td>
  <td><input type="text" name="vendorName" placeholder="Vendor Name" onChange={this.handleChange} value={this.state.vendorName} /></td>
  </tr>
  <tr>
  <td>Vendor Company</td>
  <td><input type="text" name="vendorCompany" placeholder="Vendor Company" onChange={this.handleChange} value={this.state.vendorCompany} /></td>
  </tr>
  <tr>
  <td>Vendor Company Description</td>
  <td><input type="text" name="vendorCompanyDescription" placeholder="Vendor Company Description" onChange={this.handleChange} value={this.state.vendorCompanyDescription} /></td>
  </tr>
  <tr>
  <td>Vendor Email</td>
  <td><input type="text" name="vendorEmail" placeholder="Vendor Email" onChange={this.handleChange} value={this.state.vendorEmail} /></td>
  </tr>
  <tr>
  <td>Vendor Phone</td>
  <td><input type="text" name="vendorPhone" placeholder="Vendor Phone" onChange={this.handleChange} value={this.state.vendorPhone} /></td>
  </tr>

  <tr>
  <td>Vendor Notes</td>
  <td><input  type="textArea" style={{ height: 80, width: 400 }}  name="vendorNotes" placeholder="Sample Notes" onChange={this.handleChange} value={this.state.vendorNotes} /></td>
  </tr>


  </tbody>
  </Table>

</Col>
                  </Row>

                  <Row>
                  <Col xs={10} sm={10} md={10}>
            <Button onClick={this.handleSubmit} bsStyle="primary">Add Contact</Button>
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
                <h2>Vendor Contact</h2>
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
  <td>Vendor Name</td>
  <td><input type="text" name="vendorName" placeholder="Vendor Name" onChange={this.handleChange} value={this.state.vendorName} /></td>
  </tr>
  <tr>
  <td>Vendor Company</td>
  <td><input type="text" name="vendorCompany" placeholder="Vendor Company" onChange={this.handleChange} value={this.state.vendorCompany} /></td>
  </tr>
  <tr>
  <td>Vendor Company Description</td>
  <td><input type="text" name="vendorCompanyDescription" placeholder="Vendor Company Description" onChange={this.handleChange} value={this.state.vendorCompanyDescription} /></td>
  </tr>
  <tr>
  <td>Vendor Email</td>
  <td><input type="text" name="vendorEmail" placeholder="Vendor Email" onChange={this.handleChange} value={this.state.vendorEmail} /></td>
  </tr>
  <tr>
  <td>Vendor Phone</td>
  <td><input type="text" name="vendorPhone" placeholder="Vendor Phone" onChange={this.handleChange} value={this.state.vendorPhone} /></td>
  </tr>

  <tr>
  <td>Vendor Notes</td>
  <td><input  type="textArea" style={{ height: 80, width: 400 }}  name="vendorNotes" placeholder="Sample Notes" onChange={this.handleChange} value={this.state.vendorNotes} /></td>
  </tr>


  </tbody>
  </Table>

</Col>
                  </Row>

                  <Row>
                  <Col xs={10} sm={10} md={10}>
            <Button onClick={this.writeData} bsStyle="primary">Overwrite Contact</Button>
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
