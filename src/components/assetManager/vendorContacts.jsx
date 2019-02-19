import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, Radio,  Table, Popover, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import './maintenanceReport.css';

import { PDFExport } from '@progress/kendo-react-pdf';
import { fire } from '../../fire';

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









export default class vendorContacts extends Component {


    constructor(props) {
        super(props);
        this.state = {





          //data results
          sampleDate: '',


          //random id and key, key is for the tab number
          id: '',
          key: "1",
          idKey: '',
          page: '',
          area: '',
          displayColorPicker: false,




          //this is the object array for the table
          samples: [],
          orders: [],
          orders2: [],
          dataList: [],
          filter: "",
          blob: null,
          file:null,
          blobUrl: null,

          imageSource: '',


          //these are for the graphs


          //for drawers
          visible: false,
          visible1: false,
          visible2: false,

          overwriteDisplay: 'none',
          addDisplay: null,










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

          reportValues: [],
          reportKeys: [],
          reportData: [],



        }
        //these are triggered events.  handleChange is for text box changes
        //handlesubmit is for the form being submitted.
        //every event trigger needs to be bound like is below with .bind
        //we might now have to do this anymore with the newest version of react, but i have it to be safe.
        this.handleChange = this.handleChange.bind(this);
        this.filter = this.filter.bind(this);
        this.handleSelect = this.handleSelect.bind(this);




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




          const parameterListRef = fire.database().ref(`vendorList/${user.uid}`);
          parameterListRef.on('value', (snapshot) => {
            let parameterList = snapshot.val();
            console.log(parameterList);

            let newState = [];
          for (let order in parameterList) {
            newState.push({
              id: order,
              Maintenance_Item: parameterList[order].Maintenance_Item,


            });
            console.log(newState);
          }
          this.setState({
            Parameter_List: newState,
          })
          })

          const parameterList1Ref = fire.database().ref(`vendorContacts/${user.uid}`);
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
          table1Keys = table1Keys.filter(e => e !== 'key');
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
            console.log(this.state.Parameter_List);

            let tableData = [];
            for (let i=0; i < table1Keys.length; i++) {
            //push send this data to the back of the chartData variable above.
            tableData.push({dataField: table1Keys[i], text: table1Keys[i],
            headerStyle:{ whiteSpace: 'auto' }, style:{whiteSpace: 'auto'}, width: '150px',

          });

            }

            tableData.push({dataField: 'delete',
             text: 'Delete',
             formatter: this.deleteRow.bind(this),

            })
            tableData.push({dataField: 'edit',
             text: 'Edit',
             formatter: this.editEquipment.bind(this),

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
          const profileRef = fire.database().ref(`profileInformation/${user.uid}`);
          profileRef.on('value', (snapshot) => {
            var that = this;


          this.setState({
            lakeName: snapshot.child('lakeName').val(),
            locationCity: snapshot.child('locationCity').val(),
            locationState: snapshot.child('locationState').val(),
            managementContact: snapshot.child('managementContact').val(),
            hoaContact: snapshot.child('hoaContact').val(),
            managementContactNumber: snapshot.child('managementContactNumber').val(),
            hoaContactNumber: snapshot.child('hoaContactNumber').val(),
            latitude: snapshot.child('latitude').val(),
            longitude: snapshot.child('longitude').val(),
            center: {
              lat: snapshot.child('latitude').val(),
              lng: snapshot.child('longitude').val()
            },

          });
          console.log(this.state.center);
                    var myLat = `${this.state.latitude}`;
                      var myLon = `${this.state.longitude}`;
                   let API_WEATHER = `http://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&units=imperial&appid=${'30573b68170d7f4400c7ac9c1c671ccf'}`;

                   fetch(API_WEATHER)
                .then(response => response.json())
                .then(responseJson => {
                  console.log(responseJson);
                  console.log(responseJson.weather);
                  console.log(responseJson.name);
                  this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                    currentCity: this.state.lakeName,
                    currentTemp: responseJson.main.temp,
                    currentIcon: 'http://openweathermap.org/img/w/' + responseJson.weather[0].icon + '.png',
                    currentDescription: responseJson.weather[0].main,
                    currentHumidity: responseJson.main.humidity,


                  });
                })
                .catch(error => {
                  console.log(error);
                });


        });

          const parameter2ist1Ref = fire.database().ref(`vendorContacts/${user.uid}`);
          parameter2ist1Ref.on('value', (snapshot) => {
            let parameterList2 = snapshot.val();
            console.log(parameterList2);

          })






    })
  }



  fillStates(itemId) {

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{


    const sample1Ref = fire.database().ref(`/vendorList/${user.uid}/${itemId}`);

    let id = fire.database().ref().child(`/vendorList/${user.uid}/${itemId}`).key;

    sample1Ref.on('value', (snapshot) => {

      this.setState({
        Maintenance_Item: snapshot.child('Maintenance_Item').val(),

        id: id,
        overwriteDisplay: null,
        addDisplay: 'none',



      });




});

  });
}

  fillEquipment(itemId) {

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{


    const sample1Ref = fire.database().ref(`/vendorContacts/${user.uid}/${itemId}`);

    let id = fire.database().ref().child(`/vendorContacts/${user.uid}/${itemId}`).key;

    sample1Ref.on('value', (snapshot) => {

      let information = snapshot.val();
        console.log(information);
        delete information.id;

        console.log(Object.keys(information));
        let keys = Object.keys(information);

        console.log(keys);

        console.log(Object.values(information));
        let values = Object.values(information);

        console.log(values);

        let tableData1 = [];
        for (let i=0; i < values.length; i++) {
        //push send this data to the back of the chartData variable above.
        tableData1.push({Maintenance_Item: keys[i], Maintenance_Input: values[i]});

        }
        console.log(tableData1);

        this.setState({
          id: id,
          Parameter_List: tableData1,
          reportValues: values,
          reportKeys: keys,
          visible1: true,
        })



});

  });
}











    handleSelect(key) {
  this.setState({key});
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

editEquipment(row, isSelected, e, id) {

  return (
      <div style={{textAlign: 'center'}}>
    <Icon type="edit" style={{fontSize: '24px'}}
    onClick={() => this.fillEquipment(`${isSelected.key}`)}>
      Click me
    </Icon>
    </div>
  )
}














  onSubmit(event) {
    event.preventDefault();
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












fillParameterInfo = (e) => {
  e.preventDefault();
  //fire.database().ref('samples') refers to the main title of the fire database.
  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
  const parameterListRef = fire.database().ref(`vendorList/${user.uid}`);

  const parameterInfo = {
    Maintenance_Item: this.state.Maintenance_Item,

  }

  parameterListRef.push(parameterInfo);
  //this.setState is used to clear the text boxes after the form has been submitted.
  this.setState({
    Maintenance_Item: '',

  });

});
}

