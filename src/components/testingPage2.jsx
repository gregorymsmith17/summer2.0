import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { fire, facebookProvider } from '../fire';


import './SignInScreen.css';

import Dashboard from './dashboard';
import monthlySamples from './monthlySamples';

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

import drawings from './documents/drawings';
import reports from './documents/reports';
import permits from './documents/permits';
import manuals from './documents/manuals';

import reporting from './reporting';



import lake from './images/lake.jpg';
import lake2 from './images/lake2.png';
import lake3 from './images/lake3.png';

import { Link } from 'react-router-dom';
import { StickyContainer, Sticky } from 'react-sticky';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { TiArrowSortedDown, TiUser, TiArrowSortedUp, TiPencil, TiTrash } from "react-icons/ti";
import { MdPlayCircleOutline } from "react-icons/md";
import { Row, Col, Tabs, Table, Divider, Tag, message, Card, Drawer, Menu, Dropdown, Button, Layout, Carousel, Input, Popover, Icon, Cascader, Switch, Select, AutoComplete, Radio, Alert, Modal } from 'antd';

import { BrowserRouter, Route } from 'react-router-dom';

import 'antd/dist/antd.css';




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




// Configure Firebase.







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
    signInSuccessUrl: '/home',

    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebaseui.auth.CredentialHelper.NONE
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
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

        <Layout>
              <Header style={{ backgroundColor: '#ECECEC'}}>





                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <div style={{position: 'relative'}}>
                  <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                    <div style={{fontSize: '36px'}}><b>Limno Analytics</b></div>
                  </Col>
                  <Col xs={8} sm={8} md={8} lg={8} xl={8} onClick={this.showDrawer}style={{ position: 'absolute',
                top: '0%',
                right: '0%', textAlign: 'right'}}>

                  <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{textAlign: 'right'}}>
                    <div style={{fontSize: '20px'}}><b>Log In</b></div>
                    </Col>
                  </Col>
                  <Drawer
                    title= "Login"
                    placement={this.state.placement}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    width={300}
                  >
                    <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
                  </Drawer>


                </div>
                  </Row>




              </Header>
              <Content>

                <Row>
                  <Carousel afterChange={onChange} >
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </Carousel>
  </Row>

              </Content>
              <Footer>Footer</Footer>
            </Layout>




      );
    }
    return (



    <Layout style={{backgroundColor: '#F4F7FA', background: '#F4F7FA',}}>

      <Header style={{backgroundColor: '#0667D0', background: '#0667D0',}}>

        <Row type="flex" justify="center" align="middle" >
          <Col span={16} style={{textAlign: 'left'}}>
        <p style={{fontSize: '30px', color: 'white', paddingLeft: '80px'}}>LimnoSource</p>

        </Col>
        <Col span={8} style={{textAlign: 'right'}}>
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
                <Menu.Item key="setting:11a" onClick={() => firebase.auth().signOut()}><Icon type="logout" style={{fontSize: '22px'}}/>Log Out</Menu.Item>



              </MenuItemGroup>

            </SubMenu>


          </Menu>


      </Col>
        </Row>

      </Header>
      <Header style={{backgroundColor: '#FFFFFF', background: '#FFFFFF', zIndex: 1}}>

        <Row type="flex" justify="center" align="middle" >
          <Col span={24} style={{textAlign: 'left', paddingLeft: '80px'}}>
            <Col xs={20} sm={18} md={18} lg={18} xl={18}>
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
                <Menu.Item key="setting:1a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/maintenanceReports"><Icon type="book" style={{fontSize: '22px'}}/>Maintenance Reports</Link></Menu.Item>
                <Menu.Item key="setting:2a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/chemicalApplications"><Icon type="experiment" rotate={180} style={{fontSize: '22px'}}/>Chemical Applications</Link></Menu.Item>
                <Menu.Item key="setting:3a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/fishStocking"><Icon type="gold" style={{fontSize: '22px'}}/>Fish Stocking</Link></Menu.Item>
                <Menu.Item key="setting:4a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/equipmentList"><Icon type="bars" style={{fontSize: '22px'}}/>Equipment List</Link></Menu.Item>
                <Menu.Item key="setting:5a"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/vendorContacts"><Icon type="mail" style={{fontSize: '22px'}}/>Vendor Contacts</Link></Menu.Item>
              </MenuItemGroup>

            </SubMenu>

            <SubMenu style={{padding: "0", margin: "0"}} title={<span style={{paddingleft: "5px", margin: "0"}} className="submenu-title-wrapper"><Icon type="folder-open"  style={{fontSize: '22px'}}/>Documents</span>}>
              <MenuItemGroup >
                <Menu.Item key="setting:1"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/uploadDocument"><Icon type="copy" style={{fontSize: '22px'}}/>Reports</Link></Menu.Item>
                <Menu.Item key="setting:2"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/uploadDocument"><Icon type="snippets" style={{fontSize: '22px'}}/>Drawings</Link></Menu.Item>
                <Menu.Item key="setting:3"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/uploadDocument"><Icon type="file-done" style={{fontSize: '22px'}}/>Permits</Link></Menu.Item>
                <Menu.Item key="setting:4"><Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/uploadDocument"><Icon type="read" style={{fontSize: '22px'}}/>Manuals</Link></Menu.Item>

              </MenuItemGroup>
            </SubMenu>


          </Menu>
        </Col>


        </Col>
      </Row>

    </Header>



    <Row type="flex" justify="center">
      <Col span={20}>

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
          <Route path="/reporting" component={reporting} />

          <Route path="/testingPage" component={testingPage} />
          <Route path="/uploadDrawings" component={uploadDrawings} />
          <Route path="/uploadManuals" component={uploadManuals} />
          <Route path="/testingPage2" component={testingPage2} />
          <Route path="/manuals" component={manuals} />
          <Route path="/reports" component={reports} />
          <Route path="/drawings" component={drawings} />
          <Route path="/permits" component={permits} />



        </div>
      </Content>
      </Col>
    </Row>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>













    );
  }
}
export default SignInScreen;
