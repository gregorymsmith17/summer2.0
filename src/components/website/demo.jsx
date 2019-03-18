import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Row, Col, Tabs, Table, Divider, Tag, message, Card, Drawer, Menu, Dropdown, Button, Layout, Carousel, Input, Pagination, Popover, Icon, Cascader,Tooltip, Switch,Modal,Form, AutoComplete, Select, Checkbox, Radio } from 'antd';

import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { fire, facebookProvider } from '../../fire';



import paddleboard from './images/paddleboard.jpg';
import faucet from './images/faucet.jpg';
import kayak from './images/kayak.jpg';
import lakeSign from './images/lakeSign.jpg';
import floatingScreen from './images/floatingScreen.png';
import macbook from './images/macbook.png';

import 'antd/dist/antd.css';


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function handleClick(e) {
  console.log('click', e);
}

class lakeDemoForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    formDisplay: 'none',
    formDisplay1: null,
  };



  handleSubmit = (e) => {
    e.preventDefault();

      const projectsListRef = fire.database().ref(`demoLeads`);
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.setState({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              company: values.company,
              phone: values.phone,
              formDisplay: null,
              formDisplay1: 'none',
            })

            const projectInfo = {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              company: values.company,
              phone: values.phone,
            }
            projectsListRef.push(projectInfo);
          }

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



  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const testLayout = {
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
      <Form  onSubmit={this.handleSubmit} style={{display: this.state.formDisplay1, fontSize: 12}}>

        <p style={{fontSize: 16}}><b>Access Lake Demo</b></p>


        <Form.Item {...testLayout} label="First Name">
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>

        <Form.Item {...testLayout} label="Last Name" >
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...testLayout} label="E-mail" >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...testLayout} label="Company" >
          {getFieldDecorator('company', {
            rules: [{ required: true, message: 'Please input your company!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...testLayout} label="Phone">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </Form.Item>
        <Form.Item {...testLayout} style={{textAlign: 'right'}}>
          <Button type="primary" htmlType="submit">Access Demo</Button>
        </Form.Item>
        <p>{this.state.firstName} {this.state.lastName}</p>
      </Form>
      <Card style={{textAlign: 'center', display: this.state.formDisplay}} bordered={false}>
      <Row >
      <Col span={24}>
      <p style={{fontSize: 28}}><b>Please use the following information to login to your demo:</b></p>
      </Col></Row>
      <Row >
      <Col span={24}>
      <p style={{fontSize: 18}}><b>Email: </b>Lake@AquaSource.com</p>
      </Col>
      </Row>
      <Row >
      <Col span={24}>
      <p style={{fontSize: 18}}><b>Password: </b>LakeLake</p>
      </Col></Row>
      <Icon style={{fontSize: 32}} type="check-circle" theme="twoTone" />
      <Row>
      <Col span={24}>
      </Col></Row></Card></div>
    );
  }
}

const WrappedlakeDemoForm = Form.create({ name: 'register' })(lakeDemoForm);

class wastewaterDemoForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    formDisplay: 'none',
    formDisplay1: null,
  };



  handleSubmit = (e) => {
    e.preventDefault();

      const projectsListRef = fire.database().ref(`demoLeads`);
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.setState({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              company: values.company,
              phone: values.phone,
              formDisplay: null,
              formDisplay1: 'none',
            })

            const projectInfo = {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              company: values.company,
              phone: values.phone,
            }
            projectsListRef.push(projectInfo);
          }

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



  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const testLayout = {
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
      <Form  onSubmit={this.handleSubmit} style={{display: this.state.formDisplay1, fontSize: 12}}>

        <p style={{fontSize: 16}}><b>Access Wastewater Demo</b></p>


        <Form.Item {...testLayout} label="First Name">
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>

        <Form.Item {...testLayout} label="Last Name" >
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...testLayout} label="E-mail" >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...testLayout} label="Company" >
          {getFieldDecorator('company', {
            rules: [{ required: true, message: 'Please input your company!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...testLayout} label="Phone">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </Form.Item>
        <Form.Item {...testLayout} style={{textAlign: 'right'}}>
          <Button type="primary" htmlType="submit">Access Demo</Button>
        </Form.Item>
        <p>{this.state.firstName} {this.state.lastName}</p>
      </Form>
      <Card style={{textAlign: 'center', display: this.state.formDisplay}} bordered={false}>
      <Row >
      <Col span={24}>
      <p style={{fontSize: 28}}><b>Please use the following information to login to your demo:</b></p>
      </Col></Row>
      <Row >
      <Col span={24}>
      <p style={{fontSize: 18}}><b>Email: </b>Wastewater@AquaSource.com</p>
      </Col>
      </Row>
      <Row >
      <Col span={24}>
      <p style={{fontSize: 18}}><b>Password: </b>wastewater</p>
      </Col></Row>
      <Icon style={{fontSize: 32}} type="check-circle" theme="twoTone" />
      <Row>
      <Col span={24}>
      </Col></Row></Card></div>
    );
  }
}

const WrappedwastewaterDemoForm = Form.create({ name: 'register' })(wastewaterDemoForm);

class manholeDemoForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    formDisplay: 'none',
    formDisplay1: null,
  };



  handleSubmit = (e) => {
    e.preventDefault();

      const projectsListRef = fire.database().ref(`demoLeads`);
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.setState({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              company: values.company,
              phone: values.phone,
              formDisplay: null,
              formDisplay1: 'none',
            })

            const projectInfo = {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              company: values.company,
              phone: values.phone,
            }
            projectsListRef.push(projectInfo);
          }

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



  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const testLayout = {
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
      <Form  onSubmit={this.handleSubmit} style={{display: this.state.formDisplay1, fontSize: 12}}>

        <p style={{fontSize: 16}}><b>Access Odor Control Demo</b></p>


        <Form.Item {...testLayout} label="First Name">
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>

        <Form.Item {...testLayout} label="Last Name" >
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...testLayout} label="E-mail" >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...testLayout} label="Company" >
          {getFieldDecorator('company', {
            rules: [{ required: true, message: 'Please input your company!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...testLayout} label="Phone">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </Form.Item>
        <Form.Item {...testLayout} style={{textAlign: 'right'}}>
          <Button type="primary" htmlType="submit">Access Demo</Button>
        </Form.Item>
        <p>{this.state.firstName} {this.state.lastName}</p>
      </Form>
      <Card style={{textAlign: 'center', display: this.state.formDisplay}} bordered={false}>
      <Row >
      <Col span={24}>
      <p style={{fontSize: 28}}><b>Please use the following information to login to your demo:</b></p>
      </Col></Row>
      <Row >
      <Col span={24}>
      <p style={{fontSize: 18}}><b>Email: </b>OdorControl@AquaSource.com</p>
      </Col>
      </Row>
      <Row >
      <Col span={24}>
      <p style={{fontSize: 18}}><b>Password: </b>odorcontrol</p>
      </Col></Row>
      <Icon style={{fontSize: 32}} type="check-circle" theme="twoTone" />
      <Row>
      <Col span={24}>
      </Col></Row></Card></div>
    );
  }
}

const WrappedmanholeDemoForm = Form.create({ name: 'register' })(manholeDemoForm);

class resortDemoForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    formDisplay: 'none',
    formDisplay1: null,
  };



  handleSubmit = (e) => {
    e.preventDefault();

      const projectsListRef = fire.database().ref(`demoLeads`);
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.setState({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              company: values.company,
              phone: values.phone,
              formDisplay: null,
              formDisplay1: 'none',
            })

            const projectInfo = {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              company: values.company,
              phone: values.phone,
            }
            projectsListRef.push(projectInfo);
          }

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



  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const testLayout = {
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
      <Form  onSubmit={this.handleSubmit} style={{display: this.state.formDisplay1, fontSize: 12}}>

        <p style={{fontSize: 16}}><b>Access Resort Demo</b></p>


        <Form.Item {...testLayout} label="First Name">
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>

        <Form.Item {...testLayout} label="Last Name" >
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...testLayout} label="E-mail" >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...testLayout} label="Company" >
          {getFieldDecorator('company', {
            rules: [{ required: true, message: 'Please input your company!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...testLayout} label="Phone">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </Form.Item>
        <Form.Item {...testLayout} style={{textAlign: 'right'}}>
          <Button type="primary" htmlType="submit">Access Demo</Button>
        </Form.Item>
        <p>{this.state.firstName} {this.state.lastName}</p>
      </Form>
      <Card style={{textAlign: 'center', display: this.state.formDisplay}} bordered={false}>
      <Row >
      <Col span={24}>
      <p style={{fontSize: 28}}><b>Please use the following information to login to your demo:</b></p>
      </Col></Row>
      <Row >
      <Col span={24}>
      <p style={{fontSize: 18}}><b>Email: </b>Resort@AquaSource.com</p>
      </Col>
      </Row>
      <Row >
      <Col span={24}>
      <p style={{fontSize: 18}}><b>Password: </b>resort</p>
      </Col></Row>
      <Icon style={{fontSize: 32}} type="check-circle" theme="twoTone" />
      <Row>
      <Col span={24}>
      </Col></Row></Card></div>
    );
  }
}

const WrappedresortDemoForm = Form.create({ name: 'register' })(resortDemoForm);


export default class demo extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visibleModal: false,
      visibleMobile: false,
      visibleMobile1: false,
      visibleQuote: false,
      visibleQuoteMobile: false,
      mobileLogin: false,
      showLakeDemo:'none',
      showWastewaterDemo:'none',
      showResortDemo:'none',
      showManholeDemo: 'none',


    };

  }

  showMobileDrawer = () => {
    this.setState({
      visibleMobile: true,
    });
  };

  onCloseMobile = () => {
   this.setState({
     visibleMobile: false,
   });
  };

  showMobileDrawer1 = () => {
    this.setState({
      visibleMobile1: true,
    });
  };

  onCloseMobile1 = () => {
   this.setState({
     visibleMobile1: false,
   });
  };

  showQuoteDrawer = () => {
   this.setState({
     visibleQuote: true,
   });
  };
  showQuoteDrawerResort = () => {
   this.setState({
     visibleQuote: true,
     showWastewaterDemo: 'none',
     showLakeDemo: 'none',
     showManholeDemo:'none',
     showResortDemo: null,
   });
  };
  showQuoteDrawerWastewater = () => {
   this.setState({
     visibleQuote: true,
     showWastewaterDemo: null,
     showLakeDemo: 'none',
     showManholeDemo:'none',
     showResortDemo: 'none',
   });
  };
  showQuoteDrawerManhole = () => {
   this.setState({
     visibleQuote: true,
     showWastewaterDemo: 'none',
     showLakeDemo: 'none',
     showManholeDemo: null,
     showResortDemo: 'none',
   });
  };
  showQuoteDrawerLake = () => {
   this.setState({
     visibleQuote: true,
     showWastewaterDemo: 'none',
     showLakeDemo: null,
     showManholeDemo:'none',
     showResortDemo: 'none',
   });
  };

  showQuoteDrawerMobile = () => {
   this.setState({
     visibleQuoteMobile: true,
   });
  };
  showQuoteDrawerMobileWastewater = () => {
   this.setState({
     visibleQuoteMobile: true,
     showWastewaterDemo: null,
     showLakeDemo: 'none',
     showManholeDemo:'none',
     showResortDemo: 'none',
   });
  };
  showQuoteDrawerMobileLake = () => {
   this.setState({
     visibleQuoteMobile: true,
     showWastewaterDemo: 'none',
     showLakeDemo: null,
     showManholeDemo:'none',
     showResortDemo: 'none',
   });
  };
  showQuoteDrawerMobileManhole = () => {
   this.setState({
     visibleQuoteMobile: true,
     showWastewaterDemo: 'none',
     showLakeDemo: 'none',
     showManholeDemo: null,
     showResortDemo: 'none',
   });
  };
  showQuoteDrawerMobileResort = () => {
   this.setState({
     visibleQuoteMobile: true,
     showWastewaterDemo: 'none',
     showLakeDemo: 'none',
     showManholeDemo:'none',
     showResortDemo: null,
   });
  };

  onQuoteMobile = () => {
  this.setState({
    visibleQuote: false,
    visibleQuoteMobile: false,
  });
  };


  showDrawerMobileLogin = () => {
    this.setState({
      mobileLogin: true,
    });
  };

  closeDrawerMobileLogin = () => {
    this.setState({
      mobileLogin: false,
    });
  };

  render() {



    function onChange(a, b, c) {
      console.log(a, b, c);
    }

    return (
      <Layout style={{backgroundColor: 'white'}}>

        <Drawer
        title={<Row>
        <Col span={3}>

        </Col>

        <Col span={10}>
          <p style={{fontSize: 32, paddingTop: 15}}><b>Aqua</b>Source</p>
        </Col>
        <Col span={8} style={{textAlign: 'right', paddingTop: 15}}>
        <Button onClick={this.onQuoteMobile} type="primary">Close</Button>
        </Col>
        </Row>

        }
        placement="top"
        closable={false}
        onClose={this.onQuoteMobile}
        visible={this.state.visibleQuote}
        height={750}

        >
        <Row>
        <Col span={3}>

        </Col>

        <Col span={10}>

        <Row>

        <Col span={24}>
        <p style={{fontSize: 24}}><b>Experience an all new way to manage your water infrastructure and projects.</b></p>
        </Col>
        </Row>

        <Row>
        <Col span={24}>
        <p style={{fontSize: 18}}>Fill out the form and access one of the AquaSource demos.</p>
        </Col>
        </Row>

        <Row>
        <Col span={12}>
        <Row>
        <Col span={24}>
        <p style={{fontSize: 16}}><Icon style={{fontSize: 20}} type="home" theme="twoTone" />  <b>Lake Demo</b></p>
        </Col>
        </Row>
        <Row>
        <Col span={24}>
        <p>Manager your HOA lake or park lake with AquaSource's suite of management tools.</p>
        </Col>
        </Row>
        </Col>
        <Col offset={1} span={11}>
        <Row>
        <Col span={24}>
        <p style={{fontSize: 16}}><Icon style={{fontSize: 20}} type="fire" theme="twoTone" twoToneColor="#eb2f96"/>  <b>Odor Control Study Demo</b></p>
        </Col>
        </Row>
        <Row>
        <Col span={24}>
        <p>See how AquaSource has the power to manage a project such as an odor control study for your city.</p>
        </Col>
        </Row>
        </Col>

        </Row>
        <Row>
        <Col span={12}>
        <Row>
        <Col span={24}>
        <p style={{fontSize: 16}}><Icon style={{fontSize: 20}} type="build" theme="twoTone" twoToneColor="orange" />  <b>Resort Demo</b></p>
        </Col>
        </Row>
        <Row>
        <Col span={24}>
        <p>See how AquaSource can help you manage your resort's water infrasturcutre systems including pools, fountains, and lakes.</p>
        </Col>
        </Row>
        </Col>
        <Col offset={1} span={11}>
        <Row>
        <Col span={24}>
        <p style={{fontSize: 16}}><Icon style={{fontSize: 20}} type="experiment" theme="twoTone" twoToneColor="#52c41a" />  <b>Wastewater System</b></p>
        </Col>
        </Row>
        <Row>
        <Col span={24}>
        <p>AquaSource can be used to manage your lift stations, WWTP and collection system as a whole to increase productivity and organization.</p>
        </Col>
        </Row>
        </Col>
        </Row>
        </Col>
        <Col offset={1} span={7}>
        <Card style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>

          <div style={{display: this.state.showLakeDemo}}>
          <WrappedlakeDemoForm />
          </div>
          <div style={{display: this.state.showResortDemo}}>
          <WrappedresortDemoForm />
          </div>
          <div style={{display: this.state.showManholeDemo}}>
          <WrappedmanholeDemoForm />
          </div>
          <div style={{display: this.state.showWastewaterDemo}}>
          <WrappedwastewaterDemoForm />
          </div>


        </Card>
        </Col>
        <Col span={3}>
        </Col>
        </Row>

        </Drawer>
        <Drawer
        title={<Row>
        <Col span={3}>

        </Col>

        <Col span={10}>
          <p style={{fontSize: 32, paddingTop: 15}}><b>Aqua</b>Source</p>
        </Col>
        <Col span={8} style={{textAlign: 'right', paddingTop: 15}}>
        <Button onClick={this.onQuoteMobile} type="primary">Close</Button>
        </Col>
        </Row>

        }
        placement="top"
        closable={false}
        onClose={this.onQuoteMobile}
        visible={this.state.visibleQuoteMobile}
        height={700}

        >
        <Row justify="center">




        <Col span={22}>
        <Card style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
          <div style={{display: this.state.showLakeDemo}}>
          <WrappedlakeDemoForm />
          </div>
          <div style={{display: this.state.showResortDemo}}>
          <WrappedresortDemoForm />
          </div>
          <div style={{display: this.state.showManholeDemo}}>
          <WrappedmanholeDemoForm />
          </div>
          <div style={{display: this.state.showWastewaterDemo}}>
          <WrappedwastewaterDemoForm />
          </div>
        </Card>



        </Col>



        <Col span={3}>

        </Col>




        </Row>

        </Drawer>





        <Row>
<Col xs={0} sm={0} md={0} lg={24} xl={24}>
<Row>
  <Col xs={24} sm={24} md={12} lg={12} xl={12} >
    <Card style={{backgroundColor: '#f6f6f6', height: '250px'}}>
      <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <p style={{fontSize: 26}}><b>Home Owners Association Lake Demo</b></p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 18}} lg={{offset: 1, span: 18}} xl={{offset: 1, span: 18}}>
        <p>If you are looking to use AquaSource to help manage your lake at your HOA check out this demo to get an idea of how the AquaSource platform can help you manage your lake.</p>
      </Col>

    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <Button onClick={this.showQuoteDrawerLake} type="primary"><b>TRY DEMO</b></Button>
      </Col>
    </Row>


    </Card >
  </Col>
  <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ paddingLeft: 10}}>
    <Card style={{backgroundColor: '#f6f6f6', height: '250px'}}>
      <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <p style={{fontSize: 26}}><b>Public Works Wastewater System Demo</b></p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 18}} lg={{offset: 1, span: 18}} xl={{offset: 1, span: 18}}>
        <p>If you are looking to use AquaSource to help manage your lift stations, WWTP, and other Wastewater infrastructure, check out this example to see how AquaSource provides a solution for you.</p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <Button onClick={this.showQuoteDrawerWastewater} type="primary"><b>TRY DEMO</b></Button>
      </Col>
    </Row>
    </Card>
  </Col>

