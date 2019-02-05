import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, Radio,  Table, Popover, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import { PDFExport } from '@progress/kendo-react-pdf';
import { fire } from '../fire';

import {BootstrapTable, BootstrapButton, TableHeaderColumn, ExportCSVButton} from 'react-bootstrap-table';
import { TiArrowSortedDown, TiBrush, TiArrowSortedUp, TiPencil, TiTrash } from "react-icons/ti";

import domtoimage from 'dom-to-image';
import { ChromePicker } from 'react-color';
import fileDownload from "js-file-download";


import { ComposedChart, LineChart, LabelList, ResponsiveContainer, ReferenceArea, AreaChart, Brush, Area, Line, XAxis, YAxis, BarChart, Bar, CartesianGrid, Tooltip, Legend, Label} from 'recharts';

import { Row, Col, Input, Tabs, message, Card, Drawer, Menu, Icon, Dropdown, Button, Layout, Carousel } from 'antd';


const TabPane = Tabs.TabPane;

const styles = {
  topPad: {
    paddingTop: "20px"
  },
};





export default class monthlySamples extends Component {




    constructor(props) {
        super(props);
        this.state = {

          checkboxStatenitrogen: true,
          checkboxStatephosphorus: true,

          nitrogen: '',
          phosphorus: '',

          //random id and key, key is for the tab number
          id: '',

          idKey: '',
          page: '',
          area: '',
          displayColorPicker: false,

          nitrogenColor: '#086788',

          phosphorusColor: '#F0C808',
          tempColor: '#4C5B5C',
          doColor: '#6C698D',
          conductivityColor: '#DD1C1A',
          tdsColor: '#086788',
          salinityColor: '#F0C808',
          pHColor: '#4C5B5C',
          turbidityColor: '#6C698D',
          nitrogenColor: '#086788',
          phosphorusColor: '#F0C808',
          totalHardnessColor: '#DD1C1A',
          tssColor: '#086788',
          sampleNotesColor: '#',

          //this is the object array for the table
          orders: [],
          orders2: [],
          dataList: [],


          nitrogenPlot: 'nitrogen',
          phosphorusPlot: 'phosphorus',


          //for drawers
          visible: false,
          visible1: false,
          visible2: false,


          //Graph 1
          parameterGraph1: 'nitrogen',
          parameterGraph2: 'phosphorus',

          graphType: 'Area',
          graphType1: 'Area',
          graphType3: 'Bar',
          graphType4: 'Bar',


          //barLine
          barLine: '',
          lineLine: '',
          graphingType1: '',
          graphingType2: '',
          graphingType3: '',
          graphingType4: '',

          chartType: Area,
          parameterType: 'nitrogen',
          color: '#086788',

          chartType1: Area,
          parameterType1: 'phosphorus',
          color1: '#F0C808',


          title: '',
          key: '',








        }

      }

