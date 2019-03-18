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

export default class resource extends Component {



      render() {



        function onChange(a, b, c) {
          console.log(a, b, c);
        }

        return (
          <Layout style={{backgroundColor: 'white'}}>

            <Row justify="center" style={{paddingTop: 0}}>


                      <Row justify="center" type="flex" style={{paddingTop: 30}}>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{textAlign: 'center'}}>

                        <p style={{fontSize: 40, marginBottom: 0}}><Icon type="reconciliation" theme="twoTone" />   <b style={{color: 'black'}}>Resources </b>Information</p>

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
            <Collapse bordered={false} >
                <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  North American Lake Management Society:    <a target="_blank" href="https://www.nalms.org/product-category/reports/"><span><span>See More</span></span></a> </p>} key="1">
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                     NALMS is a melting pot, welcoming anyone interested in lakes.
                  </p>
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                  The North American Lake Management Society (NALMS) was founded in Portland, Maine in 1980 as an organization with membership open to both professionals and citizens interested in applied lake management, while other organizations focused on either one or the other. This unique niche is reflected in our mission: To forge partnerships among citizens, scientists, and professionals to foster the management and protection of lakes and reservoirs for today and tomorrow.
                  </p>
                </Panel>
                <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  /> Water Quality Standards: Regulations and Resources:    <a target="_blank" href="https://www.epa.gov/wqs-tech"><span><span>See More</span></span></a> </p>} key="2">
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                    Water quality standards (WQS) are provisions of state, territorial, authorized tribal or federal law approved by EPA that describe the desired condition of a water body and the means by which that condition will be protected or achieved. Water bodies can be used for purposes such as recreation (e.g. swimming and boating), scenic enjoyment, and fishing, and are the home to many aquatic organisms. To protect human health and aquatic life in these waters, states, territories and authorized tribes establish WQS. WQS form a legal basis for controlling pollutants entering the waters of the United States.
                  </p>
                </Panel>
                <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  National Pollutant Discharge Elimination System (NPDES):    <a target="_blank" href="https://www.epa.gov/npdes/municipal-wastewater"><span><span>See More</span></span></a> </p>} key="3">
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                    The collection and treatment of domestic sewage and wastewater is vital to public health and clean water. It is among the most important factors responsible for the general level of good health enjoyed in the United States. Sewers collect sewage and wastewater from homes, businesses, and industries and deliver it to wastewater treatment facilities before it is discharged to water bodies or land, or reused.
                  </p>
                </Panel>

                <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  NPDES Stormwater Program:    <a target="_blank" href="https://www.epa.gov/npdes/npdes-stormwater-program"><span><span>See More</span></span></a> </p>} key="4">
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                    Stormwater runoff is generated from rain and snowmelt events that flow over land or impervious surfaces, such as paved streets, parking lots, and building rooftops, and does not soak into the ground. The runoff picks up pollutants like trash, chemicals, oils, and dirt/sediment that can harm our rivers, streams, lakes, and coastal waters. To protect these resources, communities, construction companies, industries, and others, use stormwater controls, known as best management practices (BMPs). These BMPs filter out pollutants and/or prevent pollution by controlling it at its source.
                  </p>
                </Panel>
                <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Collection Systems
                        Technology Fact Sheet
                        Sewers, Lift Station:    <a target="_blank" href="https://www3.epa.gov/npdes/pubs/sewers-lift_station.pdf"><span><span>See More</span></span></a> </p>} key="5">
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                    Wastewater lift stations are facilities designed to
                    move wastewater from lower to higher elevation
                    through pipes. Key elements of lift stations include
                    a wastewater receiving well (wet-well), often
                    equipped with a screen or grinding to remove
                    coarse materials; pumps and piping with associated
                    valves; motors; a power supply system; an
                    equipment control and alarm system; and an odor
                    control system and ventilation system.
                  </p>
                </Panel>
                <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Guide for Evaluating, Managing, Operating, and Maintaining a Sewer Collection System:    <a target="_blank" href="https://www3.epa.gov/npdes/pubs/cmom_guide_for_collection_systems.pdf"><span><span>See More</span></span></a> </p>} key="6">
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                    This guide identifies some of the criteria used by EPA to evaluate a collection system’s management,
operation, and maintenance (CMOM) program activities. The guide is intended for use by EPA and state
inspectors as well as the regulated community – owners or operators of sewer systems collecting
domestic sewage as well as consultants or other third-party evaluators or compliance assistance
providers.
                  </p>
                </Panel>

                <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  The Ultimate Guide to Inground Swimming Pool Maintenance:    <a target="_blank" href="https://www.riverpoolsandspas.com/blog/inground-pool-maintenance"><span><span>See More</span></span></a> </p>} key="7">
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                    Basic guide to maintain and operate inground pools.
                  </p>
                </Panel>

                <Panel header={<p style={{fontSize: '20px', color: '#000000a6', marginBottom: 3}}><Icon style={{fontSize: '20px', color: '#1890ff'}} type="plus"  />  Water Fountain Maintenance and Care:    <a target="_blank" href="https://www.serenityhealth.com/fountain-maintenance-and-care/"><span><span>See More</span></span></a> </p>} key="8">
                  <p style={{ fontSize: 18, paddingLeft: 24, color: '#000000a6' }}>
                    Make your water fountain last with proper maintenance and upkeep. Submersible pumps are the heart and soul of any indoor or outdoor water fountain. It doesn’t matter what the fountains are made of, what size they are, or how much they cost,  water fountain pumps are what make them tick, or, more accurately, flow.
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