</Row>
<Row>
  <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ paddingTop: 10, paddingBottom: 15}}>
    <Card style={{backgroundColor: '#f6f6f6', height: '250px'}}>
      <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <p style={{fontSize: 26}}><b>Manhole Odor Control Demo</b></p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 18}} lg={{offset: 1, span: 18}} xl={{offset: 1, span: 18}}>
        <p>If you are looking to use AquaSource to help manage collection system and manage your odor control check out this example to see how AquaSource provides a solution for you.</p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <Button onClick={this.showQuoteDrawerManhole} type="primary"><b>TRY DEMO</b></Button>
      </Col>
    </Row>
    </Card>
  </Col>
  <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ paddingTop: 10, paddingLeft: 10, paddingBottom: 15}}>
    <Card style={{backgroundColor: '#f6f6f6', height: '250px'}}>
      <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <p style={{fontSize: 26}}><b>Golf Course or Resort Demo</b></p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 18}} lg={{offset: 1, span: 18}} xl={{offset: 1, span: 18}}>
        <p>If you are looking to use AquaSource to help manage your lake at your Golf Course or Resort check out this demo to get an idea of how the AquaSource platform provides a solution for you.</p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <Button onClick={this.showQuoteDrawerResort} type="primary"><b>TRY DEMO</b></Button>
      </Col>
    </Row>
    </Card>
  </Col>

