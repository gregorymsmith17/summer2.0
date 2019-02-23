import React, { Component } from 'react'
import { Navbar, Nav, FormGroup, Checkbox, Grid, PageHeader, Jumbotron, NavItem, Modal, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import FileSaver from 'file-saver';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import fileDownload from "js-file-download";
import Request from 'superagent';

import firebase from 'firebase';
import { fire } from '../fire';
import { ChromePicker } from 'react-color';
import GoogleMapReact from 'google-map-react';

import { SketchPicker } from 'react-color';
import {BootstrapTable, BootstrapButton, TableHeaderColumn} from 'react-bootstrap-table';
import { TiArrowSortedDown, TiBrush, TiArrowSortedUp, TiPencil, TiTrash } from "react-icons/ti";

import { ComposedChart, LineChart, LabelList, ResponsiveContainer, ReferenceArea, AreaChart, Brush, Area, Line, Tooltip, XAxis, YAxis, BarChart, Bar, CartesianGrid, Legend, Label} from 'recharts';

import { Row, Col, Tabs, Table, Divider, Tag, message, Card, Drawer, Menu, Dropdown, Button, Layout, Carousel, Input, Popover, Icon, Cascader, Switch, Select, AutoComplete, Radio } from 'antd';
import Highlighter from 'react-highlight-words';
import { CSVLink, CSVDownload } from "react-csv";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const TabPane = Tabs.TabPane;

const tabListNoTitle = [{
  key: 'article',
  tab: 'article',
}, {
  key: 'app',
  tab: 'app',
}, {
  key: 'project',
  tab: 'project',
}];

export default class Dashboard extends Component {

  static defaultProps = {
  center: {
  lat: 37.987636425563075,
  lng: -121.63235758701154
  },
  zoom: 13
  };




  constructor(props) {
      super(props);



      this.state = {

        //The data that goes into the table showing weather data
        weatherData: [],
        iconData: [],

        id: '',
        key: 1,

        currentCity: '',
        currentTemp: '',
        currentIcon: '',
        currentDescription: '',
        currentHumidity: '',

        //checkbox status


        //these are for the graphs


        //this is the object array for the table
        samples: [],
        orders: [],
        orders2: [],
        dataList: [],
        filter: "",
        blobUrl: null,

        //averages




        key: 'tab1',
        noTitleKey: 'app',

        //Inputs for Profile Page
        lakeName: '',
        locationCity: '',
        locationState: '',
        managementContact: '',
        hoaContact: '',
        managementContactNumber: '',
        hoaContactNumber: '',
        isLoading: true,
        dataSource: [],
        latitude: null,
        longitude: null,
        error: null,
        weather: '',
        center: {
          lat: '',
          lng: ''
        },

        userID: '',
        key: "1",
        snapArray: [],
        snapArray1: [],
        arrayData1: [],
        arrayData2: [],
        arrayKeys1: [],
        arrayKeys2: [],
        arrayValues2: [],
        smallGraphKeys: [],

        Sample_Item: '',
        sampleDate: '',
        sampleTitle: '',
        sampleID: '',
        sampleMisc: '',
        dataType: '',
        color: '#000000',

        item: '',
        timeFrame: "All",
        graphData: [],
        turnedOffKeys: [],
        latestSample: [],

        currentData: [],
        colorDisplay: 'none',

        childrenDrawer: false,
        childrenDrawer1: false,

        overwriteDisplay: 'none',
        addDisplay: null,

        overwriteReport: 'none',
        addReport: null,

        inputAdd: null,
        inputOverwrite: 'none',


        tableKeys: [],
        searchText: '',
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,



        url: null,
        blob: null,
        file:null,
        blobUrl: null,


        //for drawers
        visible: false,
        visible1: false,
        visible2: false,
        visible3: false,

        //Inputs for Profile Page








      }

      this.handleChange = this.handleChange.bind(this);



    }


    //event triggered when text boxes of forms, values are changed
    handleChange(e) {
      const name = e.target.name;
  const value = e.target.value;
  this.setState({ [name]: value });
      this.setState({
        [e.target.name]: e.target.value
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
  async componentDidMount() {
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

        const parameterList1Ref = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/sampleReport`);
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
              return (

              {
              title:txt,
              dataIndex: txt,
              key: txt,
              ...this.getColumnSearchProps(txt),
              sorter: (a, b) => { return a.Title.localeCompare(b.Title)},
              sortDirections: ['descend', 'ascend'],

              width: 200,
            }
            )})

            tableKeys.unshift({
            title: 'Title',
            dataIndex: 'Title',
            key: 'Title',
            ...this.getColumnSearchProps('Title'),
            sorter: (a, b) => { return a.Title.localeCompare(b.Title)},
            sortDirections: ['descend', 'ascend'],
            width: 200,

            })

            tableKeys.unshift({
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            ...this.getColumnSearchProps('date'),
            sorter: (a, b) => { return a.date.localeCompare(b.date)},
            sortDirections: ['descend', 'ascend'],
            sortOrder: 'descend',
            width: 130,
            })

            tableKeys.unshift({
            title: 'ID #',
            dataIndex: 'ID',
            key: 'ID',
            ...this.getColumnSearchProps('ID'),
            sorter: (a, b) => { return a.ID.localeCompare(b.ID)},
            sortDirections: ['descend', 'ascend'],
            width: 80,
            })


            tableKeys.unshift({
              title: 'Edit',
              dataIndex: '',
              key: 'x',
              fixed: 'left',
              render: this.editRow.bind(this),
              width: 60,

            })

            tableKeys.unshift({
              title: 'Delete',
              dataIndex: '',
              fixed: 'left',
              key: 'y',
              render: this.deleteRow.bind(this),
              width: 60,

            })
            console.log(data);
            let reverseData = data.reverse();
            console.log(data);
            let threeData = [data[2], data[1], data[0]];
            console.log(data[0]);
            let latestSample = data[0];

            delete latestSample.ID;
            delete latestSample.Miscellaneous;
            delete latestSample.key;
            delete latestSample.Title;
            console.log(data[0]);

            this.setState({
              latestSample: data[0],
            })
            console.log(this.state.latestSample)

            console.log(this.state.latestSample.Nitrogen)


            let sixData = [
            data[5],
            data[4],
            data[3],
            data[2],
            data[1],
            data[0]];
            let twelveData = [
              data[11],
              data[10],
              data[9],
              data[8],
              data[7],
              data[6],
            data[5],
            data[4],
            data[3],
            data[2],
            data[1],
            data[0]];

            let reverseData1 = data.reverse();


            this.setState({
              snapArray: data,
              threeData: threeData,
              sixData: sixData,
              twelveData: twelveData,
              graphData: data,
              tableKeys: tableKeys,
            })


          }

           })

           const sampleList2Ref = fire.database().ref(`${user.uid}/${this.state.currentProject}/sampleList`);
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
               lat: parseFloat(snapshot.child('latitude').val()),
               lng: parseFloat(snapshot.child('longitude').val())
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
                   console.log(responseJson.weather[0].main);
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


      })


  });






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
      return (
        <div style={{textAlign: 'center'}}>
        <Icon type="delete" style={{fontSize: '24px', color: '#101441'}}
        onClick={() => this.removesample(isSelected.key)}>
          Click me
        </Icon>
        </div>
      )
    }
    removesample(itemId) {

     const sampleRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/sampleReport/${itemId}`);
     sampleRef.remove();
    }



    removesample1(itemId) {

    const sampleRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/sampleList/${itemId}`);
    sampleRef.remove();
    }

    removesample2(itemId) {

    const sampleRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/sampleReport/${itemId}`);
    sampleRef.remove();
    this.fillStates(this.state.id);


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

        const sample1Ref = fire.database().ref(`${user.uid}/${this.state.currentProject}/sampleReport/${itemId}`);
        let id = fire.database().ref().child(`${user.uid}/${this.state.currentProject}/sampleReport/${itemId}`).key;
      sample1Ref.on('value', (snapshot) => {

        this.setState({
          Sample_Item: snapshot.child('Sample_Item').val(),
          dataType: snapshot.child('dataType').val(),
          color: snapshot.child('color').val(),

          id: id,
        });

    });

    });
    }

    parameterOverwrite = (e) => {
      e.preventDefault();
      //fire.database().ref('samples') refers to the main title of the fire database.
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      const sampleListRef = fire.database().ref(`${user.uid}/${this.state.currentProject}/sampleList/${this.state.id}`);


    var object = {Sample_Item: this.state.Sample_Item, units: this.state.units, color: this.state.color, dataType: this.state.dataType, Sample_Input: '', id: this.state.id}
        console.log(object);
        sampleListRef.set(object);

      //this.setState is used to clear the text boxes after the form has been submitted.


    });
    }







    changeData(itemId) {
      const sample1Ref = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/sampleList/${itemId}`);
      let id = fire.database().ref().child(`${this.state.userID}/${this.state.currentProject}/sampleList/${itemId}`).key;
      sample1Ref.on('value', (snapshot) => {
        this.setState({
          Sample_Item: snapshot.child('Sample_Item').val(),
          Sample_Input: '',
          dataType: snapshot.child('dataType').val(),
          color: snapshot.child('color').val(),
          units: snapshot.child('units').val(),
          id: id,
      });
  });


    }

    editRowColor = (row, isSelected, e, id, key) =>
    {

      const content = (
    <div>
      <SketchPicker
    color={ this.state.color }
    onChangeComplete={ this.overwriteColor }
      />
    </div>
    );

      return (
        <div style={{textAlign: 'left'}}>
          <Popover content={content} title="Title" trigger="click">
            <Icon type="bg-colors" style={{fontSize: '24px', color: '#101441'}}
            onClick={() => this.changeColor(isSelected.key)}>
              Click me
            </Icon>
      </Popover>
        </div>
      )
    }

    changeColor(itemId) {


      const sample1Ref = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/sampleList/${itemId}`);
      let id = fire.database().ref().child(`${this.state.userID}/${this.state.currentProject}/sampleList/${itemId}`).key;
      sample1Ref.on('value', (snapshot) => {

        this.setState({
          Sample_Item: snapshot.child('Sample_Item').val(),
          Sample_Input: '',
          dataType: snapshot.child('dataType').val(),
          color: snapshot.child('color').val(),
          id: id,
        });

    });

    }

    overwriteColor = (color) => {

      const sampleListRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/sampleList/${this.state.id}`);

       this.setState({ color: color.hex });

      var object = {Sample_Item: this.state.Sample_Item, color: this.state.color, dataType: this.state.dataType, Sample_Input: '', id: this.state.id};

      sampleListRef.set(object);


     };






    handleSampleChange = idx => evt => {
      const newParameters = this.state.snapArray1.map((parameter, sidx) => {
        if (idx !== sidx) return parameter;
        return { ...parameter, Sample_Input: evt.target.value };
      });
      this.setState({ snapArray1: newParameters });



      };

      handleSampleChange1 = idx => evt => {
        const newParameters = this.state.arrayData2.map((parameter, sidx) => {
          if (idx !== sidx) return parameter;
          return { ...parameter, Sample_Input: evt.target.value };
        });
        this.setState({ arrayData2: newParameters });



        };


      handleSubmit = (e) => {
          e.preventDefault();
          this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
            }
          });
        }



        fillStates(itemId) {

          this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

            this.setState({
              overwriteReport: null,
              addReport: 'none',
              inputOverwrite: null,
              inputAdd: 'none',
              visible: true,

            })

          const sample1Ref = fire.database().ref(`/sampleReport/${user.uid}/${itemId}`);
          let id = fire.database().ref().child(`/sampleReport/${user.uid}/${itemId}`).key;
          sample1Ref.on('value', (snapshot) => {

            let maintenanceList = snapshot.val();




            this.setState({
              sampleDate: snapshot.child('date').val(),
              sampleID: snapshot.child('ID').val(),
              sampleTitle: snapshot.child('Title').val(),
              sampleMisc: snapshot.child('Miscellaneous').val(),
              id: id,
            });

            let arr = snapshot.val();
            delete arr.date;
            delete arr.ID;
            delete arr.Title;
            delete arr.Miscellaneous;

            let arrayKeys = Object.keys(arr);
            let arrayValues = Object.values(arr);
            this.setState({
              arrayKeys1: arrayKeys,
              arrayValues1: arrayValues,

            })

    });

    const sample2Ref = fire.database().ref(`${user.uid}/${this.state.currentProject}/sampleReport`);
    sample2Ref.on('value', (snapshot) => {
    let maintenanceList = this.snapshotToArray(snapshot);


    let keys = [maintenanceList.map((parameter) => {
    return (
    parameter.key
    )
    })]

    this.setState({
    arrayData1: keys,
    })
    })

    let arrayData = [];
    for (let i=0; i < this.state.arrayKeys1.length; i++) {
    //push send this data to the back of the chartData variable above.
    arrayData.push({Sample_Input: this.state.arrayValues1[i], Sample_Item: this.state.arrayKeys1[i], key: this.state.arrayData1[i]});

    }

    this.setState({
    snapArray1: arrayData,
    arrayData2: arrayData,
    })

        });
      }










      onChange = (pagination, filters, sorter, extra: { currentDataSource: [] }) => {
        const data = extra.currentDataSource;
     console.log(extra.currentDataSource);
     this.setState({
       currentData: extra.currentDataSource,
     })
    }

    handleChangeComplete = (color) => {
      this.setState({ color: color.hex, colorDisplay: 'none' });
    };

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

    displayColor = () => {
      this.setState({
        colorDisplay: null,
      })
    }

    handleSizeChange = (e) => {

    const sampleListRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/sampleList/${this.state.id}`);
    this.setState({ dataType: e.target.value });

    var object = {Sample_Item: this.state.Sample_Item, units: this.state.units, color: this.state.color, dataType: this.state.dataType, Sample_Input: '', id: this.state.id};

    sampleListRef.set(object);

  }

  handleSizeChange1 = (e) => {

  this.setState({ dataType: e.target.value,
  overwrite: null, });



  }

    handleTimeFrameChange = (e) => {
    this.setState({ timeFrame: e.target.value });
    console.log(this.state.timeFrame)
    if (this.state.timeframe == 'three') {
    console.log("it's 3!!")
    this.setState({
      graphData: this.state.threeData,
    })
    }


    }



    threeMonths = () => {
    this.setState({
    graphData: this.state.threeData,
    })
    console.log(this.state.graphData)
    }
    sixMonths = () => {
    this.setState({
    graphData: this.state.sixData,
    })
    }
    twelveMonths = () => {
    this.setState({
    graphData: this.state.twelveData,
    })
    }
    allMonths = () => {
    this.setState({
    graphData: this.state.snapArray,
    })
    }












   getLocation(){

       // Get the current position of the user
       navigator.geolocation.getCurrentPosition(
       (position) => {
           this.setState(
           (prevState) => ({
               latitude: 30,
               longitude: 20
               }), () => { this.getWeather(); }
           );
       },
           (error) => this.setState({ weather: error.message }),
           { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
       );
   }

   onClose = () => {
     this.setState({
       visible: false,
       visible1: false,
       visible2: false,
       visible3: false,

     });
   };

   visible3 = () => {
     const sampleList2Ref = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/sampleList`);
     sampleList2Ref.on('value', (snapshot) => {
       let maintenanceArray = this.snapshotToArray(snapshot);

       this.setState({

         snapArray1: maintenanceArray,


       visible3: true,
     })
   })


   }
   visible3Off = () => {
     this.setState({
       visible3: false,
     })
   }






  render() {

    const center = {
      lat: this.state.latitude,
      lng: this.state.longitude
    };



    const columns1 = [
      {
        title: 'Edit',
        dataIndex: '',
        key: 'x',
        render: this.editRow1.bind(this),
        width: 60,
      },
      {
    title: 'Title',
    dataIndex: 'Sample_Item',
    key: 'Sample_Item',
    width: 200,
    },
    {
    title: 'Data Type',
    dataIndex: 'dataType',
    key: 'dataType',
    render: (text, record, isSelected, color) => {
    if (record.dataType == 'Bar') {
    return <div style={{textAlign: 'left'}}>
    <Popover style={{textAlign: 'center'}} content={content} title="Select Type and Save" trigger="click">
    <Icon type="bar-chart" style={{fontSize: '32px', color: record.color}}
    onClick={() => this.changeData(record.key)}>
      Click me
    </Icon>
    </Popover>
    </div>
    }
    if (record.dataType == 'Area') {
    return <div style={{textAlign: 'left'}}>
    <Popover style={{textAlign: 'center'}} content={content} title="Select Type and Save" trigger="click">
    <Icon type="area-chart" style={{fontSize: '32px', color: record.color}}
    onClick={() => this.changeData(record.key)}>
      Click me
    </Icon>
    </Popover>
    </div>
    }
    if (record.dataType == 'Line') {
    return <div style={{textAlign: 'left'}}>
    <Popover style={{textAlign: 'center'}} content={content} title="Select Type and Save" trigger="click">
    <Icon type="line-chart" style={{fontSize: '32px', color: record.color}}
    onClick={() => this.changeData(record.key)}>
      Click me
    </Icon>
    </Popover>
    </div>
    }
    if (record.dataType == 'Off') {
    return <div style={{textAlign: 'left'}}>
    <Popover style={{textAlign: 'center'}} content={content} title="Select Type and Save" trigger="click">
    <Icon type="close" style={{fontSize: '32px', color: record.color}}
    onClick={() => this.changeData(record.key)}>
      Click me
    </Icon>
    </Popover>
    </div>
    }

    },




    width: 200,
    },
    {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
    render: (text, record, isSelected) =>
    (

    <div style={{textAlign: 'left'}}>
    <Popover content={content1} title="Select Color" trigger="click">
    <Icon type="bg-colors" style={{fontSize: '24px', color: record.color}}
    onClick={() => this.changeColor(record.key)}>
      Click me
    </Icon>
    </Popover>
    </div>

    )

    ,
    width: 200,
    },



    ]


    const content1 = (<div>
    <SketchPicker
    color={ this.state.color }
    onChangeComplete={ this.overwriteColor }
    />
    </div>);

    const content = (
  <div>
    <Row>
    <Radio.Group size="default" value={this.state.dataType} onChange={this.handleSizeChange1}>
<Radio.Button value="Bar">Bar</Radio.Button>
<Radio.Button value="Line">Line</Radio.Button>
<Radio.Button value="Area">Area</Radio.Button>
<Radio.Button value="Off">Off</Radio.Button>
</Radio.Group>
  </Row>


  <Row style={{paddingTop: '10px', textAlign: 'center'}}>
  <Button type="primary"onClick={this.parameterOverwrite}>Save</Button>
  </Row>
</div>
);
    const columns = this.state.tableKeys;

    const data = this.state.snapArray;
    const dataReverse = this.state.graphData;
    const data1 = this.state.snapArray1;
    const csvData = this.state.snapArray;
    const csvData1 = this.state.currentData;



    return (

      <Layout>

        <Drawer

          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible3}
          width={500}
        >
        <Row>

          <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{textAlign: 'left'}}>
          <Icon type="right-circle" onClick={this.visible3Off} style={{fontSize: '24px'}}/>

          </Col>

        </Row>

        <Row style={{paddingTop: '10px'}} type="flex" justify="center">


            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Table columns={columns1} dataSource={data1} onChange={this.onChange} scroll={{ x: '100%'}} />

            </Col>

          </Row>


      </Drawer>




        <div style={{ background: '#F4F7FA', padding: '5px' }}>


        <Row type="flex" justify="center">
          <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{textAlign: 'left'}}>

            <Row style={{paddingTop: '20px'}} type="flex" justify="center">
              <Col span={24}>

                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <Card  style={{textAlign: 'left', height: 300,}} bordered={true} >
             <div style={{textAlign: 'center'}}>
             <p style={{fontSize: '18px'}}><b>{this.state.lakeName}</b></p>
               <img style={{width: '60px', height: '60px'}} src={this.state.currentIcon} />
               <p>{this.state.currentDescription}</p>
               <p>Temperature: {this.state.currentTemp} F</p>
               <p>Humidity: {this.state.currentHumidity}%</p>
               </div>
            </Card>
            </Col>


            <Col offset={1} xs={24} sm={15} md={15} lg={15} xl={15}>
            <Card  style={{textAlign: 'left', height: 300,}} bordered={true} >
             <div style={{  height: 250, width: '100%' }}>
               <GoogleMapReact

                 bootstrapURLKeys={{ key: 'AIzaSyAqe1Z8I94AcnNb3VsOam1tnUd_8WdubV4'}}
                 center={this.state.center
                 }
                 defaultZoom={this.props.zoom}
               >
                 <AnyReactComponent
                   lat={this.state.latitude}
                   lng={this.state.longitude}
                   text={this.state.lakeName}
                 />
               </GoogleMapReact>
             </div>
            </Card>
            </Col>




            </Col>
            </Row>


          <Row type="flex" justify="center" style={{paddingTop: '20px'}}>
            <Col span={24} style={{textAlign: 'center'}}>
              <Card style={{ width: '100%' }}>
                <Row>
                  <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{textAlign: 'left'}}>


                  </Col>
                  <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{textAlign: 'left'}}>


                  </Col>
                  <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{textAlign: 'right'}}>
                    <Radio.Group size="small" style={{fontSize: '10px'}} value={this.state.timeFrame} onChange={this.handleTimeFrameChange} >
              <Radio.Button value="three" onClick={this.threeMonths}>3 Months</Radio.Button>
              <Radio.Button value="six" onClick={this.sixMonths}>6 Months</Radio.Button>
              <Radio.Button value="twelve" onClick={this.twelveMonths}>12 Months</Radio.Button>
              <Radio.Button value="All" onClick={this.allMonths}>All</Radio.Button>
              <Radio.Button value="Edit Chart" onClick={this.visible3}>Edit</Radio.Button>
            </Radio.Group>

                  </Col>



                </Row>



        <ResponsiveContainer width="100%" aspect={10/3.0} minHeight={300}>
                  <ComposedChart data={dataReverse}
            syncId="anyId">


            <XAxis dataKey="date"><Label  offset={200} position="top" /></XAxis>

            <YAxis hide= "true" type="number" domain={[dataMin => (0 - Math.abs(dataMin)), dataMax => (dataMax * 2)]} />
            <Tooltip />


            <defs>
              {data1.map(parameter => {
                return (

                    <linearGradient id={parameter.Sample_Item} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={parameter.color} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={parameter.color} stopOpacity={0.1}/>
                    </linearGradient>


                )
              })}
  </defs>




              {data1.map(parameter => {

                if (parameter.dataType == 'Bar') {
                  console.log('something 1')
                  const CustomTag = Bar;
                  return(
                    <CustomTag type="monotone" dataKey={parameter.Sample_Item}  fillOpacity={1} strokeWidth={2} stroke={parameter.color} fill={"url(#" + parameter.Sample_Item + ")"}><LabelList dataKey={parameter.Sample_Item} position="top" /></CustomTag>
                  )
                }
                if (parameter.dataType == 'Line') {
                  console.log('something 2')
                  const CustomTag = Line;
                  return(
                    <CustomTag type="monotone" dataKey={parameter.Sample_Item}  fillOpacity={1} strokeWidth={2} stroke={parameter.color} fill={"url(#" + parameter.Sample_Item + ")"}><LabelList dataKey={parameter.Sample_Item} position="top" /></CustomTag>
                  )
                }
                if (parameter.dataType == 'Area') {
                  console.log('something 3')
                  const CustomTag = Area;
                  return(
                    <CustomTag type="monotone" dataKey={parameter.Sample_Item}  fillOpacity={1} strokeWidth={2} stroke={parameter.color} fill={"url(#" + parameter.Sample_Item + ")"}><LabelList dataKey={parameter.Sample_Item} position="top" /></CustomTag>
                  )
                }

                if (parameter.dataType == 'Off') {
                  console.log('No graph')


                }


              })}







            <Legend />

          </ComposedChart>
           </ResponsiveContainer>
              </Card>
            </Col>


          </Row>

          <Row style={{paddingTop: '20px'}} type="flex" justify="center">
            <Col span={24}>
            <Card style={{ width: '100%'}} bodyStyle={{padding: "0"}}>
              <Row align="middle">
                <p style={{paddingTop: '25px', paddingLeft: '20px', fontSize: '24px'}}>Water Quality</p>
              </Row>
              <Row  type="flex" justify="center">


                {data1.map(parameter => {

                  const item = parameter.Sample_Item;
                  const item3 = item.replace(/^"(.*)"$/, '$1');
                  const item2 = this.state.latestSample[item3];


                  console.log(item);
                  console.log(item2);
                  console.log(item3);





                    return(
                      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card >
            <Row>
              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
              <Icon type="up-circle"style={{fontSize: '32px',color: parameter.color}} />
              </Col>
              <Col  xs={16} sm={16} md={16} lg={16} xl={16}>
              <b style={{fontSize: '24px'}}>{parameter.Sample_Item}</b>
              </Col>
              </Row>
              <Row>

                <Col  xs={16} sm={16} md={16} lg={16} xl={16}>
                <b style={{fontSize: '17px'}}>{item2} {parameter.units}</b>
                </Col>
                </Row>
              <Row>

                      <ResponsiveContainer width="100%" aspect={6/3.0} minHeight={90}>

                      <ComposedChart data={dataReverse}
                syncId="anyId">

                <XAxis tick={{fontSize: 10}} dataKey="date"></XAxis>

                <YAxis hide= "true" type="number" domain={[dataMin => (0 - Math.abs(dataMin)), dataMax => (dataMax * 2)]} />
                <Tooltip />

                      <Line type="monotone" dataKey={parameter.Sample_Item}  fillOpacity={1} strokeWidth={2} stroke={parameter.color} fill={"url(#" + parameter.Sample_Item + ")"}></Line>




              </ComposedChart>
              </ResponsiveContainer>
              </Row>
              </Card>
              </Col>
                    )




                })}




                        </Row>

            </Card>
            </Col>

          </Row>


































</Col>
</Row>




  </div>



      </Layout>



    )
  }
}
