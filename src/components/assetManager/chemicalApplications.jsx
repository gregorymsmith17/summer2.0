import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Grid, FormGroup, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { Page, Text, View, Document, StyleSheet, Image,  PDFDownloadLink, Font, PDFViewer  } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';


import moment from 'moment';

import { fire } from '../../fire';




import { Row, Col, Tabs, Table, Divider, Tag, message, Card, Drawer, Menu, Dropdown, Button, Layout, Carousel, Input, Popover, Icon, Cascader, Switch, AutoComplete, Radio, Alert, Calendar, DatePicker, Form, Select } from 'antd';

import { CSVLink, CSVDownload } from "react-csv";


const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const TabPane = Tabs.TabPane;

const { TextArea } = Input;

const styles = StyleSheet.create({
  page: {

    backgroundColor: '#E4E4E4'
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,

  },
  author: {
    fontSize: 12,

    marginBottom: 10,
    paddingTop: 15,
  },
  subtitle: {
    fontSize: 18,


  },
  text: {
    margin: 12,
    fontSize: 14,

  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,

  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
    maintenanceItem: '',
  },

});

const Heading = styled.Text`
  margin: 10px;
  font-size: 22px;
  font-family: 'Helvetica';
`;

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;



function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class ApplicationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    maintenanceTitle: '',
    maintenanceID: '',
    maintenanceStatus: '',
    maintenanceCourt: '',
    maintenanceDate: '',
    formDisplay: 'none',
    formDisplay1: null,
    currentProject: '',
    userID: '',
    maintenanceItems: [],
    dataKeys: [],
    dataValues: [],
    reportAdded: 'none',

    applicationID: '',
    applicationStatus: '',
    applicationDate: '',
    applicationCompany: '',
    applicationChemical: '',
    applicationAmount: '',
  };

  snapshotToArray(snapshot) {
     var returnArr = [];

     snapshot.forEach(function(childSnapshot) {
         var item = childSnapshot.val();
         item.key = childSnapshot.key;

         returnArr.push(item);
     });

     return returnArr;
 };

  componentDidMount()  {

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

      this.setState({
        userID: user.uid,
      })

      const currentProjectRef = fire.database().ref(`${user.uid}/currentProject`);
      currentProjectRef.on('value', (snapshot) => {
        let project = snapshot.child('currentProject').val();
        console.log(project);
        this.setState({
          currentProject: project
        })
        const sampleList2Ref = fire.database().ref(`${user.uid}/${this.state.currentProject}/chemicalApplicationItems`);
                       sampleList2Ref.on('value', (snapshot) => {
                         let maintenanceArray = this.snapshotToArray(snapshot);
                         console.log(maintenanceArray)
                         this.setState({
                           dataKeys: maintenanceArray,

                         })
                       })
      })





})
}

  handleSubmit = (e) => {
    e.preventDefault();
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const reportRef = fire.database().ref(`${user.uid}/${this.state.currentProject}/chemicalApplications`);

        console.log('Received values of form: ', values);
        this.setState({
          applicationID: values.applicationID,
          applicationDate: this.state.applicationDate,
          applicationCompany: values.applicationCompany,
          applicationChemical: values.applicationChemical,
          applicationAmount: values.applicationAmount,


          formDisplay: null,
          formDisplay1: 'none',
          reportAdded: null,
        })


        delete values.applicationDate;

        let dataKeys = Object.keys(values);
        let dataValues = Object.values(values);
        console.log(dataKeys);
        console.log(dataValues);

        let maintenanceData = [];
        for (let i=0; i < dataKeys.length; i++) {
        //push send this data to the back of the chartData variable above.
        maintenanceData.push({Application_Item: dataKeys[i], Application_Input: dataValues[i]});

        }
        console.log(maintenanceData)

        var object = maintenanceData.reduce(
            (obj, item) => Object.assign(obj, {date: this.state.applicationDate, [item.Application_Item]: item.Application_Input}) ,{});
            console.log(object);
            reportRef.push(object);


      }

    });
      });
  }



  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

   onDateChange = (date, dateString) => {
  console.log(moment(date).format('YYYY[-]MM[-]DD'));
    this.setState({
      applicationDate: moment(date).format('YYYY[-]MM[-]DD'),
      reportAdded: 'none'
    })
  }

  updateChange = () => {
    this.setState({
      reportAdded: 'none'
    })
  }

  removesample(itemId) {

   const sampleRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/chemicalApplicationItems/${itemId}`);
   sampleRef.remove();
 }




  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };


    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    const content = (
  <div style={{textAlign: 'center'}}>
    <p>Are you sure you want <br /> to delete this Maintenance Log?</p>
    <Button type="primary" >Delete</Button>
  </div>
  );



    return (
      <div>
      <Form {...formItemLayout} onSubmit={this.handleSubmit} >
        <p style={{paddingLeft: 30, fontSize: 14}}><b>Add a Chemical Application Report</b></p>

        <Form.Item {...formItemLayout}
          label="ID"
        >
          {getFieldDecorator('applicationID', {
            rules: [{ required: true, message: 'Please input your Application ID!', whitespace: true }],
          })(
            <Input nChange={this.updateChange}/>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout}
          label="Date"
        >
          {getFieldDecorator('applicationDate', {
            rules: [{
              required: true, message: 'Please input date',
            }],
          })(
            <DatePicker format="YYYY-MM-DD" onChange={this.onDateChange} />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout}
          label="Chemical"
        >
          {getFieldDecorator('applicationChemical', {
            rules: [{ required: true, message: 'Please input Chemical Name', whitespace: true }],
          })(
            <Input nChange={this.updateChange}/>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout}
          label="Company"
        >
          {getFieldDecorator('applicationCompany', {
            rules: [{ required: true, message: 'Please input Company Name', whitespace: true }],
          })(
            <Input nChange={this.updateChange}/>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout}
          label="Amount"
        >
          {getFieldDecorator('applicationAmount', {
            rules: [{ required: true, message: 'Please input Amount of chemical', whitespace: true }],
          })(
            <Input nChange={this.updateChange}/>
          )}
        </Form.Item>

        {this.state.dataKeys.map((parameter) => {
          return (
            <Form.Item {...formItemLayout}
              label={<span>{parameter.Application_Item}<Popover content={<div style={{textAlign: 'center'}}>
                <p>Are you sure you want <br /> to delete this Application Item?</p>
                <Button type="primary" onClick={() => this.removesample(parameter.key)}>Delete</Button>
              </div>} trigger="click">
                  <Icon type="delete" style={{fontSize: '18px', color: '#101441'}}
            >
              Click me
            </Icon>
          </Popover></span>}
            >
              {getFieldDecorator(`${parameter.Application_Item}`, {
                rules: [{ required: true, message: 'Please enter an input!', whitespace: true }],
              })(
                <TextArea autosize style={{height: '80px'}} onChange={this.updateChange}/>
              )}
            </Form.Item>
          )
        })}

        <Form.Item {...tailFormItemLayout} style={{textAlign: 'right', paddingTop: 15}}>
          <p style={{display: this.state.reportAdded}}>Application Report has been Added</p>
          <Button type="primary" htmlType="submit"><b>Create Application Report</b></Button>
        </Form.Item>

      </Form>
      </div>
    );
  }
}

const WrappedAddApplicationForm = Form.create({ name: 'register' })(ApplicationForm);


class ItemForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    applicationTitle: '',
    formDisplay: 'none',
    formDisplay1: null,
    currentProject: '',
    userID: '',
    itemAdded: 'none',
  };


  componentDidMount(itemId, source) {

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

      this.setState({
        userID: user.uid,
      })

      const currentProjectRef = fire.database().ref(`${user.uid}/currentProject`);
      currentProjectRef.on('value', (snapshot) => {
        let project = snapshot.child('currentProject').val();
        console.log(project);
        this.setState({
          currentProject: project
        })
      })
})
}



  submitItem = (e) => {
    e.preventDefault();
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        const sampleListRef = fire.database().ref(`${user.uid}/${this.state.currentProject}/chemicalApplicationItems`);

      const applicationInfo = {
        Application_Item: values.maintenanceItem,
        Application_Input: '',

      }


      sampleListRef.push(applicationInfo);

      this.setState({
        itemAdded: null,
      })
      }

    });
  });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }



  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  updateChange = () => {
    this.setState({
      itemAdded: 'none'
    })
  }



  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };


    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));





    return (
      <div>

      <Form {...formItemLayout} onSubmit={this.submitItem} >
      <p style={{paddingLeft: 30, fontSize: 14}}><b>Add an Additional Item for Your Application Report</b></p>

      <Form.Item {...formItemLayout}
        label="Application Item"
      >
        {getFieldDecorator('maintenanceItem', {
          rules: [{ required: true, message: 'Please input your Application Item!', whitespace: true }],
        })(
          <Input onChange={this.updateChange}/>
        )}
      </Form.Item>

      <Form.Item {...tailFormItemLayout} style={{textAlign: 'right'}}>
        <p style={{display: this.state.itemAdded}}>Item Added</p>
        <Button type="primary" htmlType="submit"><b>Add Application Report Item</b></Button>
      </Form.Item>

      </Form>

      </div>
    );
  }
}

const WrappedItemForm = Form.create({ name: 'register' })(ItemForm);

class FillReportForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    maintenanceTitle: '',
    maintenanceID: '',
    maintenanceStatus: '',
    maintenanceCourt: '',
    maintenanceDate: '',
    formDisplay: 'none',
    formDisplay1: null,
    currentProject: '',
    userID: '',
    activeMaintenanceID: '',
    activeMaintenanceReport: '',
    activeApplicationID: '',
    activeApplicationReport: '',
    otherItems: [],
    maintenanceItems: [],
    maintenanceData: [],
    dataKeys: [],
    dataValues: [],
    commentDrawerVisible: false,
    commentTitle: '',
    commentInput: '',
    reportUpdated: 'none',
    commentAdded: 'none',

    applicationID: '',
    applicationDate: '',
    applicationCompany: '',
    applicationChemical: '',
    applicationAmount: '',
    applicationData: [],
  };

  snapshotToArray(snapshot) {
     var returnArr = [];

     snapshot.forEach(function(childSnapshot) {
         var item = childSnapshot.val();
         item.key = childSnapshot.key;

         returnArr.push(item);
     });

     return returnArr;
 };

  componentDidMount()  {

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

      this.setState({
        userID: user.uid,
      })

      const currentProjectRef = fire.database().ref(`${user.uid}/currentProject`);
      currentProjectRef.on('value', (snapshot) => {
        let project = snapshot.child('currentProject').val();
        console.log(project);
        this.setState({
          currentProject: project
        })
        const activeMaintenanceID = fire.database().ref(`${user.uid}/${this.state.currentProject}/activeApplicationID`);
                       activeMaintenanceID.on('value', (snapshot) => {
                         let activeApplicationID = snapshot.val();
                         this.setState({
                           activeApplicationID: activeApplicationID,
                         })
                       })
         const activeApplicationReport = fire.database().ref(`${user.uid}/${this.state.currentProject}/chemicalApplications/${this.state.activeApplicationID}`);
                        activeApplicationReport.on('value', (snapshot) => {
                          let activeApplicationReport = snapshot.val();
                          let otherItems = snapshot.val();


                          this.setState({
                            activeApplicationReport: activeApplicationReport,

                            applicationID: activeApplicationReport.applicationID,
                            applicationDate: activeApplicationReport.date,
                            applicationCompany: activeApplicationReport.applicationCompany,
                            applicationChemical: activeApplicationReport.applicationChemical,
                            applicationAmount: activeApplicationReport.applicationAmount,

                          })

                          delete otherItems.applicationID;
                          delete otherItems.applicationCompany;
                          delete otherItems.applicationChemical;
                          delete otherItems.applicationAmount;
                          delete otherItems.date;



                          let dataKeys = Object.keys(otherItems);
                          let dataValues = Object.values(otherItems);
                          console.log(dataKeys);
                          console.log(dataValues);

                          let applicationData = [];
                          for (let i=0; i < dataKeys.length; i++) {
                          //push send this data to the back of the chartData variable above.
                          applicationData.push({Application_Item: dataKeys[i], Application_Input: dataValues[i]});

                          }
                          console.log(applicationData)

                          this.setState({

                            applicationData: applicationData

                          })
                        })
      })

})
}



handleSubmit = (e) => {
  e.preventDefault();

  this.props.form.validateFieldsAndScroll((err, values) => {
    if (!err) {
      const reportRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/chemicalApplications/${this.state.activeApplicationID}`);

      console.log('Received values of form: ', values);

      this.setState({
        reportUpdated: null,
      })

      delete values.applicationDate;
      delete values.commentInput;
      delete values.commentTitle;

      let dataKeys = Object.keys(values);
      let dataValues = Object.values(values);
      console.log(dataKeys);
      console.log(dataValues);

      let applicationData = [];
      for (let i=0; i < dataKeys.length; i++) {
      //push send this data to the back of the chartData variable above.
      applicationData.push({Application_Item: dataKeys[i], Application_Input: dataValues[i]});

      }
      console.log(applicationData)

      var object = applicationData.reduce(
          (obj, item) => Object.assign(obj, {date: this.state.applicationDate, [item.Application_Item]: item.Application_Input}) ,{});
          console.log(object);
          reportRef.set(object);


    }

  });

}



  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }





   onDateChange = (date, dateString) => {
  console.log(moment(date).format('YYYY[-]MM[-]DD'));
    this.setState({
      applicationDate: moment(date).format('YYYY[-]MM[-]DD'),
    })
  }

  commentDrawer = () => {
    this.setState({
      commentDrawerVisible: true,
    })
  }

  onClose = () => {
    this.setState({
      commentDrawerVisible: false,
    })
  }

  addComment = (e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const reportRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/chemicalApplications/${this.state.activeApplicationID}`);

        this.setState({
          commentAdded: null,
        })

        console.log('Received values of form: ', values);

        let dateValue = values.applicationDate._i;
        delete values.applicationDate;

        let comment = values.commentTitle;
        let input = values.commentInput;
        delete values.commentTitle;
        delete values.commentInput;

        let dataKeys = Object.keys(values);
        let dataValues = Object.values(values);
        console.log(dataKeys);
        console.log(dataValues);

        let applicationData = [];
        for (let i=0; i < dataKeys.length; i++) {
        //push send this data to the back of the chartData variable above.
        applicationData.push({Application_Item: dataKeys[i], Application_Input: dataValues[i]});

        }
        console.log(applicationData)

        var object = applicationData.reduce(
            (obj, item) => Object.assign(obj, {[comment]: input, date: dateValue, [item.Application_Item]: item.Application_Input}) ,{});
            console.log(object);
            reportRef.set(object);


      }

    });


  }

  removeMaintenanceItem(itemId) {

   const sampleRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/chemicalApplications/${this.state.activeApplicationID}/${itemId}`);
   sampleRef.remove();
 }

 updateChange = () => {
   this.setState({
     reportUpdated: 'none',
     commentAdded: 'none',
   })
 }



  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };


    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    const dateFormat = 'YYYY-MM-DD';



    return (
      <div>
        <Row>

          <Form {...formItemLayout} onSubmit={this.handleSubmit} >
            <p style={{paddingLeft: 30, fontSize: 14}}><b>Add a Chemical Application Report</b></p>

            <Form.Item {...formItemLayout}
              label="ID"
            >
              {getFieldDecorator('applicationID', {
                rules: [{ required: true, message: 'Please input your Application ID!', whitespace: true }],initialValue: this.state.applicationID,
              })(
                <Input nChange={this.updateChange}/>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout}
              label="Date"
            >
              {getFieldDecorator('applicationDate', {
                rules: [{
                  required: true, message: 'Please input date',
                }], initialValue: moment(this.state.applicationDate, dateFormat)
              })(
                <DatePicker format="YYYY-MM-DD" onChange={this.onDateChange} />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout}
              label="Chemical"
            >
              {getFieldDecorator('applicationChemical', {
                rules: [{ required: true, message: 'Please input Chemical Name', whitespace: true }], initialValue: this.state.applicationChemical,
              })(
                <Input nChange={this.updateChange}/>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout}
              label="Company"
            >
              {getFieldDecorator('applicationCompany', {
                rules: [{ required: true, message: 'Please input Company Name', whitespace: true }], initialValue: this.state.applicationCompany,
              })(
                <Input nChange={this.updateChange}/>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout}
              label="Amount"
            >
              {getFieldDecorator('applicationAmount', {
                rules: [{ required: true, message: 'Please input Amount of chemical', whitespace: true }], initialValue: this.state.applicationAmount,
              })(
                <Input nChange={this.updateChange}/>
              )}
            </Form.Item>

            {this.state.applicationData.map((parameter) => {
              return (
                <Form.Item {...formItemLayout}
                  label={<span>{parameter.Application_Item}<Popover content={<div style={{textAlign: 'center'}}>
                    <p>Are you sure you want <br /> to delete this Application Item?</p>
                    <Button type="primary" onClick={() => this.removesample(parameter.key)}>Delete</Button>
                  </div>} trigger="click">
                      <Icon type="delete" style={{fontSize: '18px', color: '#101441'}}
                >
                  Click me
                </Icon>
              </Popover></span>}
                >
                  {getFieldDecorator(`${parameter.Application_Item}`, {
                    rules: [{ required: true, message: 'Please enter an input!', whitespace: true }], initialValue: parameter.Application_Input,
                  })(
                    <TextArea autosize style={{height: '80px'}} onChange={this.updateChange}/>
                  )}
                </Form.Item>
              )
            })}

            <Form.Item {...tailFormItemLayout} style={{textAlign: 'right'}}>
              <Button style={{background: 'orange', backgroundColor: 'orange'}} type="primary" onClick={this.commentDrawer}>Add Comment</Button>
            </Form.Item>

            <Form.Item {...tailFormItemLayout} style={{textAlign: 'right', paddingTop: 15}}>
              <p style={{display: this.state.reportUpdated}}>Application Report has been Updated</p>
              <Button type="primary" htmlType="submit"><b>Update Application Report</b></Button>
            </Form.Item>

          </Form>
      </Row>
      <Drawer
      title="Add Comment"
      width={500}
      closable={false}
      onClose={this.onClose}
      visible={this.state.commentDrawerVisible}
    >


    <div>

    <Form {...formItemLayout} onSubmit={this.addComment} >
    <p style={{paddingLeft: 30, fontSize: 14}}><b>Add a Comment</b></p>

    <Form.Item
      label="Comment Title"
    >
      {getFieldDecorator('commentTitle', {
        rules: [{ required: false, message: 'Please input your Application comment!', whitespace: true }],
      })(
        <Input onChange={this.updateChange}/>
      )}
    </Form.Item>

    <Form.Item
      label="Comment Input"
    >
      {getFieldDecorator('commentInput', {
        rules: [{ required: false, message: 'Please input your Application comment!', whitespace: true }],
      })(
        <TextArea autosize style={{height: '80px'}} onChange={this.updateChange}/>

      )}
    </Form.Item>

    <Form.Item {...tailFormItemLayout} style={{textAlign: 'right'}}>
      <p style={{display: this.state.commentAdded}}>Report comment has been added!</p>
      <Button type="primary" htmlType="submit">Add Comment</Button>
    </Form.Item>

    </Form>

    </div>






    </Drawer>
      </div>
    );
  }
}

const WrappedFillReportForm = Form.create({ name: 'register' })(FillReportForm);



export default class chemicalApplications extends Component {




    constructor(props) {
        super(props);
        this.state = {
          userID: '',
          key: "1",
          snapArray: [],
          fillReportKey: "1",

          save: '',
          save1: '',

          chartArray: [],
          reportData: [],

          snapArray1: [],
          arrayData1: [],
          arrayData2: [],
          arrayKeys1: [],
          arrayKeys2: [],
          arrayValues2: [],
          smallGraphKeys: [],

          Maintenance_Item: '',
          sampleDate: '',
          sampleTitle: '',
          sampleID: '',
          sampleMisc: '',
          Status: '',
          court: '',


          item: '',

          graphData: [],
          turnedOffKeys: [],

          currentData: [],




          childrenDrawer: false,
          childrenDrawer1: false,

          childrenDrawerComment: false,

          itemDrawerWidth: '',
          childItemDrawerWidth: '',
          childCommentMaintenanceWidth: '',
          editMaintenanceWidth: '',




          tableKeys: [],
          tableKeysSmall: [],
          searchText: '',
          selectedRowKeys: [], // Check here to configure the default column
          loading: false,



          url: null,
          blob: null,
          file:null,
          blobUrl: null,

          error: 'none',

          //for drawers
          visible: false,
          visible1: false,
          visible2: false,
          visible3: false,
          visibleEditMaintenance: false,

          //Inputs for Profile Page
          lakeName: '',
          locationCity: '',
          locationState: '',
          managementContact: '',
          hoaContact: '',
          managementContactNumber: '',
          hoaContactNumber: '',

          currentProject: '',

          maintenanceTitle: '',
          maintenanceID: '',
          maintenanceStatus: '',
          maintenanceCourt: '',
          maintenanceDate: '',


          applicationID: '',
          applicationStatus: '',
          applicationDate: '',
          applicationCompany: '',
          applicationChemical: '',
          applicationAmount: '',


        }
        this.handleChange = this.handleChange.bind(this);

      }


      //event triggered when text boxes of forms, values are changed
      handleChange(e) {
        const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
        this.setState({
          [e.target.name]: e.target.value,
          error: 'none',
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

          const currentProjectRef = fire.database().ref(`${user.uid}/currentProject`);
          currentProjectRef.on('value', (snapshot) => {
            let project = snapshot.child('currentProject').val();
            console.log(project);
            this.setState({
              currentProject: project
            })

            const parameterList1Ref = fire.database().ref(`${user.uid}/${this.state.currentProject}/chemicalApplications`);
            parameterList1Ref.on('value', (snapshot) => {
              let snapArray = this.snapshotToArray(snapshot);

              if (snapArray.length == 0) {
                console.log("do nothing")
              }







              if (snapArray.length > 0) {
                let data = snapArray;





                let tableData1 = [];
                for (let i=0; i < snapArray.length; i++) {
                //push send this data to the back of the chartData variable above.
                tableData1.push(Object.keys(snapArray[i]));
                }

                let tableData2 = tableData1.map(function(a){return a.length;});
                tableData2.indexOf(Math.max.apply(Math, tableData2));



                let indexOfMaxValue = tableData2.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);




                let table1Keys = Object.keys(snapArray[indexOfMaxValue]);
                table1Keys = table1Keys.filter(e => e !== 'ID');
                table1Keys = table1Keys.filter(e => e !== 'Miscellaneous');
                table1Keys = table1Keys.filter(e => e !== 'date');
                table1Keys = table1Keys.filter(e => e !== 'Title');
                table1Keys = table1Keys.filter(e => e !== 'Status');
                table1Keys = table1Keys.filter(e => e !== 'court');
                table1Keys = table1Keys.filter(e => e !== 'key');
                table1Keys = table1Keys.filter(e => e !== 'key');


                if (this.state.turnedOffKeys.length == 0) {
                  console.log("do nothing again")
                }

                if (this.state.turnedOffKeys.lenth > 0) {
                  this.state.turnedOffKeys.map((item) => {

                    table1Keys = table1Keys.filter(e => e !== item);
                  })
                }

                console.log(table1Keys)

                this.setState({
                  smallGraphKeys: table1Keys,
                })



                let tableKeys = table1Keys.map((txt) => {


                  const item3 = txt.replace(/^"(.*)"$/, '$1');
                  const item4 = "a"+"."+item3;

                  return (

                  {




                }
                )})

                let tableKeysSmall = table1Keys.map((txt) => {
                  const item3 = txt.replace(/^"(.*)"$/, '$1');
                  const item4 = "a"+"."+item3;
                  return (

                  {

                }
                )})

                tableKeys.unshift({
                title: 'Chemical',
                dataIndex: 'applicationAmount',
                key: 'applicationAmount',
                ...this.getColumnSearchProps('applicationAmount'),
                sorter: (a, b) => { return a.applicationAmount.localeCompare(b.applicationAmount)},
                sortDirections: ['descend', 'ascend'],

                })

                tableKeys.unshift({
                title: 'Chemical',
                dataIndex: 'applicationChemical',
                key: 'applicationChemical',
                ...this.getColumnSearchProps('applicationChemical'),
                sorter: (a, b) => { return a.applicationChemical.localeCompare(b.applicationChemical)},
                sortDirections: ['descend', 'ascend'],

                })

                tableKeys.unshift({
                title: 'Company',
                dataIndex: 'applicationCompany',
                key: 'applicationCompany',
                ...this.getColumnSearchProps('applicationCompany'),
                sorter: (a, b) => { return a.applicationCompany.localeCompare(b.applicationCompany)},
                sortDirections: ['descend', 'ascend'],

                })



                tableKeys.unshift({
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                ...this.getColumnSearchProps('date'),
                sorter: (a, b) => { return a.date.localeCompare(b.date)},
                sortDirections: ['descend', 'ascend'],
                })


                tableKeys.unshift({
                title: 'ID #',
                dataIndex: 'applicationID',
                key: 'applicationID',
                ...this.getColumnSearchProps('applicationID'),
                sorter: (a, b) => { return a.applicationID - b.applicationID},
                sortDirections: ['descend', 'ascend'],


                })




                tableKeys.unshift({
                  title: 'Edit',
                  dataIndex: '',
                  key: 'x',
                  fixed: 'left',
                  render: this.editRow.bind(this),
                  width: 50,


                })

                tableKeys.unshift({

                  title: 'Delete',
                  dataIndex: '',
                  fixed: 'left',
                  key: 'y',
                  render: this.deleteRow.bind(this),
                  width: 50,


                })
                tableKeys.push({

                  title: 'Preview',
                  dataIndex: '',
                  fixed: 'right',
                  key: 'z',
                  render: this.previewReport,
                  width: 50,
                })
                console.log(data);
                let reverseData = data.reverse();

                let reverseData1 = data.reverse();





                tableKeysSmall.unshift({
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                ...this.getColumnSearchProps('date'),
                sorter: (a, b) => { return a.date.localeCompare(b.date)},
                sortDirections: ['descend', 'ascend'],


                })
                tableKeysSmall.unshift({
                title: 'Title',
                dataIndex: 'maintenanceTitle',
                key: 'maintenanceTitle',
                ...this.getColumnSearchProps('maintenanceTitle'),
                sorter: (a, b) => { return a.maintenanceTitle.localeCompare(b.maintenanceTitle)},
                sortDirections: ['descend', 'ascend'],


                })

                tableKeysSmall.unshift({
                title: 'ID #',
                dataIndex: 'maintenanceID',
                key: 'maintenanceID',
                ...this.getColumnSearchProps('maintenanceID'),
                sorter: (a, b) => { return a.maintenanceID.localeCompare(b.maintenanceID)},
                sortDirections: ['descend', 'ascend'],

                })


                tableKeysSmall.unshift({
                  title: 'Edit',
                  dataIndex: '',
                  key: 'x',

                  render: this.editRowSmall.bind(this),
                  width: 50,


                })

                tableKeysSmall.unshift({

                  title: 'Delete',
                  dataIndex: '',

                  key: 'y',
                  render: this.deleteRow.bind(this),
                  width: 50,


                })
                tableKeysSmall.push({

                  title: 'Preview',
                  dataIndex: '',

                  key: 'z',
                  render: this.previewReport,
                  width: 50,
                })


                this.setState({
                  snapArray: data.reverse(),

                  tableKeys: tableKeys,
                  tableKeysSmall: tableKeysSmall,
                })



              }


               })

               const sampleList2Ref = fire.database().ref(`${user.uid}/${this.state.currentProject}/maintenanceList`);
               sampleList2Ref.on('value', (snapshot) => {
                 let maintenanceArray = this.snapshotToArray(snapshot);
                 console.log(maintenanceArray)
                 this.setState({
                   snapArray1: maintenanceArray,

                 })
               })



            const profileRef = fire.database().ref(`${user.uid}/${this.state.currentProject}/profileInformation`);
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





    })
  }




    handleSelect = (key) => {
  this.setState({key});
}



showDrawer = () => {

  const sampleList2Ref = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/maintenanceList`);
  sampleList2Ref.on('value', (snapshot) => {
    let maintenanceArray = this.snapshotToArray(snapshot);

    this.setState({
      arrayKeys1: [],
      arrayValues1: [],
      sampleDate: '',
      sampleID: '',
      sampleTitle: '',
      sampleMisc: '',
      Status: '',
      court: '',
      snapArray1: maintenanceArray,
      visible: true,
      Maintenance_Item: '',

      childrenDrawer: false,
      visible4: false,
      itemDrawerWidth: 600,
      childItemDrawerWidth: 400,
    })
  })
};

showDrawerMobile = () => {

  const sampleList2Ref = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/maintenanceList`);
  sampleList2Ref.on('value', (snapshot) => {
    let maintenanceArray = this.snapshotToArray(snapshot);

    this.setState({
      arrayKeys1: [],
      arrayValues1: [],
      sampleDate: '',
      sampleID: '',
      sampleTitle: '',
      sampleMisc: '',
      Status: '',
      court: '',
      snapArray1: maintenanceArray,
      visible: true,
      Maintenance_Item: '',

      childrenDrawer: false,
      visible4: false,
      itemDrawerWidth: 300,
      childItemDrawerWidth: 250,
    })
  })



};


showDrawer4 = () => {
  this.setState({
    visible4: true,
  });
};

onClose = () => {

  this.setState({
    visible: false,
    visible1: false,
    visible2: false,
    visible3: false,
    visibleEditMaintenance: false,
    fillReportKey: "1",

  });
};

visible4Close = () => {
  this.setState({
    visible4: false,
  })
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

    const content = (
  <div style={{textAlign: 'center'}}>
    <p>Are you sure you want <br /> to delete this Maintenance Log?</p>
    <Button type="primary" onClick={() => this.removesample(isSelected.key)}>Delete</Button>
  </div>
  );


    return (
      <div style={{textAlign: 'center'}}>
        <Popover content={content} trigger="click">
      <Icon type="delete" style={{fontSize: '24px', color: '#101441'}}
      >
        Click me
      </Icon>
    </Popover>
      </div>
    )
  }
  removesample(itemId) {

   const sampleRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/chemicalApplications/${itemId}`);
   sampleRef.remove();
 }

 deleteRow1 = (row, isSelected, e, id, key) =>
 {
   return (
     <div style={{textAlign: 'center'}}>
     <Icon type="delete" style={{fontSize: '24px', color: '#101441'}}
     onClick={() => this.removesample1(isSelected.key)}>
       Click me
     </Icon>
     </div>
   )
 }



 removesample1(itemId) {

  const sampleRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/chemicalApplicationItems/${itemId}`);
  sampleRef.remove();
}

removesample2(itemId) {

  const sampleRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/chemicalApplications/${this.state.id}/${itemId}`);
  sampleRef.remove();
  this.fillStates(this.state.id);


}



previewReport = (row, isSelected, e, id, key) =>
{




  return (
    <div style={{textAlign: 'center'}}>

        <Icon type="file-pdf" style={{fontSize: '24px', color: '#101441'}}onClick={() => this.fillPreview(isSelected.key)}>
      Click me
    </Icon>

    </div>
  )
}

fillPreview(itemId) {


  const previewRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/chemicalApplications/${itemId}`);

  previewRef.on('value', (snapshot) => {
    let previewData = snapshot.val();
    let applicationList = snapshot.val();
        let dataList = snapshot.val();
        delete dataList.date;
        delete dataList.applicationID;
        delete dataList.applicationCompany;
        delete dataList.applicationChemical;
        delete dataList.applicationAmount;

        let dataKeys = Object.keys(dataList);
        let dataValues = Object.values(dataList);
        console.log(dataKeys);
        console.log(dataValues);

        let reportData = [];
        for (let i=0; i < dataKeys.length; i++) {
        //push send this data to the back of the chartData variable above.
        reportData.push({Application_Item: dataKeys[i], Application_Input: dataValues[i]});

        }

    this.setState({

        reportData: reportData,
        applicationID: previewData.applicationID,
        applicationDate: previewData.date,
        applicationCompany: previewData.applicationCompany,
        applicationChemical: previewData.applicationChemical,
        applicationAmount: previewData.applicationAmount,
        key: "3",


    })

});


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

  editRowSmall = (row, isSelected, e, id, key) =>
  {
    return (
      <div style={{textAlign: 'center'}}>
      <Icon type="copy" style={{fontSize: '24px', color: '#101441'}}
      onClick={() => this.fillStatesSmall(isSelected.key)}>
        Click me
      </Icon>
      </div>
    )
  }

  editRow1 = (row, isSelected, e, id, key) =>
  {
    return (
      <div style={{textAlign: 'center'}}>
      <Icon type="form" style={{fontSize: '24px', color: '#101441'}}
      onClick={() => this.fillParameterStates(isSelected.key)}>
        Click me
      </Icon>
      </div>
    )
  }















    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }



      fillStates(itemId) {
        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
          this.setState({
            overwriteReport: null,
            addReport: 'none',
            inputOverwrite: null,
            inputAdd: 'none',
            visibleEditMaintenance: true,
            save: 'none',
            save1: null,
            editMaintenanceWidth: 600,
            childCommentMaintenanceWidth: 500,
            fillReportKey: "2",
          })

        const activeApplicationID = fire.database().ref(`${user.uid}/${this.state.currentProject}/activeApplicationID`);
        activeApplicationID.set(itemId);
          });





    }

    fillStatesSmall(itemId) {
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
        this.setState({
          overwriteReport: null,
          addReport: 'none',
          inputOverwrite: null,
          inputAdd: 'none',
          visibleEditMaintenance: true,
          editMaintenanceWidth: 300,
          childCommentMaintenanceWidth: 250,
          save: 'none',
          save1: null,
          fillReportKey: "2",
        });
        const activeApplicationID = fire.database().ref(`${user.uid}/${this.state.currentProject}/activeApplicationID`);
        activeApplicationID.set(itemId);
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




    onChange = (pagination, filters, sorter, extra: { currentDataSource: [] }) => {
      const data = extra.currentDataSource;
   console.log(extra.currentDataSource);
   this.setState({
     currentData: extra.currentDataSource,
   })
 }



  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  onChildrenDrawerCloseComment = () => {
    this.setState({
      childrenDrawerComment: false,
    });
  };
  showChildrenDrawerComment = () => {
    this.setState({
      childrenDrawerComment: true,
    });
  };




  handleSizeChange1 = (e) => {

  this.setState({ Status: e.target.value});



  }


  onChangeDate = (date, dateString) => {

    const parameterList1Ref = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/chemicalApplications`);
    parameterList1Ref.on('value', (snapshot) => {
      let snapArray = this.snapshotToArray(snapshot);
      console.log(snapArray)
      if (snapArray.length == 0) {
        this.setState({
          snapArray: [],
        })
      }
      if (snapArray.length > 0) {
        let data = snapArray;
      let reverseData1 = data.reverse();
        this.setState({
          snapArray: data.reverse(),
          chartArray: data.reverse(),
        })
      }
       })

    let startDate = dateString[0];
    let endDate = dateString[1];
    let dates = this.state.chartArray;

    var dateRange = dates.filter((date)=> { if (date.date >= startDate && date.date <= endDate) {
      return true
    }});

    this.setState({
      startDate: dateString[0],
      endDate: dateString[1],
      snapArray: dateRange
    })

    console.log(dateRange);
    console.log(startDate);
    console.log(endDate);
    console.log(dates);
  }

  clearDates = () => {


        const parameterList1Ref = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/chemicalApplications`);
        parameterList1Ref.on('value', (snapshot) => {
          let snapArray = this.snapshotToArray(snapshot);
          console.log(snapArray)
          if (snapArray.length == 0) {
            this.setState({
              snapArray: [],

            })
          }



          if (snapArray.length > 0) {
            let data = snapArray;

            let reverseData1 = data.reverse();

            this.setState({
              snapArray: data.reverse(),

              startDate: '',
              endDate: ''

            })


          }

           })




  }






      render() {

        const dateFormat = 'YYYY-MM-DD';

        const content = (
          <Alert
      message="Error"
      description="This is an error message about copywriting."
      type="error"
      showIcon
    />
        )

        let { file } = this.state
        let url = file && URL.createObjectURL(file)
        let img = document.createElement("my-node");

        const line = '--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------';


        const MyDoc = (
          <Document>
            <Page size="A4" style={styles.body}>
              <View >


                    <Text  style={{position: 'absolute', left: '20px', top: '20px'}}>
                      AquaSource
                    </Text>
                    <Text  style={{position: 'absolute', left: '20px', top: '40px', fontSize: 13}}>
                      Huntington Beach
                    </Text>

                    <Text  style={{position: 'absolute', left: '400px', top: '20px'}}>
                      # {this.state.applicationID}
                    </Text>
                    <Text style={{position: 'absolute', left: '400px', top: '40px', fontSize: 13}} >
                      {this.state.lakeName}
                    </Text>
                    <Text style={{position: 'absolute', left: '400px', top: '60px', fontSize: 13}} >
                      {this.state.locationCity}, {this.state.locationState}
                    </Text>


                    <Text style={{position: 'absolute', left: '20px', top: '140px', fontSize: 13}} >
                      Application Date: {this.state.applicationDate}
                    </Text>
                    <Text style={{position: 'absolute', left: '200px', top: '140px', fontSize: 13}} >
                      Company: {this.state.applicationCompany}
                    </Text>

                    <Text style={{position: 'absolute', left: '360px', top: '140px', fontSize: 13}} >
                      Chemical: {this.state.applicationChemical}
                    </Text>

                    <Text style={{position: 'absolute', left: '20px', top: '170px', fontSize: 13}} >
                      Application Amount: {this.state.applicationAmount}
                    </Text>





                    <Text style={{position: 'absolute',
                       left: '20px',
                        top: '95px',
                         fontSize: .5,
                          color: 'black',
                          backgroundColor: 'black',}} >
                          {line}
                          </Text>
                          <Text style={{position: 'absolute', left: '120px', top: '100px', zIndex: 1}} >
                            CHEMICAL APPLICATION REPORT
                          </Text>
                          <Text style={{position: 'absolute',
                             left: '20px',
                              top: '118px',
                               fontSize: .5,
                                color: 'black',
                                backgroundColor: 'black',}} >
                                {line}
                                </Text>

                <Text style={{position: 'absolute',
                   left: '20px',
                    top: '235px',
                     fontSize: .5,
                      color: 'black',
                      backgroundColor: 'black',}} >
                      {line}
                      </Text>
                      <Text style={{position: 'absolute', left: '20px', top: '240px'}} >
                        Application Items:
                      </Text>
                      <Text style={{position: 'absolute',
                         left: '20px',
                          top: '260px',
                           fontSize: .5,
                            color: 'black',
                            backgroundColor: 'black',}} >
                            {line}
                            </Text>

                            <View style={{position: 'absolute', left: '20px', top: '280px'}}>
                              {this.state.reportData.map((parameter, idx) => {

                                return (
                                  <View>
                                  <Text style={styles.author}>{parameter.Application_Item}:  {parameter.Application_Input} </Text>
                                  </View>
                                )

                              })}

                            </View>





                    </View>
            </Page>
          </Document>
        )

        const columns1 = [
          {
            title: 'Edit',
            dataIndex: '',
            key: 'x',
            render: this.editRow1.bind(this),
            width: 60,
          },
          {
            title: 'Delete',
            dataIndex: '',
            key: 'y',
            render: this.deleteRow1.bind(this),
            width: 60,
          },
          {
        title: 'Title',
        dataIndex: 'Maintenance_Item',
        key: 'Maintenance_Item',

      },


    ]



        const columns = this.state.tableKeys;
        const columnsSmall = this.state.tableKeysSmall;

const data = this.state.snapArray;
const dataReverse = this.state.graphData;
const data1 = this.state.snapArray1;
const csvData = this.state.snapArray;
const csvData1 = this.state.currentData;






        return (
          <Layout>

            <div style={{ background: '#F4F7FA', padding: '5px' }}>




            <Drawer
              title= "Fill in Application Form"
              placement={this.state.placement}
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
              width={this.state.itemDrawerWidth}
            >





              <Row style={{paddingTop: '10px'}} justify="center">

                <div style={{paddingTop: 10}}>
                  <WrappedItemForm />
                  </div>

                  <div style={{paddingTop: 25}}>
                    <WrappedAddApplicationForm />
                    </div>


              </Row>

            </Drawer>
            <Drawer
              title= "Update Application Report  - Be Sure to Save"
              placement={this.state.placement}
              closable={false}
              onClose={this.onClose}
              visible={this.state.visibleEditMaintenance}
              width={this.state.editMaintenanceWidth}
            >









                  <Row style={{paddingTop: '10px'}} justify="center">

                    <WrappedFillReportForm key={this.state.fillReportKey}/>

                </Row>







            </Drawer>


            </div>

            <div style={{ background: '#F4F7FA', paddingTop: '15px', paddingRight: '5px', paddingLeft: '5px' }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Row type="flex" justify="center">
                <Col span={24} style={{textAlign: 'left'}}>
                  <h2>Chemical Applications</h2>
                </Col>
              </Row>

              <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{textAlign: 'left'}}>

                  <Tabs style={{fontSize: '32px'}}defaultActiveKey="1" activeKey={this.state.key} onChange={this.handleSelect} >




                    <TabPane tab="APPLICATIONS LOG" key="1">
                      <Row type="flex" justify="center">
                        <Col span={24} style={{textAlign: 'center'}}>



                      <Row>
                    <Col xs={0} sm={0} md={9} lg={9} xl={9} style={{textAlign: 'left'}}>
                      <Button><CSVLink data={csvData1}>Download Spreadsheet</CSVLink></Button>
                    </Col>

                    <Col xs={0} sm={0} md={3} lg={3} xl={3} >
                    <Button onClick={this.clearDates}>Clear Dates</Button>
                    </Col>
                    <Col xs={10} sm={10} md={0} lg={0} xl={0} >
                    <Button onClick={this.clearDates}>Clear Dates</Button>
                    </Col>
                    <Col xs={10} sm={10} md={0} lg={0} xl={0} style={{textAlign: 'right'}}>
                    <Button size="large" type="primary" onClick={() => this.showDrawerMobile()}>+ Add Application</Button>
                    </Col>

                    <Col xs={0} sm={0} md={7} lg={7} xl={7} >
                    <RangePicker  allowClear={true} onChange={this.onChangeDate}  />
                    </Col>
                    <Col xs={24} sm={24} md={0} lg={0} xl={0} >
                    <RangePicker  allowClear={true} onChange={this.onChangeDate}  />
                    </Col>



                    <Col xs={0} sm={0} md={5} lg={5} xl={5} style={{textAlign: 'right'}}>
                    <Button size="large" type="primary" onClick={() => this.showDrawer()}>+ Add Application</Button>
                    </Col>



                  </Row>

                      <Row style={{paddingTop: '10px'}} type="flex" justify="center">

                        <Card style={{ width: '100%' }}>
                          <Col xs={0} sm={0} md={24} lg={24} xl={24}>
                            <Table columns={columns} dataSource={data} onChange={this.onChange} scroll={{ x: '100%'}} />

                          </Col>
                          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                            <Table columns={columnsSmall} dataSource={data} onChange={this.onChange} scroll={{ x: '100%'}} />

                          </Col>
                        </Card>
                        </Row>


                      </Col>
                    </Row>

                    </TabPane>



                  <TabPane  key="2">

                    <Drawer
                      title= "Edit Parameter"
                      placement={this.state.placement}
                      closable={false}
                      onClose={this.onClose}
                      visible={this.state.visible3}
                      width={500}
                    >
                    <Row>
                      <Col span={24}>
                        <h2>{this.state.Maintenance_Item}</h2>
                      </Col>
                    </Row>








                  <Row>
                    <hr></hr>
                  </Row>
                  <Row style={{paddingTop: '20px'}}>

                <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                  <Button type="primary" onClick={this.parameterOverwrite}>Overwrite Report</Button>
                  </Col>
                  </Row>


                  </Drawer>
                  <Drawer
                  title="Add Item"
                  width={420}
                  closable={false}
                  onClose={this.visible4Close}
                  visible={this.state.visible4}
                >




     <form>


   <FormGroup onSubmit={this.fillParameterInfo}>


     <Row style={{paddingTop: '10px'}}>
       <Col xs={24} sm={8} md={8} lg={8} xl={8}>
         <span><b>Maintenance Item <p style={{color: 'red'}}>*</p></b></span>
       </Col>
       <Col xs={24} sm={16} md={16} lg={16} xl={16}>

           <FormControl required name="Maintenance_Item" onChange={this.handleChange} type="text" placeholder="Item"  value={this.state.Maintenance_Item} />

       </Col>





     </Row>



   <Row>
     <hr></hr>
   </Row>
   <Row style={{paddingTop: '20px'}}>

 <Col xs={24} sm={14} md={14} lg={14} xl={14}>

   <Button   type="primary" onClick={this.fillParameterInfo} bsStyle="primary">Add Parameter</Button>

   </Col>
   </Row>
   <div style={{display: this.state.error}}>
   <p style={{color: 'red'}}>Double check that all required inputs are filled</p>
</div>


 </FormGroup>




   </form>










                </Drawer>
                <Row type="flex" justify="center">
                  <Col span={24} style={{textAlign: 'center'}}>

                    <Row type="flex" justify="center">

                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{textAlign: 'left'}}>
                          <Button><CSVLink data={csvData1}>Download Spreadsheet</CSVLink></Button>

                        </Col>

                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{textAlign: 'right'}}>
                          <Button size="large" type="primary" onClick={this.showDrawer4}>+ Add Item</Button>

                        </Col>


                      </Row>

                      <Row style={{paddingTop: '10px'}} type="flex" justify="center">

                        <Card style={{ width: '100%' }}>
                          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Table columns={columns1} dataSource={data1} onChange={this.onChange} scroll={{ x: '100%'}} />

                          </Col>
                        </Card>
                        </Row>

                      </Col>
                    </Row>



</TabPane>

<TabPane  key="3">

  <Row type="flex" justify="center">
    <Col span={24} style={{textAlign: 'center'}}>

      <Row>
      <PDFDownloadLink document={MyDoc} fileName={this.state.applicationDate}><Button type="primary" size="large">Export PDF</Button>

</PDFDownloadLink>
</Row>

  <Row style={{paddingTop: '20px'}}>
    <Col span={24}>

<PDFViewer style={{width: '100%', height: 800}}>
  {MyDoc}
</PDFViewer>

</Col>

      </Row>

    </Col>
  </Row>


</TabPane>









            </Tabs>
          </Col>
        </Row>


            </Col>
            </Row>
            </div>





          </Layout>
      )
    }
  }
