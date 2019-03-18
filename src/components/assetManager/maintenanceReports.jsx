import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { Page, Text, View, Document, StyleSheet, Image,  PDFDownloadLink, Font, PDFViewer  } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

import './maintenanceReport.css';


import { fire } from '../../fire';


import domtoimage from 'dom-to-image';
import { SketchPicker } from 'react-color';
import fileDownload from "js-file-download";


import { ComposedChart, LineChart, LabelList, ResponsiveContainer, ReferenceArea, AreaChart, Brush, Area, Line, Tooltip, XAxis, YAxis, BarChart, Bar, CartesianGrid, Legend, Label} from 'recharts';

import { Row, Col, Tabs, Table, Divider, Tag, message, Card, Drawer, Menu, Dropdown, Button, Layout, Carousel, Input, Popover, Icon, Cascader, Switch, Select, AutoComplete, Radio, Alert, Calendar, DatePicker } from 'antd';
import Highlighter from 'react-highlight-words';
import { CSVLink, CSVDownload } from "react-csv";


const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const TabPane = Tabs.TabPane;

const { Option } = Select;


const styles = StyleSheet.create({
  page: {

    backgroundColor: '#E4E4E4'
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,

  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 15,
  },
  subtitle: {
    fontSize: 18,


  },
  text: {
    margin: 12,
    fontSize: 14,

  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,

  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },

});

const Heading = styled.Text`
  margin: 10px;
  font-size: 22px;
  font-family: 'Helvetica';
`;






export default class maintenanceReports extends Component {




    constructor(props) {
        super(props);
        this.state = {
          userID: '',
          key: "1",
          snapArray: [],

          save: '',
          save1: '',

          chartArray: [],
          reportData: [],

          snapArray1: [],
          arrayData1: [],
          arrayData2: [],
          arrayKeys1: [],
          arrayKeys2: [],
          arrayValues2: [],
          smallGraphKeys: [],

          Maintenance_Item: '',
          sampleDate: '',
          sampleTitle: '',
          sampleID: '',
          sampleMisc: '',
          Status: '',
          court: '',


          item: '',

          graphData: [],
          turnedOffKeys: [],

          currentData: [],




          childrenDrawer: false,
          childrenDrawer1: false,

          childrenDrawerComment: false,

          itemDrawerWidth: '',
          childItemDrawerWidth: '',
          childCommentMaintenanceWidth: '',
          editMaintenanceWidth: '',




          tableKeys: [],
          tableKeysSmall: [],
          searchText: '',
          selectedRowKeys: [], // Check here to configure the default column
          loading: false,



          url: null,
          blob: null,
          file:null,
          blobUrl: null,

          error: 'none',

          //for drawers
          visible: false,
          visible1: false,
          visible2: false,
          visible3: false,
          visibleEditMaintenance: false,

          //Inputs for Profile Page
          lakeName: '',
          locationCity: '',
          locationState: '',
          managementContact: '',
          hoaContact: '',
          managementContactNumber: '',
          hoaContactNumber: '',

          currentProject: '',


        }
        this.handleChange = this.handleChange.bind(this);

      }


