import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, Radio,  Table, Popover, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { Page, Text, View, Document, StyleSheet, Image,  PDFDownloadLink, Font,  } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

import './maintenanceReport.css';

import { PDFExport } from '@progress/kendo-react-pdf';
import { fire } from '../../fire';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

import { TiArrowSortedDown, TiBrush, TiArrowSortedUp, TiPencil, TiTrash } from "react-icons/ti";

import domtoimage from 'dom-to-image';
import { SketchPicker } from 'react-color';
import fileDownload from "js-file-download";


import { ComposedChart, LineChart, LabelList, ResponsiveContainer, ReferenceArea, AreaChart, Brush, Area, Line, XAxis, YAxis, BarChart, Bar, CartesianGrid, Tooltip, Legend, Label} from 'recharts';

import { Row, Col, Tabs, message, Card, Drawer, Menu, Icon, Dropdown, Button, Layout, Carousel } from 'antd';

import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


const TabPane = Tabs.TabPane;

Font.register('http://fonts.gstatic.com/s/arvo/v9/MViwy4K6e56oHcyeMzjbCQ.ttf', { family: 'Muli' });

const styles = StyleSheet.create({
  page: {

    backgroundColor: '#E4E4E4'
  },
  section: {
    position: 'absolute',
    left: 20,
    top: 20,
    fontSize: 35,
    fontFamily: 'Muli',

  },
  section1: {
    position: 'absolute',
    top: 20,
    left: 300,

    fontSize: 35,
    fontFamily: 'Muli',

  }
  ,
  text: {
    fontFamily: 'Roboto',
  }
});

const Heading = styled.Text`
  margin: 10px;
  font-size: 22px;
  font-family: 'Helvetica';
`;


const { ExportCSVButton } = CSVExport;



export default class maintenanceReports extends Component {


