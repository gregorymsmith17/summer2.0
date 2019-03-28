import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, Radio,  Table, Popover, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import firebase from 'firebase';
import { fire } from '../../fire';
import FileUploader from "react-firebase-file-uploader";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { compose, withHandlers, setPropTypes } from 'recompose';
import { firebaseConnect } from 'react-redux-firebase';
import Dropzone from 'react-dropzone';
import { TiArrowSortedDown, TiPencil, TiTrash, TiDownload } from "react-icons/ti";
import {BootstrapTable, BootstrapButton, TableHeaderColumn, ExportCSVButton} from 'react-bootstrap-table';

import { Row, Col, Tabs, message, Card, Drawer, Menu, Icon, Dropdown, Button, Layout, Carousel, Upload, Progress } from 'antd';

const styles = {
  topPad: {
    paddingTop: "20px",
  },
  leftPad: {
    paddingLeft: "20px",
  },
};






const TabPane = Tabs.TabPane;

export default class reports extends Component {

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
        fileID: "",
        blob: null,
        file: null,
        blobUrl: null,
        upload: '',
        downloadURL: "",
        hover: false,
        border: '1px dashed gray',
        progressDisplay: 'none',
        currentProject: '',
        currentCompany: '',


      }

this.handleChange = this.handleChange.bind(this);

    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });

    }

  componentDidMount() {


  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

    this.setState({
      userID: user.uid,

    })


    const currentCompanyRef = fire.database().ref(`users/${user.uid}`);
    currentCompanyRef.on('value', (snapshot) => {
    this.setState({
      currentCompany: snapshot.child('currentCompany').val(),
    });

    const currentProjectRef = fire.database().ref(`${this.state.currentCompany}/currentProject`);
    currentProjectRef.on('value', (snapshot) => {
      let project = snapshot.child('currentProject').val();
      console.log(project);
      this.setState({
        currentProject: project
      })

      const samplesRef = fire.database().ref(`${this.state.currentCompany}/${this.state.currentProject}/Reports`);
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
});


});





  }




  removeReport(itemId) {
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`${this.state.currentCompany}/${this.state.currentProject}/Reports/${itemId}`);
    sampleRef.remove();
  });
  }



  deleteReport(row, isSelected, e, id) {

    return (
      <div style={{textAlign: 'center'}}>
      <Icon type="delete" style={{fontSize: '24px'}}
      onClick={() => this.removeReport(`${isSelected.id}`)}>
        Click me
      </Icon>
      </div>

    )
  }

  downloadItem(row, isSelected, e, id) {

    return (
        <div style={{textAlign: 'center'}}>
      <Icon type="download" style={{fontSize: '24px'}}
      onClick={() => window.open(`${isSelected.downloadLink}`, "_blank")}><p>Download Page</p>

      </Icon>
      </div>
    )
  }



  onDrag = event => {
    event.preventDefault()
    this.setState({ hover: true,
    border: '4px dashed #1890ff'  });
  }

  onDrop = event => {
    event.preventDefault()
    let file = event.dataTransfer.files[0]

      this.setState({ file: file, upload: 0, fileText: file.name, progressDisplay: null,  })
      console.log(file);

      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
        var filename = this.state.file.name;
        var storageRef = firebase.storage().ref('/Reports/' + filename);
        var uploadTask = storageRef.put(this.state.file);
        var filename = this.state.file.name;



        // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        this.setState({ upload: parseFloat(progress).toFixed(1) });
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        // Handle unsuccessful uploads
      }, () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        message.success(`${this.state.file.name} file uploaded successfully.`);
        uploadTask.snapshot.ref.getDownloadURL().then( (downloadURL) => {
          console.log('File available at', downloadURL);
          this.setState({ downloadURL: downloadURL, documentType: 'Reports', })

           const samplesRef = fire.database().ref(`${this.state.currentCompany}/${this.state.currentProject}/Reports`);
           const metaDataReport = {
             downloadLink: this.state.downloadURL,
             filename: this.state.file.name,
             documentType: this.state.documentType
           }
           samplesRef.push(metaDataReport);
           console.log(metaDataReport);


        });
      });

      })



  }




hoverOn = () => {
      this.setState({ hover: true,
      border: '4px dashed #1890ff'  });
    }
hoverOff = () =>{
  this.setState({ hover: false,
  border: '1px dashed gray' });
}

onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file);
    this.setState({ file: file, upload: 0, fileText: file.name, progressDisplay: null,  })

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      var filename = this.state.file.name;
      var storageRef = firebase.storage().ref('/Reports/' + filename);
      var uploadTask = storageRef.put(this.state.file);
      var filename = this.state.file.name;



      // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      this.setState({ upload: parseFloat(progress).toFixed(1) });
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
    }, () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      message.success(`${this.state.file.name} file uploaded successfully.`);
      uploadTask.snapshot.ref.getDownloadURL().then( (downloadURL) => {
        console.log('File available at', downloadURL);
        this.setState({ downloadURL: downloadURL, documentType: 'Reports', })

         const samplesRef = fire.database().ref(`${this.state.currentCompany}/${this.state.currentProject}/Reports`);
         const metaDataReport = {
           downloadLink: this.state.downloadURL,
           filename: this.state.file.name,
           documentType: this.state.documentType
         }
         samplesRef.push(metaDataReport);
         console.log(metaDataReport);


      });
    });

    })

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

