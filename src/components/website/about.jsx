import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Row, Col, Tabs, Table, Divider, Tag, message, Card, Drawer, Menu, Dropdown, Button, Layout, Carousel, Input, Pagination, Popover, Icon, Cascader, Switch, Select, AutoComplete, Radio } from 'antd';


import './landingPage.css';

import paddleboard from './images/paddleboard.jpg';
import faucet from './images/faucet.jpg';
import kayak from './images/kayak.jpg';
import lakeSign from './images/lakeSign.jpg';
import floatingScreen from './images/floatingScreen.png';
import macbook from './images/macbook.png';




export default class about extends Component {



      render() {



        function onChange(a, b, c) {
          console.log(a, b, c);
        }

        return (
          <Layout style={{backgroundColor: 'white'}}>

        <Row justify="center" style={{paddingTop: 0}}>
                <div>
                <Card  style={{backgroundColor: 'white', height: '100%'}} >
                  <Row justify="center" type="flex" style={{paddingTop: 30}}>
                  <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{textAlign: 'center'}}>

                      <p style={{fontSize: 42, lineHeight: .08}}>Water management simplified</p>



                  </Col>

                  <Col xs={24} sm={24} md={0} lg={0} xl={0} style={{textAlign: 'center'}}>

                      <p style={{fontSize: 26, lineHeight: 1}}>Water management simplified</p>



                  </Col>
                  </Row>

                  <Row justify="center" type="flex"  style={{paddingTop: 10}}>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{textAlign: 'center'}}>
                      <p style={{fontSize: 22, lineHeight: 1.2}}><b style={{color: 'black' }}>The easiest-to-use water quality and water infrastructure asset manager software.</b></p>

                    </Col>
                  </Row>

                  <Row justify="center" type="flex"  style={{paddingTop: 10}}>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <p style={{fontSize: '18px'}}>
                        AquaSource helps firms drastically increase project efficiency and accountability by streamlining and mobilizing project communications and documentation. This real time data and accessibility minimizes costly risks and delays—ultimately boosting profits. <br /> <br />


                    </p>

                    </Col>
                  </Row>


                </Card>
                </div>
                </Row>

                <Row justify="center" style={{paddingTop: 0}}>
                        <div>
                        <Card  style={{backgroundColor: '#f6f6f6', height: '100%'}} >
                          <Row style={{paddingTop: 20}}>
                          <Col xs={0} sm={0} md={3} lg={3} xl={3}>

                          </Col>
                          <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{textAlign: 'center'}}>

                            <Row justify="center" type="flex">
                              <div  class="circle"><p style={{paddingTop: 50}}><Icon style={{fontSize: '100px'}} type="sound" theme="twoTone" /></p></div>
                            </Row>
                            <Row justify="center" type="flex" style={{paddingTop: 15}}>
                              <p style={{fontSize: '22px'}}><b>We listened to the problems <br />of our customers.</b></p>
                            </Row>




                          </Col>
                          <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{textAlign: 'center'}}>



                            <Row justify="center" type="flex">
                              <div  class="circle"><p style={{paddingTop: 50}}><Icon style={{fontSize: '100px'}} type="fund" theme="twoTone" /></p></div>
                            </Row>
                            <Row justify="center" type="flex" style={{paddingTop: 15}}>
                              <p style={{fontSize: '22px'}}><b>Developed a cloud based solution<br />for these problems.</b></p>
                            </Row>





                          </Col>
                          <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{textAlign: 'center'}}>


                            <Row justify="center" type="flex">
                              <div  class="circle"><p style={{paddingTop: 50}}><Icon style={{fontSize: '100px'}} type="like" theme="twoTone" /></p></div>
                            </Row>
                            <Row justify="center" type="flex" style={{paddingTop: 15}}>
                              <p style={{fontSize: '22px'}}><b>Ensure that our clients<br />continue to improve efficiency and achieve success</b></p>
                            </Row>



                          </Col>


                          <Col xs={0} sm={0} md={3} lg={3} xl={3}>





                          </Col>
                          </Row>

                          <Row justify="center" type="flex"  style={{paddingTop: 35}}>

                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                              

                            </Col>
                          </Row>

                        </Card>
                        </div>
                        </Row>







          </Layout>

        )
            }
          }