    constructor(props) {
        super(props);
        this.state = {

          //data results
          sampleDate: '',


          //random id and key, key is for the tab number
          id: '',
          user: '',
          tableValue: '',
          key: "1",


          //this is the object array for the table
          samples: [],
          orders: [],
          orders2: [],
          dataList: [],
          filter: "",
          url: null,
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



          Parameter_List: [],
          Parameter_List1: [],
          Parameter_Name: '',
          Parameter_Units: '',
          Parameter_Input: '',



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

          item1: '',
          item2: [],
          item3: '',
          item4: '',



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





      componentDidMount(itemId, source) {

        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

          console.log(user.uid);






          this.setState({
            userID: user.uid,

          })


          const parameterListRef = fire.database().ref(`maintenanceList/${user.uid}`);
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

          const parameterList1Ref = fire.database().ref(`maintenanceReport/${user.uid}`);
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


        let tableData2 = tableData1.map(function(a){return a.length;});
        tableData2.indexOf(Math.max.apply(Math, tableData2));

        let indexOfMaxValue = tableData2.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);



          let table1Keys = Object.keys(graphInfoReverse[indexOfMaxValue]);
          table1Keys = table1Keys.filter(e => e !== 'id');
          table1Keys = table1Keys.filter(e => e !== 'key');
          table1Keys = table1Keys.filter(e => e !== 'date');







            this.setState({
              graphInfo: graphInfo,
              graphInfoReverse: graphInfoReverse,
              graphKeys: graphKeys,
              table1Keys: table1Keys,


            })



            let tableData = [];
            for (let i=0; i < table1Keys.length; i++) {
            //push send this data to the back of the chartData variable above.
            tableData.push({dataField: table1Keys[i], text: table1Keys[i],
              headerStyle: (colum, colIndex) => {
        return {  textAlign: 'center', whiteSpace: 'auto'  };
        }, style:{whiteSpace: 'auto'}, width: '150px',
            filter: textFilter()

          });

            }
            tableData.unshift({dataField: 'date',
             text: 'Date',
              sort: true,
              filter: textFilter(),
              headerStyle: (colum, colIndex) => {
        return { textAlign: 'center', whiteSpace: 'auto'  };
        }


            })

            tableData.push({dataField: 'delete',
             text: 'Delete',
             formatter: this.deleteRow.bind(this),
             headerStyle: (colum, colIndex) => {
        return { width: '80px', textAlign: 'center', whiteSpace: 'auto'  };
        }

            })
            tableData.push({dataField: 'edit',
             text: 'Edit',
             formatter: this.editEquipment.bind(this),
             headerStyle: (colum, colIndex) => {
        return {width: '80px', textAlign: 'center', whiteSpace: 'auto'  };
        }

            })

            tableData.push({dataField: 'Download',
             text: 'Download',
             formatter: this.previewReport.bind(this),
             headerStyle: (colum, colIndex) => {
        return { width: '80px', textAlign: 'center', whiteSpace: 'auto'  };
        }

            })





            var arr = snapshot.val();

            var arr1 = Object.keys(arr);



            console.log(arr1);





            console.log(tableData);

            this.setState({
              columnData: tableData,
              item2: arr1,
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


        });



    })
  }



    fillStates(itemId) {

      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

      const sample1Ref = fire.database().ref(`/maintenanceList/${user.uid}/${itemId}`);

      let id = fire.database().ref().child(`/maintenanceList/${user.uid}/${itemId}`).key;

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


    const sample1Ref = fire.database().ref(`/maintenanceReport/${user.uid}/${itemId}`);

    let id = fire.database().ref().child(`/maintenanceReport/${user.uid}/${itemId}`).key;

    sample1Ref.on('value', (snapshot) => {

      let information = snapshot.val();

        delete information.id;
        delete information.date;


        let keys = Object.keys(information);

        console.log(keys);


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
          sampleDate: snapshot.child('date').val(),
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




editRow(row, isSelected, e, id) {

  return (
      <div style={{textAlign: 'center'}}>
    <Icon type="edit" style={{fontSize: '24px'}}
    onClick={() => this.databaseTest(`${isSelected.id}`)}>
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



fillParameterInfo = (e, itemId) => {
  e.preventDefault();
  //fire.database().ref('samples') refers to the main title of the fire database.
  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
  const parameterListRef = fire.database().ref(`maintenanceList/${user.uid}`);
  let id = fire.database().ref().child(`/maintenanceList/${user.uid}/${itemId}`).key;
  const parameterInfo = {
    Maintenance_Item: this.state.Maintenance_Item,
    id: id,

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

  const sampleRef = fire.database().ref(`/maintenanceList/${user.uid}/${this.state.id}`);

  sampleRef.child("Maintenance_Item").set(this.state.Maintenance_Item);

  this.setState({
    overwriteDisplay: 'none',
    addDisplay: null,
  })




  //this.setState is used to clear the text boxes after the form has been submitted.


});
}

databaseTest (itemId)
{


  //fire.database().ref('samples') refers to the main title of the fire database.
  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{



    console.log("this thing on?")
  const sampleRef = fire.database().ref(`/maintenanceList/${user.uid}/${itemId}`);
  let id = fire.database().ref().child(`/maintenanceList/${user.uid}/${itemId}`).key;
  let person = fire.database().ref().child(`/maintenanceList/${user.uid}`).key;
  console.log(id);
  sampleRef.on('value', (snapshot) => {

    const item1 = snapshot.child('Maintenance_Item').val();

    this.setState({
      Maintenance_Item: item1,
      id: id,
      user: person,
      overwriteDisplay: null,
      addDisplay: 'none',
      tableValue: item1,
    })



  });
console.log(this.state.Maintenance_Item);
console.log(this.state.item2);





});

}

dbtest1 = () =>
{


this.state.item2.map((id) => {

  const parameterList1Ref = fire.database().ref(`maintenanceReport/${this.state.user}/${id}`);
  parameterList1Ref.on('value', (snapshot) => {

  let key = snapshot.key;
  let newKey = this.state.Maintenance_Item;

  let values = snapshot.val();
  let item = snapshot.child(`${this.state.tableValue}`).val();
  let value = snapshot.child(`${this.state.tableValue}`).key;


  var prop = snapshot.child(`${this.state.tableValue}`).key;
delete values[prop];
  const newObject = {};
delete Object.assign(newObject, values, {[newKey]: item }).oldKey;

console.log(newObject);


parameterList1Ref.child(`${this.statse.user}/${id}`).set(newObject);

  });


})

const sampleRef = fire.database().ref(`/maintenanceList/${this.state.user}/${this.state.id}`);

sampleRef.child("Maintenance_Item").set(this.state.Maintenance_Item);

this.setState({
  overwriteDisplay: 'none',
  addDisplay: null,
})





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
    const parameterListRef = fire.database().ref(`maintenanceReport/${user.uid}`);

    const date = {date: this.state.sampleDate};
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

let newArray = array.unshift(date);

console.log(array);
this.setState({
  parameters: array,
})
console.log(this.state.parameters);




var arr = this.state.Parameter_List;
var object = arr.reduce(
    (obj, item) => Object.assign(obj, {date: this.state.sampleDate, id: item.id, [item.Maintenance_Item]: item.Maintenance_Input}) ,{});

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
    const parameterListRef = fire.database().ref(`maintenanceReport/${user.uid}`);

    const date = {date: this.state.sampleDate};
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
let newArray = array.unshift(date);

console.log(array);
this.setState({
  parameters: array,
})
console.log(this.state.parameters);




var arr = this.state.Parameter_List;
var object = arr.reduce(
    (obj, item) => Object.assign(obj, {date: this.state.sampleDate, id: this.state.id, [item.Maintenance_Item]: item.Maintenance_Input}) ,{});

console.log(object);

parameterListRef.child(this.state.id).set(object);

    //this.setState is used to clear the text boxes after the form has been submitted.
    this.setState({
      Maintenance_Item: '',
      Maintenance_Input: '',
      graphInfoReverse: this.state.graphInfoReverse,

      visible: false,
      visible1: false,
      visible2: false,

    });

  });
  }





   removesample(itemId) {

    const sampleRef = fire.database().ref(`/maintenanceReport/${this.state.userID}/${itemId}`);

    sampleRef.remove();


  }

  removesample1(itemId) {

   const sampleRef = fire.database().ref(`/maintenanceList/${this.state.userID}/${itemId}`);

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


  const sample1Ref = fire.database().ref(`/maintenanceReport/${user.uid}/${itemId}`);

  let id = fire.database().ref().child(`/maintenanceReport/${user.uid}/${itemId}`).key;

  sample1Ref.on('value', (snapshot) => {




    let information = snapshot.val();

      delete information.id;


      let keys = Object.keys(information);




      let values = Object.values(information);



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

textArea = () => {
  this.setState({
    dropodownLabel: 'Text',
    formInputType: ''
  })
}




      render() {

        const defaultSorted = [{
  dataField: 'date', // if dataField is not match to any column you defined, it will be ignored.
  order: 'desc' // desc or asc
}];

        let { file } = this.state
        console.log(this.state.file);
        let url = file && URL.createObjectURL(file)

        let img = document.createElement("my-node");




        const MyDoc = (
          <Document>
            <Page size="A4" >



              <View style={{position: 'absolute'}}>
                <Text style={styles.section}>Section #1</Text>
                <Text style={styles.section1}>{this.state.lakeName}</Text>
              </View>

              <Image src={this.state.blobUrl} />





            </Page>
          </Document>
        )




        function handleMenuClick(e, key) {
          message.info('Click on menu item.');
          console.log('click', key);
        }

        const menu = (
          <Menu onClick={handleMenuClick}>
            <Menu.Item onClick={this.textArea} key="1"><Icon type="font-colors" />Text</Menu.Item>
            <Menu.Item onClick={this.number} key="2"><Icon type="ordered-list" />Number</Menu.Item>
          </Menu>
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

            <div style={{ background: '#F4F7FA', padding: '5px' }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <div style={{position: 'relative'}}>
            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
              <h1><b>Maintenance Manager</b></h1>
              <h2>{this.state.lakeName}</h2>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{ textAlign: 'right'}}>
          <Button size="large" type="primary" onClick={() => this.showDrawer()}>+ Add Maintenance Log </Button>
            <Drawer
              title= "Fill in Maintenance Form"
              placement={this.state.placement}
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
              width={500}
            >
            <form>
              <Row style={{textAlign: 'right'}}>
              <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Report</Icon>
              </Row>
              <Row>
            <FormGroup>
            <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Maintenance Date</b></Col>
            <Col xs={24} sm={18} md={18} lg={18} xl={18}>
            <FormControl name='sampleDate' type='date' placeholder="Normal text" value={this.state.sampleDate}
            onChange={this.handleChange} /></Col>
            </FormGroup>
            </Row>


            {this.state.Parameter_List.map((parameter, idx) => {

                          return (
                            <Row style={{paddingTop: '10px'}}>
                      <FormGroup>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>{parameter.Maintenance_Item}</b></Col>
                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                        <FormControl name={parameter.Maintenance_Item} type="textarea" componentClass="textarea" style={{ height: 60, width: 300}}
                          onChange={this.handleSampleChange(idx)}  placeholder="Report" value={parameter.Maintenance_Input} /></Col>
                      </FormGroup>
                    </Row>
                    )})};





            <Row style={{paddingTop: '10px', textAlign: 'right'}}>
            <Button type="primary" onClick={this.sampleSubmit} bsStyle="primary">Add Report</Button>
            </Row>





            </form>



            </Drawer>
            <Drawer
              title= "Fill in Maintenance Form"
              placement={this.state.placement}
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible1}
              width={500}
            >
            <form>
              <Row style={{textAlign: 'right'}}>
              <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Report</Icon>
              </Row>
              <Row>
            <FormGroup>
            <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Maintenance Date</b></Col>
            <Col xs={24} sm={18} md={18} lg={18} xl={18}>
            <FormControl name='sampleDate' type='date' placeholder="Normal text" value={this.state.sampleDate}
            onChange={this.handleChange} /></Col>
            </FormGroup>
            </Row>


            {this.state.Parameter_List.map((parameter, idx) => {

                          return (
                            <Row style={{paddingTop: '10px'}}>
                      <FormGroup>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>{parameter.Maintenance_Item}</b></Col>
                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                        <FormControl name={parameter.Maintenance_Item} type="textarea" componentClass="textarea" style={{ height: 60, width: 300}}
                          onChange={this.handleTableChange(idx)}  placeholder="Report" value={parameter.Maintenance_Input} /></Col>
                      </FormGroup>
                      </Row>
                    )})};





            <Row style={{paddingTop: '10px', textAlign: 'right'}}>
            <Button type="primary" onClick={this.sampleOverwrite} bsStyle="primary">Overwrite Report</Button>
            </Row>





            </form>



            </Drawer>





            </Col>

          </div>
            </Row>

            </div>

            <div style={{ background: '#F4F7FA', paddingTop: '15px', paddingRight: '5px', paddingLeft: '5px' }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>


                  <Card


                  >
                  <Tabs defaultActiveKey="1" activeKey={this.state.key} onChange={this.handleSelect} >

                    <TabPane tab="MAINTENANCE ITEMS" key="1">
                      <Row>
                      <Col span={24} style={{paddingTop: '15px'}}>

                        <Button onClick={this.databaseTest}>Database Test</Button>

                          <hr></hr>
                    </Col>
                  </Row>
                  <Row>
                    <form>
                      <Row style={{paddingTop: '10px', textAlign: 'center'}} type="flex" justify="center">
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <FormGroup>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>MAINTENANCE ITEMS</b></Col>
                    <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                    <FormControl name="Maintenance_Item" onChange={this.handleChange} type="text" placeholder="Items"  value={this.state.Maintenance_Item} />
                    </Col>
                    <Col xs={24} sm={4} md={4} lg={4} xl={4} >
                          <Button style={{display: this.state.addDisplay}} type="primary" onClick={this.fillParameterInfo} bsStyle="primary">Add Item</Button>

                        <Button style={{display: this.state.overwriteDisplay}} type="primary" onClick={this.dbtest1} bsStyle="primary">Overwrite Item</Button>
                        <Icon style={{display: this.state.overwriteDisplay, fontSize: 20}} onClick={this.displayButtons} type="left" />
                        </Col>
                </FormGroup>

                  </Col>
                    </Row>

                  </form>
                </Row>

                      <Row style={{paddingTop: '10px', textAlign: 'center'}} type="flex" justify="center">
                      <Col xs={24} sm={14} md={14} lg={14} xl={14}>

                        <BootstrapTable
                          keyField='date'
                          data={ this.state.Parameter_List }

                          columns={



                            [{dataField: 'Maintenance_Item', text: 'Maintenance Item',
                              headerStyle: (colum, colIndex) => {
           return { textAlign: 'left' };
         },
         style: (colum, colIndex) => {
return { textAlign: 'left' };
}
       },

                            {dataField: 'delete',
                             text: 'Delete',
                             formatter: this.deleteRow1.bind(this),
                             headerStyle: (colum, colIndex) => {
          return { width: '80px', textAlign: 'center' };
        }

                           },
                           {dataField: 'Edit',
                            text: 'Edit',
                            formatter: this.editRow.bind(this),
                            headerStyle: (colum, colIndex) => {
         return { width: '80px', textAlign: 'center' };
       }
                           }]

                             }
                          />



                  </Col>
                  </Row>



                    </TabPane>

              <TabPane tab="MAINTENANCE LOG" key="2">

                <Row>
                <Col span={24} style={{paddingTop: '15px'}}>



                    <hr></hr>
                </Col>
                </Row>

                <Row>

                  <ToolkitProvider
                    keyField='date'
                    data={ this.state.graphInfoReverse }
                    columns={  this.state.columnData }

                    exportCSV={ {
                    fileName: 'Maintenance Reports.csv',
                    exportAll: false
                  } }
                  >
                    {
                      props => (
                        <div>
                          <ExportCSVButton style={{background: 'white',backgroundColor: 'white', height: '50px', width: '200px'}} { ...props.csvProps }>Export Spreadsheet!!</ExportCSVButton>
                          <hr />
                          <BootstrapTable { ...props.baseProps } filter={ filterFactory() } />
                        </div>
                      )
                    }
                  </ToolkitProvider>


                </Row>
              </TabPane>






                  <TabPane tab="" key="3">

<Button onClick={this.filter}>Image some shit</Button>

<div id="my-node"><p>Testing testing 1,2,3</p></div>
<img src={this.state.blobUrl} />


  <div >
    <PDFDownloadLink  document={MyDoc} fileName="somename.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
  </div>

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



  {
title: 'Date',
dataIndex: 'date',
key: 'date',
...this.getColumnSearchProps('date'),

sorter: (a, b) => { return a.date.localeCompare(b.date)},
sortDirections: ['descend', 'ascend'],
}, {
title: 'Test3',
dataIndex: 'test3',

sorter: (a, b) => a.test3 - b.test3,
sortDirections: ['descend', 'ascend'],
key: 'test3',
...this.getColumnSearchProps('test3'),

},
{
title: 'Test4',
dataIndex: 'test4',

sorter: (a, b) => a.test4 - b.test4,
sortDirections: ['descend', 'ascend'],
key: 'test4',
...this.getColumnSearchProps('test4'),
},


let arrayData = [];
for (let i=0; i < arrayKeys.length; i++) {
//push send this data to the back of the chartData variable above.
arrayData.push({Maintenance_Input: arrayValues[i], Maintenance_Item: arrayKeys[i]});

}