fillStates = (itemId) => {
  let area = '';
  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
  const sampleRef = fire.database().ref(`${this.state.currentCompany}/${this.state.currentProject}/Reports/${itemId}`);

  let id = fire.database().ref().child(`${this.state.currentCompany}/${this.state.currentProject}/Reports/${itemId}`).key;

  sampleRef.on('value', (snapshot) => {

    this.setState({
      visible1: true,
      downloadLink: '',
      filename: '',
      documentType: '',
      id: id,


    });

  let orders = snapshot.val();
  let id = fire.database().ref().child(`${this.state.currentCompany}/${this.state.currentProject}/Reports/${itemId}`).key;

  let newState = [];
  for (let order in orders) {
    newState.push({
      id: order,

      downloadLink: orders[order].downloadLink,
      filename: orders[order].filename,
      documentType: orders[order].documentType,


    });
  }
  this.setState({

    id: id,


    downloadLink: snapshot.child('downloadLink').val(),
    filename: snapshot.child('filename').val(),
    documentType: snapshot.child('documentType').val(),



  })


});

});
}

writeData = (e) => {
  e.preventDefault();
  //fire.database().ref('samples') refers to the main title of the fire database.
  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
  const samplesRef = fire.database().ref(`${this.state.currentCompany}/${this.state.currentProject}/Reports/${this.state.id}`);





  const metaDataReport = {


    downloadLink: this.state.downloadLink,
    filename: this.state.filename,
    documentType: this.state.documentType,

  }

  samplesRef.set(metaDataReport);

  this.setState({
    visible1: false,
  })


});
}

onClose = () => {
  this.setState({
    visible: false,
    visible1: false,
    visible2: false,
  });
};



  render() {





    return (
      <Layout>
        <Drawer
          title= "Edit File Name"
          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible1}
          width={500}
        >
          <form>
            <Row style={{textAlign: 'right'}}>
            <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Sample</Icon>
            </Row>
            <Row>
      <FormGroup>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>File Name</b></Col>
        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
        <FormControl name="filename" onChange={this.handleChange} type="text" placeholder="File" value={this.state.filename} /></Col>
      </FormGroup>
      </Row>





    <Row style={{paddingTop: '10px', textAlign: 'right'}}>
    <Button type="primary" onClick={this.writeData} bsStyle="primary">Edit File Name</Button>
    </Row>





    </form>
        </Drawer>
        <input id="myInput"
   type="file"
   ref={(ref) => this.upload = ref}
   style={{display: 'none'}}
   onChange={this.onChangeFile.bind(this)}
/>

        <div style={{ background: '#F4F7FA', padding: '5px' }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <div style={{position: 'relative'}}>
        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <h1><b>REPORTS</b></h1>

        </Col>


      </div>
        </Row>

        </div>

        <div style={{ background: '#F4F7FA', paddingTop: '15px', paddingRight: '5px', paddingLeft: '5px' }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>


              <Card


              >

            <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Row>

            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{paddingTop: '20px'}}>

                <p style={{lineHeight: '2px', paddingLeft: '0px', fontSize: '32px'}}><b>UPLOAD REPORTS</b></p>



          </Col>
        </Row>



              <Row style={{paddingTop: '15px', align: 'center',}}>

                <Col  xs={24} sm={24} md={{ span: 18, offset: 4 }} lg={{ span: 18, offset: 4  }} xl={{ span: 18, offset: 4  }}>




                      <div
                      onMouseEnter={this.hoverOn}
                      onMouseLeave={this.hoverOff}
                      onClick={()=>{this.upload.click()}}
                      style={{
                        border: this.state.border,
                        position: 'relative',
                        transition: 'border-color 0.3s',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        textAlign: 'center',
                        width: '90%',
                        height: '200%',

                        backgroundColor: '#fafafa',
}} onDragOver={this.onDrag} onDrop={this.onDrop}>
<div style={{
    verticalAlign: 'middle', textAlign: 'center',}}>

                  <Icon style={{fontSize: '54px', color: '#1890ff', paddingTop: '5px'}} type="inbox" />
                  <p><b>Drop a Report!</b></p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>

                  </div>
                </div>
                </Col>


                <div >

                  <Col style={{paddingTop: '15px', textAlign: 'center',}} xs={24} sm={24} md={24} lg={24} xl={24} >

                  <b><Progress style={{display: this.state.progressDisplay}} type="dashboard" percent={this.state.upload} /></b>
                  </Col>
                  <Col style={{paddingTop: '15px', textAlign: 'center',}} xs={24} sm={24} md={24} lg={24} xl={24} >
              <b>{this.state.fileText}</b>
              </Col>
              </div>




            </Row>



    <Row>



            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={styles.topPad}>
              <h3>Reports</h3>
            <BootstrapTable
            data={ this.state.reports}
            pagination
            >

    <TableHeaderColumn width='350px'
      dataField='filename' isKey

      filter={ { type: 'RegexFilter', delay: 1000 }  } dataSort
      >File Name</TableHeaderColumn>
    <TableHeaderColumn width='80px'
            dataField='button'
            dataFormat={this.downloadItem.bind(this)}
            >Download File</TableHeaderColumn>
          <TableHeaderColumn width='80px'
            dataField='button'
            dataFormat={this.deleteReport.bind(this)}
            >Delete File</TableHeaderColumn>
            <TableHeaderColumn
            dataField='button'
            dataFormat={this.editRow.bind(this)}
            width='80px'
            >Edit</TableHeaderColumn>
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



              </Card>
        </Col>
        </Row>
        </div>





      </Layout>

    );
  }
}
