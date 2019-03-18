import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Row, Col, Tabs, Table, Divider, Tag, message, Card, Drawer, Menu, Dropdown, Button, Layout, Carousel, Input, Pagination, Popover, Icon, Cascader, Switch, Select, AutoComplete, Radio, Collapse } from 'antd';


import './landingPage.css';

import paddleboard from './images/paddleboard.jpg';
import faucet from './images/faucet.jpg';
import kayak from './images/kayak.jpg';
import lakeSign from './images/lakeSign.jpg';
import floatingScreen from './images/floatingScreen.png';
import macbook from './images/macbook.png';


const Panel = Collapse.Panel;

export default class tutorial extends Component {



      render() {



        function onChange(a, b, c) {
          console.log(a, b, c);
        }

        return (
          <Layout style={{backgroundColor: 'white'}}>

            <Row justify="center" style={{paddingTop: 0}}>


                      <Row justify="center" type="flex" style={{paddingTop: 30}}>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{textAlign: 'center'}}>

                        <p style={{fontSize: 40, marginBottom: 0}}><Icon type="reconciliation" theme="twoTone" />   <b style={{color: 'black'}}>Tutorials </b> & How Tos</p>

                      </Col>
                      </Row>

                      <Row type="flex" justify="center" style={{paddingTop: 0}}>
                        <Col xs={20} sm={20} md={14} lg={14} xl={14}>
                          <hr style={{border: 'solid 1px black', opacity: '0.2'}}></hr>
                        </Col>
                      </Row>

                      <Row justify="center" type="flex"  style={{paddingTop: 10}}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{textAlign: 'center'}}>
                          <p style={{fontSize: 22, lineHeight: 1.2}}><b style={{color: 'black' }}>Manage your system better.</b></p>
                        </Col>
                      </Row>









