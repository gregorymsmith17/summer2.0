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

      <Layout>


        <div id="myDIV" style={{position: 'fixed'}}>
          <Button size="large" width={5} type="primary" icon="menu" onClick={this.showDrawer1}/>

          <Drawer
            title="Directory"
            placement="left"
            closable={false}
            onClose={this.onClose1}
            visible={this.state.visible1}
          >
          <Menu
            onClick={handleClick}
            style={{ backgroundColor: 'white', paddingTop: '20px', left: '5px', width: '100%', height: '100vh', color: 'gray' }}
            mode="vertical">
            <SubMenu key="sub1" title={<Link style={{ textDecoration: 'none', color: 'gray' }} to="/dashboard"><span><Icon type="dashboard" /><span>Dashboard</span></span></Link>}>

            </SubMenu>

            <SubMenu key="sub2" title={<Link style={{ textDecoration: 'none', color: 'gray' }} to="/monthlySamples"><span><Icon type="form" /><span>Sampling</span></span></Link>}>

            </SubMenu>




            <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Asset Manager</span></span>}>
              <Menu.Item key="6"><Link to="/maintenanceReports">Maintenance Reports</Link></Menu.Item>
              <Menu.Item key="7"><Link to="/vendorContacts">Vendor Contacts</Link></Menu.Item>
                <Menu.Item key="8"><Link to="/equipmentList">Equipment List</Link></Menu.Item>
                <Menu.Item key="9"><Link to="/chemicalApplications">Chemical Applications</Link></Menu.Item>
                <Menu.Item key="10"><Link to="/fishStocking">Fish Stocking</Link></Menu.Item>

            </SubMenu>


            <SubMenu key="sub5" title={<span><Icon type="file-text" /><span>Document Manager</span></span>}>
              <Menu.Item key="11"><Link to="/uploadDocument">Reports</Link></Menu.Item>
              <Menu.Item key="12"><Link to="/uploadDrawings">Drawings</Link></Menu.Item>
              <Menu.Item key="13"><Link to="/uploadManuals">Manuals</Link></Menu.Item>


            </SubMenu>

            <SubMenu key="sub6" title={<Link style={{ textDecoration: 'none', color: 'gray' }} to="/profilePage"><span><Icon type="user" /><span>Profile</span></span></Link>}>

            </SubMenu>

            <SubMenu key="sub7" title={<Link style={{ textDecoration: 'none', color: 'gray' }} to="/reporting"><span><Icon type="form" /><span>Reporting</span></span></Link>}>

            </SubMenu>




            <SubMenu key="sub5" onSelect={() => firebase.auth().signOut()} title={<span><Icon type="logout" /><span><Button type="default" onClick={() => firebase.auth().signOut()}>Sign Out

            </Button></span></span>}>

            </SubMenu>




          </Menu>
          </Drawer>

</div>


    <Sider
      style={{
       overflow: 'auto',position: 'fixed', height: '100vh', left: 0, backgroundColor: '#222222'
    }}

      breakpoint="md"
      collapsedWidth="0"
      onBreakpoint={(broken) => { console.log(broken); }}
      onCollapse={(collapsed, type) => { console.log(collapsed, type);

        var x = document.getElementById("myDIV");
        if (collapsed) {
          x.style.display = "block";
      this.setState({
        margin: '8px 5px 15px 15px',
      })
    }
  else {
    x.style.display = "none";
    this.setState({
      margin: '8px 20px 20px 185px'
    })
  } }}
    >

        <Menu
          onClick={handleClick}
          style={{ backgroundColor: '#222222', paddingTop: '20px', left: '5px', width: '100%', height: '100vh', color: 'white', fontSize: '18px' }}
          mode="vertical">

          <SubMenu key="sub1" onClick={this.dashboardRef}
            title={<span>
            <Link style={{ width: '100%', textDecoration: 'none', color: 'white' }} to="/dashboard">
            <span><Icon type="dashboard" /><span>Dashboard <Icon style={{  paddingLeft: '75px', fontSize: 1}}type="right" /></span></span>
            </Link></span>}>

          </SubMenu>

          <SubMenu key="sub2" title={<Link style={{ textDecoration: 'none', color: 'white' }} to="/monthlySamples"><span><Icon type="form" /><span>Sampling<Icon style={{  paddingLeft: '80px', fontSize: 1}}type="right" /></span></span></Link>}>

          </SubMenu>




          <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Asset Manager</span></span>}>
            <Menu.Item key="6"><Link to="/maintenanceReports">Maintenance Reports</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/vendorContacts">Vendor Contacts</Link></Menu.Item>
              <Menu.Item key="8"><Link to="/equipmentList">Equipment List</Link></Menu.Item>
              <Menu.Item key="9"><Link to="/chemicalApplications">Chemical Applications</Link></Menu.Item>
              <Menu.Item key="10"><Link to="/fishStocking">Fish Stocking</Link></Menu.Item>

          </SubMenu>




          <SubMenu key="sub5" title={<span><Icon type="file-text" /><span>Document Manager</span></span>}>
            <Menu.Item key="11"><Link to="/uploadDocument">Reports</Link></Menu.Item>
            <Menu.Item key="12"><Link to="/uploadDrawings">Drawings</Link></Menu.Item>
            <Menu.Item key="13"><Link to="/uploadManuals">Manuals</Link></Menu.Item>


          </SubMenu>

          <SubMenu key="sub6" title={<Link style={{ textDecoration: 'none', color: 'white' }} to="/profilePage"><span><Icon type="user" /><span>Profile<Icon style={{  paddingLeft: '105px', fontSize: 1}}type="right" /></span></span></Link>}>

          </SubMenu>

          <SubMenu key="sub7" title={<Link style={{ textDecoration: 'none', color: 'white' }} to="/reporting"><span><Icon type="form" /><span>Reporting<Icon style={{  paddingLeft: '105px', fontSize: 1}}type="right" /></span></span></Link>}>

          </SubMenu>



          <SubMenu key="sub9" title={<Link style={{ textDecoration: 'none', color: 'white' }} to="/testingPage"><span><Icon type="form" /><span>Testing Page<Icon style={{  paddingLeft: '105px', fontSize: 1}}type="right" /></span></span></Link>}>

          </SubMenu>




          <SubMenu key="sub10" onSelect={() => firebase.auth().signOut()} title={<span><Icon type="logout" /><span><Button type="default" onClick={() => firebase.auth().signOut()}><b>Sign Out</b>

          </Button></span></span>}>

          </SubMenu>




        </Menu>
    </Sider>
    <Layout style={{margin: this.state.margin, backgroundColor: '#F0F0F0'}}>
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



        </div>
          </Row>
          </div>



      </Header>

      <Content style={{ backgroundColor: '#F0F0F0', margin: '24px 16px 0' }}>
        <div style={{ padding: 5, backgroundColor: '#F0F0F0', background: '#F0F0F0', minHeight: 360 }}>
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

        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  </Layout>












    );
  }
}
export default SignInScreen;
