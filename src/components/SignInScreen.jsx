import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { fire, facebookProvider } from '../fire';



import './SignInScreen.css';
import './firebaseui-styling.global.css';

import Dashboard from './dashboard';
import monthlySamples from './monthlySamples';
import sampling from './sampling';

import testingPage from './testingPage';
import testingPage2 from './testingPage2';


import uploadDocument from './uploadDocument';
import uploadDrawings from './uploadDrawings';
import uploadManuals from './uploadManuals';
import profilePage from './profilePage';

import maintenanceReports from './assetManager/maintenanceReports';
import vendorContacts from './assetManager/vendorContacts';
import equipmentList from './assetManager/equipmentList';
import chemicalApplications from './assetManager/chemicalApplications';
import fishStocking from './assetManager/fishStocking';
import testing from './assetManager/testing';

import drawings from './documents/drawings';
import reports from './documents/reports';
import permits from './documents/permits';
import manuals from './documents/manuals';

import landingPage from './website/landingPage';
import about from './website/about';
import resources from './website/resources';
import productOverview from './website/productOverview';

import assetManagement from './website/assetManagement';
import sampleLog from './website/sampleLog';
import documentControl from './website/documentControl';
import productivity from './website/productivity';
import projectManagement from './website/projectManagement';
import maintenanceLog from './website/maintenanceLog';
import demo from './website/demo';
import demoTest from './website/demoTest';
import tutorial from './website/tutorial';

import dashForecast from './dashForecast';

import Drop from './Index';


import { Link } from 'react-router-dom';
import { FormGroup, FormControl} from 'react-bootstrap';
import { Row, Col, Tooltip,Cascader, Table, Drawer, Menu, Layout, Modal, Icon, Card, Form, Select, Input, Checkbox, AutoComplete, Button } from 'antd';

import { BrowserRouter, Route } from 'react-router-dom';

import 'antd/dist/antd.css';


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


const {
  Header, Footer, Sider, Content,
} = Layout;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function handleClick(e) {
  console.log('click', e);
}

var buttonStyle = {

    background: 'linear-gradient(to top right, #ff5263 0%, #ff7381 35%, #fcbd01 100%)',
    fontSize: '15px',
    color: "#ffffff",
    textShadow: "0 -1px 0 rgba(0, 0, 0, 0.25)"
}




class RegistrationForm extends React.Component {
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

      const projectsListRef = fire.database().ref(`leads`);
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

        <p style={{fontSize: 16}}><b>Request a Quote</b></p>


        <Form.Item {...testLayout}
          label="First Name"
        >
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>

        <Form.Item {...testLayout}
          label="Last Name"
        >
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...testLayout}
          label="E-mail"
        >
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
        <Form.Item {...testLayout}
          label="Company"
        >
          {getFieldDecorator('company', {
            rules: [{ required: true, message: 'Please input your company!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>

        <Form.Item {...testLayout}
          label="Phone"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </Form.Item>



        <Form.Item {...testLayout}  style={{textAlign: 'right'}}>
          <Button type="primary" htmlType="submit">Request a Quote</Button>
        </Form.Item>

        <p>{this.state.firstName} {this.state.lastName}</p>
      </Form>



      <Card style={{textAlign: 'center', display: this.state.formDisplay}} bordered={false}>
      <Row >
      <Col span={24}>
      <p style={{fontSize: 28}}><b>Thank you for requesting a quote. <br /> <br />  An AquaSource representative will be reaching out shortly.</b></p>
      </Col>
      </Row>

      <Icon style={{fontSize: 32}} type="check-circle" theme="twoTone" />

      <Row>
      <Col span={24}>

      </Col>

      </Row>

      </Card>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);









class SignInScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visibleModal: false,
      open: false,
      open1: false,
      open2: false,
      visible: false,
      visible1: false,
      placement: 'right',
      margin: "8px 20px 20px 185px",
      appear: 'false',
      collapsed: true,
      error: 'none',
      projectName: '',
      currentProject: '',
      projectList: [],
      visibleMobile: false,
      visibleMobile1: false,
      visibleQuote: false,
      visibleQuoteMobile: false,
      mobileLogin: false,


    };

  }


  handleChange = (e) => {
    const name = e.target.name;
const value = e.target.value;
this.setState({ [name]: value });
    this.setState({
      [e.target.name]: e.target.value,
      error: 'none',
    });


  }

  snapshotToArray(snapshot) {
     var returnArr = [];

     snapshot.forEach(function(childSnapshot) {
         var item = childSnapshot.val();
         item.key = childSnapshot.key;

         returnArr.push(item);
     });

     return returnArr;
 };

  newProject = (e, itemId) => {
    e.preventDefault();
    //fire.database().ref('samples') refers to the main title of the fire database.
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const projectsListRef = fire.database().ref(`${user.uid}/Projects`);

    if (this.state.projectName.length == 0) {
      console.log("do nothing")
      this.setState({
        error: null,
      })
    }

    if (this.state.projectName.length != 0) {
      const projectInfo = {
        projectName: this.state.projectName,

      }
      projectsListRef.push(projectInfo);
      //this.setState is used to clear the text boxes after the form has been submitted.
      this.setState({
        projectName: '',
        visibleModal: false,
      });
    }
  });
  }

  projectState(itemId) {

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const projectsListRef = fire.database().ref(`${user.uid}/Projects/${itemId}`);
      projectsListRef.on('value', (snapshot) => {


      let project = snapshot.child('projectName').val();
      this.setState({
        currentProject: project
      })

      });

      const currentProjectRef = fire.database().ref(`${user.uid}/currentProject`);

      const currentProjectInfo = {
        currentProject: this.state.currentProject,
      }
      currentProjectRef.set(currentProjectInfo);
      console.log(this.state.currentProject)


  });
}

