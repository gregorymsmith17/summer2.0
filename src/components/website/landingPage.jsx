import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { fire } from '../../fire';
import { Row, Col, Tabs, Table, Divider, Tag, message, Card, Drawer, Menu, Dropdown, Button, Layout, Carousel, Input, Pagination, Popover, Icon, Cascader, Switch, Select, AutoComplete, Radio } from 'antd';


import './landingPage.css';
import paddleboard from './images/paddleboard.jpg';
import faucet from './images/faucet.jpg';
import kayak from './images/kayak.jpg';
import lakeSign from './images/lakeSign.jpg';
import floatingScreen from './images/floatingScreen.png';
import macbook from './images/macbook.png';
import ipadDash from './images/ipadDash.png';
import ipadSample from './images/ipadSample.png';




export default class landingPage extends Component {







      render() {



        return (
          <Layout style={{backgroundColor: 'white'}}>
            <Row type="flex" justify="center">
              <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{textAlign: 'left'}}>

            <Carousel >

              <div class="image">
              <img class="image1" src={paddleboard} width="100%" height="100%" objectPosition="100% 100%" style={{filter: 'brightness(50%)'}}/>
              <h1>Building the software <br />that manages the world's water.<br /></h1>
              <h3>AquaSource's universal platform connects your team, applications, and devices in one centralized hub.<br /> From bidding to closeout, collaborate in real time with all your teams, on any device.</h3>
              <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/demo">
              <Button style={{position: 'absolute',
              top: '330px',
              left: '50px',
              fontSize: '18px',
              color: 'black',
              backgroundColor: 'white',
              borderColor: '#333',
              width: '200px',
              height: '45px',

            }} size="large" type="primary">Try a Demo</Button></Link>
              </div>




              <div class="image">
              <img src={kayak} width="100%" height="100%" style={{filter: 'brightness(50%)'}}/>
              <h1>Building the software <br />that manages the world's water.</h1>
              <h3>AquaSource's universal platform connects your team, applications, and devices in one centralized hub.<br /> From bidding to closeout, collaborate in real time with all your teams, on any device.</h3>
                <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/demo">
                <Button style={{position: 'absolute',
                top: '330px',
                left: '50px',
                fontSize: '18px',
                color: 'black',
                backgroundColor: 'white',
                borderColor: '#333',
                width: '200px',
                height: '45px',

              }} size="large" type="primary">Try a Demo</Button></Link>
              </div>

              <div class="image">
              <img src={faucet} width="100%" height="100%" style={{filter: 'brightness(50%)'}}/>
              <h1>Building the software <br />that manages the world's water.</h1>
              <h3>Procore's universal platform connects your team, applications, and devices in one centralized hub.<br /> From bidding to closeout, collaborate in real time with all your teams, on any device.</h3>
                <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/demo">
                <Button style={{position: 'absolute',
                top: '330px',
                left: '50px',
                fontSize: '18px',
                color: 'black',
                backgroundColor: 'white',
                borderColor: '#333',
                width: '200px',
                height: '45px',

              }} size="large" type="primary">Try a Demo</Button></Link>
              </div>

              <div class="image">
              <img src={lakeSign} width="100%" height="100%" style={{filter: 'brightness(40%)'}}/>
              <h1>Building the software <br />that manages the world's water.</h1>
              <h3>Procore's universal platform connects your team, applications, and devices in one centralized hub.<br /> From bidding to closeout, collaborate in real time with all your teams, on any device.</h3>
                <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/demo">
                <Button style={{position: 'absolute',
                top: '330px',
                left: '50px',
                fontSize: '18px',
                color: 'black',
                backgroundColor: 'white',
                borderColor: '#333',
                width: '200px',
                height: '45px',

              }} size="large" type="primary">Try a Demo</Button></Link>
              </div>

            </Carousel>
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{paddingTop: 6}}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{textAlign: 'left', paddingTop: 6, paddingRight: 3}}>
                <div>
                <Card  style={{backgroundColor: '#f6f6f6', height: '250px'}} >
                  <Row>
                  <Col xs={24} sm={24} md={{span: 16, offset: 1}} lg={{span: 16, offset: 1}} xl={{span: 16, offset: 1}}>
                    <Row style={{textAlign: 'left'}}>
                      <h2>Project Management</h2>
                    </Row>
                    <p style={{fontSize: '15px'}}>Simple solution to manage and track your assets, sampling results, and project documentation, allowing you to properly manage your water infrastructure.</p>
                    </Col>

                    </Row>

                    <Row>

                    <Col xs={24} sm={24} md={{span: 6, offset: 1}} lg={{span: 6, offset: 1}} xl={{span: 6, offset: 1}} style={{textAlign: 'left'}}>
                    <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/projectManagement"><Button type="primary" >Learn More</Button></Link>
                  </Col>
                  </Row>
                </Card>
                </div>

        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{textAlign: 'left', paddingTop: 6, paddingRight: 3}}>
          <div>
          <Card  style={{backgroundColor: '#f6f6f6', height: '250px'}} >
            <Row>
            <Col xs={24} sm={24} md={{span: 16, offset: 1}} lg={{span: 16, offset: 1}} xl={{span: 16, offset: 1}}>
              <Row style={{textAlign: 'left'}}>
                <h2>Document Control</h2>
              </Row>
              <p style={{fontSize: '15px'}}>Increase efficiency of tracking down all relative docuements for your water system.</p>
              </Col>

              </Row>

              <Row>

              <Col xs={24} sm={24} md={{span: 6, offset: 1}} lg={{span: 6, offset: 1}} xl={{span: 6, offset: 1}} style={{textAlign: 'left'}}>
              <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/documentControl"><Button type="primary" >Learn More</Button></Link>
            </Col>
            </Row>
          </Card>
          </div>

  </Col>
  <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{textAlign: 'left', paddingTop: 6, paddingRight: 3}}>
    <div>
    <Card  style={{backgroundColor: '#f6f6f6', height: '250px'}} >
      <Row>
      <Col xs={24} sm={24} md={{span: 16, offset: 1}} lg={{span: 16, offset: 1}} xl={{span: 16, offset: 1}}>
        <Row style={{textAlign: 'left'}}>
          <h2>Maintenance Log</h2>
        </Row>
        <p style={{fontSize: '15px'}}>Allowing you to keep all your maintenance logs in one central easy to access location</p>
  </Col>

        </Row>

        <Row>

        <Col xs={24} sm={24} md={{span: 6, offset: 1}} lg={{span: 6, offset: 1}} xl={{span: 6, offset: 1}} style={{textAlign: 'left'}}>
        <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/maintenanceLog"><Button type="primary" >Learn More</Button></Link>
      </Col>
      </Row>
    </Card>
    </div>

