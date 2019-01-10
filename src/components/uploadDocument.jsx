import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';
import { Jumbotron, Grid, Table, Row, ButtonToolbar, MenuItem, DropdownButton, Col, Image, Button } from 'react-bootstrap';
import firebase from 'firebase';
import { fire } from '../fire';
import FileUploader from "react-firebase-file-uploader";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { compose, withHandlers, setPropTypes } from 'recompose';
import { firebaseConnect } from 'react-redux-firebase';
import Dropzone from 'react-dropzone';
import { TiArrowSortedDown, TiPencil, TiTrash, TiDownload } from "react-icons/ti";
import {BootstrapTable, BootstrapButton, TableHeaderColumn, ExportCSVButton} from 'react-bootstrap-table';



const styles = {
  topPad: {
    paddingTop: "20px",
  },
  leftPad: {
    paddingLeft: "20px",
  },
};



export default class uploadDocument extends Component {

  constructor() {
      super();
      this.state = {

        username: "",
        avatar: "",
        isUploading: false,
        progress: 0,
        avatarURL: "",
        userID: "",
        filename: "",
        orders: [],
        reports: [],
        drawings: [],

        documentType: "",


      }



    }




  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, filename: filename, progress: 100, isUploading: false });
    firebase.storage().ref(this.state.documentType).child(filename).getDownloadURL().then(url => this.setState({ avatarURL: url }));
  };

  addPermit = () => {
    this.setState({
      documentType: 'permit',
      avatarURL: this.state.avatarURL,
     });
     console.log(this.state.avatarURL);
     this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
     const samplesRef = fire.database().ref(`permits/${user.uid}`);
     const metaDataPermit = {
       downloadLink: this.state.avatarURL,
       filename: this.state.filename,
       documentType: this.state.documentType
     }
     samplesRef.push(metaDataPermit);
     });
  }
  addReport = () => {
    this.setState({
      documentType: 'reports',
      avatarURL: this.state.avatarURL,
     });
     console.log(this.state.avatarURL);
     this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
     const samplesRef = fire.database().ref(`reports/${user.uid}`);
     const metaDataReport = {
       downloadLink: this.state.avatarURL,
       filename: this.state.filename,
       documentType: this.state.documentType
     }
     samplesRef.push(metaDataReport);
     });
  }
  addDrawings = () => {
    this.setState({
      documentType: 'drawings',
      avatarURL: this.state.avatarURL,
     });
     console.log(this.state.avatarURL);
     this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
     const samplesRef = fire.database().ref(`drawings/${user.uid}`);
     const metaDataDrawings = {
       downloadLink: this.state.avatarURL,
       filename: this.state.filename,
       documentType: this.state.documentType
     }
     samplesRef.push(metaDataDrawings);
     });
  }
  addEquipmentManual = () => {
    this.setState({
      avatarURL: this.state.avatarURL,
     });
     console.log(this.state.avatarURL);
     this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
     const samplesRef = fire.database().ref(`equipmentManual/${user.uid}`);
     const metaDataEquipmentManual = {
       downloadLink: this.state.avatarURL,
       filename: this.state.filename,
       documentType: this.state.documentType
     }
     samplesRef.push(metaDataEquipmentManual);
     });
  }

  componentDidMount() {

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const samplesRef = fire.database().ref(`permits/${user.uid}`);
      samplesRef.on('value', (snapshot) => {
      let orders = snapshot.val();
      console.log(orders);
      let newState = [];
      for (let order in orders) {
        newState.push({
          id: order,
          downloadLink: orders[order].downloadLink,
          filename: orders[order].filename,
        });
      }
      this.setState({
        orders: newState,
      });
    });
  });
  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const samplesRef = fire.database().ref(`reports/${user.uid}`);
    samplesRef.on('value', (snapshot) => {
    let reports = snapshot.val();
    console.log(reports);
    let newState = [];
    for (let report in reports) {
      newState.push({
        id: report,
        downloadLink: reports[report].downloadLink,
        filename: reports[report].filename,
      });
    }
    this.setState({
      reports: newState,
    });
  });
});

