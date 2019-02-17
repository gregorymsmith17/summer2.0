import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, Radio, Popover, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { Page, Text, View, Document, StyleSheet, Image,  PDFDownloadLink, Font,  } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

import './maintenanceReport.css';


import { fire } from '../../fire';


import domtoimage from 'dom-to-image';
import { SketchPicker } from 'react-color';
import fileDownload from "js-file-download";


import { ComposedChart, LineChart, LabelList, ResponsiveContainer, ReferenceArea, AreaChart, Brush, Area, Line, XAxis, YAxis, BarChart, Bar, CartesianGrid, Legend, Label} from 'recharts';

import { Row, Col, Tabs, Table, Divider, Tag, message, Card, Drawer, Menu, Dropdown, Button, Layout, Carousel, Input, Tooltip, Icon, Cascader, Select, AutoComplete, } from 'antd';
import Highlighter from 'react-highlight-words';
import { CSVLink, CSVDownload } from "react-csv";

const TabPane = Tabs.TabPane;

const { Option } = Select;


const styles = StyleSheet.create({
  page: {

    backgroundColor: '#E4E4E4'
  },
  section: {
    position: 'absolute',
    left: 20,
    top: 20,
    fontSize: 35,
    fontFamily: 'Muli',

  },
  section1: {
    position: 'absolute',
    top: 20,
    left: 300,

    fontSize: 35,
    fontFamily: 'Muli',

  }
  ,
  text: {
    fontFamily: 'Roboto',
  }
});

const Heading = styled.Text`
  margin: 10px;
  font-size: 22px;
  font-family: 'Helvetica';
`;






export default class maintenanceReports extends Component {


    constructor(props) {
        super(props);
        this.state = {
          userID: '',
          key: "1",
          snapArray: [],
          snapArray1: [],
          arrayData1: [],
          arrayData2: [],
          arrayKeys1: [],
          arrayKeys2: [],
          arrayValues2: [],

          Maintenance_Item: '',
          maintenanceDate: '',
          maintenanceTitle: '',
          maintenanceDescription: '',
          maintenanceID: '',

          currentData: [],

          overwriteDisplay: 'none',
          addDisplay: null,

          overwriteReport: 'none',
          addReport: null,

          inputAdd: null,
          inputOverwrite: 'none',


          tableKeys: [],
          searchText: '',
          selectedRowKeys: [], // Check here to configure the default column
          loading: false,



          url: null,
          blob: null,
          file:null,
          blobUrl: null,


          //for drawers
          visible: false,
          visible1: false,
          visible2: false,

          //Inputs for Profile Page
          lakeName: '',
          locationCity: '',
          locationState: '',
          managementContact: '',
          hoaContact: '',
          managementContactNumber: '',
          hoaContactNumber: '',







        }

        this.handleChange = this.handleChange.bind(this);



      }


      //event triggered when text boxes of forms, values are changed
      handleChange(e) {
        const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
        this.setState({
          [e.target.name]: e.target.value
        });



      }
      //event triggered when form is submitted


