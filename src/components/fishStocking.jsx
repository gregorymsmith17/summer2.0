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



export default class fishStocking extends Component {


    constructor(props) {
        super(props);
        this.state = {


          //Contact Form Inputs
          fishName: '',
          stockingArea: '',
          stockingDescription: '',
          stockingDate: '',
          stockingAmount: '',
          stockingNotes: '',

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
        const samplesRef = fire.database().ref(`stockingInformation/${user.uid}`);
        const orderID = fire.database().ref(`/stockingInformation/${user.uid}/${orderID}`);


        const stockingInfo = {

          fishName: this.state.fishName,
          stockingArea: this.state.stockingArea,
          stockingDescription: this.state.stockingDescription,
          stockingDate: this.state.stockingDate,
          stockingAmount: this.state.stockingAmount,
          stockingNotes: this.state.stockingNotes,

          id: this.state.id,
        }




        samplesRef.push(stockingInfo);
        //this.setState is used to clear the text boxes after the form has been submitted.
        this.setState({
          fishName: '',
          stockingArea: '',
          stockingDescription: '',
          stockingDate: '',
          stockingAmount: '',
          stockingNotes: '',

        });
      });
      console.log("test");
    }

      componentDidMount() {
        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
          const samplesRef = fire.database().ref(`stockingInformation/${user.uid}`);
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
              fishName: orders[order].fishName,
              stockingArea: orders[order].stockingArea,
              stockingDescription: orders[order].stockingDescription,
              stockingDate: orders[order].stockingDate,
              stockingAmount: orders[order].stockingAmount,
              stockingNotes: orders[order].stockingNotes,
            });
            newState2.push({
              id: order,
              fishName: orders[order].fishName,
              stockingArea: orders[order].stockingArea,
              stockingDescription: orders[order].stockingDescription,
              stockingDate: orders[order].stockingDate,
              stockingAmount: orders[order].stockingAmount,
              stockingNotes: orders[order].stockingNotes,
            });

          }

          newState2.sort(function(a, b) {

            if (a.stockingDate === b.stockingDate) {
              return 0;
            }
            return a.stockingDate > b.stockingDate ? 1 : -1;
        });
        newState.sort(function(a, b) {

          if (b.stockingDate === a.stockingDate) {
            return 0;
          }
          return b.stockingDate > a.stockingDate ? 1 : -1;
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
      const sampleRef = fire.database().ref(`/stockingInformation/${user.uid}/${itemId}`);

      sampleRef.on('value', (snapshot) => {

        this.setState({
          fishName: '',
          stockingArea: '',
          stockingDescription: '',
          stockingDate: '',
          stockingAmount: '',
          stockingNotes: '',

        });

      let orders = snapshot.val();
      let id = fire.database().ref().child(`/stockingInformation/${user.uid}/${itemId}`).key;

      let newState = [];
      for (let order in orders) {
        newState.push({
          id: order,

          fishName: orders[order].fishName,
          stockingArea: orders[order].stockingArea,
          stockingDescription: orders[order].stockingDescription,
          stockingDate: orders[order].stockingDate,
          stockingAmount: orders[order].stockingAmount,
          stockingNotes: orders[order].stockingNotes,

        });
      }
      this.setState({

        id: id,
        key: 4,

        fishName: snapshot.child('fishName').val(),
        stockingArea: snapshot.child('stockingArea').val(),
        stockingDescription: snapshot.child('stockingDescription').val(),
        stockingDate: snapshot.child('stockingDate').val(),
        stockingAmount: snapshot.child('stockingAmount').val(),
        stockingNotes: snapshot.child('stockingNotes').val(),

      })

});

    });
  }


  writeStates = (itemId) => {

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/stockingInformation/${user.uid}/${this.state.id}`);


    sampleRef.child("id").set(this.state.id);

    sampleRef.child("fishName").set(this.state.fishName);
    sampleRef.child("stockingArea").set(this.state.stockingArea);
    sampleRef.child("stockingDescription").set(this.state.stockingDescription);
    sampleRef.child("stockingDate").set(this.state.stockingDate);
    sampleRef.child("stockingAmount").set(this.state.stockingAmount);
    sampleRef.child("stockingNotes").set(this.state.stockingNotes);

  });


  }



  fillEmpty(itemId) {
    let area = '';
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/stockingInformation/${user.uid}/${itemId}`);


    sampleRef.on('value', (snapshot) => {

    let orders = snapshot.val();

    let newState = [];
    for (let order in orders) {
      newState.push({
        id: order,

        fishName: orders[order].fishName,
        stockingArea: orders[order].stockingArea,
        stockingDescription: orders[order].stockingDescription,
        stockingDate: orders[order].stockingDate,
        stockingAmount: orders[order].stockingAmount,
        stockingNotes: orders[order].stockingNotes,

      });
    }
    this.setState({

      id: '',
      key: 3,
      fishName: '',
      stockingArea: '',
      stockingDescription: '',
      stockingDate: '',
      stockingAmount: '',
      stockingNotes: '',


    })


});
  });
}

  createNewWorkOrder (itemId) {

      let area = '';
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const sampleRef = fire.database().ref(`/stockingInformation/${user.uid}/${itemId}`);

      sampleRef.on('value', (snapshot) => {

      let orders = snapshot.val();

      let newState = [];
      for (let order in orders) {
        newState.push({
          id: order,

          fishName: orders[order].fishName,
          stockingArea: orders[order].stockingArea,
          stockingDescription: orders[order].stockingDescription,
          stockingDate: orders[order].stockingDate,
          stockingAmount: orders[order].stockingAmount,
          stockingNotes: orders[order].stockingNotes,

        });
      }
      this.setState({

        id: snapshot.child('id').val(),
        key: 3,

        fishName: snapshot.child('fishName').val(),
        stockingArea: snapshot.child('stockingArea').val(),
        stockingDescription: snapshot.child('stockingDescription').val(),
        stockingDate: snapshot.child('stockingDate').val(),
        stockingAmount: snapshot.child('stockingAmount').val(),
        stockingNotes: snapshot.child('stockingNotes').val(),

      })


      });
    });
  }

    removesample(itemId) {
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const sampleRef = fire.database().ref(`/stockingInformation/${user.uid}/${itemId}`);
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
  const samplesRef = fire.database().ref(`stockingInformation/${user.uid}`);
  const orderID = fire.database().ref(`/stockingInformation/${user.uid}/${this.state.id}`);
  const newCheckboxKey = firebase.database().ref().child('checkbox').push().key;

  let id = newCheckboxKey;
  let box = id;


  const stockingInfo = {

    id: this.state.id,
    fishName: this.state.fishName,
    stockingArea: this.state.stockingArea,
    stockingDescription: this.state.stockingDescription,
    stockingDate: this.state.stockingDate,
    stockingAmount: this.state.stockingAmount,
    stockingNotes: this.state.stockingNotes,
  }

  samplesRef.child(this.state.id).set(stockingInfo);


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
          <h3>Fish Stocking</h3>

          </Col>
          <Col xs={6} md={6}>
            <ButtonToolbar style={styles.topPad}>
          <Button bsStyle="primary"  onClick={() => this.fillEmpty()} eventKey={3} bsSize="large">+ Create Stocking Event</Button>
        </ButtonToolbar>
          </Col>
          </Row>
          <Col xs={12} sm={10} md={10}>


      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} defaultActiveKey={1} id="uncontrolled-tab-example">



        <Tab eventKey={1} title="+ Fish Stocking">
          <Grid>

          <Row style={styles.topPad}>



            <Col xs={10} sm={10} md={10} lg={10}>


              <BootstrapTable
              data={ this.state.dataList }
              options={options}
              exportCSV
              pagination


              >

              <TableHeaderColumn dataField='fishName'  filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Fish Species</TableHeaderColumn>
              <TableHeaderColumn dataField='stockingDate' isKey filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Stocking Date</TableHeaderColumn>
              <TableHeaderColumn dataField='stockingArea' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Stocking Area</TableHeaderColumn>
              <TableHeaderColumn dataField='stockingDescription' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Company Description</TableHeaderColumn>

              <TableHeaderColumn dataField='stockingAmount' filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort>Stocking Amount</TableHeaderColumn>


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
                <h2>Fish Stocking</h2>
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
  <td>Fish Species</td>
  <td><input type="text" name="fishName" placeholder="Fish Species" onChange={this.handleChange} value={this.state.fishName} /></td>
  </tr>
  <tr>
  <td>Stocking Date</td>
  <td><input type="date" name="stockingDate" placeholder="Stocking Date" onChange={this.handleChange} value={this.state.stockingDate} /></td>
  </tr>
  <tr>
  <td>Stocking Area</td>
  <td><input type="text" name="stockingArea" placeholder="Stocking Area" onChange={this.handleChange} value={this.state.stockingArea} /></td>
  </tr>
  <tr>
  <td>Stocking Description</td>
  <td><textarea  type="textArea"  style={{ height: 80, width: 600}}  name="stockingDescription" placeholder="Stocking Description" onChange={this.handleChange} value={this.state.stockingDescription}></textarea></td>
  </tr>
  <tr>
  <td>Stocking Amount</td>
  <td><input type="text" name="stockingAmount" placeholder="Stocking Amount" onChange={this.handleChange} value={this.state.stockingAmount} /></td>
  </tr>

  <tr>
  <td>Stocking Notes</td>
  <td><textarea  type="textArea"  style={{ height: 80, width: 600}}  name="stockingNotes" placeholder="Stocking Notes" onChange={this.handleChange} value={this.state.stockingNotes}></textarea></td>
  </tr>


  </tbody>
  </Table>