removeProject(itemId) {
this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
 const projectRef = fire.database().ref(`${user.uid}/Projects/${itemId}`);
 projectRef.remove();



})
}







  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    'credentialHelper': firebaseui.auth.CredentialHelper.NONE,
    signInSuccessUrl: '/dashboard',


    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebaseui.auth.CredentialHelper.NONE
    ],

  };

  closePopover = () => {
    this.state = {
      open: false,
      open1: false,
      open2: false,

    };

  }

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
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

  const currentProjectRef = fire.database().ref(`${user.uid}/currentProject`);

  currentProjectRef.on('value', (snapshot) => {

  this.setState({
    currentProject: snapshot.child('currentProject').val(),
  });


});

const projectsListRef = fire.database().ref(`${user.uid}/Projects`);
projectsListRef.on('value', (snapshot) => {
  let snapArray = this.snapshotToArray(snapshot);
  let val = snapshot.val();
console.log(snapArray)

this.setState({
  projectList: snapArray,
})

console.log(val)

});



});
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  onBreak = () => {
    this.setState({
      margin: 15,
    })
  }

  menuAppear = () => {
    return {


    }
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  dashboardRef = () => {
    return (
      <Route path="/dashboard" component={Dashboard} />
    )
  }
  showNewLake = () => {
  this.setState({
    visibleModal: true,
  });
}



handleCancel = (e) => {
  console.log(e);
  this.setState({
    visibleModal: false,
  });
}

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  showDrawer1 = () => {
    this.setState({
      visible1: true,
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



  onChange = (e, pagination, filters, sorter, extra: { currentDataSource: [] }) => {
    const data = extra.currentDataSource;
 console.log(extra.currentDataSource);
 this.setState({
   placement: e.target.value,
   currentData: extra.currentDataSource,
 })
}

deleteRow1 = (row, isSelected, e, id, key) =>
{
  return (
    <div style={{textAlign: 'center'}}>
    <Icon type="delete" style={{fontSize: '24px', color: '#101441'}}
    onClick={() => this.removeProject(isSelected.key)}>
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
    >
      Click me
    </Icon>
    </div>
  )
}

visibleManage = () => {
  this.setState({
    visibleManageProjects: true,
  })
}

handleOk = (e) => {
  console.log(e);
  this.setState({
    visibleManageProjects: false,
  });
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

showQuoteDrawerMobile = () => {
 this.setState({
   visibleQuoteMobile: true,
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


    const columns1 = [
      {
        title: 'Delete',
        dataIndex: '',
        key: 'y',
        render: this.deleteRow1.bind(this),
        width: 60,
      },


      {
    title: 'Project',
    dataIndex: 'projectName',
    key: 'projectName',
    width: 200,
  },


]






    if (!this.state.isSignedIn) {
      return (

        <Layout style={{backgroundColor: '#F4F7FA', background: '#F4F7FA',}}>



          <Header style={{backgroundColor: '#FFFFFF', background: '#FFFFFF', margin: 0, padding: 0}}>
          <Row type="flex" justify="center" align="middle" >
            <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{textAlign: 'right'}}>
              <Menu
                onClick={handleClick}

                mode="horizontal"
                style={{fontSize: '14px', lineHeight: '55px', padding: "0", textAlign: 'right'}}
              >
                <Menu.Item style={{paddingRight: 10, marginRight: "0"}} key="dashboard">
                  <Link style={{ textDecoration: 'none'}} to="/dashboard"><Icon type="phone" style={{fontSize: '16px'}}/>+1(714)930-6197</Link>
                </Menu.Item>
                <Menu.Item style={{paddingRight: 60, margin: "0"}} key="sampling" onClick={this.showDrawer}>
                <Icon type="user" style={{fontSize: '16px'}}/>LOGIN
                </Menu.Item>
              </Menu>

            </Col>
            <Col xs={24} sm={24} md={0} lg={0} xl={0} style={{textAlign: 'right'}}>
              <Menu
                onClick={handleClick}

                mode="horizontal"
                style={{fontSize: '14px', lineHeight: '55px', padding: "0", textAlign: 'right'}}
              >
                <Menu.Item style={{marginRight: "0"}} key="dashboard">
                  <Link style={{ textDecoration: 'none'}} to="/dashboard"><Icon type="phone" style={{fontSize: '16px'}}/>+1(714)930-6197</Link>
                </Menu.Item>
                <Menu.Item style={{ margin: "0"}} key="sampling" onClick={this.showDrawerMobileLogin}>
                <Icon type="user" style={{fontSize: '16px'}}/>LOGIN
                </Menu.Item>
              </Menu>

            </Col>


          </Row>

        </Header>




          <Header style={{backgroundColor: '#FFFFFF', background: '#FFFFFF', zIndex: 0, margin: 0, padding: 0}}>

            <Row type="flex" justify="center" align="middle" >

              <Col xs={0} sm={0} md={24} lg={24} xl={24}>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} style={{textAlign: 'left', paddingTop: 10, paddingLeft: 50}}>
                  <Link style={{ textDecoration: 'none'}} to="/"><p style={{fontSize: 28, color: 'black'}}><b>Aqua</b>Source</p></Link>
                </Col>

                <Col xs={24} sm={14} md={14} lg={14} xl={14} stlye={{textAlign: 'right'}}>
              <Menu
                onClick={handleClick}

                mode="horizontal"
                style={{fontSize: '14px', lineHeight: '60px', padding: "0", textAlign: 'right'}}
              >

                <SubMenu style={{padding: "0", margin: "0"}} title={<span style={{paddingleft: "5px", margin: "0"}} className="submenu-title-wrapper">PRODUCT</span>}>
                  <MenuItemGroup >
                    <Menu.Item key="setting:1a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/projectManagement">Project Management</Link></Menu.Item>


                      <Menu.Item key="setting:2a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/maintenanceLog">Mainenance Log</Link></Menu.Item>
                      <Menu.Item key="setting:13a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/sampleLog">Sample Log</Link></Menu.Item>
                    <Menu.Item key="setting:5a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/documentControl">Document Control</Link></Menu.Item>
                    <Menu.Item key="setting:4a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/assetManagement">Asset Management</Link></Menu.Item>



                  </MenuItemGroup>

                </SubMenu>

                <Menu.Item style={{paddingLeft: "5px", margin: "0"}} key="resources">
                  <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/resources">RESOURCES</Link>
                </Menu.Item>
                <Menu.Item style={{paddingLeft: "5px", margin: "0"}} key="company">
                  <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/about">COMPANY</Link>
                </Menu.Item>
                <Menu.Item style={{paddingLeft: "5px", margin: "0"}} key="tutorial">
                  <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/tutorial">TUTORIALS</Link>
                </Menu.Item>
                <Menu.Item style={{paddingLeft: "5px", margin: "0"}} key="demo">
                  <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/demo"><b>TRY A DEMO</b></Link>
                </Menu.Item>

              </Menu>
            </Col>

            <Col xs={24} sm={3} md={3} lg={3} xl={3} stlye={{textAlign: 'right', paddingBottom: 14}}>
              <Button onClick={this.showQuoteDrawer} type='primary'><b>REQUEST A QUOTE</b></Button>
            </Col>

</Col>
<div>
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
<p style={{fontSize: 18}}>Fill out the form and a AquaSource expert will contact you shortly to schedule a quick walkthrough provide a quote for the platform.</p>
</Col>
</Row>

<Row>
<Col span={12}>
<Row>
<Col span={24}>
<p style={{fontSize: 16}}><Icon style={{fontSize: 20}} type="reconciliation" theme="twoTone" />  <b>Project Management</b></p>
</Col>
</Row>
<Row>
<Col span={24}>
<p>Simple solution to manage and track your assets, sampling results, and project documentation, allowing you to properly manage your water infrastructure</p>
</Col>
</Row>
</Col>
<Col offset={1} span={11}>
<Row>
<Col span={24}>
<p style={{fontSize: 16}}><Icon style={{fontSize: 20}} type="folder-open" theme="twoTone" twoToneColor="#eb2f96"/>  <b>Document Control</b></p>
</Col>
</Row>
<Row>
<Col span={24}>
<p>Increase efficiency of tracking down all relative docuements for your water system.</p>
</Col>
</Row>
</Col>

</Row>
<Row>
<Col span={12}>
<Row>
<Col span={24}>
<p style={{fontSize: 16}}><Icon style={{fontSize: 20}} type="tool" theme="twoTone" twoToneColor="orange" />  <b>Maintenance Log</b></p>
</Col>
</Row>
<Row>
<Col span={24}>
<p>Keep track of maintenance reports in one place for all users to keep track of what's been fixed and what still needs to get worked on.</p>
</Col>
</Row>
</Col>
<Col offset={1} span={11}>
<Row>
<Col span={24}>
<p style={{fontSize: 16}}><Icon style={{fontSize: 20}} type="schedule" theme="twoTone" twoToneColor="#52c41a" />  <b>Asset Management</b></p>
</Col>
</Row>
<Row>
<Col span={24}>
<p>Develop, operate, and maintain your current assets with an organized and cost-effective approach.</p>
</Col>
</Row>
</Col>

</Row>



</Col>

<Col offset={1} span={7}>
<Card style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<WrappedRegistrationForm />
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
<WrappedRegistrationForm />
</Card>



</Col>



<Col span={3}>

</Col>




</Row>

</Drawer>
</div>





<Col xs={24} sm={24} md={0} lg={0} xl={0}>
          <Col xs={12} sm={12} style={{textAlign: 'left',  paddingLeft: 50}}>
            <Link style={{ textDecoration: 'none'}} to="/"><p style={{color: 'black', fontSize: '34px'}}><b>Aqua</b>Source</p></Link>
          </Col>

          <Col xs={12} sm={12} style={{textAlign: 'right',  paddingRight: 20, paddingTop: 8}}>
            <Icon onClick={this.showMobileDrawer} style={{fontSize: 32}} type="menu-fold" />
          </Col>

          </Col>
          <div>
          <Drawer
         title={<div style={{textAlign: 'right'}}><Icon onClick={this.onCloseMobile} style={{fontSize: 32}} type="menu-unfold" /></div>}
         placement="right"
         closable={false}
         onClose={this.onCloseMobile}
         visible={this.state.visibleMobile}
         width={300}
       >
       <Menu
         onClick={handleClick}
         mode="vertical"
         style={{fontSize: '14px', lineHeight: '24px', height: '24px', padding: "0", textAlign: 'right', border: '0px'}}
       >
       <Menu.Item style={{paddingLeft: "5px", margin: "0"}} onClick={this.onCloseMobile} key="dashboard">
         <Link style={{ textDecoration: 'none'}}  onClick={this.onCloseMobile} to="/">HOME</Link>
       </Menu.Item>
       <SubMenu style={{padding: "0", margin: "0"}} title={<span style={{paddingleft: "5px", margin: "0"}} className="submenu-title-wrapper">PRODUCT</span>}>
         <MenuItemGroup >
           <Menu.Item key="setting:1a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/projectManagement">Project Management</Link></Menu.Item>


             <Menu.Item key="setting:2a"onClick={this.onCloseMobile} ><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/maintenanceLog">Maintenance Log</Link></Menu.Item>
             <Menu.Item key="setting:13a"onClick={this.onCloseMobile} ><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/sampleLog">Sample Log</Link></Menu.Item>
           <Menu.Item key="setting:5a" onClick={this.onCloseMobile}><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/documentControl">Document Control</Link></Menu.Item>
           <Menu.Item key="setting:4a" onClick={this.onCloseMobile} ><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/assetManagement">Asset Management</Link></Menu.Item>

         </MenuItemGroup>

       </SubMenu>

       <Menu.Item style={{paddingLeft: "5px", margin: "0"}} onClick={this.onCloseMobile} key="resources">
         <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/resources">RESOURCES</Link>
       </Menu.Item>
       <Menu.Item style={{paddingLeft: "5px", margin: "0"}} onClick={this.onCloseMobile} key="company">
         <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/about">COMPANY</Link>
       </Menu.Item>
       <Menu.Item style={{paddingLeft: "5px", margin: "0"}} onClick={this.onCloseMobile} key="tutorial">
         <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/tutorial">TUTORIALS</Link>
       </Menu.Item>

         <Menu.Item style={{paddingTop: "0px", margin: "0", lineHeight: '50px', height: '64px'}}  onClick={this.onCloseMobile} key="button">
          <Button type="primary">Try a Demo</Button>
         </Menu.Item>
         <Menu.Item onClick={this.onCloseMobile} style={{paddingTop: "0px", margin: "0", lineHeight: '50px', height: '64px'}}   key="button1">
          <Button onClick={this.showQuoteDrawerMobile}>Request a Quote</Button>
         </Menu.Item>

       </Menu>


       </Drawer>
        </div>
        <Drawer

          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          width={500}
        ><Row>
      <Col span={24}>
<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} style={{height: 150}}/>
        </Col>
      </Row>
        </Drawer>

        <Drawer
          placement="right"
          closable={false}
          onClose={this.closeDrawerMobileLogin}
          visible={this.state.mobileLogin}
          width={300}
        ><Row>
      <Col span={24}>
<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </Col>
      </Row>
        </Drawer>

          </Row>

        </Header>





          <Content style={{ backgroundColor: '#F4F7FA',margin: 0, padding: 0 }}>








                <Route exact path="/" component={landingPage} />
                <Route path="/about" component={about} />
                <Route path="/productOverview" component={productOverview} />
                <Route path="/resources" component={resources} />
                <Route path="/documentControl" component={documentControl} />
                <Route path="/assetManagement" component={assetManagement} />
                <Route path="/productivity" component={productivity} />
                <Route path="/projectManagement" component={projectManagement} />
                <Route path="/maintenanceLog" component={maintenanceLog} />
                <Route path="/demo" component={demo} />
                <Route path="/demoTest" component={demoTest} />
                <Route path="/home" component={landingPage} />
                <Route path="/sampleLog" component={sampleLog} />
                <Route path="/tutorial" component={tutorial} />






          </Content>

          <Footer style={{ textAlign: 'center', padding: "0px 50px" }}>
            <Row type="flex" justify="center" style={{paddingBottom: 30}}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <hr style={{border: 'solid 1px black', opacity: '0.2', marginBottom: 0, marginTop: 0}}></hr>
              </Col>
            </Row>

            <Row type="flex">
              <Col xs={24} sm={24} md={{span: 11, offset: 1}}lg={{span: 11, offset: 1}} xl={{span: 11, offset: 1}} style={{textAlign: 'left'}}>
            <p>AquaSource is a leading provider of cloud-based applications for water system Management. AquaSource provides full transparency of a clients water system through a diverse platform to manage risk maintain a healthy water system. Clients are able to log all of their water quality data, equipment maintenance data, equipment logs, chemical applications and much more with the AquaSource platform.  The cloud-based platform allows clients to access their data from anywhere they have an internet connection.  AquaSource aims to support and help all our clients to ensure that their water systems are maintained and managed the the highest standard.</p>
            </Col>

            <Col xs={0} sm={0} md={{span: 4, offset: 1}}lg={{span: 4, offset: 1}} xl={{span: 4, offset: 1}} style={{textAlign: 'left'}}>
              <p style={{fontSize: '22px', paddingLeft: 15, marginBottom: 1}}><b>Aqua</b>Source</p>

              <Menu
                onClick={handleClick}
                mode="vertical"
                height="25px"
                style={{fontSize: '14px', lineHeight: '25px',height: '25px', padding: "0", textAlign: 'left',marginBottom: 0, backgroundColor: '#f0f2f5'}}
              >

                <Menu.Item style={{ margin: "0", backgroundColor: '#f0f2f5',marginBottom: 0}} key="home">
                  <Link style={{ textDecoration: 'none', cursor: 'pointer', backgroundColor: '#f0f2f5'}} to="/">HOME</Link>
                </Menu.Item>

                <Menu.Item style={{ margin: "0", backgroundColor: '#f0f2f5',marginBottom: 0}} key="resources">
                  <Link style={{ textDecoration: 'none', cursor: 'pointer', backgroundColor: '#f0f2f5'}} to="/resources">RESOURCES</Link>
                </Menu.Item>
                <Menu.Item style={{ margin: "0", backgroundColor: '#f0f2f5',marginBottom: 0}} key="about">
                  <Link style={{ textDecoration: 'none', cursor: 'pointer', backgroundColor: '#f0f2f5'}} to="/about">COMPANY</Link>
                </Menu.Item>
              </Menu>
          </Col>


          <Col xs={24} sm={24} md={0} lg={0} xl={0} style={{textAlign: 'center', paddingBottom: 100}}>
            <p style={{fontSize: '22px', marginBottom: 1}}><b>Aqua</b>Source</p>

            <Menu
              onClick={handleClick}
              mode="vertical"
              height="25px"
              style={{fontSize: '14px', lineHeight: '25px',height: '25px', padding: "20", marginBottom: 20, backgroundColor: '#f0f2f5'}}
            >

              <Menu.Item style={{ margin: "0", backgroundColor: '#f0f2f5',marginBottom: 0}} key="home">
                <Link style={{ textDecoration: 'none', cursor: 'pointer', backgroundColor: '#f0f2f5'}} to="/">HOME</Link>
              </Menu.Item>

              <Menu.Item style={{ margin: "0", backgroundColor: '#f0f2f5',marginBottom: 0}} key="resources">
                <Link style={{ textDecoration: 'none', cursor: 'pointer', backgroundColor: '#f0f2f5'}} to="/resources">RESOURCES</Link>
              </Menu.Item>
              <Menu.Item style={{ margin: "0", backgroundColor: '#f0f2f5',marginBottom: 0}} key="about">
                <Link style={{ textDecoration: 'none', cursor: 'pointer', backgroundColor: '#f0f2f5'}} to="/about">COMPANY</Link>
              </Menu.Item>
            </Menu>
        </Col>
        <Col xs={24} sm={24} md={0} lg={0} xl={0} style={{textAlign: 'center'}}>
            <p style={{fontSize: '22px', marginBottom: 1}}><b>Contact</b>Info</p>
            <p style={{fontSize: '18px'}}>Huntington Beach, CA</p>


      </Col>

      <Col xs={0} sm={0} md={{span: 4, offset: 1}} lg={{span: 4, offset: 1}} xl={{span: 4, offset: 1}} style={{textAlign: 'left'}}>
          <p style={{fontSize: '22px', marginBottom: 1}}><b>Contact</b>Info</p>
          <p style={{fontSize: '18px'}}>Huntington Beach, CA</p>


    </Col>
    <Col xs={24} sm={24} md={0} lg={0} xl={0} style={{paddingTop: 20}}>
      <hr style={{border: 'solid 1px black', opacity: '0.2', marginBottom: 0, marginTop: 0}}></hr>
    </Col>


            </Row>
            <Row>



            </Row>
          </Footer>
          <Footer style={{ textAlign: 'left' }}>
            <Row>
            <Col xs={24} sm={24} md={{span: 11, offset: 1}}lg={{span: 11, offset: 1}} xl={{span: 11, offset: 1}}
            >
              AquaSource Technologies @ 2019
          </Col></Row>

          </Footer>
        </Layout>






      );
    }
    return (



    <Layout style={{backgroundColor: '#F4F7FA', background: '#F4F7FA',}}>

      <Header style={{backgroundColor: '#0667D0', background: '#0667D0',}}>

        <Row type="flex" justify="center" align="middle" >
          <Col xs={0} sm={0} md={16} lg={16} xl={16} style={{textAlign: 'left'}}>
        <p style={{fontSize: '30px', color: 'white', paddingLeft: '25px'}}><b>Aqua</b>Source</p>

        </Col>
        <Col xs={10} sm={10} md={0} lg={0} xl={0} style={{textAlign: 'left'}}>
      <p style={{fontSize: '22px', color: 'white', paddingLeft: '5px', paddingTop: '10px'}}><b>Aqua</b>Source</p>

      </Col>
        <Col xs={14} sm={14} md={8} lg={8} xl={8} style={{textAlign: 'right'}}>
          <Menu
            onClick={handleClick}

            mode="horizontal"
            style={{fontSize: '16px', lineHeight: '63px', paddingBottom: "10px", backgroundColor: '#0667D0'}}
          >

            <SubMenu style={{padding: "0", margin: "0"}} title={<span style={{paddingleft: "5px", margin: "0", color: 'white', fontSize: '22px'}} className="submenu-title-wrapper">{this.state.currentProject}<Icon type="caret-down"  style={{fontSize: '22px', paddingLeft: 15}}/></span>}>




              <MenuItemGroup >
                {this.state.projectList.map((project) => {

                  if (project.projectName === this.state.currentProject) {

                    return (
                      <Menu.Item key={project.projectName} onClick={() => this.projectState(project.key)} ><Icon style={{fontSize: '20px', color: '#0667D0'}} type="check-circle" />{project.projectName}</Menu.Item>
                    )

                  }

                    if (project.projectName !== this.state.currentProject) {

                      return (
                        <Menu.Item key={project.projectName} onClick={() => this.projectState(project.key)} >{project.projectName}</Menu.Item>
                      )

                    }





                })}
                <Menu.Divider />
                  <Menu.Item key="profileInfo" >
                    <Link style={{ textDecoration: 'none'}} to="/profilePage">  Project Information</Link>
                  </Menu.Item>
                  <Menu.Divider />
                <Menu.Item key="manageProjects" onClick={this.visibleManage}>Manage Projects</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="setting:1a" onClick={this.showNewLake}>Create New Water Project</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="setting:11a" onClick={() => firebase.auth().signOut()}><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/home"><Icon type="logout" style={{fontSize: '22px'}}/>Log Out</Link>
              </Menu.Item>



              </MenuItemGroup>

            </SubMenu>


          </Menu>


      </Col>
        </Row>

      </Header>
      <Header style={{backgroundColor: '#FFFFFF', background: '#FFFFFF', zIndex: 1}}>

        <Row type="flex" justify="center" align="middle" >
          <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{textAlign: 'left', paddingLeft: '25px'}}>
            <Col xs={22} sm={22} md={22} lg={22} xl={22}>
          <Menu
            onClick={handleClick}

            mode="horizontal"
            style={{fontSize: '16px', lineHeight: '63px', padding: "0"}}
          >
            <Menu.Item style={{padding: "0", margin: "0"}} key="dashboard">
              <Link style={{ textDecoration: 'none'}} to="/dashboard"><Icon type="appstore" style={{fontSize: '22px'}}/>Dashboard</Link>
            </Menu.Item>
            <Menu.Item style={{paddingleft: "5px", margin: "0"}} key="sampling">
              <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/monthlySamples"><Icon type="search" style={{fontSize: '22px'}}/>Sampling</Link>
            </Menu.Item>



            <SubMenu style={{padding: "0", margin: "0"}} title={<span style={{paddingleft: "5px", margin: "0"}} className="submenu-title-wrapper"><Icon type="tool"  style={{fontSize: '22px'}}/>Asset Manager</span>}>
              <MenuItemGroup >
                <Menu.Item key="setting:1a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/maintenanceReports"><Icon type="book" style={{fontSize: '22px'}}/>Maintenance Log</Link></Menu.Item>

                <Menu.Item key="setting:4a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/equipmentList"><Icon type="bars" style={{fontSize: '22px'}}/>Equipment List</Link></Menu.Item>
                <Menu.Item key="setting:5a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/vendorContacts"><Icon type="mail" style={{fontSize: '22px'}}/>Vendor Contacts</Link></Menu.Item>
                <Menu.Item key="setting:2a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/chemicalApplications"><Icon type="experiment" rotate={180} style={{fontSize: '22px'}}/>Chemical Applications</Link></Menu.Item>
              </MenuItemGroup>

            </SubMenu>

            <SubMenu style={{padding: "0", margin: "0"}} title={<span style={{paddingleft: "5px", margin: "0"}} className="submenu-title-wrapper"><Icon type="folder-open"  style={{fontSize: '22px'}}/>Documents</span>}>
              <MenuItemGroup >
                <Menu.Item key="setting:1"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/reports"><Icon type="copy" style={{fontSize: '22px'}}/>Reports</Link></Menu.Item>
                <Menu.Item key="setting:2"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/drawings"><Icon type="snippets" style={{fontSize: '22px'}}/>Drawings</Link></Menu.Item>
                <Menu.Item key="setting:3"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/permits"><Icon type="file-done" style={{fontSize: '22px'}}/>Permits</Link></Menu.Item>
                <Menu.Item key="setting:4"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/manuals"><Icon type="read" style={{fontSize: '22px'}}/>Manuals</Link></Menu.Item>

              </MenuItemGroup>
            </SubMenu>


          </Menu>
        </Col>


        </Col>



                  <Col xs={24} sm={24} md={0} lg={0} xl={0} style={{textAlign: 'right',  paddingRight: 20, paddingTop: 8}}>
                    <Icon onClick={this.showMobileDrawer1} style={{fontSize: 32}} type="menu-fold" />
                  </Col>


                  <div>
                  <Drawer
                 title={<div style={{textAlign: 'right'}}><Icon onClick={this.onCloseMobile1} style={{fontSize: 32}} type="menu-unfold" /></div>}
                 placement="right"
                 closable={false}
                 onClose={this.onCloseMobile1}
                 visible={this.state.visibleMobile1}
                 width={300}
               >
               <Menu
                 onClick={handleClick}

                 mode="vertical"
                 style={{fontSize: '22px', lineHeight: '26px', height: '26px', padding: "0"}}
               >
                 <Menu.Item style={{paddingLeft: "22px", margin: "0"}} key="dashboard">
                   <Link style={{ textDecoration: 'none'}} to="/dashboard"><Icon type="appstore" style={{fontSize: '22px'}}/>Dashboard</Link>
                 </Menu.Item>
                 <Menu.Item style={{paddingLeft: "22px", margin: "0"}} key="sampling">
                   <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/monthlySamples"><Icon type="search" style={{fontSize: '22px'}}/>Sampling</Link>
                 </Menu.Item>



                 <SubMenu style={{padding: "0px", margin: "0"}} title={<span style={{paddingLeft: "5px", margin: "0"}} className="submenu-title-wrapper"><Icon type="tool"  style={{fontSize: '22px'}}/>Asset Manager</span>}>
                   <MenuItemGroup >
                     <Menu.Item key="setting:1a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/maintenanceReports"><Icon type="book" style={{fontSize: '22px'}}/>Maintenance Log</Link></Menu.Item>

                     <Menu.Item key="setting:4a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/equipmentList"><Icon type="bars" style={{fontSize: '22px'}}/>Equipment List</Link></Menu.Item>
                     <Menu.Item key="setting:5a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/vendorContacts"><Icon type="mail" style={{fontSize: '22px'}}/>Vendor Contacts</Link></Menu.Item>
                     <Menu.Item key="setting:2a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/chemicalApplications"><Icon type="experiment" rotate={180} style={{fontSize: '22px'}}/>Chemical Applications</Link></Menu.Item>
                   </MenuItemGroup>

                 </SubMenu>

                 <SubMenu style={{padding: "0px", margin: "0"}} title={<span style={{paddingLeft: "5px", margin: "0"}} className="submenu-title-wrapper"><Icon type="folder-open"  style={{fontSize: '22px'}}/>Documents</span>}>
                   <MenuItemGroup >
                     <Menu.Item key="setting:1"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/reports"><Icon type="copy" style={{fontSize: '22px'}}/>Reports</Link></Menu.Item>
                     <Menu.Item key="setting:2"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/drawings"><Icon type="snippets" style={{fontSize: '22px'}}/>Drawings</Link></Menu.Item>
                     <Menu.Item key="setting:3"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/permits"><Icon type="file-done" style={{fontSize: '22px'}}/>Permits</Link></Menu.Item>
                     <Menu.Item key="setting:4"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/manuals"><Icon type="read" style={{fontSize: '22px'}}/>Manuals</Link></Menu.Item>

                   </MenuItemGroup>
                 </SubMenu>


               </Menu>


               </Drawer>
                </div>
      </Row>

    </Header>



    <Row type="flex" justify="center">
      <Col span={22}>

      <Content style={{ backgroundColor: '#F4F7FA', }}>
        <div style={{ padding: 5, paddingLeft: 15, backgroundColor: '#F4F7FA', background: '#F4F7FA', minHeight: 360 }}>
          <Modal
          title="New Water Project"
          visible={this.state.visibleModal}
          onOk={this.newProject}
          onCancel={this.handleCancel}
        >
        <form>
      <FormGroup onSubmit={this.fillParameterInfo}>
        <Row style={{paddingTop: '10px'}}>
          <Col xs={24} sm={7} md={7} lg={7} xl={7}>
            <span><b>Project Name</b></span>
          </Col>
          <Col xs={24} sm={1} md={1} lg={1} xl={1}>
            <p style={{color: 'red'}}>*</p>
          </Col>
          <Col xs={24} sm={16} md={16} lg={16} xl={16}>
              <FormControl required name="projectName" onChange={this.handleChange} type="text" placeholder="Project Name"  value={this.state.projectName} />
          </Col>
        </Row>
      <Row>
        <hr></hr>
      </Row>
      <div style={{display: this.state.error}}>
      <p style={{color: 'red'}}>Double check that all required inputs are filled</p>
   </div>
    </FormGroup>
      </form>
        </Modal>




        <Modal
        title="Manage Projects"
        visible={this.state.visibleManageProjects}
        onOk={this.handleOk}
        onCancel={this.handleOk}
      >
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Table columns={columns1} dataSource={this.state.projectList} onChange={this.onChange} scroll={{ x: '100%'}} />

      </Col>
      </Modal>






          <Route exact path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/monthlySamples" component={monthlySamples} />
          
          <Route path="/maintenanceReports" component={maintenanceReports} />
          <Route path="/vendorContacts" component={vendorContacts} />
          <Route path="/uploadDocument" component={uploadDocument} />
          <Route path="/profilePage" component={profilePage} />
          <Route path="/equipmentList" component={equipmentList} />
          <Route path="/chemicalApplications" component={chemicalApplications} />
          <Route path="/fishStocking" component={fishStocking} />


          <Route path="/testingPage" component={testingPage} />
          <Route path="/uploadDrawings" component={uploadDrawings} />
          <Route path="/uploadManuals" component={uploadManuals} />
          <Route path="/testingPage2" component={testingPage2} />
          <Route path="/manuals" component={manuals} />
          <Route path="/reports" component={reports} />
          <Route path="/drawings" component={drawings} />
          <Route path="/permits" component={permits} />
          <Route path="/dashForecast" component={dashForecast} />
          <Route path="/index" component={Drop} />
          <Route path="/testing" component={testing} />
          <Route path="/sampling" component={sampling} />







        </div>
      </Content>
      </Col>
    </Row>




    <Footer style={{ textAlign: 'center', padding: "0px 50px" }}>
      <Row type="flex" justify="center" style={{paddingBottom: 30}}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <hr style={{border: 'solid 1px black', opacity: '0.2', marginBottom: 0, marginTop: 0}}></hr>
        </Col>
      </Row>

      <Row type="flex">
        <Col xs={24} sm={24} md={{span: 11, offset: 1}}lg={{span: 11, offset: 1}} xl={{span: 11, offset: 1}} style={{textAlign: 'left'}}>
      <p>Procore is a leading provider of cloud-based applications for construction. Procore connects people, applications, and devices through a unified platform to help construction professionals manage risk and build quality projects—safely, on time, and within budget. Procore has a diversified business model with products for Project Management, Construction Financials, Quality & Safety, and Field Productivity. Headquartered in Carpinteria, California, with offices around the globe, Procore is used to manage billions of dollars in annual construction volume. Read More </p>
      </Col>

      <Col xs={0} sm={0} md={{span: 4, offset: 1}}lg={{span: 4, offset: 1}} xl={{span: 4, offset: 1}} style={{textAlign: 'left'}}>
        <p style={{fontSize: '22px', paddingLeft: 15, marginBottom: 1}}><b>Aqua</b>Source</p>

          <Menu
            onClick={handleClick}
            mode="vertical"
            height="25px"
            style={{fontSize: '14px', lineHeight: '25px',height: '25px', padding: "0", textAlign: 'left',marginBottom: 0, backgroundColor: '#f0f2f5'}}
          >

            <Menu.Item style={{ margin: "0", backgroundColor: '#f0f2f5',marginBottom: 0}} key="dash">
              <Link style={{ textDecoration: 'none', cursor: 'pointer', backgroundColor: '#f0f2f5'}} to="/">DASHBOARD</Link>
            </Menu.Item>
            <Menu.Item style={{ margin: "0", backgroundColor: '#f0f2f5',marginBottom: 0}} key="sampling">
              <Link style={{ textDecoration: 'none', cursor: 'pointer', backgroundColor: '#f0f2f5'}} to="/sampling">SAMPLING</Link>
            </Menu.Item>






          </Menu>
    </Col>


    <Col xs={24} sm={24} md={0} lg={0} xl={0} style={{textAlign: 'center', paddingBottom: 100}}>
      <p style={{fontSize: '22px', marginBottom: 1}}><b>Aqua</b>Source</p>

      <Menu
        onClick={handleClick}
        mode="vertical"
        height="25px"
        style={{fontSize: '14px', lineHeight: '25px',height: '25px', padding: "20", marginBottom: 20, backgroundColor: '#f0f2f5'}}
      >

      <Menu.Item style={{ margin: "0", backgroundColor: '#f0f2f5',marginBottom: 0}} key="dashboard">
        <Link style={{ textDecoration: 'none', cursor: 'pointer', backgroundColor: '#f0f2f5'}} to="/dashboard">DASHBOARD</Link>
      </Menu.Item>

        <Menu.Item style={{ margin: "0", backgroundColor: '#f0f2f5',marginBottom: 0}} key="samples">
          <Link style={{ textDecoration: 'none', cursor: 'pointer', backgroundColor: '#f0f2f5'}} to="/monthlySamples">SAMPLING</Link>
        </Menu.Item>

        <Menu.Item style={{ margin: "0", backgroundColor: '#f0f2f5',marginBottom: 0}} key="resources">
          <Link style={{ textDecoration: 'none', cursor: 'pointer', backgroundColor: '#f0f2f5'}} to="/maintenanceReports">MAINTENANCE</Link>
        </Menu.Item>

      </Menu>
  </Col>
  <Col xs={24} sm={24} md={0} lg={0} xl={0} style={{textAlign: 'center'}}>
      <p style={{fontSize: '22px', marginBottom: 1}}><b>Contact</b>Info</p>
      <p style={{fontSize: '18px'}}>Huntington Beach, CA</p>


</Col>

<Col xs={0} sm={0} md={{span: 4, offset: 1}} lg={{span: 4, offset: 1}} xl={{span: 4, offset: 1}} style={{textAlign: 'left'}}>
    <p style={{fontSize: '22px', marginBottom: 1}}><b>Contact</b>Info</p>
    <p style={{fontSize: '18px'}}>Huntington Beach, CA</p>


</Col>
<Col xs={24} sm={24} md={0} lg={0} xl={0} style={{paddingTop: 20}}>
<hr style={{border: 'solid 1px black', opacity: '0.2', marginBottom: 0, marginTop: 0}}></hr>
</Col>


      </Row>
      <Row>



      </Row>
    </Footer>
    <Footer style={{ textAlign: 'left' }}>
      AquaSource Technologies @ 2019
    </Footer>
    </Layout>













    );
  }
}
export default SignInScreen;
