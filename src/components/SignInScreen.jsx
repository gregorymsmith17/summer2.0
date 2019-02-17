import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { fire, facebookProvider } from '../fire';

import './SignInScreen.css';

import Dashboard from './dashboard';
import monthlySamples from './monthlySamples';
import monthlySamples2 from './monthlySamples2';
import monthlySamples3 from './monthlySamples2';
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

import reporting from './reporting';







import lake from './images/lake.jpg';
import lake2 from './images/lake2.png';
import lake3 from './images/lake3.png';

import { Link } from 'react-router-dom';
import { StickyContainer, Sticky } from 'react-sticky';
import { PanelGroup, Popover, Panel, Grid, Collapse, Well, ListGroup, ListGroupItem, Nav, NavItem, Jumbotron, OverlayTrigger, Tab, Tabs } from 'react-bootstrap';
import { TiArrowSortedDown, TiUser, TiArrowSortedUp, TiPencil, TiTrash } from "react-icons/ti";
import { MdPlayCircleOutline } from "react-icons/md";
import { Row, Col, Card, Drawer, Menu, Icon, Button, Layout, Carousel } from 'antd';

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

const styles = {
  sidenav: {
    textAlign: 'left',
    height: '100vh',
    width: '200px',/* Set the width of the sidebar */
    position: 'sticky',
    overflowx: 'hidden',
    zindex: 1,
    top: 0, /* Stay at the top */
    left: 0,
    backgroundColor: '#E6E6E6', /* Fixed Sidebar (stay in place on scroll) */
    paddingTop: "50px",
},
background: {
  backgroundColor: '#FFFFFF',
  height: '100%'
   /* Fixed Sidebar (stay in place on scroll) */

},

  panelWidth: {
    textAlign: 'left',
    width: '100%',
    left: '1px',
    paddingleft: '0px',
    center: 'auto',
    opacity: 10,


  },
  topPad: {
    paddingTop: "50px"
  },
  bottomPad: {
    paddingBottom: "15px"
  },


}
// Configure Firebase.



const popoverRight = (
  <Popover id="popover-positioned-right" title="Popover right">
    <strong>Holy guacamole!</strong> Check this info.
  </Popover>
);

const popoverRightSampling = (
  <Popover id="popover-positioned-right" title="Sampling Reports">
    <strong>Water Quality</strong>
      <NavItem componentClass={Link} href="/monthlySamples" to="/monthlySamples">
      Monthly Samples
    </NavItem>

  </Popover>
);

const popoverRightProfile = (
  <Popover id="popover-positioned-right" title="Profile">
    <strong>Profile</strong>
      <NavItem componentClass={Link} href="/profilePage" to="/profilePage">
      Information
    </NavItem>



  </Popover>
);

const popoverRightAsset = (
  <Popover id="popover-trigger-focus" title="Asset Manager">
    <strong>Operations and Maintenance</strong>

    <NavItem componentClass={Link} href="/maintenanceReports" to="/maintenanceReports">
      Maintenance Reports
    </NavItem>
    <NavItem componentClass={Link} href="/vendorContacts" to="/vendorContacts">
      Vendor Contacts
    </NavItem>
    <NavItem componentClass={Link} href="/equipmentList" to="/equipmentList">
      Equipment List
    </NavItem>
    <NavItem componentClass={Link} href="/chemicalApplications" to="/chemicalApplications">
      Chemical Applications
    </NavItem>
    <NavItem componentClass={Link} href="/fishStocking" to="/fishStocking">
      Fish Stocking
    </NavItem>




  </Popover>
);

const popoverRightDocuments = (
  <Popover id="popover-trigger-focus" title="Popover bottom">
    <strong>Documents</strong>
      <NavItem componentClass={Link} href="/uploadDocument" to="/uploadDocument">
      Documents
    </NavItem>
  </Popover>

);

class SignInScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      open1: false,
      open2: false,
      visible: false,
      visible1: false,
      placement: 'right',
      margin: "8px 20px 20px 185px",
      appear: 'false',
      collapsed: true,



    };

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

  onChange = (e) => {
    this.setState({
      placement: e.target.value,
    });
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


  render() {
    if (!this.state.isSignedIn) {
      return (

        <Layout>
              <Header style={{ backgroundColor: '#ECECEC'}}>




                  <div style={{ background: '#F0F0F0', padding: '5px' }}>
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
                  </div>



              </Header>
              <Content>

                <div style={{ background: '#F0F0F0', padding: '5px' }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24} sm={24} md={8} lg={24} xl={24}>
                <div style={{position: 'relative'}}>
                  <div style={{ position: 'absolute',
                top: '0%',
                left: '0%', backgroundColor: 'lightBlue', height: '100%', width: '4%', zIndex: 1}} />
                <Carousel>
                  <div >




                  </div>
                  <div><h3>2</h3></div>
                  <div><h3>3</h3></div>
                  <div><h3>4</h3></div>
                </Carousel>

                </div>
              </Col>




            </Row>
          </div>

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
          <p style={{paddingRight: '80px', color: 'white', fontSize: '20px', }}><Icon type="smile" style={{fontSize: '24px', color: 'white', marginRight: 2, paddingRight: 20, paddingTop: 12}}/>{this.state.lakeName}</p>

      </Col>
        </Row>

      </Header>
      <Header style={{backgroundColor: '#FFFFFF', background: '#FFFFFF', zIndex: 1}}>

        <Row type="flex" justify="center" align="middle" >
          <Col span={24} style={{textAlign: 'left', paddingLeft: '80px'}}>
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
              <MenuItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu style={{padding: "0", margin: "0"}} title={<span className="submenu-title-wrapper"><Icon type="copy"  style={{fontSize: '22px'}}/>Documents</span>}>
              <MenuItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <Menu.Item style={{padding: "0", margin: "0"}} key="profile">
              <Icon type="user" style={{fontSize: '22px'}} />Profile
            </Menu.Item>
          </Menu>
        </Col>
      </Row>

    </Header>



    <Row type="flex" justify="center">
      <Col span={20}>

      <Content style={{ backgroundColor: '#F4F7FA', }}>
        <div style={{ padding: 5, backgroundColor: '#F4F7FA', background: '#F4F7FA', minHeight: 360 }}>
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
          <Route path="/monthlySamples2" component={monthlySamples2} />
          <Route path="/monthlySamples3" component={monthlySamples3} />
          <Route path="/testingPage" component={testingPage} />
          <Route path="/uploadDrawings" component={uploadDrawings} />
          <Route path="/uploadManuals" component={uploadManuals} />
          <Route path="/testingPage2" component={testingPage2} />


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