</Col>
                  </Row>

                  <Row>
                  <Col xs={10} sm={10} md={10}>
            <Button onClick={this.handleSubmit} bsStyle="primary">Add Stocking Event</Button>
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
                <h2>Fish Stocking</h2>
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
  <td>Fish Species</td>
  <td><input type="text" name="fishName" placeholder="Fish Species" onChange={this.handleChange} value={this.state.fishName} /></td>
  </tr>
  <tr>
  <td>Stocking Date</td>
  <td><input type="date" name="stockingDate" placeholder="Stocking Date" onChange={this.handleChange} value={this.state.stockingDate} /></td>
  </tr>
  <tr>
  <td>Stocking Area</td>
  <td><input type="text" name="stockingArea" placeholder="Stocking Area" onChange={this.handleChange} value={this.state.stockingArea} /></td>
  </tr>
  <tr>
  <td>Stocking Description</td>
  <td><textarea  type="textArea"  style={{ height: 80, width: 600}}  name="stockingDescription" placeholder="Stocking Description" onChange={this.handleChange} value={this.state.stockingDescription}></textarea></td>
  </tr>
  <tr>
  <td>Stocking Amount</td>
  <td><input type="text" name="stockingAmount" placeholder="Stocking Amount" onChange={this.handleChange} value={this.state.stockingAmount} /></td>
  </tr>

  <tr>
  <td>Stocking Notes</td>
  <td><textarea  type="textArea"  style={{ height: 80, width: 600}}  name="stockingNotes" placeholder="Stocking Notes" onChange={this.handleChange} value={this.state.stockingNotes}></textarea></td>
  </tr>


  </tbody>
  </Table>

</Col>
                  </Row>

                  <Row>
                  <Col xs={10} sm={10} md={10}>
            <Button onClick={this.writeData} bsStyle="primary">Overwrite Stocking</Button>
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