      componentDidMount() {
        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
          this.setState({
            graphingType1: <Area strokeWidth={3} barSize={15} type="monotone" dataKey="salinity" stroke={this.state.salinityColor} fillOpacity={1} fill="url(#colorSalinity)" ><LabelList style={{fontSize:'11px'}} dataKey="salinity" position="top" /></Area>,

            graphingType2: <Area strokeWidth={3} barSize={15} type="monotone" dataKey="tds" stroke={this.state.tdsColor} fillOpacity={1} fill="url(#colorTDS)" ><LabelList style={{fontSize:'11px'}} dataKey="tds" position="top" /></Area>,

            graphingType3: <Bar strokeWidth={3} barSize={15} type="monotone" dataKey="tss" stroke={this.state.tssColor} fillOpacity={1} fill="url(#colorTSS)" ><LabelList style={{fontSize:'11px'}} dataKey="tss" position="top" /></Bar>,

            graphingType4: <Bar strokeWidth={3} barSize={15} type="monotone" dataKey="turbidity" stroke={this.state.turbidityColor} fillOpacity={1} fill="url(#colorTurbidity)" ><LabelList style={{fontSize:'11px'}} dataKey="turbidity" position="top" /></Bar>,

          })
          const samplesRef = fire.database().ref(`monthlySamples/${user.uid}`);
          samplesRef.on('value', (snapshot) => {


            let dataList = snapshot.val();
            let filter = [];
            let orders = snapshot.val();
            let orders2 = snapshot.val();

            let newState = [];
            let newState2 = [];
            let newState3 = [];

          for (let order in orders) {
            newState.push({
              id: order,
              sampleDate: orders[order].sampleDate,
              sampleTaker: orders[order].sampleTaker,
              temp: orders[order].temp,
              do: orders[order].do,
              conductivity: orders[order].conductivity,
              tds: orders[order].tds,
              salinity: orders[order].salinity,
              pH: orders[order].pH,
              turbidity: orders[order].turbidity,
              nitrogen: orders[order].nitrogen,
              phosphorus: orders[order].phosphorus,
              totalHardness: orders[order].totalHardness,
              tss: orders[order].tss,
              sampleNotes: orders[order].sampleNotes,
            });
            newState2.push({
              id: order,
              sampleDate: orders[order].sampleDate,
              sampleTaker: orders[order].sampleTaker,
              temp: orders[order].temp,
              do: orders[order].do,
              conductivity: orders[order].conductivity,
              tds: orders[order].tds,
              salinity: orders[order].salinity,
              pH: orders[order].pH,
              turbidity: orders[order].turbidity,
              nitrogen: orders[order].nitrogen,
              phosphorus: orders[order].phosphorus,
              totalHardness: orders[order].totalHardness,
              tss: orders[order].tss,
              sampleNotes: orders[order].sampleNotes,
            });




          }

          newState2.sort(function(a, b) {

            if (a.sampleDate === b.sampleDate) {
              return 0;
            }
            return a.sampleDate > b.sampleDate ? 1 : -1;
        });
        newState.sort(function(a, b) {

          if (b.sampleDate === a.sampleDate) {
            return 0;
          }
          return b.sampleDate > a.sampleDate ? 1 : -1;
      });



          this.setState({
            orders: newState,
            orders2: newState2,
            dataList: newState,
            color: this.state.color,

          });

        });

        const profileRef = fire.database().ref(`profileInformation/${user.uid}`);
        profileRef.on('value', (snapshot) => {


        this.setState({
          lakeName: snapshot.child('lakeName').val(),
          locationCity: snapshot.child('locationCity').val(),
          locationState: snapshot.child('locationState').val(),
          managementContact: snapshot.child('managementContact').val(),
          hoaContact: snapshot.child('hoaContact').val(),
          managementContactNumber: snapshot.child('managementContactNumber').val(),
          hoaContactNumber: snapshot.child('hoaContactNumber').val(),

        });


      });
        const colorsRef = fire.database().ref(`colors/${user.uid}`);

        colorsRef.on('value', (snapshot) => {
          let colorList = snapshot.val();
          console.log(colorList);

          this.setState({
            tempColor: snapshot.child('tempColor').val(),

          });


        });

      });
      console.log(this.state.color);



    }














exportPDF = () => {
  this.resume.save();
}

rawMarkup(){
  var rawMarkup = this.props.content
  return { __html: rawMarkup };
}


toggleNitrogen(event) {
    this.setState({
      checkboxState: !this.state.checkboxState
    });
    const checkboxState = this.state.checkboxState;
    if (checkboxState) {
      this.setState({
        nitrogenPlot: '',
      })
    } else {
      this.setState({
        nitrogenPlot: 'nitrogen',
      })
    }
  }
  togglePhosphorus(event) {
      this.setState({
        checkboxStatephosphorus: !this.state.checkboxStatephosphorus
      });
      const checkboxState = this.state.checkboxStatephosphorus;
      if (checkboxState) {
        this.setState({
          phosphorusPlot: '',
        })
      } else {
        this.setState({
          phosphorusPlot: 'phosphorus',
        })
      }
    }





tempColorChange = (color) => {

    console.log(this.state.color);
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const samplesRef = fire.database().ref(`colors/${user.uid}`);
    const orderID = fire.database().ref(`/colors/${user.uid}/${orderID}`);
    const sample = {
      tempColor: color.hex
    }
    samplesRef.set(sample);
    this.setState({
      tempColor: color.hex,
     });
    });
}