      //event triggered when text boxes of forms, values are changed
      handleChange(e) {
        const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
        this.setState({
          [e.target.name]: e.target.value,
          error: 'none',
        });


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

          this.setState({
            userID: user.uid,
          })

          const currentProjectRef = fire.database().ref(`${user.uid}/currentProject`);
          currentProjectRef.on('value', (snapshot) => {
            let project = snapshot.child('currentProject').val();
            console.log(project);
            this.setState({
              currentProject: project
            })

            const parameterList1Ref = fire.database().ref(`${user.uid}/${this.state.currentProject}/maintenanceReport`);
            parameterList1Ref.on('value', (snapshot) => {
              let snapArray = this.snapshotToArray(snapshot);

              if (snapArray.length == 0) {
                console.log("do nothing")
              }







              if (snapArray.length > 0) {
                let data = snapArray;





                let tableData1 = [];
                for (let i=0; i < snapArray.length; i++) {
                //push send this data to the back of the chartData variable above.
                tableData1.push(Object.keys(snapArray[i]));
                }

                let tableData2 = tableData1.map(function(a){return a.length;});
                tableData2.indexOf(Math.max.apply(Math, tableData2));



                let indexOfMaxValue = tableData2.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);




                let table1Keys = Object.keys(snapArray[indexOfMaxValue]);
                table1Keys = table1Keys.filter(e => e !== 'ID');
                table1Keys = table1Keys.filter(e => e !== 'Miscellaneous');
                table1Keys = table1Keys.filter(e => e !== 'date');
                table1Keys = table1Keys.filter(e => e !== 'Title');
                table1Keys = table1Keys.filter(e => e !== 'Status');
                table1Keys = table1Keys.filter(e => e !== 'court');
                table1Keys = table1Keys.filter(e => e !== 'key');
                table1Keys = table1Keys.filter(e => e !== 'key');


                if (this.state.turnedOffKeys.length == 0) {
                  console.log("do nothing again")
                }

                if (this.state.turnedOffKeys.lenth > 0) {
                  this.state.turnedOffKeys.map((item) => {

                    table1Keys = table1Keys.filter(e => e !== item);
                  })
                }

                console.log(table1Keys)

                this.setState({
                  smallGraphKeys: table1Keys,
                })



                let tableKeys = table1Keys.map((txt) => {


                  const item3 = txt.replace(/^"(.*)"$/, '$1');
                  const item4 = "a"+"."+item3;

                  return (

                  {




                }
                )})

                let tableKeysSmall = table1Keys.map((txt) => {
                  const item3 = txt.replace(/^"(.*)"$/, '$1');
                  const item4 = "a"+"."+item3;
                  return (

                  {

                }
                )})

                tableKeys.unshift({
                title: 'Ball in Court',
                dataIndex: 'court',
                key: 'court',
                ...this.getColumnSearchProps('court'),
                sorter: (a, b) => { return a.court.localeCompare(b.court)},
                sortDirections: ['descend', 'ascend'],

                })

                tableKeys.unshift({
                title: 'Status',
                dataIndex: 'Status',
                key: 'Status',
                ...this.getColumnSearchProps('Status'),
                sorter: (a, b) => { return a.Status.localeCompare(b.Status)},
                sortDirections: ['descend', 'ascend'],

                })



                tableKeys.unshift({
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                ...this.getColumnSearchProps('date'),
                sorter: (a, b) => { return a.date.localeCompare(b.date)},
                sortDirections: ['descend', 'ascend'],


                })
                tableKeys.unshift({
                title: 'Title',
                dataIndex: 'Title',
                key: 'Title',
                ...this.getColumnSearchProps('Title'),
                sorter: (a, b) => { return a.Title.localeCompare(b.Title)},
                sortDirections: ['descend', 'ascend'],


                })

                tableKeys.unshift({
                title: 'ID #',
                dataIndex: 'ID',
                key: 'ID',
                ...this.getColumnSearchProps('ID'),
                sorter: (a, b) => { return a.ID.localeCompare(b.ID)},
                sortDirections: ['descend', 'ascend'],

                })


                tableKeys.unshift({
                  title: 'Edit',
                  dataIndex: '',
                  key: 'x',
                  fixed: 'left',
                  render: this.editRow.bind(this),
                  width: 50,


                })

                tableKeys.unshift({

                  title: 'Delete',
                  dataIndex: '',
                  fixed: 'left',
                  key: 'y',
                  render: this.deleteRow.bind(this),
                  width: 50,


                })
                tableKeys.push({

                  title: 'Preview',
                  dataIndex: '',
                  fixed: 'right',
                  key: 'z',
                  render: this.previewReport.bind(this),
                  width: 50,
                })
                console.log(data);
                let reverseData = data.reverse();

                let reverseData1 = data.reverse();





                tableKeysSmall.unshift({
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                ...this.getColumnSearchProps('date'),
                sorter: (a, b) => { return a.date.localeCompare(b.date)},
                sortDirections: ['descend', 'ascend'],


                })
                tableKeysSmall.unshift({
                title: 'Title',
                dataIndex: 'Title',
                key: 'Title',
                ...this.getColumnSearchProps('Title'),
                sorter: (a, b) => { return a.Title.localeCompare(b.Title)},
                sortDirections: ['descend', 'ascend'],


                })

                tableKeysSmall.unshift({
                title: 'ID #',
                dataIndex: 'ID',
                key: 'ID',
                ...this.getColumnSearchProps('ID'),
                sorter: (a, b) => { return a.ID.localeCompare(b.ID)},
                sortDirections: ['descend', 'ascend'],

                })


                tableKeysSmall.unshift({
                  title: 'Edit',
                  dataIndex: '',
                  key: 'x',

                  render: this.editRowSmall.bind(this),
                  width: 50,


                })

                tableKeysSmall.unshift({

                  title: 'Delete',
                  dataIndex: '',

                  key: 'y',
                  render: this.deleteRow.bind(this),
                  width: 50,


                })
                tableKeysSmall.push({

                  title: 'Preview',
                  dataIndex: '',

                  key: 'z',
                  render: this.previewReport.bind(this),
                  width: 50,
                })


                this.setState({
                  snapArray: data.reverse(),

                  tableKeys: tableKeys,
                  tableKeysSmall: tableKeysSmall,
                })



              }


               })

               const sampleList2Ref = fire.database().ref(`${user.uid}/${this.state.currentProject}/maintenanceList`);
               sampleList2Ref.on('value', (snapshot) => {
                 let maintenanceArray = this.snapshotToArray(snapshot);
                 console.log(maintenanceArray)
                 this.setState({
                   snapArray1: maintenanceArray,

                 })
               })



            const profileRef = fire.database().ref(`${user.uid}/${this.state.currentProject}/profileInformation`);
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





    })
  }




    handleSelect = (key) => {
  this.setState({key});
}



showDrawer = () => {

  const sampleList2Ref = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/maintenanceList`);
  sampleList2Ref.on('value', (snapshot) => {
    let maintenanceArray = this.snapshotToArray(snapshot);

    this.setState({
      arrayKeys1: [],
      arrayValues1: [],
      sampleDate: '',
      sampleID: '',
      sampleTitle: '',
      sampleMisc: '',
      Status: '',
      court: '',
      snapArray1: maintenanceArray,
      visible: true,
      Maintenance_Item: '',

      childrenDrawer: false,
      visible4: false,
      itemDrawerWidth: 600,
      childItemDrawerWidth: 400,
    })
  })
};

showDrawerMobile = () => {

  const sampleList2Ref = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/maintenanceList`);
  sampleList2Ref.on('value', (snapshot) => {
    let maintenanceArray = this.snapshotToArray(snapshot);

    this.setState({
      arrayKeys1: [],
      arrayValues1: [],
      sampleDate: '',
      sampleID: '',
      sampleTitle: '',
      sampleMisc: '',
      Status: '',
      court: '',
      snapArray1: maintenanceArray,
      visible: true,
      Maintenance_Item: '',

      childrenDrawer: false,
      visible4: false,
      itemDrawerWidth: 300,
      childItemDrawerWidth: 250,
    })
  })



};


showDrawer4 = () => {
  this.setState({
    visible4: true,
  });
};

onClose = () => {
  this.setState({
    visible: false,
    visible1: false,
    visible2: false,
    visible3: false,
    visibleEditMaintenance: false,

  });
};

visible4Close = () => {
  this.setState({
    visible4: false,
  })
}






filter = (url) => {

  domtoimage.toBlob(document.getElementById('my-node'))
      .then((blob) => {

          const blobUrl = URL.createObjectURL(blob);
          this.setState({
            blobUrl: blobUrl,
          })
      });
}


start = () => {
  this.setState({ loading: true });
  // ajax request after empty completing
  setTimeout(() => {
    this.setState({
      selectedRowKeys: [],
      loading: false,
    });
  }, 1000);
}

onSelectChange = (selectedRowKeys) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  this.setState({ selectedRowKeys });
}

getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },

  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
    console.log(selectedKeys[0]);
    console.log(this.state.searchText);
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }



  deleteRow = (row, isSelected, e, id, key) =>
  {

    const content = (
  <div style={{textAlign: 'center'}}>
    <p>Are you sure you want <br /> to delete this Maintenance Log?</p>
    <Button type="primary" onClick={() => this.removesample(isSelected.key)}>Delete</Button>
  </div>
  );


    return (
      <div style={{textAlign: 'center'}}>
        <Popover content={content} trigger="click">
      <Icon type="delete" style={{fontSize: '24px', color: '#101441'}}
      >
        Click me
      </Icon>
    </Popover>
      </div>
    )
  }
  removesample(itemId) {

   const sampleRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/maintenanceReport/${itemId}`);
   sampleRef.remove();
 }

 deleteRow1 = (row, isSelected, e, id, key) =>
 {
   return (
     <div style={{textAlign: 'center'}}>
     <Icon type="delete" style={{fontSize: '24px', color: '#101441'}}
     onClick={() => this.removesample1(isSelected.key)}>
       Click me
     </Icon>
     </div>
   )
 }



 removesample1(itemId) {

  const sampleRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/maintenanceList/${itemId}`);
  sampleRef.remove();
}

removesample2(itemId) {

  const sampleRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/maintenanceReport/${this.state.id}/${itemId}`);
  sampleRef.remove();
  this.fillStates(this.state.id);


}
previewReport = (row, isSelected, e, id, key) =>
{
  return (
    <div style={{textAlign: 'center'}}>
    <Icon type="file-pdf" style={{fontSize: '24px', color: '#101441'}}
    onClick={() => this.fillPreview(isSelected.key)}>
      Click me
    </Icon>
    </div>
  )
}

fillPreview(itemId) {

  const previewInfoRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/maintenanceReport/${itemId}`);

  previewInfoRef.on('value', (snapshot) => {

    let maintenanceList = snapshot.val();
    console.log(maintenanceList)

    let dataList = snapshot.val();
    delete dataList.date;
    delete dataList.ID;
    delete dataList.Title;
    delete dataList.Miscellaneous;
    delete dataList.court;
    delete dataList.Status;


    let dataKeys = Object.keys(dataList);
    let dataValues = Object.values(dataList);
    console.log(dataKeys);
    console.log(dataValues);

    let reportData = [];
    for (let i=0; i < dataKeys.length; i++) {
    //push send this data to the back of the chartData variable above.
    reportData.push({Sample_Item: dataKeys[i], Sample_Input: dataValues[i]});

    }

    console.log(reportData);


    this.setState({
    key: "4",
    sampleDate: maintenanceList.date,
    sampleTitle: maintenanceList.Title,
    sampleID: maintenanceList.ID,
    sampleMisc: maintenanceList.Miscellaneous,
    Status: maintenanceList.Status,
    court: maintenanceList.court,
    reportData: reportData,

    })

  });



  this.setState({
  key: "3",


  })






}

  editRow = (row, isSelected, e, id, key) =>
  {
    return (
      <div style={{textAlign: 'center'}}>
      <Icon type="copy" style={{fontSize: '24px', color: '#101441'}}
      onClick={() => this.fillStates(isSelected.key)}>
        Click me
      </Icon>
      </div>
    )
  }

  editRowSmall = (row, isSelected, e, id, key) =>
  {
    return (
      <div style={{textAlign: 'center'}}>
      <Icon type="copy" style={{fontSize: '24px', color: '#101441'}}
      onClick={() => this.fillStatesSmall(isSelected.key)}>
        Click me
      </Icon>
      </div>
    )
  }

  editRow1 = (row, isSelected, e, id, key) =>
  {
    return (
      <div style={{textAlign: 'center'}}>
      <Icon type="form" style={{fontSize: '24px', color: '#101441'}}
      onClick={() => this.fillParameterStates(isSelected.key)}>
        Click me
      </Icon>
      </div>
    )
  }

  fillParameterStates(itemId) {

    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

      this.setState({
        visible3: true,

      })

    const sample1Ref = fire.database().ref(`${user.uid}/${this.state.currentProject}/maintenanceList/${itemId}`);
    let id = fire.database().ref().child(`${user.uid}/${this.state.currentProject}/maintenanceList/${itemId}`).key;
    sample1Ref.on('value', (snapshot) => {

      this.setState({
        Maintenance_Item: snapshot.child('Maintenance_Item').val(),
        id: id,
      });

});

  });
}