editParameterInfo = (e) => {
  e.preventDefault();
  //fire.database().ref('samples') refers to the main title of the fire database.
  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{


  const sampleRef = fire.database().ref(`/vendorList/${user.uid}/${this.state.id}`);



  sampleRef.child("Maintenance_Item").set(this.state.Maintenance_Item);


  this.setState({
    overwriteDisplay: 'none',
    addDisplay: null,
  })





  //this.setState is used to clear the text boxes after the form has been submitted.


});
}

handleSampleChange = idx => evt => {
  const newParameters = this.state.Parameter_List.map((parameter, sidx) => {
    if (idx !== sidx) return parameter;
    return { ...parameter, Maintenance_Input: evt.target.value };
  });
  this.setState({ Parameter_List: newParameters });
  console.log(this.state.Parameter_List);


  };

  handleTableChange = idx => evt => {
    const newParameters = this.state.Parameter_List.map((parameter, sidx) => {
      if (idx !== sidx) return parameter;
      return { ...parameter, Maintenance_Input: evt.target.value };
    });
    this.setState({ Parameter_List: newParameters });
    console.log(this.state.Parameter_List);


    };

  sampleSubmit = (e) => {
    e.preventDefault();
    //fire.database().ref('samples') refers to the main title of the fire database.
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const parameterListRef = fire.database().ref(`vendorContacts/${user.uid}`);

    const parameterInfo = {
      list: this.state.Parameter_List.map((parameter) => {

                        return (
                        {
                        Maintenance_Item: parameter.Maintenance_Item,
                        Maintenance_Input: parameter.Maintenance_Input,
                      }
                        )
                      })

    }
    console.log(parameterInfo.list);

  let kvArray = parameterInfo.list;

  let array = kvArray.map(parameter => {
    var rObj = {};
    rObj[parameter.Maintenance_Item] = parameter.Maintenance_Input;
    return rObj;


  })


console.log(array);
this.setState({
  parameters: array,
})
console.log(this.state.parameters);




var arr = this.state.Parameter_List;
var object = arr.reduce(
    (obj, item) => Object.assign(obj, {id: item.id, [item.Maintenance_Item]: item.Maintenance_Input}) ,{});

console.log(object);

parameterListRef.push(object);

    //this.setState is used to clear the text boxes after the form has been submitted.
    this.setState({
      Maintenance_Item: '',
      Maintenance_Input: '',

      visible: false,
      visible1: false,
      visible2: false,

    });

  });
  }

  sampleOverwrite = (e) => {
    e.preventDefault();
    //fire.database().ref('samples') refers to the main title of the fire database.
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const parameterListRef = fire.database().ref(`vendorContacts/${user.uid}`);

    const parameterInfo = {
      list: this.state.Parameter_List.map((parameter) => {

                        return (
                        {
                        Maintenance_Item: parameter.Maintenance_Item,
                        Maintenance_Input: parameter.Maintenance_Input,
                      }
                        )
                      })

    }
    console.log(parameterInfo.list);

  let kvArray = parameterInfo.list;

  let array = kvArray.map(parameter => {
    var rObj = {};
    rObj[parameter.Maintenance_Item] = parameter.Maintenance_Input;
    return rObj;


  })


console.log(array);
this.setState({
  parameters: array,
})
console.log(this.state.parameters);




var arr = this.state.Parameter_List;
var object = arr.reduce(
    (obj, item) => Object.assign(obj, {id: this.state.id, [item.Maintenance_Item]: item.Maintenance_Input}) ,{});

console.log(object);

parameterListRef.child(this.state.id).set(object);

    //this.setState is used to clear the text boxes after the form has been submitted.
    this.setState({
      Maintenance_Item: '',
      Maintenance_Input: '',

      visible: false,
      visible1: false,
      visible2: false,

    });

  });
  }





   removesample(itemId) {

    const sampleRef = fire.database().ref(`/vendorContacts/${this.state.userID}/${itemId}`);

    sampleRef.remove();


  }

  removesample1(itemId) {

   const sampleRef = fire.database().ref(`/vendorList/${this.state.userID}/${itemId}`);

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
     onClick={() => this.removesample1(isSelected.key)}>
       Click me
     </Icon>
     </div>
   )
 }

 displayButtons = () => {

this.setState({
  overwriteDisplay: 'none',
  addDisplay: null,
})


 }

 previewReport(row, isSelected, e, id) {

   return (
       <div style={{textAlign: 'center'}}>
     <Icon type="download" style={{fontSize: '24px'}}
     onClick={() => this.reviewReport(`${isSelected.key}`)}>
       Click me
     </Icon>
     </div>
   )
 }

