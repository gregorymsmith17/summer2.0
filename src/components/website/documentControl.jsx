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

import dashDocumentMac from './images/dashDocumentMac.png';


export default class documentControl extends Component {



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
                  <p style={{fontSize: 24}}><Icon type="reconciliation" theme="twoTone" />   <b style={{color: 'black'}}>Document</b>Control</p>
                </Row>
                <Row style={{textAlign: 'left'}}>
                  <p style={{fontSize: 34, lineHeight: 1.1}}><b style={{color: 'black' }}>Increase efficiency of tracking down all relevant docuements for your water system.</b></p>
                </Row>
                <Row>
                <p style={{fontSize: '15px'}}>AquaSource helps you manage all of your project documents by allowing you to keep them in one central location.</p>


              </Row>
              </Col>

              <Col xs={0} sm={0} md={{span: 11}} lg={{span: 11}} xl={{span: 11}}> <img src={dashDocumentMac} width="100%" height="100%" />  </Col>
            </Card>
            </div>
            </Row>




            <Row justify="center" style={{paddingTop: 0}}>
                    <div>
                    <Card  style={{backgroundColor: 'white', height: '100%'}} >
                      <Row justify="center" type="flex" style={{paddingTop: 30}}>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{textAlign: 'center'}}>

                        <p style={{fontSize: 40, marginBottom: 0}}><Icon type="reconciliation" theme="twoTone" />   <b style={{color: 'black'}}>Document</b>Control</p>



                      </Col>
                      </Row>

                      <Row type="flex" justify="center" style={{paddingTop: 0}}>
                        <Col xs={20} sm={20} md={14} lg={14} xl={14}>
                          <hr style={{border: 'solid 1px black', opacity: '0.2'}}></hr>
                        </Col>
                      </Row>




                      <Row justify="center" type="flex"  style={{paddingTop: 10}}>

                        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{textAlign: 'center'}}>
                          <p style={{fontSize: 22, lineHeight: 1.2}}><b style={{color: 'black' }}>Streamline your project documents.</b></p>

                        </Col>
                      </Row>

                      <Row justify="center" type="flex"  style={{paddingTop: 10}}>

                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <p style={{fontSize: '18px'}}>
                            AquaSource helps clients increase project efficiency streamlining and organizing project documentation. This real time documentation center can be accessed by any user at anytime. <br /> <br />
                        </p>
                      </Col>
                    </Row>

                    <Row justify="center" type="flex"  style={{paddingTop: 10}}>

                      <Col xs={20} sm={20} md={{offset:1, span:6}} lg={{offset:1, span:6}} xl={{offset:1, span:6}}>

                        <p style={{fontSize: '18px'}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  /> All relevent documents in one location</p>
                        <p style={{fontSize: '18px'}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  /> Cloud-based documentation center</p>
                        <p style={{fontSize: '18px'}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  /> Access docs from any device</p>

                        </Col>
                      </Row>



                    </Card>
                    </div>
                    </Row>




      </Layout>

    )
        }
      }
