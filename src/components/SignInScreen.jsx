import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { fire, facebookProvider } from '../fire';

import './SignInScreen.css';

import Dashboard from './dashboard';
import monthlySamples from './monthlySamples';

import uploadDocument from './uploadDocument';
import profilePage from './profilePage';

import maintenanceReports from './assetManager/maintenanceReports';
import vendorContacts from './assetManager/vendorContacts';
import equipmentList from './assetManager/equipmentList';
import chemicalApplications from './assetManager/chemicalApplications';
import fishStocking from './assetManager/fishStocking';

import lake from './images/lake.jpg';
import lake2 from './images/lake2.png';

import { Link } from 'react-router-dom';
import { StickyContainer, Sticky } from 'react-sticky';
import { PanelGroup, Popover, Panel, Grid, Collapse, Well, ListGroup, ListGroupItem, Nav, NavItem, Jumbotron, OverlayTrigger, Tab, Tabs } from 'react-bootstrap';
import { TiArrowSortedDown, TiUser, TiArrowSortedUp, TiPencil, TiTrash } from "react-icons/ti";
import { MdPlayCircleOutline } from "react-icons/md";
import { Row, Col, Drawer, Menu, Icon, Button, Layout, Carousel } from 'antd';

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



  render() {
    if (!this.state.isSignedIn) {
      return (

        <Layout>
              <Header style={{ backgroundColor: '#ECECEC'}}>

                <Row style={{paddingTop: '10px'}}>
              <Col span={12}>
                <h1>Lakistry</h1>

              </Col>
              <Col offset={8} span={4}><Button type="primary" onClick={this.showDrawer}>
                  <TiUser size={20} />Login
                </Button><Drawer
                  title= "Login"
                  placement={this.state.placement}
                  closable={false}
                  onClose={this.onClose}
                  visible={this.state.visible}
                  width={300}
                >
                  <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
                </Drawer></Col>

            </Row>


              </Header>
              <Content>


            <Row>

              <Col span={24}>
                <Carousel autoplay>
    <div style={{position: 'relative'}} ><img src={lake2} style={{width: '100%', height: '100%'}} /> <Button size="large" type="normal" style={{ position: 'absolute',
  top: '60%',
  left: '10%'}}><h3>Request Demo</h3> </Button>
<div style={{ position: 'absolute',
top: '40%',
left: '10%'}}>
<h1 style={{color: 'white'}}>Lake Management</h1>
<h1 style={{color: 'white'}}>Made Simple</h1>
</div>
  </div>

  </Carousel>


              </Col>

            </Row>
            <Row>
              <Col span={6}>col-6</Col>
              <Col span={6}>col-6</Col>
              <Col span={6}>col-6</Col>
              <Col span={6}>col-6</Col>
            </Row>



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
            style={{ backgroundColor: 'white', paddingTop: '20px', left: '5px', width: '100%', height: '100vh' }}
            mode="vertical">
            <SubMenu key="sub1" title={<Link to="/dashboard"><span><Icon type="dashboard" /><span>Dashboard</span></span></Link>}>

            </SubMenu>

            <SubMenu key="sub2" title={<span><Icon type="form" /><span>Sampling</span></span>}>
              <Menu.Item key="3"><Link to="/monthlySamples">Monthly Samples</Link></Menu.Item>


            </SubMenu>




            <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Asset Manager</span></span>}>
              <Menu.Item key="6"><Link to="/maintenanceReports">Maintenance Reports</Link></Menu.Item>
              <Menu.Item key="7"><Link to="/vendorContacts">Vendor Contacts</Link></Menu.Item>
                <Menu.Item key="8"><Link to="/equipmentList">Equipment List</Link></Menu.Item>
                <Menu.Item key="9"><Link to="/chemicalApplications">Chemical Applications</Link></Menu.Item>
                <Menu.Item key="10"><Link to="/fishStocking">Fish Stocking</Link></Menu.Item>

            </SubMenu>


          <SubMenu key="sub5" title={<span><Icon type="file" /><span>Documents</span></span>}>
            <Menu.Item key="11"><Link to="/uploadDocument">Documents</Link></Menu.Item>
          </SubMenu>

          <SubMenu key="sub6" title={<span><Icon type="user" /><span>Documents</span></span>}>
            <Menu.Item key="12"><Link to="/profilePage">Profile</Link></Menu.Item>
          </SubMenu>



            <SubMenu key="sub5" onSelect={() => firebase.auth().signOut()} title={<span><Icon type="logout" /><span><Button type="default" onClick={() => firebase.auth().signOut()}>Sign Out

            </Button></span></span>}>

            </SubMenu>




          </Menu>
          </Drawer>

</div>


    <Sider
      style={{
       overflow: 'auto',position: 'fixed', height: '100vh', left: 0, backgroundColor: '#2E2E2E'
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
          style={{ backgroundColor: '#2E2E2E', paddingTop: '20px', left: '5px', width: '100%', height: '100vh', color: 'white', fontSize: '18px' }}
          mode="vertical">
          <SubMenu key="sub1" title={<Link to="/dashboard"><span><Icon type="dashboard" /><span><b>Dashboard</b></span></span></Link>}>

          </SubMenu>

          <SubMenu key="sub2" title={<span><Icon type="form" /><span><b>Sampling</b></span></span>}>
            <Menu.Item key="3"><Link to="/monthlySamples">Monthly Samples</Link></Menu.Item>


          </SubMenu>




          <SubMenu key="sub4" title={<span><Icon type="setting" /><span><b>Asset Manager</b></span></span>}>
            <Menu.Item key="6"><Link to="/maintenanceReports">Maintenance Reports</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/vendorContacts">Vendor Contacts</Link></Menu.Item>
              <Menu.Item key="8"><Link to="/equipmentList">Equipment List</Link></Menu.Item>
              <Menu.Item key="9"><Link to="/chemicalApplications">Chemical Applications</Link></Menu.Item>
              <Menu.Item key="10"><Link to="/fishStocking">Fish Stocking</Link></Menu.Item>

          </SubMenu>


        <SubMenu key="sub5" title={<span><Icon type="file" /><span><b>Documents</b></span></span>}>
          <Menu.Item key="11"><Link to="/uploadDocument">Documents</Link></Menu.Item>
        </SubMenu>

        <SubMenu key="sub6" title={<span><Icon type="user" /><span><b>Documents</b></span></span>}>
          <Menu.Item key="12"><Link to="/profilePage">Profile</Link></Menu.Item>
        </SubMenu>



          <SubMenu key="sub5" onSelect={() => firebase.auth().signOut()} title={<span><Icon type="logout" /><span><Button type="default" onClick={() => firebase.auth().signOut()}><b>Sign Out</b>

          </Button></span></span>}>

          </SubMenu>




        </Menu>
    </Sider>
    <Layout style={{margin: this.state.margin, backgroundColor: '#F0F0F0'}}>

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