reviewReport = (itemId) => {

  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{


  const sample1Ref = fire.database().ref(`/vendorContacts/${user.uid}/${itemId}`);

  let id = fire.database().ref().child(`/vendorContacts/${user.uid}/${itemId}`).key;

  sample1Ref.on('value', (snapshot) => {




    let information = snapshot.val();
      console.log(information);
      delete information.id;

      console.log(Object.keys(information));
      let keys = Object.keys(information);

      console.log(keys);

      console.log(Object.values(information));
      let values = Object.values(information);

      console.log(values);

      let tableData1 = [];
      for (let i=0; i < values.length; i++) {
      //push send this data to the back of the chartData variable above.
      tableData1.push({reportKey: keys[i], reportValue: values[i]});

      }
      console.log(tableData1);

      this.setState({
        reportData: tableData1,
        reportValues: values,
        reportKeys: keys,
      })





    this.setState({


      id: id,

        key: "3",


    });




});

});


}



filter = (url) => {



  domtoimage.toBlob(document.getElementById('my-node'))
      .then((blob) => {


          console.log(blob);
          const blobUrl = URL.createObjectURL(blob);

          console.log(blobUrl);

          this.setState({
            blobUrl: blobUrl,
          })

      });


}




      render() {

        let { file } = this.state
        console.log(this.state.file);
        let url = file && URL.createObjectURL(file)


        let img = document.createElement("my-node");









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
              <h1><b>Vendor Manager</b></h1>
              <h3><b>{this.state.lakeName}</b></h3>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{ textAlign: 'right'}}>
          <Button size="large" type="primary" onClick={() => this.showDrawer()}>+ Add Vendor</Button>
            <Drawer
              title= "Fill in Vendor Form"
              placement={this.state.placement}
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
              width={500}
            >
            <form>
              <Row style={{textAlign: 'right'}}>
              <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Vendor</Icon>
              </Row>


            {this.state.Parameter_List.map((parameter, idx) => {

                          return (
                            <Row style={{paddingTop: '10px'}}>
                      <FormGroup>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>{parameter.Maintenance_Item}</b></Col>
                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                        <FormControl name={parameter.Maintenance_Item} type="textarea" componentClass="textarea" style={{ height: 60, width: 300}}
                          onChange={this.handleSampleChange(idx)}  placeholder="Vendor" value={parameter.Maintenance_Input} /></Col>
                      </FormGroup>
                    </Row>
                    )})};





            <Row style={{paddingTop: '10px', textAlign: 'right'}}>
            <Button type="primary" onClick={this.sampleSubmit} bsStyle="primary">Add Vendor</Button>
            </Row>





            </form>



            </Drawer>
            <Drawer
              title= "Fill in Vendor Form"
              placement={this.state.placement}
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible1}
              width={500}
            >
            <form>
              <Row style={{textAlign: 'right'}}>
              <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Vendor</Icon>
              </Row>


            {this.state.Parameter_List.map((parameter, idx) => {

                          return (
                            <Row style={{paddingTop: '10px'}}>
                      <FormGroup>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>{parameter.Maintenance_Item}</b></Col>
                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                        <FormControl name={parameter.Maintenance_Item} type="textarea" componentClass="textarea" style={{ height: 60, width: 300}}
                          onChange={this.handleTableChange(idx)}  placeholder="Vendor" value={parameter.Maintenance_Input} /></Col>
                      </FormGroup>
                      </Row>
                    )})};





            <Row style={{paddingTop: '10px', textAlign: 'right'}}>
            <Button type="primary" onClick={this.sampleOverwrite} bsStyle="primary">Overwrite Vendor</Button>
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
                  <Tabs defaultActiveKey="1" activeKey={this.state.key} onChange={this.handleSelect} >


              <TabPane tab="VENDOR LIST" key="1">

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

              <TabPane tab="ITEMS" key="2">
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
              <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>VENDOR ITEMS</b></Col>
              <Col xs={24} sm={18} md={18} lg={18} xl={18}>
              <FormControl name="Maintenance_Item" onChange={this.handleChange} type="text" placeholder="Vendor" style={{ width: 350}} value={this.state.Maintenance_Item} /></Col>
            </FormGroup>
            </Row>




              <Row style={{paddingTop: '10px', textAlign: 'left'}}>
              <Button style={{display: this.state.addDisplay}} type="primary" onClick={this.fillParameterInfo} bsStyle="primary">Add Item</Button>

            <Button style={{display: this.state.overwriteDisplay}} type="primary" onClick={this.editParameterInfo} bsStyle="primary">Overwrite Item</Button>
            <Icon style={{display: this.state.overwriteDisplay, fontSize: 20}} onClick={this.displayButtons} type="left" />
              </Row>
            </form>
          </Row>

                <Row style={{paddingTop: '10px'}}>
                <Col span={24}>

                  <BootstrapTable
                    keyField='date'
                    data={ this.state.Parameter_List }
                    columns={



                      [{dataField: 'Maintenance_Item', text: 'Vendor Item'},

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