</Row>
</Col>

<Col xs={0} sm={0} md={24} lg={0} xl={0}>
<Row>
  <Col xs={24} sm={24} md={12} lg={12} xl={12} >
    <Card style={{backgroundColor: '#f6f6f6', height: '300px'}}>
      <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <p style={{fontSize: 26}}><b>Home Owners Association Lake Demo</b></p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 18}} lg={{offset: 1, span: 18}} xl={{offset: 1, span: 18}}>
        <p>If you are looking to use AquaSource to help manage your lake at your HOA check out this demo to get an idea of how the AquaSource platform can help you manage your lake.</p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <Button onClick={this.showQuoteDrawerLake} type="primary"><b>TRY DEMO</b></Button>
      </Col>
    </Row>


    </Card >
  </Col>
  <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ paddingLeft: 10}}>
    <Card style={{backgroundColor: '#f6f6f6', height: '300px'}}>
      <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <p style={{fontSize: 26}}><b>Public Works Wastewater System Demo</b></p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 18}} lg={{offset: 1, span: 18}} xl={{offset: 1, span: 18}}>
        <p>If you are looking to use AquaSource to help manage your lift stations, WWTP, and other Wastewater infrastructure, check out this example to see how AquaSource provides a solution for you.</p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <Button onClick={this.showQuoteDrawerWastewater} type="primary"><b>TRY DEMO</b></Button>
      </Col>
    </Row>
    </Card>
  </Col>

