import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Row, Col, Tabs, Table, Divider, Tag, message, Card, Drawer, Menu, Dropdown, Button, Layout, Carousel, Input, Pagination, Popover, Icon, Cascader, Switch, Select, AutoComplete, Radio } from 'antd';




import paddleboard from './images/paddleboard.jpg';
import faucet from './images/faucet.jpg';
import kayak from './images/kayak.jpg';
import lakeSign from './images/lakeSign.jpg';
import floatingScreen from './images/floatingScreen.png';
import macbook from './images/macbook.png';




export default class productOverview extends Component {



      render() {



        function onChange(a, b, c) {
          console.log(a, b, c);
        }

        return (
          <Layout style={{backgroundColor: 'white'}}>

        <Row type="flex" justify="center" style={{paddingTop: 0}}>
                <div>
                <Card  style={{backgroundColor: '#f6f6f6', height: '100%'}} >
                  <Col xs={24} sm={24} md={{span: 12, offset: 1}} lg={{span: 12, offset: 1}} xl={{span: 12, offset: 1}}>
                    <Row style={{textAlign: 'left'}}>
                      <p style={{fontSize: 24}}><Icon type="reconciliation" theme="twoTone" />   <b style={{color: 'black'}}>Project</b>Management</p>
                    </Row>
                    <Row style={{textAlign: 'left'}}>
                      <p style={{fontSize: 34, lineHeight: 1.1}}><b style={{color: 'black' }}>The easiest-to-use water quality and water infrastructure asset manager software.</b></p>
                    </Row>
                    <Row>
                    <p style={{fontSize: '15px'}}>AquaSource helps you manage multiple projects, in one place, with ultimate project visibility.</p>


                  </Row>
                  </Col>

                  <Col xs={0} sm={0} md={11} lg={11} xl={11}><img src={macbook} width="100%" height="100%" />  </Col>
                </Card>
                </div>
                </Row>


                <Row style={{paddingTop: 3}}>
                        <div>

                        <Card  style={{backgroundColor: '#f6f6f6', height: '100%'}} >
                        <Col xs={0} sm={0} md={0} lg={10} xl={10}><img src={macbook} width="100%" height="100%" />  </Col>
                          <Col xs={24} sm={24} md={{span: 8, offset: 2}} lg={{span: 8, offset: 2}} xl={{span: 8, offset: 2}}>
                            <Row style={{textAlign: 'right'}}>
                              <p style={{fontSize: 24}}><Icon type="schedule" theme="twoTone" />   <b style={{color: 'black'}}>Document</b>Control</p>
                            </Row>
                            <Row style={{textAlign: 'right'}}>
                              <p style={{fontSize: 30, lineHeight: 1.1}}><b style={{color: 'black' }}>Manage drawings and reports.</b></p>
                            </Row>
                            <Row style={{textAlign: 'right'}}>
                            <p style={{fontSize: '15px'}}>AquaSource helps you manage all of your documents, in one place, with ultimate project visibility.</p>


                          </Row>
                          </Col>
                        </Card>

                        </div>
                        </Row>




          </Layout>

        )
            }
          }