this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
  const samplesRef = fire.database().ref(`drawings/${user.uid}`);
  samplesRef.on('value', (snapshot) => {
  let drawings = snapshot.val();
  console.log(drawings);
  let newState = [];
  for (let drawing in drawings) {
    newState.push({
      id: drawing,
      downloadLink: drawings[drawing].downloadLink,
      filename: drawings[drawing].filename,
    });
  }
  this.setState({
    drawings: newState,
  });
});
});


  }



  removesample(itemId) {
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/permits/${user.uid}/${itemId}`);
    sampleRef.remove();
  });
  }
  removeReport(itemId) {
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/reports/${user.uid}/${itemId}`);
    sampleRef.remove();
  });
  }
  removeDrawing(itemId) {
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/drawings/${user.uid}/${itemId}`);
    sampleRef.remove();
  });
  }

  deleteDrawing(row, isSelected, e, id) {
    console.log(`${isSelected.id}`);
    return (
      <TiTrash size={25} type="button"
      onClick={() => this.removeDrawing(`${isSelected.id}`)}>
        Click me
      </TiTrash>
    )
  }
  deleteReport(row, isSelected, e, id) {
    console.log(`${isSelected.id}`);
    return (
      <TiTrash size={25} type="button"
      onClick={() => this.removeReport(`${isSelected.id}`)}>
        Click me
      </TiTrash>
    )
  }

  editRow(row, isSelected, e, id) {
    console.log(`${isSelected.downloadLink}`);
    return (
      <TiDownload size={25} onClick={()=> window.open(`${isSelected.downloadLink}`, "_blank")}><p>Download Page</p></TiDownload>
    )
  }





  onDrag = event => {
    event.preventDefault()
  }

  onDrop = event => {
    event.preventDefault()
    let file = event.dataTransfer.files[0]
    this.setState({ file })

  }







  render() {
    return (
      <div>
        <Grid >
          <Row>
        <form>


        <h1>Upload Documents</h1>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          <h3>{this.state.filename}</h3>







            <div style={{ height: 80, width: 500, textAlign: 'center', border: '1px dashed black'}}>
              <strong>Drag a file here!</strong>
            <FileUploader
              name="avatar"
              style={{ height: 80, width: 500, dataAlign: 'center',}}

              filename={file => file.name.split('.')[0] }
              storageRef={firebase.storage().ref(this.state.documentType)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
          </div>



        </form>
        </Row>
        <Row>

          <Col xs={2} sm={2} md={2} style={styles.topPad}>
        <Button bsStyle="primary" onClick={this.addPermit}>Add Report</Button>
        </Col>
        <Col smOffset={.1} xs={2} sm={2} md={2} style={styles.topPad}>
      <Button bsStyle="primary" onClick={this.addDrawing}>Add Drawings</Button>
      </Col>
</Row>
<Row>



        <Col xs={8} sm={8} md={8} style={styles.topPad}>
          <h3>Reports</h3>
        <BootstrapTable
        data={ this.state.reports}
        pagination
        >

<TableHeaderColumn
  dataField='filename' isKey

  filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort
  >Sample Date</TableHeaderColumn>
  <TableHeaderColumn
        dataField='button'
        dataFormat={this.editRow.bind(this)}
        >Download File</TableHeaderColumn>
  <TableHeaderColumn
        dataField='button'
        dataFormat={this.deleteReport.bind(this)}
        >Delete File</TableHeaderColumn>
        </BootstrapTable>
      </Col>


        <Col xs={8} sm={8} md={8} style={styles.topPad}>
          <h3>Drawings</h3>
        <BootstrapTable
        data={ this.state.drawings}
        pagination
        >

<TableHeaderColumn
  dataField='filename' isKey
  dataSort
  filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort
  >Sample Date</TableHeaderColumn>
  <TableHeaderColumn
        dataField='button'
        dataFormat={this.editRow.bind(this)}
        >Download File</TableHeaderColumn>
  <TableHeaderColumn
        dataField='button'
        dataFormat={this.deleteDrawing.bind(this)}
        >Delete File</TableHeaderColumn>




        </BootstrapTable>
      </Col>
          </Row>
          </Grid>
      </div>
    );
  }
}
