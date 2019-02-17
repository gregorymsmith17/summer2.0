import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, Radio,  Table, Popover, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import { PDFExport } from '@progress/kendo-react-pdf';
import { fire } from '../fire';

import BootstrapTable from 'react-bootstrap-table-next';

import { TiArrowSortedDown, TiBrush, TiArrowSortedUp, TiPencil, TiTrash } from "react-icons/ti";

import domtoimage from 'dom-to-image';
import { SketchPicker } from 'react-color';
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
          graphInfoReverse: '',
          graphKeys: [],
          table1Keys: '',
          tableData: {},
          columnData: [{}
                            ],



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





      componentDidMount(itemId) {
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
              dataType: parameterList[order].dataType,
              color: parameterList[order].color,

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




          let snapArray = this.snapshotToArray(snapshot);

          let graphInfo = this.snapshotToArray(snapshot);
          let graphInfoReverse = this.snapshotToArray(snapshot);


          graphInfo.sort(function(a, b) {
            if (a.date === b.date) {
              return 0;
            }
            return a.date > b.date ? 1 : -1;
        });

        graphInfoReverse.sort(function(a, b) {
          if (b.date === a.date) {
            return 0;
          }
          return b.date > a.date ? 1 : -1;
      });

      if (snapArray.length == 0) {
        console.log("do nothing")
      }

      if (snapArray.length > 0) {
        let snapArrayReverse = snapArray.reverse();
        let graphKeys = Object.keys(snapArrayReverse[0]);

        graphKeys = graphKeys.filter(e => e !== 'id');
        graphKeys = graphKeys.filter(e => e !== 'key');
        graphKeys = graphKeys.filter(e => e !== 'date');


        console.log(graphKeys);



        let tableData1 = [];
        for (let i=0; i < graphInfoReverse.length; i++) {
        //push send this data to the back of the chartData variable above.
        tableData1.push(Object.keys(graphInfoReverse[i]));

        }
        console.log(tableData1);

        let tableData2 = tableData1.map(function(a){return a.length;});
tableData2.indexOf(Math.max.apply(Math, tableData2));

let indexOfMaxValue = tableData2.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

          console.log(tableData2);
          console.log(indexOfMaxValue);

          let table1Keys = Object.keys(graphInfoReverse[indexOfMaxValue]);
          table1Keys = table1Keys.filter(e => e !== 'id');
          table1Keys = table1Keys.filter(e => e !== 'date');
          console.log(table1Keys);




            this.setState({
              graphInfo: graphInfo,
              graphInfoReverse: graphInfoReverse,
              graphKeys: graphKeys,
              table1Keys: table1Keys,


            })
            console.log(this.state.graphInfo);
            console.log(this.state.graphInfoReverse);
            console.log(this.state.graphKeys);
            console.log(this.state.columnData);

            let tableData = [];
            for (let i=0; i < table1Keys.length; i++) {
            //push send this data to the back of the chartData variable above.
            tableData.push({dataField: table1Keys[i], sort: true, sortFunc: (a, b, order, dataField, rowA, rowB) => {
    if (order === 'asc') {
      return b - a;
    }
    return a - b; // desc
  }, text: table1Keys[i]});

            }
            tableData.unshift({dataField: 'date',
             text: 'Date',
             sort: true,

            })
            tableData.push({dataField: 'delete',
             text: 'Delete',
             formatter: this.deleteRow.bind(this),

            })


            var arr = snapshot.val();

            var arr1 = Object.keys(arr);


            console.log(arr1);





            console.log(tableData);

            this.setState({
              columnData: tableData,

            })

            console.log(this.state.tableData);








          }










          })

          const parameter2ist1Ref = fire.database().ref(`parameterSample/${user.uid}`);
          parameter2ist1Ref.on('value', (snapshot) => {
            let parameterList2 = snapshot.val();
            console.log(parameterList2);

          })






    })
  }



    fillStates(itemId) {

      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{


      const sample1Ref = fire.database().ref(`/parameterList/${user.uid}/${itemId}`);

      let id = fire.database().ref().child(`/parameterList/${user.uid}/${itemId}`).key;

      sample1Ref.on('value', (snapshot) => {

        this.setState({
          Parameter_Name: snapshot.child('Parameter_Name').val(),
          Parameter_Units: snapshot.child('Parameter_Units').val(),
          color: snapshot.child('color').val(),
          dataType: snapshot.child('dataType').val(),
          id: id,


        });




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
    color: this.state.color,
    dataType: this.state.dataType,
  }

  parameterListRef.push(parameterInfo);
  //this.setState is used to clear the text boxes after the form has been submitted.
  this.setState({
    Parameter_Name: '',
    Parameter_Units: '',
    Parameter_Input: '',
    color: '',
    dataType: '',
  });

});
}