     snapshotToArray(snapshot) {
        var returnArr = [];

        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            returnArr.push(item);
        });

        return returnArr;
    };





      componentDidMount(itemId, source) {

        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

          this.setState({
            userID: user.uid,
          })



          const parameterList1Ref = fire.database().ref(`maintenanceReport/${user.uid}`);
          parameterList1Ref.on('value', (snapshot) => {
            let snapArray = this.snapshotToArray(snapshot);

            snapArray.sort(function(a, b) {
              if (b.date === a.date) {
                return 0;
              }
              return b.date > a.date ? 1 : -1;
            });

            let data = snapArray;
            console.log(data);

            if (snapArray.length == 0) {
              console.log("do nothing")
            }
            if (snapArray.length > 0) {

              let tableKeys = [];

              tableKeys.unshift({
              title: 'Description',
              dataIndex: 'Description',
              key: 'Description',
              ...this.getColumnSearchProps('Description'),
              sorter: (a, b) => { return a.Description.localeCompare(b.Description)},
              sortDirections: ['descend', 'ascend'],

              })


              tableKeys.unshift({
              title: 'Title',
              dataIndex: 'Title',
              key: 'Title',
              ...this.getColumnSearchProps('Title'),
              sorter: (a, b) => { return a.Title.localeCompare(b.Title)},
              sortDirections: ['descend', 'ascend'],

              })

              tableKeys.unshift({
              title: 'Date',
              dataIndex: 'date',
              key: 'date',
              ...this.getColumnSearchProps('date'),
              sorter: (a, b) => { return a.date.localeCompare(b.date)},
              sortDirections: ['descend', 'ascend'],
              width: 130,
              })

              tableKeys.unshift({
              title: 'ID #',
              dataIndex: 'ID',
              key: 'ID',
              ...this.getColumnSearchProps('ID'),
              sorter: (a, b) => { return a.ID.localeCompare(b.ID)},
              sortDirections: ['descend', 'ascend'],
              width: 80,
              })


              tableKeys.unshift({
                title: 'Edit',
                dataIndex: '',
                key: 'x',
                render: this.editRow.bind(this),
                width: 60,
                fixed: 'left',

              })

              tableKeys.unshift({

                title: 'Delete',
                dataIndex: '',
                key: 'y',
                render: this.deleteRow.bind(this),
                width: 60,
                fixed: 'left',

              })





              this.setState({
                snapArray: data,
                tableKeys: tableKeys,
              })



            }









             })

             const parameterList2Ref = fire.database().ref(`maintenanceList/${user.uid}`);
             parameterList2Ref.on('value', (snapshot) => {
               let maintenanceArray = this.snapshotToArray(snapshot);
               console.log(maintenanceArray)
               this.setState({
                 snapArray1: maintenanceArray,

               })
             })







          const profileRef = fire.database().ref(`profileInformation/${user.uid}`);
          profileRef.on('value', (snapshot) => {
            var that = this;


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
              lat: snapshot.child('latitude').val(),
              lng: snapshot.child('longitude').val()
            },

          });


        });



    })
  }




    handleSelect = (key) => {
  this.setState({key});
}



showDrawer = () => {
  this.setState({
    visible: true,
  });
};
onClose = () => {
  this.setState({
    visible: false,
    visible1: false,
    visible2: false,
  });
};






filter = (url) => {

  domtoimage.toBlob(document.getElementById('my-node'))
      .then((blob) => {

          const blobUrl = URL.createObjectURL(blob);
          this.setState({
            blobUrl: blobUrl,
          })
      });
}


start = () => {
  this.setState({ loading: true });
  // ajax request after empty completing
  setTimeout(() => {
    this.setState({
      selectedRowKeys: [],
      loading: false,
    });
  }, 1000);
}

onSelectChange = (selectedRowKeys) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  this.setState({ selectedRowKeys });
}

getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },

  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
    console.log(selectedKeys[0]);
    console.log(this.state.searchText);
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  deleteRow = (row, isSelected, e, id, key) =>
  {
    return (
      <div style={{textAlign: 'center'}}>
      <Icon type="delete" style={{fontSize: '24px', color: '#101441'}}
      onClick={() => this.removesample(isSelected.key)}>
        Click me
      </Icon>
      </div>
    )
  }
  removesample(itemId) {

   const sampleRef = fire.database().ref(`/maintenanceReport/${this.state.userID}/${itemId}`);
   sampleRef.remove();
 }


 deleteRow1 = (row, isSelected, e, id, key) =>
 {
   return (
     <div style={{textAlign: 'center'}}>
     <Icon type="delete" style={{fontSize: '24px'}}
     onClick={() => this.removesample1(isSelected.key)}>
       Click me
     </Icon>
     </div>
   )
 }
 removesample1(itemId) {

  const sampleRef = fire.database().ref(`/maintenanceList/${this.state.userID}/${itemId}`);
  sampleRef.remove();
}