graph1Line = () => {
  this.setState({
    graphType: 'Line',
    graphingType1: <Line strokeWidth={3} barSize={15} type="monotone" dataKey={this.state.parameterGraph1} stroke={this.state.nitrogenColor} fillOpacity={1} fill="url(#colorSalinity)" ><LabelList style={{fontSize:'11px'}} dataKey={this.state.parameterGraph1} position="top" /></Line>,
  });
};

graph1Area = () => {
  this.setState({
    graphType: 'Area',
    graphingType1: <Area strokeWidth={3} barSize={15} type="monotone" dataKey={this.state.parameterGraph1} stroke={this.state.nitrogenColor} fillOpacity={1} fill="url(#colorSalinity)" ><LabelList style={{fontSize:'11px'}} dataKey={this.state.parameterGraph1} position="top" /></Area>,
  });
};

graph1Bar = () => {
  this.setState({
    graphType: 'Bar',
    graphingType1: <Bar strokeWidth={3} barSize={15} type="monotone" dataKey={this.state.parameterGraph1} stroke={this.state.nitrogenColor} fillOpacity={1} fill="url(#colorSalinity)" ><LabelList style={{fontSize:'11px'}} dataKey={this.state.parameterGraph1} position="top" /></Bar>,
  });
};

graph2Line = () => {
  this.setState({
    graphType2: 'Line',
    graphingType2: <Line strokeWidth={3} barSize={15} type="monotone" dataKey="tds" stroke={this.state.tdsColor} fillOpacity={1} fill="url(#colorTDS)" ><LabelList style={{fontSize:'11px'}} dataKey={this.state.parameterGraph2} position="top" /></Line>,
  });
};

graph2Area = () => {
  this.setState({
    graphType2: 'Area',
    graphingType2: <Area strokeWidth={3} barSize={15} type="monotone" dataKey="tds" stroke={this.state.tdsColor} fillOpacity={1} fill="url(#colorTDS)" ><LabelList style={{fontSize:'11px'}} dataKey={this.state.parameterGraph2} position="top" /></Area>,
  });
};

graph2Bar = () => {
  this.setState({
    graphType2: 'Bar',
    graphingType2: <Bar strokeWidth={3} barSize={15} type="monotone" dataKey="tds" stroke={this.state.tdsColor} fillOpacity={1} fill="url(#colorTDS)" ><LabelList style={{fontSize:'11px'}} dataKey={this.state.parameterGraph2} position="top" /></Bar>,
  });
};

graphType = () => {
  this.setState({
    graphType2: 'Bar',
    graphingType2: <Bar strokeWidth={3} barSize={15} type="monotone" dataKey="tds" stroke={this.state.tdsColor} fillOpacity={1} fill="url(#colorTDS)" ><LabelList style={{fontSize:'11px'}} dataKey={this.state.parameterGraph2} position="top" /></Bar>,
  });
};






editChart = (itemId) => {
  let area = '';

  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
  const sampleRef = fire.database().ref(`/monthlySamples/${user.uid}/${itemId}`);
  sampleRef.on('value', (snapshot) => {
  let orders = snapshot.val();
  let newState = [];
  this.setState({
    visible2: true,
  })

});
});
}



 changeHTMLTag = () => {
    var elem = document.getElementById('preview');
    var edited_area = document.getElementById('text-input');
    var parent = elem.parentNode;
    var newNode = document.createElement("p");
    newNode.rows = 25
    newNode.cols = 25
    newNode.readOnly = true
    newNode.value = edited_area.value
    parent.replaceChild(newNode,elem);
}



titleSelect = ({ key }) => {
  if (key === '1') {
    console.log('something 1')
    this.setState({
      graphType: 'Line',
      chartType: Line,
    })
  }
  if (key === '2') {
    console.log('something 2')
    this.setState({
      graphType: 'Area',
      chartType: Area,
    })
  }
  if (key === '3') {
    console.log('something 3')
    this.setState({
      graphType: 'Bar',
      chartType: Bar,
    })
  }
}

