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

  documentTypeEquipmentManual = () => {
    this.setState({
      documentType: 'equipmentManual',
    })

  }
  documentTypePermit = () => {
    this.setState({
      documentType: 'permit',
    })

  }
  documentTypeDrawings = () => {
    this.setState({
      documentType: 'drawings',
    })

  }
  documentTypeReports = () => {
    this.setState({
      documentType: 'reports',
    })

  }








  render() {
    return (
      <div>
        <Grid >
          <Row>
        <form>


        <label>File Name:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          <h3>{this.state.filename}</h3>




          <FileUploader
            name="avatar"
            filename={file => file.name.split('.')[0] }
            storageRef={firebase.storage().ref(this.state.documentType)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />

        </form>
        </Row>
        <Row>
          <Col xs={8} sm={8} md={8}>
        <ButtonToolbar>
          <DropdownButton label="Document Type" title={this.state.documentType} id="dropdown-size-medium">
            <MenuItem eventKey="1" onSelect={this.documentTypePermit}>Permit</MenuItem>
            <MenuItem eventKey="2" onSelect={this.documentTypeEquipmentManual}>Equipment Manual</MenuItem>
            <MenuItem eventKey="3" onSelect={this.documentTypeDrawings}>Drawings</MenuItem>
            <MenuItem eventKey="4" onSelect={this.documentTypeReports}>Reports</MenuItem>
          </DropdownButton>
        </ButtonToolbar>

        <button onClick={this.addPermit}>Add Permit</button>
        <button onClick={this.addReport}>Add Report</button>
        <button onClick={this.addDrawings}>Add Drawing</button>



          <h2>Permits</h2>
      <Table>
          {this.state.orders.map((order) => {

            return (
              <tr>
                  <td>{order.filename}</td>
                  <td><TiDownload size={25} onClick={()=> window.open(order.downloadLink, "_blank")}><p>Download Page</p></TiDownload></td>
                  <td><TiTrash size={25} onClick={() => this.removesample(order.id)}><p>Remove sample</p></TiTrash></td>
                  </tr>
            )
          })}
          </Table>
          <h2>Reports</h2>
      <Table>
          {this.state.reports.map((report) => {

            return (
              <tr>
                  <td>{report.filename}</td>
                  <td><TiDownload size={25} onClick={()=> window.open(report.downloadLink, "_blank")}><p>Download Page</p></TiDownload></td>
                  <td><TiTrash size={25} onClick={() => this.removeReport(report.id)}><p>Remove sample</p></TiTrash></td>
                  </tr>
            )
          })}
          </Table>
          <h2>Drawings</h2>
      <Table>
          {this.state.drawings.map((drawing) => {

            return (
              <tr>
                  <td>{drawing.filename}</td>
                  <td><TiDownload size={25} onClick={()=> window.open(drawing.downloadLink, "_blank")}><p>Download Page</p></TiDownload></td>
                  <td><TiTrash size={25} onClick={() => this.removeDrawing(drawing.id)}><p>Remove sample</p></TiTrash></td>
                  </tr>
            )
          })}
          </Table>
        </Col>
          </Row>
          </Grid>
      </div>
    );
  }
}
