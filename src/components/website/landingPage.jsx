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




export default class landingPage extends Component {







      render() {

        const cardTitles = [{cardTitle: "Project Management", bullet1: "bullet1", bullet2: "Test2", bullet3: "test3"}, {cardTitle: "Document Control", bullet1: "bullet1", bullet2: "Test2", bullet3: "test3"}, {cardTitle: "Quality Control", bullet1: "bullet1", bullet2: "Test2", bullet3: "test3"}, {cardTitle: "Productivity", bullet1: "bullet1", bullet2: "Test2", bullet3: "test3"} ]

        const card = (
          <div>
          <Card >
            <Col offset={1} span={11}>
              <Row style={{textAlign: 'left'}}>
                <h2>Section Title</h2>
              </Row>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Col>

          </Card>
          </div>
        )

        function onChange(a, b, c) {
          console.log(a, b, c);
        }

        return (
          <Layout style={{backgroundColor: 'white'}}>
            <Row type="flex" justify="center">
              <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{textAlign: 'left'}}>

            <Carousel >

              <div class="image">
              <img src={paddleboard} width="100%" height="100%" style={{filter: 'brightness(50%)'}}/>
              <h1>Building the software <br />that manages the world's water.<br /></h1>
              <h3>AquaSource's universal platform connects your team, applications, and devices in one centralized hub.<br /> From bidding to closeout, collaborate in real time with all your teams, on any device.</h3>
              <Button style={{position: 'absolute',
              top: '330px',
              left: '50px',
              fontSize: '18px',
              color: 'black',
              backgroundColor: 'white',
              borderColor: '#333',
              width: '200px',
              height: '45px',

            }} size="large" type="primary">Learn More</Button>
              </div>


              <div class="image">
              <img src={kayak} width="100%" height="100%" style={{filter: 'brightness(50%)'}}/>
              <h1>Building the software <br />that manages the world's water.</h1>
              <h3>AquaSource's universal platform connects your team, applications, and devices in one centralized hub.<br /> From bidding to closeout, collaborate in real time with all your teams, on any device.</h3>
              </div>

              <div class="image">
              <img src={faucet} width="100%" height="100%" style={{filter: 'brightness(50%)'}}/>
              <h1>Building the software <br />that manages the world's water.</h1>
              <h3>Procore's universal platform connects your team, applications, and devices in one centralized hub.<br /> From bidding to closeout, collaborate in real time with all your teams, on any device.</h3>
              </div>

              <div class="image">
              <img src={lakeSign} width="100%" height="100%" style={{filter: 'brightness(40%)'}}/>
              <h1>Building the software <br />that manages the world's water.</h1>
              <h3>Procore's universal platform connects your team, applications, and devices in one centralized hub.<br /> From bidding to closeout, collaborate in real time with all your teams, on any device.</h3>
              </div>

            </Carousel>
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{paddingTop: 6}}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{textAlign: 'left', paddingTop: 6, paddingRight: 3}}>
                <div>
                <Card  style={{backgroundColor: '#f6f6f6', height: '250px'}} >
                  <Col offset={1} span={16}>
                    <Row style={{textAlign: 'left'}}>
                      <h2>Project Management</h2>
                    </Row>
                    <p style={{fontSize: '15px'}}>Manage multiple water projects, in one place, with ultimate project visibility.</p>

                    <Button type="primary" style={{position: 'absolute',
                    top: '150px', }}>Learn More</Button>
                  </Col>
                </Card>
                </div>

        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{textAlign: 'left', paddingTop: 6, paddingLeft: 3}}>
          <div>
          <Card style={{backgroundColor: '#f6f6f6', height: '250px'}} >
            <Col offset={1} span={14}>
              <Row style={{textAlign: 'left'}}>
                <h2>Document Control</h2>
              </Row>
              <p style={{fontSize: '15px'}}>Provides automation of documentation tasks within the organization</p>

                <Button type="primary" style={{position: 'absolute',
                top: '150px', }}>Learn More</Button>
            </Col>
          </Card>
          </div>

  </Col>
  <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{textAlign: 'left', paddingTop: 6, paddingRight: 3}}>
    <div>
    <Card style={{backgroundColor: '#f6f6f6', height: '250px'}} >
      <Col offset={1} span={14}>
        <Row style={{textAlign: 'left'}}>
          <h2>Productivity</h2>
        </Row>
        <p style={{fontSize: '15px'}}>Better resource management offers a great opportunity to reduce costs and increase productivity.</p>

          <Button type="primary" style={{position: 'absolute',
          top: '150px', }}>Learn More</Button>
      </Col>
    </Card>
    </div>

</Col>
<Col xs={24} sm={24} md={12} lg={12} xl={12} style={{textAlign: 'left', paddingTop: 6, paddingLeft: 3}}>
  <div>
  <Card style={{backgroundColor: '#f6f6f6', height: '250px'}} >
    <Col offset={1} span={14}>
      <Row style={{textAlign: 'left'}}>
        <h2>Asset Management</h2>
      </Row>
      <p style={{fontSize: '15px'}}>Allows you to monitor and manage your assets using a systemised approach</p>

        <Button type="primary" style={{position: 'absolute',
        top: '150px', }}>Learn More</Button>
    </Col>
  </Card>
  </div>

</Col>

                </Row>

                <Row type="flex" justify="center" style={{paddingTop: 6}}>
                  <Col span={12} style={{paddingLeft: 30}}>
                    <img src={floatingScreen} width="90%" height="100%" />

                  </Col>
                  <Col span={12} style={{paddingRight: 50, paddingTop: 20}}>

                    <p style={{color: 'black', fontSize: '22px', margin: '0 0 5px'}}><b>User-Centric</b></p>
                    <p >Procore is built for construction, by construction. We work collaboratively with clients and users to build products that solve real problems with practical solutions.</p>

                    <p style={{color: 'black', fontSize: '22px', paddingTop: 15, margin: '0 0 5px'}}><b>East to Use</b></p>
                    <p >Procore is built for construction, by construction. We work collaboratively with clients and users to build products that solve real problems with practical solutions.</p>

                      <p style={{color: 'black', fontSize: '22px', paddingTop: 15, margin: '0 0 5px'}}><b>Improve Accountability</b></p>
                      <p>Procore is built for construction, by construction. We work collaboratively with clients and users to build products that solve real problems with practical solutions.</p>


</Col>
                </Row>

                <Row type="flex" justify="center" style={{paddingTop: 6, backgroundColor: '#f6f6f6' }}>

                  <Col span={10} style={{paddingTop: 60, paddingLeft: 100}}>

                    <p style={{color: 'black', fontSize: '22px', margin: '0 0 5px'}}><b>User-Centric</b></p>
                    <p >Procore is built for construction, by construction. We work collaboratively with clients and users to build products that solve real problems with practical solutions.</p>

                  <Button type="primary" size="large">Take a Tour</Button>


</Col>

<Col span={14} style={{paddingLeft: 50}}>
  <img src={macbook} width="100%" height="100%" />

</Col>
                </Row>




          </Layout>

        )
            }
          }