parameterSelect = ({ key }) => {
  if (key === '1') {
    console.log('something 1')
    this.setState({
      parameterType: 'nitrogen',
      color: this.state.nitrogenColor,
    })
  }
  if (key === '2') {
    console.log('something 1')
    this.setState({
      parameterType: 'phosphorus',
      color: this.state.phosphorusColor,
    })
  }
  if (key === '3') {
    console.log('something 1')
    this.setState({
      parameterType: 'do',
      color: this.state.doColor,
    })
  }
  if (key === '4') {
    console.log('something 1')
    this.setState({
      parameterType: 'turbidity',
      color: this.state.turbidityColor,
    })
  }
  if (key === '5') {
    console.log('something 1')
    this.setState({
      parameterType: 'tss',
      color: this.state.tssColor,
    })
  }
  if (key === '6') {
    console.log('something 1')
    this.setState({
      parameterType: 'tds',
      color: this.state.tdsColor,
    })
  }
  if (key === '7') {
    console.log('something 1')
    this.setState({
      parameterType: 'salinity',
      color: this.state.salinityColor,
    })
  }
  if (key === '8') {
    console.log('something 1')
    this.setState({
      parameterType: 'pH',
      color: this.state.pHColor,
    })
  }
  if (key === '9') {
    console.log('something 1')
    this.setState({
      parameterType: 'temp',
      color: this.state.tempColor,
    })
  }
  if (key === '10') {
    console.log('something 1')
    this.setState({
      parameterType: 'conductivity',
      color: this.state.conductivityColor,
    })
  }
  if (key === '11') {
    console.log('something 1')
    this.setState({
      parameterType: 'totalHardness',
      color: this.state.totalHardnessColor,
    })
  }
}
titleSelect1 = ({ key }) => {
  if (key === '1') {
    console.log('something 1')
    this.setState({
      graphType1: 'Line',
      chartType1: Line,
    })
  }
  if (key === '2') {
    console.log('something 2')
    this.setState({
      graphType1: 'Area',
      chartType1: Area,
    })
  }
  if (key === '3') {
    console.log('something 3')
    this.setState({
      graphType1: 'Bar',
      chartType1: Bar,
    })
  }
}

