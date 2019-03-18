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

import dashMaintenanceMac from './images/dashMaintenanceMac.png';


export default class assetManager extends Component {



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
                  <p style={{fontSize: 24}}><Icon type="reconciliation" theme="twoTone" />   <b style={{color: 'black'}}>Asset</b>Management</p>
                </Row>
                <Row style={{textAlign: 'left'}}>
                  <p style={{fontSize: 34, lineHeight: 1.1}}><b style={{color: 'black' }}>Develop, operate, and maintain your current assets with an organized and cost-effective approach.</b></p>
                </Row>
                <Row>
                <p style={{fontSize: '15px'}}>AquaSource helps you manage all of your systems equipment in a centralized location</p>


              </Row>
              </Col>

              <Col xs={0} sm={0} md={{span: 11}} lg={{span: 11}} xl={{span: 11}}> <img src={dashMaintenanceMac} width="100%" height="100%" />  </Col>
            </Card>
            </div>
            </Row>




            <Row justify="center" style={{paddingTop: 0}}>
                    <div>
                    <Card  style={{backgroundColor: 'white', height: '100%'}} >
                      <Row justify="center" type="flex" style={{paddingTop: 30}}>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{textAlign: 'center'}}>

                        <p style={{fontSize: 40, marginBottom: 0}}><Icon type="reconciliation" theme="twoTone" />   <b style={{color: 'black'}}>Asset</b>Management</p>



                      </Col>
                      </Row>

                      <Row type="flex" justify="center" style={{paddingTop: 0}}>
                        <Col xs={20} sm={20} md={14} lg={14} xl={14}>
                          <hr style={{border: 'solid 1px black', opacity: '0.2'}}></hr>
                        </Col>
                      </Row>




                      <Row justify="center" type="flex"  style={{paddingTop: 10}}>

                        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{textAlign: 'center'}}>
                          <p style={{fontSize: 22, lineHeight: 1.2}}><b style={{color: 'black' }}>The easiest-to-use manager your system equipment.</b></p>

                        </Col>
                      </Row>

                      <Row justify="center" type="flex"  style={{paddingTop: 10}}>

                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <p style={{fontSize: '18px'}}>
                            AquaSource helps clients imporve asset accountability and organization by including an asset management system approach tool. <br /> <br />
                        </p>
                      </Col>
                    </Row>

                    <Row justify="center" type="flex"  style={{paddingTop: 10}}>

                      <Col xs={20} sm={20} md={{offset:0, span:7}} lg={{offset:0, span:7}} xl={{offset:0, span:7}}>

                        <p style={{fontSize: '18px'}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  /> Up-to-date real time equipment lists</p>
                        <p style={{fontSize: '18px'}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  /> Produce and log maintenance reports</p>
                        <p style={{fontSize: '18px'}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  /> Track all chemical applications and vendor contacts</p>

                        </Col>
                      </Row>



                    </Card>
                    </div>
                    </Row>




      </Layout>

    )
        }
      }
