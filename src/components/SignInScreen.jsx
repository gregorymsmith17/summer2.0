import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { fire, facebookProvider } from '../fire';

import Dashboard from './dashboard';
import monthlySamples from './monthlySamples';
import maintenanceReports from './maintenanceReports';
import vendorContacts from './vendorContacts';
import uploadDocument from './uploadDocument';
import profilePage from './profilePage';

import { Link } from 'react-router-dom';
import { StickyContainer, Sticky } from 'react-sticky';
import { Col, Popover, Panel, Grid, Collapse, Well, ListGroup, ListGroupItem, Button, Nav, NavItem, OverlayTrigger, Row, Tab, Tabs } from 'react-bootstrap';

import { BrowserRouter, Route } from 'react-router-dom';


const styles = {
  sidenav: {
    height: '100vh',
    width: '180px',/* Set the width of the sidebar */
    position: 'sticky',
    overflowx: 'hidden',
    zindex: 1,
    top: 0, /* Stay at the top */
    left: 0,
    backgroundColor: '#325168' /* Fixed Sidebar (stay in place on scroll) */

},
background: {
  backgroundColor: '#FFFFFF',
  height: '100%'
   /* Fixed Sidebar (stay in place on scroll) */

},

  panelWidth: {
    width: '100%',
    left: '1px',
    paddingleft: '0px',
    center: 'auto',
    opacity: 10,


  },
  topPad: {
    paddingTop: "15px"
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
    };
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

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div style={styles.background} >

        <Row style={styles.background}>

          <Col xs={5} sm={5} md={5}>
            <StickyContainer style={{position: 'fixed'}}>

            <Panel style={styles.sidenav}>
              <Panel.Body>


  <ListGroup style={styles.panelWidth}>
  <ListGroupItem >
    <NavItem componentClass={Link} href="/dashboard" to="/dashboard">
      Dashboard
    </NavItem>


  </ListGroupItem>



  <OverlayTrigger rootClose="true" trigger="click" placement="right" overlay={popoverRightSampling}>
 <ListGroupItem>Sampling</ListGroupItem>
 </OverlayTrigger>

    <OverlayTrigger rootClose="true" trigger="click" placement="right" overlay={popoverRightAsset}>
    <ListGroupItem>Asset Manager</ListGroupItem>
    </OverlayTrigger>

    <OverlayTrigger rootClose="true" trigger="click" placement="right" overlay={popoverRightDocuments}>
   <ListGroupItem>Documents</ListGroupItem>
   </OverlayTrigger>

   <OverlayTrigger rootClose="true" trigger="click" placement="right" overlay={popoverRightProfile}>
  <ListGroupItem>Profile</ListGroupItem>
  </OverlayTrigger>




</ListGroup>
<Button bsStyle="info" onClick={() => firebase.auth().signOut()}>Sign Out

</Button>



              </Panel.Body>
</Panel>
</StickyContainer>





          </Col>
          <Col style={styles.background} mdOffset={2} smOffset={2} xsOffset={2} xs={8} sm={8} md={8}>

            <Route exact path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/monthlySamples" component={monthlySamples} />
            <Route path="/maintenanceReports" component={maintenanceReports} />
            <Route path="/vendorContacts" component={vendorContacts} />
            <Route path="/uploadDocument" component={uploadDocument} />
            <Route path="/profilePage" component={profilePage} />


            </Col>
        </Row>








      </div>
    );
  }
}
export default SignInScreen;