removesample2(itemId) {

  const sampleRef = fire.database().ref(`/maintenanceReport/${this.state.userID}/${this.state.id}/${itemId}`);
  sampleRef.remove();
  this.fillStates(this.state.id);


}

  editRow = (row, isSelected, e, id, key) =>
  {
    return (
      <div style={{textAlign: 'center'}}>
      <Icon type="copy" style={{fontSize: '24px', color: '#101441'}}
      onClick={() => this.fillStates(isSelected.key)}>
        Click me
      </Icon>
      </div>
    )
  }


  fillParameterInfo = (e, itemId) => {
    e.preventDefault();
    //fire.database().ref('samples') refers to the main title of the fire database.
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const parameterListRef = fire.database().ref(`maintenanceList/${user.uid}`);
    let id = fire.database().ref().child(`/maintenanceList/${user.uid}/${itemId}`).key;
    const parameterInfo = {
      Maintenance_Item: this.state.Maintenance_Item,
      Maintenance_Input: '',
      id: id,

    }

    parameterListRef.push(parameterInfo);
    //this.setState is used to clear the text boxes after the form has been submitted.
    this.setState({
      Maintenance_Item: '',

    });

  });
  }

  handleSampleChange = idx => evt => {
    const newParameters = this.state.snapArray1.map((parameter, sidx) => {
      if (idx !== sidx) return parameter;
      return { ...parameter, Maintenance_Input: evt.target.value };
    });
    this.setState({ snapArray1: newParameters });



    };

    handleSampleChange1 = idx => evt => {
      const newParameters = this.state.arrayData2.map((parameter, sidx) => {
        if (idx !== sidx) return parameter;
        return { ...parameter, Maintenance_Input: evt.target.value };
      });
      this.setState({ arrayData2: newParameters });



      };


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }

      sampleSubmit = (e) => {
        e.preventDefault();
        //fire.database().ref('samples') refers to the main title of the fire database.
        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
        const parameterListRef = fire.database().ref(`maintenanceReport/${user.uid}`);


    var arr = this.state.snapArray1;
    console.log(arr);


    if (arr.length == 0){
      var object = {date: this.state.maintenanceDate, ID: this.state.maintenanceID, Title: this.state.maintenanceTitle, Description: this.state.maintenanceDescription}
      console.log(object);
      parameterListRef.push(object);
    }
    if (arr.length > 0){


      var object = arr.reduce(
          (obj, item) => Object.assign(obj, {date: this.state.maintenanceDate, ID: this.state.maintenanceID, Title: this.state.maintenanceTitle, Description: this.state.maintenanceDescription, [item.Maintenance_Item]: item.Maintenance_Input}) ,{});
          console.log(object);
          parameterListRef.push(object);

          const parameterList2Ref = fire.database().ref(`maintenanceList/${user.uid}`);
          parameterList2Ref.on('value', (snapshot) => {
            let maintenanceArray = this.snapshotToArray(snapshot);

            this.setState({
              snapArray1: maintenanceArray,

            })
          })
}




        //this.setState is used to clear the text boxes after the form has been submitted.
        this.setState({
          maintenanceDate: '',
          maintenanceID: '',
          maintenanceTitle: '',
          maintenanceDescription: '',

          visible: false,
          visible1: false,
          visible2: false,

        });

      });
      }

      fillStates(itemId) {

        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

          this.setState({
            overwriteReport: null,
            addReport: 'none',
            inputOverwrite: null,
            inputAdd: 'none',
            visible: true,

          })

        const sample1Ref = fire.database().ref(`/maintenanceReport/${user.uid}/${itemId}`);
        let id = fire.database().ref().child(`/maintenanceReport/${user.uid}/${itemId}`).key;
        sample1Ref.on('value', (snapshot) => {

          let maintenanceList = snapshot.val();




          this.setState({
            maintenanceDate: snapshot.child('date').val(),
            maintenanceID: snapshot.child('ID').val(),
            maintenanceTitle: snapshot.child('Title').val(),
            maintenanceDescription: snapshot.child('Description').val(),
            id: id,
          });

          let arr = snapshot.val();
          delete arr.date;
          delete arr.ID;
          delete arr.Title;
          delete arr.Description;

          let arrayKeys = Object.keys(arr);
          let arrayValues = Object.values(arr);
          this.setState({
            arrayKeys1: arrayKeys,
            arrayValues1: arrayValues,

          })

  });

const sample2Ref = fire.database().ref(`/maintenanceList/${user.uid}`);
sample2Ref.on('value', (snapshot) => {
let maintenanceList = this.snapshotToArray(snapshot);


let keys = [maintenanceList.map((parameter) => {
  return (
parameter.key
  )
})]

this.setState({
  arrayData1: keys,
})
})

let arrayData = [];
for (let i=0; i < this.state.arrayKeys1.length; i++) {
//push send this data to the back of the chartData variable above.
arrayData.push({Maintenance_Input: this.state.arrayValues1[i], Maintenance_Item: this.state.arrayKeys1[i], key: this.state.arrayData1[i]});

}

this.setState({
  snapArray1: arrayData,
  arrayData2: arrayData,
})

      });
    }


    sampleOverwrite = (e) => {
      e.preventDefault();
      //fire.database().ref('samples') refers to the main title of the fire database.
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const parameterListRef = fire.database().ref(`maintenanceReport/${user.uid}/${this.state.id}`);


  var arr = this.state.arrayData2;
  console.log(arr);


  if (arr.length == 0){
    var object = {date: this.state.maintenanceDate, ID: this.state.maintenanceID, Title: this.state.maintenanceTitle, Description: this.state.maintenanceDescription}
    console.log(object);
    parameterListRef.set(object);

  }
  else


    var object = arr.reduce(
        (obj, item) => Object.assign(obj, {date: this.state.maintenanceDate, ID: this.state.maintenanceID, Title: this.state.maintenanceTitle, Description: this.state.maintenanceDescription, [item.Maintenance_Item]: item.Maintenance_Input}) ,{});
        console.log(object);
        parameterListRef.set(object);








      //this.setState is used to clear the text boxes after the form has been submitted.
      this.setState({


        visible: false,
        visible1: false,
        visible2: false,

      });

    });
    }


    displayButtons = () => {

   this.setState({
     overwriteReport: 'none',
     addReport: null,
     inputOverwrite: 'none',
     inputAdd: null,
   })


    }


    additionalItem = (e, itemId, id) => {
      e.preventDefault();
      //fire.database().ref('samples') refers to the main title of the fire database.

      let array = this.state.arrayData2;

      const parameterInfo = {
        Maintenance_Item: this.state.Maintenance_Item,
        Maintenance_Input: '',
        id: id,

      }

      array.push(parameterInfo);
      //this.setState is used to clear the text boxes after the form has been submitted.
      this.setState({
        Maintenance_Item: '',
        arrayData2: array,

      });


    }

    onChange = (pagination, filters, sorter, extra: { currentDataSource: [] }) => {
      const data = extra.currentDataSource;
   console.log(extra.currentDataSource);
   this.setState({
     currentData: extra.currentDataSource,
   })
 }

      render() {


        let { file } = this.state

        let url = file && URL.createObjectURL(file)

        let img = document.createElement("my-node");


        const MyDoc = (
          <Document>
            <Page size="A4" >

            </Page>
          </Document>
        )

        const columns = this.state.tableKeys;

const data = this.state.snapArray;
const data1 = this.state.snapArray1;
const csvData = this.state.snapArray;
const csvData1 = this.state.currentData;






        return (
          <Layout>

            <div style={{ background: '#F4F7FA', padding: '5px' }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <div style={{position: 'relative'}}>
            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
              <h1><b>Maintenance Manager</b></h1>
              <h2>{this.state.lakeName}</h2>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{ textAlign: 'right'}}>
          <Button size="large" type="primary" onClick={() => this.showDrawer()}>+ Add Maintenance Log </Button>
            <Drawer
              title= "Fill in Maintenance Form"
              placement={this.state.placement}
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
              width={500}
            >

            <div style={{display: this.state.inputAdd}}>
            <Row style={{paddingTop: '10px'}} type="flex" justify="center">


                <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                  <form>
                    <Row style={{paddingTop: '10px', textAlign: 'center'}} type="flex" justify="center">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <FormGroup>
                  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>MAINTENANCE ITEMS</b></Col>
                  <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                  <FormControl style={{display: this.state.inputAdd}}name="Maintenance_Item" onChange={this.handleChange} type="text" placeholder="Items"  value={this.state.Maintenance_Item} />

                  </Col>
                  <Col xs={24} sm={4} md={4} lg={4} xl={4} >
                        <Button  type="primary" onClick={this.fillParameterInfo} bsStyle="primary">Add Item</Button>


                      </Col>
              </FormGroup>

                </Col>
                  </Row>

                </form>


                </Col>
              </Row>

              <Row style={{paddingTop: '10px'}} justify="center">
                <form>
                  <Row style={{textAlign: 'right'}}>
                  <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Report</Icon>
                  </Row>
                  <Row>
                <FormGroup>
                  <Row style={{paddingTop: '10px'}}>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Maintenance Date</b></Col>
                    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                      <FormControl name='maintenanceDate' type='date' placeholder="Date" value={this.state.maintenanceDate}
                      onChange={this.handleChange} />
                    </Col>
                  </Row>
                  <Row style={{paddingTop: '10px'}}>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>ID #</b></Col>
                    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                      <FormControl name='maintenanceID' type='text' placeholder="ID" value={this.state.maintenanceID}
                        onChange={this.handleChange} />
                    </Col>
                  </Row>
                  <Row style={{paddingTop: '10px'}}>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Title</b></Col>
                    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                      <FormControl name='maintenanceTitle' type='text' placeholder="Title" value={this.state.maintenanceTitle}
                          onChange={this.handleChange} />
                    </Col>
                  </Row>
                  <Row style={{paddingTop: '10px'}}>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6} ><b>Description</b></Col>
                    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                      <FormControl name='maintenanceDescription' type="textarea" componentClass="textarea" style={{ height: 60}} placeholder="Description" value={this.state.maintenanceDescription}
                            onChange={this.handleChange} />
                    </Col>
                  </Row>


                </FormGroup>
                </Row>


                {this.state.snapArray1.map((parameter, idx) => {

                              return (
                                <Row style={{paddingTop: '10px'}}>
                          <FormGroup>
                            <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>{parameter.Maintenance_Item}</b></Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <FormControl name={parameter.Maintenance_Item} type="textarea" componentClass="textarea" style={{ height: 60}}
                              onChange={this.handleSampleChange(idx)}  placeholder="Report" value={parameter.Maintenance_Input} />
                            </Col>
                            <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                              <Icon type="delete" style={{fontSize: '24px'}}
                              onClick={() => this.removesample1(parameter.key)}>
                                Click me
                              </Icon>
                              </Col>




                          </FormGroup>
                        </Row>
                        )})};





                <Row style={{paddingTop: '10px', textAlign: 'right'}}>
                <Button style={{display: this.state.addReport}} type="primary" onClick={this.sampleSubmit} bsStyle="primary">Add Maintenance Report</Button>
                <Button style={{display: this.state.overwriteReport}} type="primary" onClick={this.sampleOverwrite} bsStyle="primary">Overwrite Report</Button>
                <Icon style={{display: this.state.overwriteReport, fontSize: 20}} onClick={this.displayButtons} type="left" />


                </Row>






                </form>

              </Row>

              </div>

              <div style={{display: this.state.inputOverwrite}}>
              <Row style={{paddingTop: '10px'}} type="flex" justify="center">


                  <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                    <form>
                      <Row style={{paddingTop: '10px', textAlign: 'center'}} type="flex" justify="center">
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <FormGroup>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>MAINTENANCE ITEMS</b></Col>
                    <Col xs={24} sm={14} md={14} lg={14} xl={14}>

                    <FormControl name="Maintenance_Item" onChange={this.handleChange} type="text" placeholder="Overwrite this shit"  value={this.state.Maintenance_Item} />
                    </Col>
                    <Col xs={24} sm={4} md={4} lg={4} xl={4} >
                          <Button  type="primary" onClick={this.additionalItem} bsStyle="primary">Over Item</Button>


                        </Col>
                </FormGroup>

                  </Col>
                    </Row>

                  </form>


                  </Col>
                </Row>

                <Row style={{paddingTop: '10px'}} justify="center">
                  <form>
                    <Row style={{textAlign: 'right'}}>
                    <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Report</Icon>
                    </Row>
                    <Row>
                  <FormGroup>
                    <Row style={{paddingTop: '10px'}}>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Maintenance Date</b></Col>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                        <FormControl name='maintenanceDate' type='date' placeholder="Date" value={this.state.maintenanceDate}
                        onChange={this.handleChange} />
                      </Col>
                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>ID #</b></Col>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                        <FormControl name='maintenanceID' type='text' placeholder="ID" value={this.state.maintenanceID}
                          onChange={this.handleChange} />
                      </Col>
                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Title</b></Col>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                        <FormControl name='maintenanceTitle' type='text' placeholder="Title" value={this.state.maintenanceTitle}
                            onChange={this.handleChange} />
                      </Col>
                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6} ><b>Description</b></Col>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                        <FormControl name='maintenanceDescription' type="textarea" componentClass="textarea" style={{ height: 60}} placeholder="Description" value={this.state.maintenanceDescription}
                              onChange={this.handleChange} />
                      </Col>
                    </Row>


                  </FormGroup>
                  </Row>


      {this.state.arrayData2.map((parameter, idx) => {

                    return (
                      <Row style={{paddingTop: '10px'}}>
                <FormGroup>
                  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>{parameter.Maintenance_Item}</b></Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <FormControl name={parameter.Maintenance_Item} type="textarea" componentClass="textarea" style={{ height: 60}}
                    onChange={this.handleSampleChange1(idx)}  placeholder="Report" value={parameter.Maintenance_Input} />
                  </Col>
                  <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                    <Icon type="delete" style={{fontSize: '24px'}}
                    onClick={() => this.removesample2(parameter.Maintenance_Item)}>
                      Click me
                    </Icon>
                    </Col>




                            </FormGroup>
                          </Row>
                          )})};





                  <Row style={{paddingTop: '10px', textAlign: 'right'}}>
                  <Button style={{display: this.state.addReport}} type="primary" onClick={this.sampleSubmit} bsStyle="primary">Add Maintenance Report</Button>
                  <Button style={{display: this.state.overwriteReport}} type="primary" onClick={this.sampleOverwrite} bsStyle="primary">Overwrite Report</Button>
                  <Icon style={{display: this.state.overwriteReport, fontSize: 20}} onClick={this.displayButtons} type="left" />


                  </Row>






                  </form>

                </Row>

                </div>





            </Drawer>
            <Drawer
              title= "Fill in Maintenance Form"
              placement={this.state.placement}
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible1}
              width={500}
            >






            </Drawer>





            </Col>

          </div>
            </Row>

            </div>

            <div style={{ background: '#F4F7FA', paddingTop: '15px', paddingRight: '5px', paddingLeft: '5px' }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>


                  <Card


                  >
                  <Tabs defaultActiveKey="1" activeKey={this.state.key} onChange={this.handleSelect} >

                    <TabPane tab="MAINTENANCE LOGS" key="1">
                    <Row type="flex" justify="center">

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{textAlign: 'left'}}>
                          <Button><CSVLink data={csvData1}>Download Spreadsheet</CSVLink></Button>

                        </Col>


                      </Row>

                      <Row style={{paddingTop: '10px'}} type="flex" justify="center">


                          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Table columns={columns} dataSource={data} onChange={this.onChange} scroll={{ x: 1300}} />

                          </Col>
                        </Row>








                    </TabPane>

              <TabPane tab="" key="2">


              </TabPane>






                  <TabPane tab="" key="3">



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
