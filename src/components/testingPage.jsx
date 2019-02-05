import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, Radio,  Table, Popover, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import { PDFExport } from '@progress/kendo-react-pdf';
import { fire } from '../fire';

import BootstrapTable from 'react-bootstrap-table-next';

import { TiArrowSortedDown, TiBrush, TiArrowSortedUp, TiPencil, TiTrash } from "react-icons/ti";

import domtoimage from 'dom-to-image';
import { ChromePicker } from 'react-color';
import fileDownload from "js-file-download";


import { ComposedChart, LineChart, LabelList, ResponsiveContainer, ReferenceArea, AreaChart, Brush, Area, Line, XAxis, YAxis, BarChart, Bar, CartesianGrid, Tooltip, Legend, Label} from 'recharts';

import { Row, Col, Tabs, message, Card, Drawer, Menu, Icon, Dropdown, Button, Layout, Carousel } from 'antd';

import Griddle from 'griddle-react';

const TabPane = Tabs.TabPane;

const styles = {
  topPad: {
    paddingTop: "20px"
  },
};









export default class testingPage extends Component {


    constructor(props) {
        super(props);
        this.state = {

          //checkbox status
          checkboxState: true,
          checkboxState1: true,
          checkboxStatenitrogen: true,
          checkboxStatephosphorus: true,
          checkboxStatetds: true,
          checkboxStatepH: true,
          checkboxStatetss: true,
          checkboxStatesalinity: true,
          checkboxStateconductivity: true,
          checkboxStatehardness: true,
          checkboxStateturbidity: true,
          checkboxStatedo: true,
          checkboxStatetemp: true,



          //data results
          sampleDate: '',


          //random id and key, key is for the tab number
          id: '',
          key: 1,
          idKey: '',
          page: '',
          area: '',
          displayColorPicker: false,

          //colors for graph lines
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
          samples: [],
          orders: [],
          orders2: [],
          dataList: [],
          filter: "",
          blobUrl: null,


          //these are for the graphs


          //for drawers
          visible: false,
          visible1: false,
          visible2: false,


          //Graph 1
          parameterGraph1: 'salinity',
          parameterGraph2: 'tds',
          parameterGraph3: 'tss',
          parameterGraph4: 'turbidity',
          graphType: 'Area',
          graphType2: 'Area',
          graphType3: 'Bar',
          graphType4: 'Bar',


          //barLine
          barLine: '',
          lineLine: '',
          graphingType1: '',
          graphingType2: '',
          graphingType3: '',
          graphingType4: '',




          //Inputs for Profile Page
          lakeName: '',
          locationCity: '',
          locationState: '',
          managementContact: '',
          hoaContact: '',
          managementContactNumber: '',
          hoaContactNumber: '',

          //testing
          test: '<Area',
          test1: '</Area>',

          Parameter_List: [],
          Parameter_List1: [],
          Parameter_Name: '',
          Parameter_Units: '',
          Parameter_Input: '',

          name: "",
      shareholders: [{ name: "" }],

          parameters: '',
          graphingData: [],
          graphingKeys: [],
          tableKeys: [],
          tableKeys1: [],
          tableData: [],
          graphInfo: '',



        }
        //these are triggered events.  handleChange is for text box changes
        //handlesubmit is for the form being submitted.
        //every event trigger needs to be bound like is below with .bind
        //we might now have to do this anymore with the newest version of react, but i have it to be safe.
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.writeData = this.writeData.bind(this);



      }