parameterOverwrite = (e) => {
  e.preventDefault();
  //fire.database().ref('samples') refers to the main title of the fire database.
  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
  const sampleListRef = fire.database().ref(`${user.uid}/${this.state.currentProject}/maintenanceList/${this.state.id}`);


var object = {Maintenance_Item: this.state.Maintenance_Item, Maintenance_Input: '', id: this.state.id}
    console.log(object);
    sampleListRef.set(object);

  //this.setState is used to clear the text boxes after the form has been submitted.
  this.setState({
    visible3: false,

  });

});
}


  fillParameterInfo = (e, itemId) => {
    e.preventDefault();
    //fire.database().ref('samples') refers to the main title of the fire database.
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleListRef = fire.database().ref(`${user.uid}/${this.state.currentProject}/maintenanceList`);
    let id = fire.database().ref().child(`${user.uid}/${this.state.currentProject}/maintenanceList/${itemId}`).key;

    if (this.state.Maintenance_Item.length == 0) {
      console.log("do nothing")
      this.setState({
        error: null,
      })
    }

    if (this.state.Maintenance_Item.length != 0) {

      const sampleInfo = {
        Maintenance_Item: this.state.Maintenance_Item,
        Maintenance_Input: '',

        id: id,

      }

      sampleListRef.push(sampleInfo);
      //this.setState is used to clear the text boxes after the form has been submitted.
      this.setState({
        Maintenance_Item: '',

        childrenDrawer: false,
        visible4: false,
      });

    }


  });


  }

  fillParameterInfo1 = (e, itemId) => {
    e.preventDefault();
    //fire.database().ref('samples') refers to the main title of the fire database.
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleListRef = fire.database().ref(`${user.uid}/${this.state.currentProject}/maintenanceReport/${this.state.id}`);


var arr = this.state.arrayData2;
console.log(arr);


if (arr.length == 0){
  var object = {date: this.state.sampleDate, ID: this.state.sampleID,  Title: this.state.sampleTitle, Status: this.state.Status, court: this.state.court, Miscellaneous: this.state.sampleMisc}
  console.log(object);
  sampleListRef.set(object);

}
else


  var object = arr.reduce(
      (obj, item) => Object.assign(obj, {date: this.state.sampleDate, ID: this.state.sampleID, Title: this.state.sampleTitle, Status: this.state.Status, court: this.state.court, Miscellaneous: this.state.sampleMisc, [item.Sample_Item]: item.Sample_Input, [this.state.Sample_Item]: this.state.Sample_Input}) ,{});
      console.log(object);
      sampleListRef.set(object);



    //this.setState is used to clear the text boxes after the form has been submitted.

    this.setState({



      childrenDrawerComment: false,


    });

  });


  }



  handleSampleChange = idx => evt => {
    const newParameters = this.state.snapArray1.map((parameter, sidx) => {
      if (idx !== sidx) return parameter;
      return { ...parameter, Sample_Input: evt.target.value };
    });
    this.setState({ snapArray1: newParameters,
                    save: 'none',
                  save1: null});



    };

    handleSampleChange1 = idx => evt => {
      const newParameters = this.state.arrayData2.map((parameter, sidx) => {
        if (idx !== sidx) return parameter;
        return { ...parameter, Sample_Input: evt.target.value };
      });
      this.setState({ arrayData2: newParameters, save: 'none', save1: null });



      };


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }

      sampleSubmit = (e) => {
        e.preventDefault();
        //fire.database().ref('samples') refers to the main title of the fire database.
        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
        const sampleListRef = fire.database().ref(`${user.uid}/${this.state.currentProject}/maintenanceReport`);




    var arr = this.state.snapArray1;
    console.log(arr);


    if (arr.length == 0){
      var object = {date: this.state.sampleDate, ID: this.state.sampleID, Title: this.state.sampleTitle, Status: this.state.Status, court: this.state.court,  Miscellaneous: this.state.sampleMisc}
      console.log(object);
      sampleListRef.push(object);
    }

if (arr.length > 0){

      var object = arr.reduce(
          (obj, item) => Object.assign(obj, {date: this.state.sampleDate, ID: this.state.sampleID, Title: this.state.sampleTitle, Status: this.state.Status, court: this.state.court, Miscellaneous: this.state.sampleMisc, [item.Maintenance_Item]: item.Maintenance_Input}) ,{});
          console.log(object);
          sampleListRef.push(object);

          const sampleList2Ref = fire.database().ref(`${user.uid}/${this.state.currentProject}/maintenanceList`);
          sampleList2Ref.on('value', (snapshot) => {
            let maintenanceArray = this.snapshotToArray(snapshot);

            this.setState({
              snapArray1: maintenanceArray,

            })
          })

        }





        //this.setState is used to clear the text boxes after the form has been submitted.
        this.setState({
          sampleDate: '',
          sampleID: '',
          sampleTitle: '',
          sampleMisc: '',
          Status: '',
          court: '',

          visible: false,
          visible1: false,
          visible2: false,

        });

      });
      }

      fillStates(itemId) {



          this.setState({
            overwriteReport: null,
            addReport: 'none',
            inputOverwrite: null,
            inputAdd: 'none',
            visibleEditMaintenance: true,
            save: 'none',
            save1: null,
            editMaintenanceWidth: 600,
            childCommentMaintenanceWidth: 500,

          })

          const previewInfoRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/maintenanceReport/${itemId}`);
          let id = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/maintenanceReport/${itemId}`).key;

          previewInfoRef.on('value', (snapshot) => {

            let maintenanceList = snapshot.val();
            console.log(maintenanceList)




            let dataList = snapshot.val();
            delete dataList.date;
            delete dataList.ID;
            delete dataList.Title;
            delete dataList.Miscellaneous;
            delete dataList.court;
            delete dataList.Status;


            let dataKeys = Object.keys(dataList);
            let dataValues = Object.values(dataList);
            console.log(dataKeys);
            console.log(dataValues);

            let arrayData = [];
            for (let i=0; i < dataKeys.length; i++) {
            //push send this data to the back of the chartData variable above.
            arrayData.push({Sample_Item: dataKeys[i], Sample_Input: dataValues[i]});

            }


            this.setState({

            sampleDate: maintenanceList.date,
            sampleTitle: maintenanceList.Title,
            sampleID: maintenanceList.ID,
            sampleMisc: maintenanceList.Miscellaneous,
            Status: maintenanceList.Status,
            court: maintenanceList.court,
            id: id,
            snapArray1: arrayData,
            arrayData2: arrayData,
          })

            })







    }

    fillStatesSmall(itemId) {



        this.setState({
          overwriteReport: null,
          addReport: 'none',
          inputOverwrite: null,
          inputAdd: 'none',
          visibleEditMaintenance: true,
          editMaintenanceWidth: 300,
          childCommentMaintenanceWidth: 250,
          save: 'none',
          save1: null,

        })

        const previewInfoRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/maintenanceReport/${itemId}`);
        let id = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/maintenanceReport/${itemId}`).key;

        previewInfoRef.on('value', (snapshot) => {

          let maintenanceList = snapshot.val();
          console.log(maintenanceList)




          let dataList = snapshot.val();
          delete dataList.date;
          delete dataList.ID;
          delete dataList.Title;
          delete dataList.Miscellaneous;
          delete dataList.court;
          delete dataList.Status;


          let dataKeys = Object.keys(dataList);
          let dataValues = Object.values(dataList);
          console.log(dataKeys);
          console.log(dataValues);

          let arrayData = [];
          for (let i=0; i < dataKeys.length; i++) {
          //push send this data to the back of the chartData variable above.
          arrayData.push({Sample_Item: dataKeys[i], Sample_Input: dataValues[i]});

          }


          this.setState({

          sampleDate: maintenanceList.date,
          sampleTitle: maintenanceList.Title,
          sampleID: maintenanceList.ID,
          sampleMisc: maintenanceList.Miscellaneous,
          Status: maintenanceList.Status,
          court: maintenanceList.court,
          id: id,
          snapArray1: arrayData,
          arrayData2: arrayData,
        })

          })




  }


    sampleOverwrite = (e) => {
      e.preventDefault();
      //fire.database().ref('samples') refers to the main title of the fire database.
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const sampleListRef = fire.database().ref(`${user.uid}/${this.state.currentProject}/maintenanceReport/${this.state.id}`);


  var arr = this.state.arrayData2;
  console.log(arr);


  if (arr.length == 0){
    var object = {date: this.state.sampleDate, ID: this.state.sampleID,  Title: this.state.sampleTitle, Status: this.state.Status, court: this.state.court, Miscellaneous: this.state.sampleMisc}
    console.log(object);
    sampleListRef.set(object);

  }
  else


    var object = arr.reduce(
        (obj, item) => Object.assign(obj, {date: this.state.sampleDate, ID: this.state.sampleID, Title: this.state.sampleTitle, Status: this.state.Status, court: this.state.court, Miscellaneous: this.state.sampleMisc, [item.Sample_Item]: item.Sample_Input}) ,{});
        console.log(object);
        sampleListRef.set(object);



      //this.setState is used to clear the text boxes after the form has been submitted.
      this.setState({


        visible: false,
        visible1: false,
        visible2: false,
        save: null,
        save1: 'none',
        visibleEditMaintenance: false,

      });

    });
    }


    displayButtons = () => {

   this.setState({
     overwriteReport: 'none',
     addReport: null,
     inputOverwrite: 'none',
     inputAdd: null,
   })


    }


    additionalItem = (e, itemId, id) => {
      e.preventDefault();
      //fire.database().ref('samples') refers to the main title of the fire database.

      let array = this.state.arrayData2;

      const parameterInfo = {

        Maintenance_Item: this.state.Maintenance_Item,
        Maintenance_Input: '',

        id: id,

      }

      array.push(parameterInfo);
      //this.setState is used to clear the text boxes after the form has been submitted.
      this.setState({
        Maintenance_Item: '',
        arrayData2: array,


      });


    }

    onChange = (pagination, filters, sorter, extra: { currentDataSource: [] }) => {
      const data = extra.currentDataSource;
   console.log(extra.currentDataSource);
   this.setState({
     currentData: extra.currentDataSource,
   })
 }



  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  onChildrenDrawerCloseComment = () => {
    this.setState({
      childrenDrawerComment: false,
    });
  };
  showChildrenDrawerComment = () => {
    this.setState({
      childrenDrawerComment: true,
    });
  };




  handleSizeChange1 = (e) => {

  this.setState({ Status: e.target.value});



  }


  onChangeDate = (date, dateString) => {

    const parameterList1Ref = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/maintenanceReport`);
    parameterList1Ref.on('value', (snapshot) => {
      let snapArray = this.snapshotToArray(snapshot);
      console.log(snapArray)
      if (snapArray.length == 0) {
        this.setState({
          snapArray: [],
        })
      }
      if (snapArray.length > 0) {
        let data = snapArray;
      let reverseData1 = data.reverse();
        this.setState({
          snapArray: data.reverse(),
          chartArray: data.reverse(),
        })
      }
       })

    let startDate = dateString[0];
    let endDate = dateString[1];
    let dates = this.state.chartArray;

    var dateRange = dates.filter((date)=> { if (date.date >= startDate && date.date <= endDate) {
      return true
    }});

    this.setState({
      startDate: dateString[0],
      endDate: dateString[1],
      snapArray: dateRange
    })

    console.log(dateRange);
    console.log(startDate);
    console.log(endDate);
    console.log(dates);
  }

  clearDates = () => {


        const parameterList1Ref = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/maintenanceReport`);
        parameterList1Ref.on('value', (snapshot) => {
          let snapArray = this.snapshotToArray(snapshot);
          console.log(snapArray)
          if (snapArray.length == 0) {
            this.setState({
              snapArray: [],

            })
          }



          if (snapArray.length > 0) {
            let data = snapArray;

            let reverseData1 = data.reverse();

            this.setState({
              snapArray: data.reverse(),

              startDate: '',
              endDate: ''

            })


          }

           })




  }




      render() {

        const dateFormat = 'YYYY-MM-DD';

        const content = (
          <Alert
      message="Error"
      description="This is an error message about copywriting."
      type="error"
      showIcon
    />
        )

        let { file } = this.state
        let url = file && URL.createObjectURL(file)
        let img = document.createElement("my-node");

        const line = '--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------';


        const MyDoc = (
          <Document>
            <Page size="A4" style={styles.body}>
              <View style={{textAlign: 'center'}}>


                    <Text  style={{position: 'absolute', left: '20px', top: '20px'}}>
                      AquaSource
                    </Text>
                    <Text  style={{position: 'absolute', left: '20px', top: '40px', fontSize: 13}}>
                      Huntington Beach
                    </Text>

                    <Text  style={{position: 'absolute', left: '400px', top: '20px'}}>
                      # {this.state.sampleID}
                    </Text>
                    <Text style={{position: 'absolute', left: '400px', top: '40px', fontSize: 13}} >
                      {this.state.lakeName}
                    </Text>
                    <Text style={{position: 'absolute', left: '400px', top: '60px', fontSize: 13}} >
                      {this.state.locationCity}, {this.state.locationState}
                    </Text>


                    <Text style={{position: 'absolute', left: '20px', top: '140px', fontSize: 13}} >
                      Date: {this.state.sampleDate}
                    </Text>
                    <Text style={{position: 'absolute', left: '200px', top: '140px', fontSize: 13}} >
                      Status: {this.state.Status}
                    </Text>

                    <Text style={{position: 'absolute', left: '360px', top: '140px', fontSize: 13}} >
                      Ball in Court: {this.state.court}
                    </Text>

                    <Text style={{position: 'absolute', left: '20px', top: '170px', fontSize: 13}} >
                      Maintenance Item: {this.state.sampleTitle}
                    </Text>

                    <Text style={{position: 'absolute', left: '20px', top: '195px', fontSize: 13}} >
                      Miscellaneous Notes: {this.state.sampleMisc}
                    </Text>



                    <Text style={{position: 'absolute',
                       left: '20px',
                        top: '95px',
                         fontSize: .5,
                          color: 'black',
                          backgroundColor: 'black',}} >
                          {line}
                          </Text>
                          <Text style={{position: 'absolute', left: '160px', top: '100px', zIndex: 1}} >
                            MAINTENANCE ITEM
                          </Text>
                          <Text style={{position: 'absolute',
                             left: '20px',
                              top: '118px',
                               fontSize: .5,
                                color: 'black',
                                backgroundColor: 'black',}} >
                                {line}
                                </Text>

                <Text style={{position: 'absolute',
                   left: '20px',
                    top: '235px',
                     fontSize: .5,
                      color: 'black',
                      backgroundColor: 'black',}} >
                      {line}
                      </Text>
                      <Text style={{position: 'absolute', left: '20px', top: '240px'}} >
                        Maintenance Items:
                      </Text>
                      <Text style={{position: 'absolute',
                         left: '20px',
                          top: '260px',
                           fontSize: .5,
                            color: 'black',
                            backgroundColor: 'black',}} >
                            {line}
                            </Text>

                            <View style={{position: 'absolute', left: '20px', top: '280px'}}>
                              {this.state.reportData.map((parameter, idx) => {

                                return (
                                  <View>
                                  <Text style={styles.author}>{parameter.Sample_Item}:  {parameter.Sample_Input} </Text>
                                  </View>
                                )

                              })}

                            </View>





                    </View>
            </Page>
          </Document>
        )

        const columns1 = [
          {
            title: 'Edit',
            dataIndex: '',
            key: 'x',
            render: this.editRow1.bind(this),
            width: 60,
          },
          {
            title: 'Delete',
            dataIndex: '',
            key: 'y',
            render: this.deleteRow1.bind(this),
            width: 60,
          },
          {
        title: 'Title',
        dataIndex: 'Maintenance_Item',
        key: 'Maintenance_Item',

      },


    ]



        const columns = this.state.tableKeys;
        const columnsSmall = this.state.tableKeysSmall;

const data = this.state.snapArray;
const dataReverse = this.state.graphData;
const data1 = this.state.snapArray1;
const csvData = this.state.snapArray;
const csvData1 = this.state.currentData;






        return (
          <Layout>

            <div style={{ background: '#F4F7FA', padding: '5px' }}>




            <Drawer
              title= "Fill in Maintenance Form"
              placement={this.state.placement}
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
              width={this.state.itemDrawerWidth}
            >
            <Drawer
            title="Add Maintenance Item"
            width={this.state.childItemDrawerWidth}
            closable={false}
            onClose={this.onChildrenDrawerClose}
            visible={this.state.childrenDrawer}
          >


          <form>


        <FormGroup onSubmit={this.fillParameterInfo}>


          <Row style={{paddingTop: '10px'}}>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
              <b>Maintenance Item: </b>
            </Col>
            <Col xs={24} sm={16} md={16} lg={16} xl={16}>
            <FormControl required name="Maintenance_Item" onChange={this.handleChange} type="text" placeholder="Item"  value={this.state.Maintenance_Item} />
            </Col>



          </Row>



        <Row>
          <hr></hr>
        </Row>
        <Row style={{paddingTop: '20px'}}>

      <Col xs={24} sm={14} md={14} lg={14} xl={14}>
        <Button   type="primary" onClick={this.fillParameterInfo} bsStyle="primary">Add Parameter</Button>
        </Col>
        </Row>



      </FormGroup>




        </form>






          </Drawer>


            <Row style={{paddingTop: '10px'}} type="flex" justify="center">
              <Button size="large"  style={{backgroundColor: 'orange', color: 'white'}} onClick={this.showChildrenDrawer}>
            <b>Add Maintenance Item</b>
          </Button>



              </Row>

              <Row style={{paddingTop: '10px'}} justify="center">
                <form>
                  <Row style={{textAlign: 'right'}}>
                  <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Maintenance Report</Icon>
                  </Row>
                  <Row>
                    <FormGroup>
                      <Row style={{paddingTop: '10px'}}>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Date</b></Col>
                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                          <FormControl required  name='sampleDate' type='date' placeholder="Date" value={this.state.sampleDate}
                          onChange={this.handleChange} />
                        </Col>
                      </Row>
                      <Row style={{paddingTop: '10px'}}>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>ID #</b></Col>
                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                          <FormControl  required name='sampleID' type='text' placeholder="ID" value={this.state.sampleID}
                            onChange={this.handleChange} />
                        </Col>
                      </Row>
                      <Row style={{paddingTop: '10px'}}>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Title</b></Col>
                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                          <FormControl  required name='sampleTitle' type='text' placeholder="Title" value={this.state.sampleTitle}
                              onChange={this.handleChange} />
                        </Col>
                      </Row>
                      <Row style={{paddingTop: '35px'}}>

                        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Status</b></Col>
                        <Col xs={24} sm={18} md={18} lg={18} xl={18} style={{textAlign: 'left'}}>

                        <Radio.Group value={this.state.Status} size="default" onChange={this.handleSizeChange1}>
                    <Radio.Button value="Not Started">Not Started</Radio.Button>
                    <Radio.Button value="In Progress">In Progress</Radio.Button>
                    <Radio.Button value="Completed">Completed</Radio.Button>

                  </Radio.Group>
                </Col>
                      </Row>

                      <Row style={{paddingTop: '20px'}}>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Ball in Court</b></Col>
                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                          <FormControl  required name='court' type='text' placeholder="Name" value={this.state.court}
                              onChange={this.handleChange} />
                        </Col>
                      </Row>


                      <Row style={{paddingTop: '20px'}}>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Notes</b></Col>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                      <FormControl  required  name='sampleMisc' type="textarea" componentClass="textarea" style={{ height: 60}}
                        onChange={this.handleChange}  placeholder="Notes" value={this.state.sampleMisc} />
                      </Col>
                      </Row>
                    </FormGroup>
                </Row>


                {this.state.snapArray1.map((parameter, idx) => {

                              return (
                                <Row style={{paddingTop: '20px'}}>
                          <FormGroup>
                            <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>{parameter.Maintenance_Item}</b></Col>
                            <Col xs={20} sm={16} md={16} lg={16} xl={16}>
                            <FormControl name={parameter.Maintenance_Item} type="textarea" componentClass="textarea" style={{ height: 70, width: '100%'}}
                              onChange={this.handleSampleChange(idx)}   value={parameter.Maintenance_Input} />
                            </Col>
                            <Col xs={4} sm={2} md={2} lg={2} xl={2} style={{textAlign: 'center'}}>
                              <Icon type="delete" style={{fontSize: '24px'}}
                              onClick={() => this.removesample1(parameter.key)}>
                                Click me
                              </Icon>
                              </Col>




                          </FormGroup>
                        </Row>
                        )})};





                <Row style={{paddingTop: '30px', textAlign: 'right'}}>
                <Button  type="primary" onClick={this.sampleSubmit} bsStyle="primary">Add Maintenance Report</Button>



                </Row>






                </form>

              </Row>

            </Drawer>
            <Drawer
              title= "Update Maintenance Item  - Be Sure to Save"
              placement={this.state.placement}
              closable={false}
              onClose={this.onClose}
              visible={this.state.visibleEditMaintenance}
              width={this.state.editMaintenanceWidth}
            >

            <Drawer
            title="Add Comment"
            width={this.state.childCommentMaintenanceWidth}
            closable={false}
            onClose={this.onChildrenDrawerCloseComment}
            visible={this.state.childrenDrawerComment}
          >


          <form>


        <FormGroup onSubmit={this.fillParameterInfo}>


          <Row style={{paddingTop: '10px', textAlign: 'left'}}>
            <Col xs={24} sm={8} md={7} lg={8} xl={8}>
            <FormControl required name="Sample_Item" onChange={this.handleChange} type="text" placeholder="Comment Title"  value={this.state.Sample_Item} />
            </Col>

          </Row>

          <Row style={{paddingTop: '30px', textAlign: 'left'}}>
            <Col xs={24} sm={22} md={22} lg={22} xl={22}>
            <FormControl required name="Sample_Input" onChange={this.handleChange} type="textarea" componentClass="textarea" placeholder="Comment" style={{ height: 60, width: 400}} value={this.state.Sample_Input} />
            </Col>



          </Row>



        <Row>
          <hr></hr>
        </Row>
        <Row style={{paddingTop: '20px'}}>

      <Col xs={24} sm={14} md={14} lg={14} xl={14}>
        <Button   type="primary" onClick={this.fillParameterInfo1} bsStyle="primary">Add Comment Item</Button>
        </Col>
        </Row>



      </FormGroup>




        </form>






          </Drawer>







                  <Row style={{paddingTop: '10px'}} justify="center">
                    <form>
                      <Row style={{textAlign: 'right'}}>
                      <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Sample</Icon>
                      </Row>
                      <Row>
                        <FormGroup>
                          <Row style={{paddingTop: '10px'}}>
                            <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Date</b></Col>
                            <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                              <FormControl required  name='sampleDate' type='date' placeholder="Date" value={this.state.sampleDate}
                              onChange={this.handleChange} />
                            </Col>
                          </Row>
                          <Row style={{paddingTop: '10px'}}>
                            <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>ID #</b></Col>
                            <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                              <FormControl  required name='sampleID' type='text' placeholder="ID" value={this.state.sampleID}
                                onChange={this.handleChange} />
                            </Col>
                          </Row>
                          <Row style={{paddingTop: '10px'}}>
                            <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Title</b></Col>
                            <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                              <FormControl  required name='sampleTitle' type='text' placeholder="Title" value={this.state.sampleTitle}
                                  onChange={this.handleChange} />
                            </Col>
                          </Row>
                          <Row style={{paddingTop: '35px'}}>

                            <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Status</b></Col>
                            <Col xs={24} sm={18} md={18} lg={18} xl={18} style={{textAlign: 'left'}}>

                            <Radio.Group value={this.state.Status} size="default" onChange={this.handleSizeChange1}>
                        <Radio.Button value="Not Started">Not Started</Radio.Button>
                        <Radio.Button value="In Progress">In Progress</Radio.Button>
                        <Radio.Button value="Completed">Completed</Radio.Button>

                      </Radio.Group>
                    </Col>
                          </Row>

                          <Row style={{paddingTop: '20px'}}>
                            <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Ball in Court</b></Col>
                            <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                              <FormControl  required name='court' type='text' placeholder="Name" value={this.state.court}
                                  onChange={this.handleChange} />
                            </Col>
                          </Row>


                          <Row style={{paddingTop: '20px'}}>
                          <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Notes</b></Col>
                          <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                          <FormControl  required  name='sampleMisc' type="textarea" componentClass="textarea" style={{ height: 60}}
                            onChange={this.handleChange}  placeholder="Notes" value={this.state.sampleMisc} />
                          </Col>
                          </Row>
                        </FormGroup>
                    </Row>


      {this.state.arrayData2.map((parameter, idx) => {

                    return (
                      <Row style={{paddingTop: '20px'}}>
                <FormGroup>
                  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>{parameter.Sample_Item}</b></Col>
                  <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                  <FormControl name={parameter.Sample_Item} type="text" componentClass="textarea" style={{ height: 80}}
                    onChange={this.handleSampleChange1(idx)}  placeholder="Report" value={parameter.Sample_Input} />
                  </Col>
                  <Col xs={24} sm={2} md={2} lg={2} xl={2} style={{textAlign: 'center'}}>
                    <Icon type="delete" style={{fontSize: '24px'}}
                    onClick={() => this.removesample2(parameter.Sample_Item)}>
                      Click me
                    </Icon>
                    </Col>

                            </FormGroup>
                          </Row>
                          )})};


                          <Row style={{paddingTop: '10px'}} type="flex" justify="right">
                            <Col span={24} style={{textAlign: 'right'}}>
                            <Button size="large"  style={{backgroundColor: 'orange', color: 'white'}} onClick={this.showChildrenDrawerComment}>
                           <b>+ Add Comment</b>
                        </Button>
                        </Col>


                            </Row>


                  <Row style={{paddingTop: '30px', textAlign: 'right'}}>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{textAlign: 'center'}}>

                </Col>


                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Button  size="large" type="primary" onClick={this.sampleOverwrite} bsStyle="primary"><b>Save Log</b></Button>
                  </Col>


                  </Row>



                  </form>

                </Row>







            </Drawer>


            </div>

            <div style={{ background: '#F4F7FA', paddingTop: '15px', paddingRight: '5px', paddingLeft: '5px' }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Row type="flex" justify="center">
                <Col span={24} style={{textAlign: 'left'}}>
                  <h2>Maintenance Log</h2>
                </Col>
              </Row>

              <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{textAlign: 'left'}}>

                  <Tabs style={{fontSize: '32px'}}defaultActiveKey="1" activeKey={this.state.key} onChange={this.handleSelect} >




                    <TabPane tab="MAINTENANCE LOG" key="1">
                      <Row type="flex" justify="center">
                        <Col span={24} style={{textAlign: 'center'}}>



                      <Row>
                    <Col xs={0} sm={0} md={9} lg={9} xl={9} style={{textAlign: 'left'}}>
                      <Button><CSVLink data={csvData1}>Download Spreadsheet</CSVLink></Button>
                    </Col>

                    <Col xs={0} sm={0} md={3} lg={3} xl={3} >
                    <Button onClick={this.clearDates}>Clear Dates</Button>
                    </Col>
                    <Col xs={10} sm={10} md={0} lg={0} xl={0} >
                    <Button onClick={this.clearDates}>Clear Dates</Button>
                    </Col>
                    <Col xs={10} sm={10} md={0} lg={0} xl={0} style={{textAlign: 'right'}}>
                    <Button size="large" type="primary" onClick={() => this.showDrawerMobile()}>+ Add Item</Button>
                    </Col>

                    <Col xs={0} sm={0} md={7} lg={7} xl={7} >
                    <RangePicker  allowClear={true} onChange={this.onChangeDate}  />
                    </Col>
                    <Col xs={24} sm={24} md={0} lg={0} xl={0} >
                    <RangePicker  allowClear={true} onChange={this.onChangeDate}  />
                    </Col>



                    <Col xs={0} sm={0} md={5} lg={5} xl={5} style={{textAlign: 'right'}}>
                    <Button size="large" type="primary" onClick={() => this.showDrawer()}>+ Add Item</Button>
                    </Col>



                  </Row>

                      <Row style={{paddingTop: '10px'}} type="flex" justify="center">

                        <Card style={{ width: '100%' }}>
                          <Col xs={0} sm={0} md={24} lg={24} xl={24}>
                            <Table columns={columns} dataSource={data} onChange={this.onChange} scroll={{ x: '100%'}} />

                          </Col>
                          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                            <Table columns={columnsSmall} dataSource={data} onChange={this.onChange} scroll={{ x: '100%'}} />

                          </Col>
                        </Card>
                        </Row>


                      </Col>
                    </Row>

                    </TabPane>



                  <TabPane  key="2">

                    <Drawer
                      title= "Edit Parameter"
                      placement={this.state.placement}
                      closable={false}
                      onClose={this.onClose}
                      visible={this.state.visible3}
                      width={500}
                    >
                    <Row>
                      <Col span={24}>
                        <h2>{this.state.Maintenance_Item}</h2>
                      </Col>
                    </Row>








                  <Row>
                    <hr></hr>
                  </Row>
                  <Row style={{paddingTop: '20px'}}>

                <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                  <Button type="primary" onClick={this.parameterOverwrite}>Overwrite Report</Button>
                  </Col>
                  </Row>


                  </Drawer>
                  <Drawer
                  title="Add Item"
                  width={420}
                  closable={false}
                  onClose={this.visible4Close}
                  visible={this.state.visible4}
                >




     <form>


   <FormGroup onSubmit={this.fillParameterInfo}>


     <Row style={{paddingTop: '10px'}}>
       <Col xs={24} sm={8} md={8} lg={8} xl={8}>
         <span><b>Maintenance Item <p style={{color: 'red'}}>*</p></b></span>
       </Col>
       <Col xs={24} sm={16} md={16} lg={16} xl={16}>

           <FormControl required name="Maintenance_Item" onChange={this.handleChange} type="text" placeholder="Item"  value={this.state.Maintenance_Item} />

       </Col>





     </Row>



   <Row>
     <hr></hr>
   </Row>
   <Row style={{paddingTop: '20px'}}>

 <Col xs={24} sm={14} md={14} lg={14} xl={14}>

   <Button   type="primary" onClick={this.fillParameterInfo} bsStyle="primary">Add Parameter</Button>

   </Col>
   </Row>
   <div style={{display: this.state.error}}>
   <p style={{color: 'red'}}>Double check that all required inputs are filled</p>
</div>


 </FormGroup>




   </form>










                </Drawer>
                <Row type="flex" justify="center">
                  <Col span={24} style={{textAlign: 'center'}}>

                    <Row type="flex" justify="center">

                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{textAlign: 'left'}}>
                          <Button><CSVLink data={csvData1}>Download Spreadsheet</CSVLink></Button>

                        </Col>

                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{textAlign: 'right'}}>
                          <Button size="large" type="primary" onClick={this.showDrawer4}>+ Add Item</Button>

                        </Col>


                      </Row>

                      <Row style={{paddingTop: '10px'}} type="flex" justify="center">

                        <Card style={{ width: '100%' }}>
                          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Table columns={columns1} dataSource={data1} onChange={this.onChange} scroll={{ x: '100%'}} />

                          </Col>
                        </Card>
                        </Row>

                      </Col>
                    </Row>



</TabPane>

<TabPane  key="3">

  <Row type="flex" justify="center">
    <Col span={24} style={{textAlign: 'center'}}>

      <Row>
      <PDFDownloadLink document={MyDoc} fileName={this.state.sampleDate}><Button type="primary" size="large">Export PDF</Button>

</PDFDownloadLink>
</Row>

  <Row style={{paddingTop: '20px'}}>
    <Col span={24}>

<PDFViewer style={{width: '100%', height: 800}}>
  {MyDoc}
</PDFViewer>

</Col>

      </Row>

    </Col>
  </Row>


</TabPane>









            </Tabs>
          </Col>
        </Row>


            </Col>
            </Row>
            </div>





          </Layout>
      )
    }
  }