editParameterInfo = (e) => {
  e.preventDefault();
  //fire.database().ref('samples') refers to the main title of the fire database.
  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{


  const sampleRef = fire.database().ref(`/parameterList/${user.uid}/${this.state.id}`);



  sampleRef.child("Parameter_Name").set(this.state.Parameter_Name);
  sampleRef.child("Parameter_Units").set(this.state.Parameter_Units);
  sampleRef.child("Parameter_Input").set(this.state.Parameter_Input);
  sampleRef.child("dataType").set(this.state.dataType);
  sampleRef.child("color").set(this.state.color);







  //this.setState is used to clear the text boxes after the form has been submitted.


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

  removesample1(itemId) {

   const sampleRef = fire.database().ref(`/parameterList/${this.state.userID}/${itemId}`);

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

  deleteRow1(row, isSelected, e, id, key) {

   return (
     <div style={{textAlign: 'center'}}>
     <Icon type="delete" style={{fontSize: '24px'}}
     onClick={() => this.removesample1(isSelected.id)}>
       Click me
     </Icon>
     </div>
   )
 }

 handleChangeComplete = (color) => {
    this.setState({ color: color.hex });
  };








      render() {



        const defaultSorted = [{
  dataField: 'date', // if dataField is not match to any column you defined, it will be ignored.
  order: 'desc' // desc or asc
}];







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
                <ResponsiveContainer width="100%" aspect={8/3.0} minHeight={300}>
                  <ComposedChart data={this.state.graphInfo}
            syncId="anyId">


            <XAxis dataKey="date"><Label value="testing something here" offset={200} position="top" /></XAxis>

            <YAxis hide= "true" type="number" domain={[dataMin => (0 - Math.abs(dataMin)), dataMax => (dataMax * 2)]} />
            <Tooltip />


            <defs>
              {this.state.Parameter_List.map(parameter => {
                return (

                    <linearGradient id={parameter.Parameter_Name} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={parameter.color} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={parameter.color} stopOpacity={0.1}/>
                    </linearGradient>


                )
              })}
</defs>




              {this.state.Parameter_List.map(parameter => {

                if (parameter.dataType == 'Bar') {
                  console.log('something 1')
                  const CustomTag = Bar;
                  return(
                    <CustomTag type="monotone" dataKey={parameter.Parameter_Name}  fillOpacity={1} strokeWidth={2} stroke={parameter.color} fill={"url(#" + parameter.Parameter_Name + ")"}><LabelList dataKey={parameter.Parameter_Name} position="top" /></CustomTag>
                  )
                }
                if (parameter.dataType == 'Line') {
                  console.log('something 2')
                  const CustomTag = Line;
                  return(
                    <CustomTag type="monotone" dataKey={parameter.Parameter_Name}  fillOpacity={1} strokeWidth={2} stroke={parameter.color} fill={"url(#" + parameter.Parameter_Name + ")"}><LabelList dataKey={parameter.Parameter_Name} position="top" /></CustomTag>
                  )
                }
                if (parameter.dataType == 'Area') {
                  console.log('something 3')
                  const CustomTag = Area;
                  return(
                    <CustomTag type="monotone" dataKey={parameter.Parameter_Name}  fillOpacity={1} strokeWidth={2} stroke={parameter.color} fill={"url(#" + parameter.Parameter_Name + ")"}><LabelList dataKey={parameter.Parameter_Name} position="top" /></CustomTag>
                  )
                }


              })}







            <Legend />

          </ComposedChart>
           </ResponsiveContainer>

          </Col>
          </Row>



      </Row>

















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


                <BootstrapTable
                  keyField='date'
                  data={ this.state.graphInfoReverse }
                  columns={



                    this.state.columnData

                     }
                  />
                </Row>
              </TabPane>

              <TabPane tab="CONSTITUENTS" key="3">
                <Row>
                <Col span={24} style={{paddingTop: '15px'}}>

                    <p style={{lineHeight: '2px'}}><b>DATA TABLE</b></p>

                    <hr></hr>
              </Col>
            </Row>
            <Row>
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
              <Row style={{paddingTop: '10px'}}>
                <FormGroup>
                  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Data Type</b></Col>
                  <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                  <FormControl name="dataType" onChange={this.handleChange} type="text" placeholder="Data Type"  style={{ width: 350}} value={this.state.dataType} /></Col>
                </FormGroup>
                </Row>
              <Row>
            <FormGroup>
            <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Sample Date</b></Col>
            <Col xs={24} sm={18} md={18} lg={18} xl={18}>
              <SketchPicker
            color={ this.state.color }
            onChangeComplete={ this.handleChangeComplete }
          />
      </Col>
    </FormGroup>
            </Row>

              <Row style={{paddingTop: '10px', textAlign: 'left'}}>
              <Button type="primary" onClick={this.fillParameterInfo} bsStyle="primary">Add Parameter</Button>

            <Button type="primary" onClick={this.editParameterInfo} bsStyle="primary">Edit Parameter</Button>
              </Row>
            </form>
          </Row>

                <Row style={{paddingTop: '10px'}}>
                <Col span={24}>

                  <BootstrapTable
                    keyField='date'
                    data={ this.state.Parameter_List }
                    columns={



                      [{dataField: 'Parameter_Name', text: 'Parameter'},
                      {dataField: 'Parameter_Units', text: 'Units'},
                      {dataField: 'color', text: 'Color'},
                      {dataField: 'dataType', text: 'Data Type'},
                      {dataField: 'delete',
                       text: 'Delete',
                       formatter: this.deleteRow1.bind(this),

                     },
                     {dataField: 'Edit',
                      text: 'Edit',
                      formatter: this.editRow.bind(this),

                     }]

                       }
                    />


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