      //event triggered when text boxes of forms, values are changed
      handleChange(e) {
        const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
        this.setState({
          [e.target.name]: e.target.value
        });
        let filter = this.state.filter;
        let dataList = this.state.orders.filter(function (item) {
        return Object.values(item).map(function (value) {
        return String(value);
              }).find(function (value) {
                   return value.includes(filter);
        });

        });
        let newState = [];





      }
      //event triggered when form is submitted
      handleSubmit(e) {
        e.preventDefault();
        //fire.database().ref('samples') refers to the main title of the fire database.
        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
        const samplesRef = fire.database().ref(`parameterList1/${user.uid}`);




        const parameterInfo = {

          date: this.state.sampleDate,
          list: this.state.Parameter_List1.map((parameter) => {

                            return (
                            {
                            Parameter_Name: parameter.Parameter_Name,
                            Parameter_Units: parameter.Parameter_Units,
                            Parameter_Input: parameter.Parameter_Input,
                          }
                            )
                          })
        }

        console.log(parameterInfo);
        samplesRef.push(parameterInfo);








        //this.setState is used to clear the text boxes after the form has been submitted.
        this.setState({
          sampleDate: '',

          visible: false,
          visible1: false,
          visible2: false,

        });
      });
    }


     snapshotToArray(snapshot) {
        var returnArr = [];

        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            returnArr.push(item);
        });

        return returnArr;
    };





      componentDidMount() {
        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

          console.log(user.uid);
          this.setState({
            userID: user.uid,
          })



          const parameterListRef = fire.database().ref(`parameterList/${user.uid}`);
          parameterListRef.on('value', (snapshot) => {
            let parameterList = snapshot.val();
            console.log(parameterList);

            let newState = [];
          for (let order in parameterList) {
            newState.push({
              id: order,
              Parameter_Name: parameterList[order].Parameter_Name,
              Parameter_Units: parameterList[order].Parameter_Units,
              Parameter_Input: parameterList[order].Parameter_Input,

            });
            console.log(newState);
          }
          this.setState({
            Parameter_List: newState,
          })
          })

          const parameterList1Ref = fire.database().ref(`parameterSample/${user.uid}`);
          parameterList1Ref.on('value', (snapshot) => {
            let parameterList1 = snapshot.val();
            console.log(parameterList1);

            this.setState({
              graphingData: parameterList1,
            })

            let newState1 = [];
          for (let order in parameterList1) {
            newState1.push({
              id: order,
              date: parameterList1[order].Date,

            });

          }


          console.log(this.snapshotToArray(snapshot));

          let snapArray = this.snapshotToArray(snapshot);

          this.setState({
            graphInfo: this.snapshotToArray(snapshot),
          })
          console.log(this.state.graphInfo);




          snapArray.sort(function(a, b) {

            if (a.date === b.date) {
              return 0;
            }
            return a.date > b.date ? 1 : -1;
        });

          let snapDate = snapArray.date;
          console.log(snapDate);

          let snap = snapArray[0];

          delete snap.key;
          delete snap.date;

          let snapTable = snapArray[0];


          let snapTable1 = snapArray[0];

          let tableArray = this.snapshotToArray(snapshot);
          let table = tableArray[0];
          delete table.key;
          delete table.date;

          let tableKeys = Object.keys(tableArray[0]);

          console.log(tableKeys);



          console.log(Object.keys(snapTable));





          console.log(snap);


          let arrayKeys = Object.keys(snapArray[0]);

          this.setState({
            graphingKeys: arrayKeys,
            graphingData: snapArray,
            tableKeys: tableKeys,

          })

          console.log(this.state.tableKeys);
          console.log(this.state.graphingData);

          })
    })
  }



    fillStates(itemId) {
      let area = '';
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

      const sampleRef = fire.database().ref(`/parameterInformation/${user.uid}/${itemId}`);
      const sample1Ref = fire.database().ref(`/parameterList/${user.uid}/${itemId}`);

      sampleRef.on('value', (snapshot) => {

        this.setState({
          visible1: true,


        });

      let orders = snapshot.val();
      let id = fire.database().ref().child(`/monthlySamples/${user.uid}/${itemId}`).key;

      let newState = [];
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
      }
      this.setState({

        id: id,


        sampleDate: snapshot.child('sampleDate').val(),
        sampleTaker: snapshot.child('sampleTaker').val(),
        temp: snapshot.child('temp').val(),
        do: snapshot.child('do').val(),
        conductivity: snapshot.child('conductivity').val(),
        tds: snapshot.child('tds').val(),
        salinity: snapshot.child('salinity').val(),
        pH: snapshot.child('pH').val(),
        turbidity: snapshot.child('turbidity').val(),
        nitrogen: snapshot.child('nitrogen').val(),
        phosphorus: snapshot.child('phosphorus').val(),
        totalHardness: snapshot.child('totalHardness').val(),
        tss: snapshot.child('tss').val(),
        sampleNotes: snapshot.child('sampleNotes').val(),


      })


});

    });
  }


  writeStates = (itemId) => {

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/monthlySamples/${user.uid}/${this.state.id}`);


    sampleRef.child("id").set(this.state.id);


    sampleRef.child("sampleDate").set(this.state.sampleDate);
    sampleRef.child("sampleTaker").set(this.state.sampleTaker);
    sampleRef.child("temp").set(this.state.temp);
    sampleRef.child("do").set(this.state.do);
    sampleRef.child("conductivity").set(this.state.conductivity);
    sampleRef.child("tds").set(this.state.tds);
    sampleRef.child("salinity").set(this.state.salinity);
    sampleRef.child("pH").set(this.state.pH);
    sampleRef.child("turbidity").set(this.state.turbidity);
    sampleRef.child("nitrogen").set(this.state.nitrogen);
    sampleRef.child("phosphorus").set(this.state.phosphorus);
    sampleRef.child("totalHardness").set(this.state.totalHardness);
    sampleRef.child("tss").set(this.state.tss);
    sampleRef.child("sampleNotes").set(this.state.sampleNotes);



  });


  }



  fillEmpty = (itemId) => {
    let area = '';

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleRef = fire.database().ref(`/monthlySamples/${user.uid}/${itemId}`);


    sampleRef.on('value', (snapshot) => {

    let orders = snapshot.val();

    let newState = [];
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
    }
    this.setState({

      visible: true,
      sampleDate: '',
      sampleTaker: '',
      temp: '',
      do: '',
      conductivity: '',
      tds: '',
      salinity: '',
      pH: '',
      turbidity: '',
      nitrogen: '',
      phosphorus: '',
      totalHardness: '',
      tss: '',
      sampleNotes: '',


    })


});
  });
}





    handleSelect(key) {
  this.setState({key});
}


writeData (e) {
  e.preventDefault();
  //fire.database().ref('samples') refers to the main title of the fire database.
  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
  const samplesRef = fire.database().ref(`monthlySamples/${user.uid}`);


  const sample = {

    id: this.state.id,
    sampleDate: this.state.sampleDate,
    sampleTaker: this.state.sampleTaker,
    temp: this.state.temp,
    do: this.state.do,
    conductivity: this.state.conductivity,
    tds: this.state.tds,
    salinity: this.state.salinity,
    pH: this.state.pH,
    turbidity: this.state.turbidity,
    nitrogen: this.state.nitrogen,
    phosphorus: this.state.phosphorus,
    totalHardness: this.state.totalHardness,
    tss: this.state.tss,
    sampleNotes: this.state.sampleNotes,
  }

  samplesRef.child(this.state.id).set(sample);

  this.setState({
    visible1: false,
  })






  //this.setState is used to clear the text boxes after the form has been submitted.

});
}




exportPDF = () => {
  this.resume.save();
}

rawMarkup(){
  var rawMarkup = this.props.content
  return { __html: rawMarkup };
}





 nitrogenSort = (a, b, order) => {
   let dataList = this.state.dataList;   // order is desc or asc
  if (order === 'asc') {
    return a.nitrogen - b.nitrogen;
  } else {
    return b.nitrogen - a.nitrogen;
  }
}
phosphorusSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.phosphorus - b.phosphorus;
 } else {
   return b.phosphorus - a.phosphorus;
 }
}
tdsSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.tds - b.tds;
 } else {
   return b.tds - a.tds;
 }
}
tssSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.tss - b.tss;
 } else {
   return b.tss - a.tss;
 }
}
salinitySort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.salinity - b.salinity;
 } else {
   return b.salinity - a.salinity;
 }
}
turbiditySort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.turbidity - b.turbidity;
 } else {
   return b.turbidity - a.turbidity;
 }
}
pHSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.pH - b.pH;
 } else {
   return b.pH - a.pH;
 }
}
hardnessSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.totalHardness - b.totalHardness;
 } else {
   return b.totalHardness - a.totalHardness;
 }
}
tempSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.temp - b.temp;
 } else {
   return b.temp - a.temp;
 }
}
doSort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.do - b.do;
 } else {
   return b.do - a.do;
 }
}
conductivitySort = (a, b, order) => {
  let dataList = this.state.dataList;   // order is desc or asc
 if (order === 'asc') {
   return a.conductivity - b.conductivity;
 } else {
   return b.conductivity - a.conductivity;
 }
}



editRow(row, isSelected, e, id) {

  return (
      <div style={{textAlign: 'center'}}>
    <Icon type="edit" style={{fontSize: '24px'}}
    onClick={() => this.fillStates(`${isSelected.id}`)}>
      Click me
    </Icon>
    </div>
  )
}












  onSubmit(event) {
    event.preventDefault();
  }




handleClick = () => {
  this.setState({ displayColorPicker: !this.state.displayColorPicker })
};

handleClose = () => {
  this.setState({ displayColorPicker: false })
};

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

test = () => {
  console.log("test")
}


showDrawer = () => {
  this.setState({
    visible: true,
  });
};
onClose = () => {
  this.setState({
    visible: false,
    visible1: false,
    visible2: false,
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




fillParameterInfo = (e) => {
  e.preventDefault();
  //fire.database().ref('samples') refers to the main title of the fire database.
  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
  const parameterListRef = fire.database().ref(`parameterList/${user.uid}`);

  const parameterInfo = {
    Parameter_Name: this.state.Parameter_Name,
    Parameter_Units: this.state.Parameter_Units,
    Parameter_Input: this.state.Parameter_Input,
  }

  parameterListRef.push(parameterInfo);
  //this.setState is used to clear the text boxes after the form has been submitted.
  this.setState({
    Parameter_Name: '',
    Parameter_Units: '',
  });

});
}

handleSampleChange = idx => evt => {
  const newParameters = this.state.Parameter_List.map((parameter, sidx) => {
    if (idx !== sidx) return parameter;
    return { ...parameter, Parameter_Input: evt.target.value };
  });
  this.setState({ Parameter_List: newParameters });
  console.log(this.state.Parameter_List);


  };

  sampleSubmit = (e) => {
    e.preventDefault();
    //fire.database().ref('samples') refers to the main title of the fire database.
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const parameterListRef = fire.database().ref(`parameterSample/${user.uid}`);

    const date = {date: this.state.sampleDate};
    const parameterInfo = {

      list: this.state.Parameter_List.map((parameter) => {

                        return (
                        {
                        Parameter_Name: parameter.Parameter_Name,
                        Parameter_Units: parameter.Parameter_Units,
                        Parameter_Input: parameter.Parameter_Input,
                      }
                        )
                      })

    }
    console.log(parameterInfo.list);

  let kvArray = parameterInfo.list;

  let array = kvArray.map(parameter => {
    var rObj = {};
    rObj[parameter.Parameter_Name] = parameter.Parameter_Input;
    return rObj;


  })

  let newArray = array.unshift(date);




console.log(array);
this.setState({
  parameters: array,
})
console.log(this.state.parameters);




var arr = this.state.Parameter_List;
var object = arr.reduce(
    (obj, item) => Object.assign(obj, {date: this.state.sampleDate, id: item.id, [item.Parameter_Name]: item.Parameter_Input}) ,{});

console.log(object);



parameterListRef.push(object);



    //this.setState is used to clear the text boxes after the form has been submitted.
    this.setState({
      Parameter_Name: '',
      Parameter_Units: '',
      Parameter_Input: '',
      visible: false,
      visible1: false,
      visible2: false,

    });

  });
  }


   removesample(itemId) {

    const sampleRef = fire.database().ref(`/parameterSample/${this.state.userID}/${itemId}`);

    sampleRef.remove();


  }

   deleteRow(row, isSelected, e, id, key) {

    return (
      <div style={{textAlign: 'center'}}>
      <Icon type="delete" style={{fontSize: '24px'}}
      onClick={() => this.removesample(isSelected.key)}>
        Click me
      </Icon>
      </div>
    )
  }










      render() {







        function handleButtonClick(e) {

          console.log('click left button', e);
        }

        function handleMenuClick(e) {

          console.log('click', e);
        }






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
          <Button size="large" type="primary" onClick={() => this.fillEmpty()}>+ Add Sample</Button>
            <Drawer
              title= "Fill in Sample Form"
              placement={this.state.placement}
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
              width={500}
            >
            <form>
              <Row style={{textAlign: 'right'}}>
              <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Sample</Icon>
              </Row>
              <Row>
            <FormGroup>
            <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Sample Date</b></Col>
            <Col xs={24} sm={18} md={18} lg={18} xl={18}>
            <FormControl name='sampleDate' type='date' placeholder="Normal text" value={this.state.sampleDate}
            onChange={this.handleChange} /></Col>
            </FormGroup>
            </Row>
            {this.state.Parameter_List.map((parameter, idx) => {

                          return (
                            <Row>
                      <FormGroup>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>{parameter.Parameter_Name}</b></Col>
                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                        <FormControl name={parameter.Parameter_Name}
                          onChange={this.handleSampleChange(idx)}  type="number" placeholder="Normal text" value={parameter.Parameter_Input} /></Col>
                      </FormGroup>
                      </Row>
                    )})};





            <Row style={{paddingTop: '10px', textAlign: 'right'}}>
            <Button type="primary" onClick={this.sampleSubmit} bsStyle="primary">Add sample</Button>
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



                <Row >
                <Col xs={24} sm={24} md={24} lg={24} xl={24} >

                  <form>
                <Row style={{paddingTop: '10px'}}>
                <FormGroup>
                  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Parameter Name</b></Col>
                  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                  <FormControl name="Parameter_Name" onChange={this.handleChange} type="text" placeholder="Name" style={{ width: 350}} value={this.state.Parameter_Name} /></Col>
                </FormGroup>
                </Row>
                <Row style={{paddingTop: '10px'}}>
                  <FormGroup>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Parameter Units</b></Col>
                    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                    <FormControl name="Parameter_Units" onChange={this.handleChange} type="text" placeholder="Units"  style={{ width: 350}} value={this.state.Parameter_Units} /></Col>
                  </FormGroup>
                  </Row>

                  <Row style={{paddingTop: '10px', textAlign: 'left'}}>
                  <Button type="primary" onClick={this.fillParameterInfo} bsStyle="primary">Add Parameter</Button>
                  </Row>
                </form>


            </Col>
            </Row>
            <Row>
            <Col span={24}>
            <hr></hr>
            </Col>
            </Row>


            <Row>
              <Row >
              <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                <ResponsiveContainer width="100%" aspect={8/3.0} minHeight={200}>
                  <ComposedChart data={this.state.graphingData}
            syncId="anyId">

            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />


              {this.state.graphingKeys.map(txt => {
                return (
                  <Line type="monotone" dataKey={txt}  fillOpacity={1} stroke="#0000FF" fill="url(#colorNitrogen)"><LabelList dataKey={txt} position="top" /></Line>
                )
              })}







            <Legend />

          </ComposedChart>
           </ResponsiveContainer>

          </Col>
          </Row>



      </Row>



<Griddle data={this.state.graphInfo} />
<BootstrapTable
  keyField='date'
  data={ this.state.graphInfo }
  columns={ [
    {
    dataField: 'date',
    text: 'Product ID'
  },
  {
  dataField: 'key',
  text: 'Product ID'
  },
  {
    dataField: 'Nitrogen',
    text: 'Product Name'
  },
  {
    dataField: 'Phosphorus',
    text: 'Product Price'
  },
  {dataField: 'delete',
   text: 'Delete',
   formatter: this.deleteRow.bind(this),

  }] }
  />








            </Col>
          </Row>

              </TabPane>
              <TabPane tab="DATA TABLE" key="2">
                <Row>
                <Col span={24} style={{paddingTop: '15px'}}>

                    <p style={{lineHeight: '2px'}}><b>DATA TABLE</b></p>

                    <hr></hr>
              </Col>
            </Row>

                <Row>
                <Col span={24}>


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