</Col>
<Col xs={24} sm={24} md={12} lg={12} xl={12} style={{textAlign: 'left', paddingTop: 6, paddingRight: 3}}>
  <div>
  <Card  style={{backgroundColor: '#f6f6f6', height: '250px'}} >
    <Row>
    <Col xs={24} sm={24} md={{span: 16, offset: 1}} lg={{span: 16, offset: 1}} xl={{span: 16, offset: 1}}>
      <Row style={{textAlign: 'left'}}>
          <h2>Asset Management</h2>
      </Row>
      <p style={{fontSize: '15px'}}>Develop, operate, and maintain your current assets with an organized and cost-effective approach.</p></Col>

      </Row>

      <Row>

      <Col xs={24} sm={24} md={{span: 6, offset: 1}} lg={{span: 6, offset: 1}} xl={{span: 6, offset: 1}} style={{textAlign: 'left'}}>
      <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/assetManagement"><Button type="primary" >Learn More</Button></Link>
    </Col>
    </Row>
  </Card>
  </div>

</Col>




                </Row>

                <Row type="flex" justify="center" style={{paddingTop: 6}}>
                  <Col xs={0} sm={0} md={11} lg={11} xl={11} style={{paddingLeft: 30}}>
                    <img src={ipadDash} width="90%" height="100%" />

                  </Col>
                  <Col xs={{span:22, offset: 2}} sm={{span:22, offset: 2}} md={11} lg={11} xl={11} style={{paddingRight: 50, paddingTop: 20}}>

                    <p style={{color: 'black', fontSize: '22px', margin: '0 0 5px'}}><b>Water Industry Tool</b></p>
                    <p >AquaSource is a tool built for any facet of the project management in the water industry.  Managing your sampling result and maintenance logs all in one place. </p>

                    <p style={{color: 'black', fontSize: '22px', paddingTop: 15, margin: '0 0 5px'}}><b>Store Documents</b></p>
                    <p>AquaSource will host and manage all of the applicable documents you have for each of your projects.  Documents will be stored in a cloud-based storage system allowing you to access them from anywhere.</p>

                      <p style={{color: 'black', fontSize: '22px', paddingTop: 15, margin: '0 0 5px'}}><b>Improve Productivity</b></p>
                      <p>Improve your operator and manager productivity by having all of your project's information stored in a central location for everyone to access.</p>


</Col>
                </Row>

                <Row type="flex" justify="center" style={{paddingTop: 6, backgroundColor: '#f6f6f6' }}>

                  <Col xs={0} sm={0} md={10} lg={10} xl={10} style={{paddingTop: 60, paddingLeft: 100}}>

                    <Row>
                    <p style={{color: 'black', fontSize: '22px', margin: '0 0 5px'}}><b>User-Friendly</b></p>
                    <p >Procore is built for construction, by construction. We work collaboratively with clients and users to build products that solve real problems with practical solutions.</p>
                    </Row>

                    <Row>

                  <Link style={{ textDecoration: 'none', cursor: 'pointer'}} to="/demo"><Button type="primary" >Take a Tour</Button></Link>


                  </Row>

</Col>

<Col xs={{span:22, offset: 2}} sm={{span:22, offset: 2}} md={0} lg={0} xl={0} style={{paddingTop: 20, paddingBottom: 30}}>

  <Row>
  <p style={{color: 'black', fontSize: '22px', margin: '0 0 5px'}}><b>User-Centric</b></p>
  <p>Built for the water industry, by the water industry.  Check out one of the many demos to see how you can leverage the power of AuqaSource to help your organization be more productive and efficient.</p>
  </Row>

  <Row>

<Button type="primary" size="large">Take a Tour</Button>
</Row>

</Col>

<Col xs={0} sm={0} md={14} lg={14} xl={14}  style={{paddingLeft: 50}}>
  <img src={ipadSample} width="100%" height="100%" />

</Col>
                </Row>




          </Layout>

        )
            }
          }