parameterSelect1 = ({ key }) => {
  if (key === '1') {
    console.log('something once')
    this.setState({
      parameterType1: 'nitrogen',
      color1: this.state.nitrogencolor,
    })
  }
  if (key === '2') {
    console.log('something 1')
    this.setState({
      parameterType1: 'phosphorus',
      color1: this.state.phosphoruscolor,
    })
  }
  if (key === '3') {
    console.log('something 1')
    this.setState({
      parameterType1: 'do',
      color1: this.state.docolor,
    })
  }
  if (key === '4') {
    console.log('something 1')
    this.setState({
      parameterType1: 'turbidity',
      color1: this.state.turbiditycolor,
    })
  }
  if (key === '5') {
    console.log('something 1')
    this.setState({
      parameterType1: 'tss',
      color1: this.state.tsscolor,
    })
  }
  if (key === '6') {
    console.log('something 1')
    this.setState({
      parameterType1: 'tds',
      color1: this.state.tdscolor,
    })
  }
  if (key === '7') {
    console.log('something 1')
    this.setState({
      parameterType1: 'salinity',
      color1: this.state.salinitycolor,
    })
  }
  if (key === '8') {
    console.log('something 1')
    this.setState({
      parameterType1: 'pH',
      color1: this.state.pHcolor,
    })
  }
  if (key === '9') {
    console.log('something 1')
    this.setState({
      parameterType1: 'temp',
      color1: this.state.tempcolor,
    })
  }
  if (key === '10') {
    console.log('something 1')
    this.setState({
      parameterType1: 'conductivity',
      color1: this.state.conductivitycolor,
    })
  }
  if (key === '11') {
    console.log('something 1')
    this.setState({
      parameterType1: 'totalHardness',
      color1: this.state.totalHardnesscolor,
    })
  }
}















      render() {

        const CustomTag = this.state.chartType;
        const menu = (
          <Dropdown overlay={
          <Menu onClick={this.parameterSelect}>
            <Menu.Item key="1" >Nitrogen</Menu.Item>
            <Menu.Item key="2" >Phosphorus</Menu.Item>
            <Menu.Item key="3">DO</Menu.Item>
            <Menu.Item key="4">Turbidity</Menu.Item>
            <Menu.Item key="5">TSS</Menu.Item>
            <Menu.Item key="6">TDS</Menu.Item>
            <Menu.Item key="7">Salinity</Menu.Item>
            <Menu.Item key="8">pH</Menu.Item>
            <Menu.Item key="9">Temp</Menu.Item>
            <Menu.Item key="10">Conductivity</Menu.Item>
            <Menu.Item key="11">Hardness</Menu.Item>
          </Menu>
            }>
            <Button style={{ marginLeft: 8 }}>
              <p>{this.state.parameterType.toUpperCase()}</p>
              <Icon type="down" />
            </Button>
          </Dropdown>
        );
        const chart = (
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Row>
        <Col xs={24} sm={24} md={16} lg={16} xl={18} style={{paddingTop: '15px'}}>
        <p style={{lineHeight: '2px', paddingLeft: '55px', fontSize: '32px'}}><b>{this.state.parameterType.toUpperCase()}</b>
      </p>
      </Col>
      <Col xs={24} sm={24} md={24} lg={4} xl={4} style={{paddingTop: '0px'}}>
        <div>
    <Dropdown overlay={<Menu onClick={this.titleSelect}>
      <Menu.Item key="1" title="line" >Line Graph</Menu.Item>
      <Menu.Item key="2" title="Area" >Area Graph</Menu.Item>
      <Menu.Item key="3" title="Bar" >Bar Graph</Menu.Item>
    </Menu>
      }>
      <Button style={{ marginLeft: 8 }}>
        {this.state.graphType}
        <Icon type="down" />
      </Button>
    </Dropdown>
    </div>
      </Col>
      <Col xs={24} sm={24} md={24} lg={4} xl={4} style={{paddingTop: '0px'}}>
        <div>
    {menu}
    </div>
      </Col>
    </Row>
        <Row>
        <Col span={24}>
          <ResponsiveContainer width="100%" aspect={5/3.0} minHeight={200}>
            <ComposedChart data={this.state.orders2} syncId="anyId" >
              <defs>
                <linearGradient id="colorID" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={this.state.color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={this.state.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
      <XAxis dataKey="sampleDate" />
      <YAxis />
      <Tooltip />
      <CustomTag strokeWidth={3} barSize={15} type="monotone" dataKey={this.state.parameterType} stroke={this.state.color} fillOpacity={1} fill="url(#colorID)" ><LabelList style={{fontSize:'11px'}} dataKey={this.state.parameterType} position="top" /></CustomTag>
      <Legend />
    </ComposedChart>
     </ResponsiveContainer>
    </Col>
    </Row>
    </Col>

    );

    const CustomTag1 = this.state.chartType1;
    const menu1 = (
      <Dropdown overlay={
      <Menu onClick={this.parameterSelect1}>
        <Menu.Item key="1" >Nitrogen</Menu.Item>
        <Menu.Item key="2" >Phosphorus</Menu.Item>
        <Menu.Item key="3">DO</Menu.Item>
        <Menu.Item key="4">Turbidity</Menu.Item>
        <Menu.Item key="5">TSS</Menu.Item>
        <Menu.Item key="6">TDS</Menu.Item>
        <Menu.Item key="7">Salinity</Menu.Item>
        <Menu.Item key="8">pH</Menu.Item>
        <Menu.Item key="9">Temp</Menu.Item>
        <Menu.Item key="10">Conductivity</Menu.Item>
        <Menu.Item key="11">Hardness</Menu.Item>
      </Menu>
        }>
        <Button style={{ marginLeft: 8 }}>
          <p>{this.state.parametertype1}</p>
          <Icon type="down" />
        </Button>
      </Dropdown>
    );
    const chart1 = (
      <Col xs={24} sm={12} md={12} lg={12} xl={12}>
        <Row>
    <Col xs={24} sm={24} md={16} lg={16} xl={18} style={{paddingTop: '15px'}}>
    <p style={{lineHeight: '2px', paddingLeft: '55px', fontSize: '32px'}}><b>{this.state.parametertype1}</b>
    </p>
    </Col>
    <Col xs={24} sm={24} md={24} lg={4} xl={4} style={{paddingTop: '0px'}}>
    <div>
    <Dropdown overlay={<Menu onClick={this.titleSelect1}>
    <Menu.Item key="1" title="line" >Line Graph</Menu.Item>
    <Menu.Item key="2" title="Area" >Area Graph</Menu.Item>
    <Menu.Item key="3" title="Bar" >Bar Graph</Menu.Item>
    </Menu>
    }>
    <Button style={{ marginLeft: 8 }}>
    {this.state.graphType}
    <Icon type="down" />
    </Button>
    </Dropdown>
    </div>
    </Col>
    <Col xs={24} sm={24} md={24} lg={4} xl={4} style={{paddingTop: '0px'}}>
    <div>
    {menu}
    </div>
    </Col>
    </Row>
    <Row>
    <Col span={24}>
      <ResponsiveContainer width="100%" aspect={5/3.0} minHeight={200}>
        <ComposedChart data={this.state.orders2} syncId="anyId" >
          <defs>
            <linearGradient id="color1ID" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopcolor1={this.state.color1} stopOpacity={0.8}/>
              <stop offset="95%" stopcolor1={this.state.color1} stopOpacity={0}/>
            </linearGradient>
          </defs>
    <XAxis dataKey="sampleDate" />
    <YAxis />
    <Tooltip />
    <CustomTag1 strokeWidth={3} barSize={15} type="monotone" dataKey={this.state.parametertype1} stroke={this.state.color1} fillOpacity={1} fill="url(#color1ID)" ><LabelList style={{fontSize:'11px'}} dataKey={this.state.parametertype1} position="top" /></CustomTag1>
    <Legend />
    </ComposedChart>
    </ResponsiveContainer>
    </Col>
    </Row>
    </Col>

    );


        const CustomTag2 = this.state.chartType2;
        const CustomTag3 = this.state.chartType3;


        function handleButtonClick(e) {

          console.log('click left button', e);
        }

        function handleMenuClick(e) {

          console.log('click', e);
        }







   const nitrogenCheckbox = (
     <span>
       <input
       type="checkbox"
       defaultChecked='true'
       onClick={this.toggleNitrogen.bind(this)}
       />
     <label>Nitrogen</label>
     </span>
   );
   const phosphorusCheckbox = (
     <span><input type="checkbox" defaultChecked='true' onClick={this.togglePhosphorus.bind(this)}/>
     <label>Phosphorus</label>
     </span>
   );

   const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }







        return (
    <Layout>



      <div style={{ background: '#F0F0F0', padding: '5px' }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <div style={{position: 'relative'}}>
      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
        <h1><b>Monthly Samples</b></h1>
        <h3><b>{this.state.lakeName}</b></h3>
      </Col>
      <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{ textAlign: 'right'}}>



      <Drawer
        title= "Edit Chart"
        placement={this.state.placement}
        closable={false}
        onClose={this.onClose}
        visible={this.state.visible2}
        width={500}
      >
        <form>
          <Row style={{textAlign: 'right'}}>
          <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Sample</Icon>
          </Row>



  <Row style={{paddingTop: '10px'}}>
  <FormGroup>
    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Phosphorus</b></Col>
    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
    {phosphorusCheckbox}
  </Col>
  </FormGroup>
  </Row>
  <Row style={{paddingTop: '10px'}}>
  <FormGroup>
    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Nitrogen</b></Col>
    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
    {nitrogenCheckbox}
  </Col>
  </FormGroup>
  </Row>


  </form>
      </Drawer>
      </Col>

    </div>
      </Row>

      </div>

      <div style={{ background: '#F0F0F0', paddingTop: '15px', paddingRight: '5px', paddingLeft: '5px' }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>


            <Card


            >
            <Tabs defaultActiveKey="1" >
        <TabPane tab="GRAPHS" key="1">
          <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Row>

          <Col xs={24} sm={24} md={18} lg={18} xl={18} style={{paddingTop: '20px'}}>

              <p style={{lineHeight: '0px', paddingLeft: '55px', fontSize: '32px'}}><b>WATER QUALITY</b></p>


        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{paddingTop: '10px'}}>

            <Button  type="default" onClick={() => this.editChart()}>+ Edit Chart</Button>


      </Col>
      </Row>
      <Row>

      <Col xs={24} sm={24} md={18} lg={18} xl={18} style={{paddingTop: '20px'}}>




  </Col>
  </Row>

          <Row >
          <Col xs={24} sm={24} md={24} lg={24} xl={24} >
            <ResponsiveContainer width="100%" aspect={8/3.0} minHeight={200}>
              <AreaChart data={this.state.orders2}
        syncId="anyId">
        <defs>
          <linearGradient id="colorNitrogen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={this.state.nitrogenColor} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={this.state.nitrogenColor} stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPhosphorus" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={this.state.phosphorusColor} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={this.state.phosphorusColor} stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorDO" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={this.state.doColor} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={this.state.doColor} stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorTDS" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={this.state.tdsColor} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={this.state.tdsColor}  stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorSalinity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={this.state.salinityColor}  stopOpacity={0.8}/>
            <stop offset="95%" stopColor={this.state.salinityColor}  stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorTurbidity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={this.state.turbidityColor}  stopOpacity={0.8}/>
            <stop offset="95%" stopColor={this.state.turbidityColor}stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorHardness" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={this.state.totalHardnessColor} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={this.state.totalHardnessColor} stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorpH" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={this.state.pHColor} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={this.state.pHColor} stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={this.state.tempColor} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={this.state.tempColor} stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorConductivity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={this.state.conductivityColor} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={this.state.conductivityColor} stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorTSS" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={this.state.tssColor} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={this.state.tssColor} stopOpacity={0}/>
          </linearGradient>

        </defs>
        <XAxis dataKey="sampleDate" />
        <YAxis domain={[0, 'dataMax + 4']}/>
        <Tooltip />

        <Area type="monotone" dataKey={this.state.nitrogenPlot} stroke={this.state.nitrogenColor} fillOpacity={1} fill="url(#colorNitrogen)"><LabelList dataKey={this.state.nitrogenPlot} position="top" /></Area>

        <Area type="monotone" dataKey={this.state.phosphorusPlot} stroke={this.state.phosphorusColor} fillOpacity={1} fill="url(#colorPhosphorus)"><LabelList dataKey={this.state.phosphorusPlot} position="top" /></Area>

        <Legend />
        <Brush></Brush>
      </AreaChart>
       </ResponsiveContainer>

      </Col>
      </Row>
      <Row>
      <Col span={24}>
      <hr></hr>
      </Col>
      </Row>



      <Row>

        {chart}
        {chart1}



  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
    <Row>
<Col xs={24} sm={24} md={18} lg={18} xl={18} style={{paddingTop: '15px'}}>


<p style={{lineHeight: '2px', paddingLeft: '55px', fontSize: '32px'}}><b>PHOSPHORUS</b>
</p>

</Col>
<Col xs={24} sm={24} md={6} lg={6} xl={6} style={{paddingTop: '0px'}}>
<div>


<Button style={{ marginLeft: 8 }}>{this.state.graphType2} <Icon type="down" />
</Button>

</div>


</Col>
</Row>


<Row>
<Col span={24}>
  <ResponsiveContainer width="100%" aspect={5/3.0} minHeight={200}>
    <ComposedChart data={this.state.orders2}

syncId="anyId"
>
<defs>


</defs>
<XAxis dataKey="sampleDate" />
<YAxis />
<Tooltip />


{this.state.graphingType2}
<Legend />
</ComposedChart>
</ResponsiveContainer>

</Col>
</Row>
</Col>
</Row>



      </Col>
    </Row>

        </TabPane>


      </Tabs>

            </Card>
      </Col>
      </Row>
      </div>





    </Layout>
      )
    }
  }