            <Row   style={{paddingTop: 10}}>
              <Col xs={{offset: 1, span: 22}} sm={{offset: 1, span: 22}} md={{offset:4, span:18}} lg={{offset:4, span:18}} xl={{offset:4, span:18}}>
                <p style={{fontSize: 26, lineHeight: 1.2, paddingLeft: 20}}><Icon style={{fontSize: 40}} type="dashboard" theme="twoTone" /><b style={{color: 'black', paddingLeft: 30 }}>DASHBOARD</b></p>
            <Collapse bordered={false} >
                <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Navigate Dashboard</p>} key="1">
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                     NALMS is a melting pot, welcoming anyone interested in lakes.
                  </p>
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                  The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
                  </p>
                </Panel>
                <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Change Location for Weather</p>} key="2">
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                     NALMS is a melting pot, welcoming anyone interested in lakes.
                  </p>
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                  The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
                  </p>
                </Panel>
                <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Change Location for Map</p>} key="3">
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                     NALMS is a melting pot, welcoming anyone interested in lakes.
                  </p>
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                  The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
                  </p>
                </Panel>
                <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Edit Chart Types</p>} key="4">
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                     NALMS is a melting pot, welcoming anyone interested in lakes.
                  </p>
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                  The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
                  </p>
                </Panel>
                <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Re Order Charts</p>} key="5">
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                     NALMS is a melting pot, welcoming anyone interested in lakes.
                  </p>
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                  The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
                  </p>
                </Panel>
                </Collapse>
                <p style={{fontSize: 26, lineHeight: 1.2, paddingLeft: 20, paddingTop: 40}}><Icon style={{fontSize: 40}} type="experiment" theme="twoTone" /><b style={{color: 'black', paddingLeft: 30 }}>SAMPLING</b></p>
                  <Collapse bordered={false} >
                      <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Navigate Sampling Page</p>} key="6">
                        <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                           NALMS is a melting pot, welcoming anyone interested in lakes.
                        </p>
                        <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                        The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
                        </p>
                      </Panel>
                      <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Add Sampling Report</p>} key="7">
                        <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                           NALMS is a melting pot, welcoming anyone interested in lakes.
                        </p>
                        <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                        The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
                        </p>
                      </Panel>
                      <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Add Report Item</p>} key="8">
                        <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                           NALMS is a melting pot, welcoming anyone interested in lakes.
                        </p>
                        <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                        The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
                        </p>
                      </Panel>
                      <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Edit Report</p>} key="9">
                        <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                           NALMS is a melting pot, welcoming anyone interested in lakes.
                        </p>
                        <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                        The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
                        </p>
                      </Panel>
                      <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Edit Sampling Data Graph</p>} key="10">
                        <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                           NALMS is a melting pot, welcoming anyone interested in lakes.
                        </p>
                        <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                        The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
                        </p>
                      </Panel>
                      <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Edit Parameter Color and Graph Type</p>} key="11">
                        <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                           NALMS is a melting pot, welcoming anyone interested in lakes.
                        </p>
                        <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                        The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
                        </p>
                      </Panel>

                      </Collapse>

                      <p style={{fontSize: 26, lineHeight: 1.2, paddingLeft: 20, paddingTop: 40}}><Icon style={{fontSize: 40}} type="reconciliation" theme="twoTone" /><b style={{color: 'black', paddingLeft: 30 }}>MAINTENANCE LOG</b></p>
                        <Collapse bordered={false} >
            <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Navigate Maintenance Log Page</p>} key="12">
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                 NALMS is a melting pot, welcoming anyone interested in lakes.
              </p>
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
              The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
              </p>
            </Panel>
            <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Add Maintenance Report</p>} key="13">
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                 NALMS is a melting pot, welcoming anyone interested in lakes.
              </p>
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
              The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
              </p>
            </Panel>
            <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Add Maintenance Report Item</p>} key="14">
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                 NALMS is a melting pot, welcoming anyone interested in lakes.
              </p>
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
              The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
              </p>
            </Panel>
            <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Edit Maintenance Report Item</p>} key="15">
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                 NALMS is a melting pot, welcoming anyone interested in lakes.
              </p>
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
              The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
              </p>
            </Panel>


                            </Collapse>


                      <p style={{fontSize: 26, lineHeight: 1.2, paddingLeft: 20, paddingTop: 40}}><Icon style={{fontSize: 40}} type="tool" theme="twoTone" /><b style={{color: 'black', paddingLeft: 30 }}>EQUIPMENT LIST</b></p>
                        <Collapse bordered={false} >
            <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Navigate Equipment List Page</p>} key="16">
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                 NALMS is a melting pot, welcoming anyone interested in lakes.
              </p>
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
              The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
              </p>
            </Panel>
            <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  /> Add Equipment Item</p>} key="17">
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                 NALMS is a melting pot, welcoming anyone interested in lakes.
              </p>
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
              The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
              </p>
            </Panel>
            <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  /> Edit Equipment Item</p>} key="18">
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                 NALMS is a melting pot, welcoming anyone interested in lakes.
              </p>
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
              The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
              </p>
            </Panel>
                            </Collapse>


                      <p style={{fontSize: 26, lineHeight: 1.2, paddingLeft: 20, paddingTop: 40}}><Icon style={{fontSize: 40}} type="experiment" theme="twoTone" /><b style={{color: 'black', paddingLeft: 30 }}>CHEMICAL APPLICATIONS</b></p>

                        <Collapse bordered={false} >
            <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Navigate Chemical Applications Page</p>} key="19">
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                 NALMS is a melting pot, welcoming anyone interested in lakes.
              </p>
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
              The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
              </p>
            </Panel>
            <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Add Chemical Application</p>} key="20">
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                 NALMS is a melting pot, welcoming anyone interested in lakes.
              </p>
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
              The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
              </p>
            </Panel>
            <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Add Application Item</p>} key="21">
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                 NALMS is a melting pot, welcoming anyone interested in lakes.
              </p>
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
              The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
              </p>
            </Panel>
            <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Edit Chemical Application</p>} key="22">
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                 NALMS is a melting pot, welcoming anyone interested in lakes.
              </p>
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
              The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
              </p>
            </Panel>

                            </Collapse>

                      <p style={{fontSize: 26, lineHeight: 1.2, paddingLeft: 20, paddingTop: 40}}><Icon style={{fontSize: 40}} type="folder-open" theme="twoTone" /><b style={{color: 'black', paddingLeft: 30 }}>DOCUMENT CONTROL</b></p>

                        <Collapse bordered={false} >
            <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Navigate Document Pages</p>} key="23">
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                 NALMS is a melting pot, welcoming anyone interested in lakes.
              </p>
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
              The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
              </p>
            </Panel>
            <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Add Document</p>} key="24">
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                 NALMS is a melting pot, welcoming anyone interested in lakes.
              </p>
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
              The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
              </p>
            </Panel>
            <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Search for Document</p>} key="25">
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                 NALMS is a melting pot, welcoming anyone interested in lakes.
              </p>
              <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
              The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership
              </p>
            </Panel>


                            </Collapse>







            </Col>
          </Row>
        </Row>





          </Layout>

        )
            }
          }