</Row>
<Row>
  <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ paddingTop: 10, paddingBottom: 15}}>
    <Card style={{backgroundColor: '#f6f6f6', height: '300px'}}>
      <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <p style={{fontSize: 26}}><b>Manhole Odor Control Demo</b></p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 18}} lg={{offset: 1, span: 18}} xl={{offset: 1, span: 18}}>
        <p>If you are looking to use AquaSource to help manage collection system and manage your odor control check out this example to see how AquaSource provides a solution for you.</p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <Button onClick={this.showQuoteDrawerManhole} type="primary"><b>TRY DEMO</b></Button>
      </Col>
    </Row>
    </Card>
  </Col>
  <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ paddingTop: 10, paddingLeft: 10, paddingBottom: 15}}>
    <Card style={{backgroundColor: '#f6f6f6', height: '300px'}}>
      <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <p style={{fontSize: 26}}><b>Golf Course or Resort Demo</b></p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 18}} lg={{offset: 1, span: 18}} xl={{offset: 1, span: 18}}>
        <p>If you are looking to use AquaSource to help manage your lake at your Golf Course or Resort check out this demo to get an idea of how the AquaSource platform provides a solution for you.</p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <Button onClick={this.showQuoteDrawerResort} type="primary"><b>TRY DEMO</b></Button>
      </Col>
    </Row>
    </Card>
  </Col>

</Row>
</Col>







<Col xs={24} sm={24} md={0} lg={0} xl={0}>
<Row>
  <Col xs={24} sm={24} md={12} lg={12} xl={12} >
    <Card style={{backgroundColor: '#f6f6f6', }}>
      <Row>
      <Col xs={24} sm={24} >
        <p style={{fontSize: 26}}><b>Home Owners Association Lake Demo</b></p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} >
        <p>If you are looking to use AquaSource to help manage your lake at your HOA check out this demo to get an idea of how the AquaSource platform can help you manage your lake.</p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} >
        <Button onClick={this.showQuoteDrawerMobileLake} type="primary"><b>TRY DEMO</b></Button>
      </Col>
    </Row>


    </Card >
  </Col>
  <Col xs={24} sm={24} >
    <Card style={{backgroundColor: '#f6f6f6', }}>
      <Row>
      <Col xs={24} sm={24} m>
        <p style={{fontSize: 26}}><b>Public Works Wastewater System Demo</b></p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} >
        <p>If you are looking to use AquaSource to help manage your lift stations, WWTP, and other Wastewater infrastructure, check out this example to see how AquaSource provides a solution for you.</p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} >
        <Button onClick={this.showQuoteDrawerMobileWastewater} type="primary"><b>TRY DEMO</b></Button>
      </Col>
    </Row>
    </Card>
  </Col>

</Row>
<Row>
  <Col xs={24} sm={24} md={12} lg={12} xl={12} >
    <Card style={{backgroundColor: '#f6f6f6', }}>
      <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <p style={{fontSize: 26}}><b>Manhole Odor Control Demo</b></p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 18}} lg={{offset: 1, span: 18}} xl={{offset: 1, span: 18}}>
        <p>If you are looking to use AquaSource to help manage collection system and manage your odor control check out this example to see how AquaSource provides a solution for you.</p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <Button onClick={this.showQuoteDrawerMobileManhole} type="primary"><b>TRY DEMO</b></Button>
      </Col>
    </Row>
    </Card>
  </Col>
  <Col xs={24} sm={24}  >
    <Card style={{backgroundColor: '#f6f6f6', }}>
      <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <p style={{fontSize: 26}}><b>Golf Course or Resort Demo</b></p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 18}} lg={{offset: 1, span: 18}} xl={{offset: 1, span: 18}}>
        <p>If you are looking to use AquaSource to help manage your lake at your Golf Course or Resort check out this demo to get an idea of how the AquaSource platform provides a solution for you.</p>
      </Col>
    </Row>
    <Row>
      <Col xs={24} sm={24} md={{offset: 1, span: 23}} lg={{offset: 1, span: 23}} xl={{offset: 1, span: 23}}>
        <Button onClick={this.showQuoteDrawerMobileResort} type="primary"><b>TRY DEMO</b></Button>
      </Col>
    </Row>
    </Card>
  </Col>

</Row>
</Col>




</Row>





      </Layout>

    )
        }
      }
