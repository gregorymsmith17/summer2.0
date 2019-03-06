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

import flow from 'lodash/flow';
import { findDOMNode } from 'react-dom';

import { DragDropContext, DropTarget, DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import update from 'immutability-helper';

import dashForecast from './dashForecast';
import { WiDaySunny, WiNightFog, WiDayFog, WiDaySprinkle, WiNightAltSprinkle, WiNightSprinkle, WiNightClear, WiNightAltCloudy, WiNightAltCloud, WiDayCloudy, WiNightAltCloudyWindy, WiDayWindy, WiSnow, WiRain, WiThunderstorm, WiTornado, WiSmoke, WiFog, WiSnowWind, WiDayCloudyWindy, WiSleet, WiRainMix, WiDust, WiCloud, WiHot, WiSnowflakeCold, WiRaindrops, WiSprinkle } from 'weather-icons-react';


const AnyReactComponent = ({ text }) => <div><Icon type="environment" style={{color: 'red', paddingLeft: 10, fontSize: '20px'}}/></div>;




const styleCard = {

	backgroundColor: 'white',
	cursor: 'move'
};


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
        dataTable: [],

        weatherData: [],
        tonight: '',
        currentWeather: [],
        currentTemp: '',
        currentIcon: '',

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
        cardList: [],
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

        graphType: Line,
        dataType1: '',






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



             const list = [];
             const data = this.state.graphData;
             const CustomTag = this.state.graphType;

             console.log(CustomTag)


             for (let i=0; i < maintenanceArray.length; i++) {
               const CustomTag = this.state.graphType;
             //push send this data to the back of the chartData variable above.
             list.push({id: i, text: maintenanceArray[i].Sample_Item, color: maintenanceArray[i].color, dataType: maintenanceArray[i].dataType, graph: (


                 <div>
                   <Row>
                   <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                   <Icon type="up-circle"style={{fontSize: '32px',color: maintenanceArray[i].color}} />
                   </Col>
                   <Col  xs={16} sm={16} md={16} lg={16} xl={16}>
                   <b style={{fontSize: '24px'}}>{maintenanceArray[i].Sample_Item}</b>
                   </Col>
                   </Row>
                   <Row>

                     <Col  xs={16} sm={16} md={16} lg={16} xl={16}>
                     <b style={{fontSize: '17px'}}>{maintenanceArray[i].units}</b>
                     </Col>
                     </Row>
                   <Row>


      <ResponsiveContainer width="100%" aspect={6/3.0} minHeight={100}>

      <ComposedChart data={data}
syncId="anyId">

<XAxis tick={{fontSize: 10}} dataKey="date"></XAxis>

<YAxis hide= "true" type="number" domain={[dataMin => (0 - Math.abs(dataMin)), dataMax => (dataMax * 2)]} />
<Tooltip />

      <CustomTag type="monotone" dataKey={maintenanceArray[i].Sample_Item}  fillOpacity={1} strokeWidth={2} stroke={maintenanceArray[i].color} fill={"url(#" + maintenanceArray[i].Sample_Item + ")"}><LabelList dataKey={maintenanceArray[i].Sample_Item} position="top" /></CustomTag>

</ComposedChart>
</ResponsiveContainer>

</Row>
</div>




    )});

             }

             this.setState({
               snapArray1: maintenanceArray,
               cardList: list,
             })

             console.log(this.state.cardList)

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


           console.log(this.state.latitude);
           console.log(this.state.longitude);
                     var myLat = `${this.state.latitude}`;
                       var myLon = `${this.state.longitude}`;
                    let API_WEATHER = `https://api.weather.gov/points/${myLat},${myLon}/forecast`;


                    fetch(API_WEATHER)
                 .then(response => response.json())
                 .then(responseJson => {
                   console.log(responseJson);
                   console.log(responseJson.properties.periods);
                   console.log([responseJson.properties.periods[0]]);
                   this.setState({
                     weatherData: [
                       responseJson.properties.periods[1],
                       responseJson.properties.periods[2],
                       responseJson.properties.periods[3],
                       responseJson.properties.periods[4],
                       responseJson.properties.periods[5],
                       responseJson.properties.periods[6],
                       responseJson.properties.periods[7],
                       responseJson.properties.periods[8],
                       responseJson.properties.periods[9],
                       responseJson.properties.periods[10],
                       responseJson.properties.periods[11],
                       responseJson.properties.periods[12],
                       responseJson.properties.periods[13],
                     ],
                     currentWeather: [responseJson.properties.periods[0]],

                   })


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

    var object = {Sample_Item: this.state.Sample_Item, units: this.state.units, color: this.state.color, dataType: e.target.value, Sample_Input: '', id: this.state.id};

    sampleListRef.set(object);

  }

  handleSizeChange1 = (e) => {

  this.setState({ dataType: e.target.value,
  overwrite: null, });

  const sampleListRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/sampleList/${this.state.id}`);
  this.setState({ dataType: e.target.value });

  var object = {Sample_Item: this.state.Sample_Item, units: this.state.units, color: this.state.color, dataType: e.target.value, Sample_Input: '', id: this.state.id};

  sampleListRef.set(object);



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

			if (this.state.snapArray.length < 12) {
				this.setState({
		    graphData: this.state.snapArray,
		    })

			}

			if (this.state.snapArray.length >= 12) {
				this.setState({
		    graphData: this.state.twelveData,
		    })

			}


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

   test = () => {

     const listOne = [
       { id: 1, text: "Item 1" },
       { id: 2, text: "Item 2" },
       { id: 3, text: "Item 3" },
       { id: 4, text: "Item 4" },
       { id: 5, text: "Item 5" },
     ];

     console.log("test");







   }

   handleSizeChange2 = (e) => {

   if ( e.target.value == 'Line') {
     this.setState({
       graphType: Line
     })
   }
   if ( e.target.value == 'Bar') {
     this.setState({
       graphType: Bar
     })
   }
   if ( e.target.value == 'Area') {
     this.setState({
       graphType: Area
     })
   }


   }






  render() {

    const columns = this.state.tableKeys;

    const data = this.state.snapArray;
    const dataReverse = this.state.graphData;
    const data1 = this.state.snapArray1;
    const csvData = this.state.snapArray;
    const csvData1 = this.state.currentData;
    const latestSample = this.state.latestSample;

    const cardList = this.state.cardList;



    class Card1 extends Component {

    	render() {
    		const { card, isDragging, connectDragSource, connectDropTarget } = this.props;
    		const opacity = isDragging ? 0 : 1;

    		return connectDragSource(connectDropTarget(
    			<div style={{ ...styleCard, opacity }}>

    				<Card >
    				{card.graph}
    				</Card>
    			</div>
    		));
    	}
    }

    const cardSource = {

    	beginDrag(props) {
    		return {
    			index: props.index,
    			listId: props.listId,
    			card: props.card
    		};
    	},

    	endDrag(props, monitor) {
    		const item = monitor.getItem();
    		const dropResult = monitor.getDropResult();

    		if ( dropResult && dropResult.listId !== item.listId ) {
    			props.removeCard(item.index);
    		}
    	}
    };

    const cardTarget = {

    	hover(props, monitor, component) {
    		const dragIndex = monitor.getItem().index;
    		const hoverIndex = props.index;
    		const sourceListId = monitor.getItem().listId;

    		// Don't replace items with themselves
    		if (dragIndex === hoverIndex) {
    			return;
    		}

    		// Determine rectangle on screen
    		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    		// Get vertical middle
    		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    		// Determine mouse position
    		const clientOffset = monitor.getClientOffset();

    		// Get pixels to the top
    		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    		// Only perform the move when the mouse has crossed half of the items height
    		// When dragging downwards, only move when the cursor is below 50%
    		// When dragging upwards, only move when the cursor is above 50%

    		// Dragging downwards
    		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    			return;
    		}

    		// Dragging upwards
    		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    			return;
    		}

    		// Time to actually perform the action
    		if ( props.listId === sourceListId ) {
    			props.moveCard(dragIndex, hoverIndex);

    			// Note: we're mutating the monitor item here!
    			// Generally it's better to avoid mutations,
    			// but it's good here for the sake of performance
    			// to avoid expensive index searches.
    			monitor.getItem().index = hoverIndex;
    		}
    	}
    };

    const CardGraph = flow(
    	DropTarget("CARD", cardTarget, connect => ({
    		connectDropTarget: connect.dropTarget()
    	})),
    	DragSource("CARD", cardSource, (connect, monitor) => ({
    		connectDragSource: connect.dragSource(),
    		isDragging: monitor.isDragging()
    	}))
    )(Card1);


    class Container extends Component {

    	constructor(props) {
    		super(props);
    		this.state = { cards: props.list };
    	}

    	pushCard(card) {
    		this.setState(update(this.state, {
    			cards: {
    				$push: [ card ]
    			}
    		}));
    	}

    	removeCard(index) {
    		this.setState(update(this.state, {
    			cards: {
    				$splice: [
    					[index, 1]
    				]
    			}
    		}));
    	}

    	moveCard(dragIndex, hoverIndex) {
    		const { cards } = this.state;
    		const dragCard = cards[dragIndex];

    		this.setState(update(this.state, {
    			cards: {
    				$splice: [
    					[dragIndex, 1],
    					[hoverIndex, 0, dragCard]
    				]
    			}
    		}));
    	}

    	render() {
    		const { cards } = this.state;
    		const { canDrop, isOver, connectDropTarget } = this.props;
    		const isActive = canDrop && isOver;


    		const backgroundColor = isActive ? 'lightgreen' : '#FFF';

    		return connectDropTarget(
    			<div style={{backgroundColor}}>
    				<Row>
    				{cards.map((card, i) => {
    					return (
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
    						<CardGraph
    							key={card.id}
    							index={i}
    							listId={this.props.id}
    							card={card}
    							removeCard={this.removeCard.bind(this)}
    							moveCard={this.moveCard.bind(this)} />
    						</Col>
    					);
    				})}
    				</Row>
    			</div>
    		);
      }
    }

    const cardTarget1 = {
    	drop(props, monitor, component ) {
    		const { id } = props;
    		const sourceObj = monitor.getItem();
    		if ( id !== sourceObj.listId ) component.pushCard(sourceObj.card);
    		return {
    			listId: id
    		};
    	}
    }

    const ContainerGraph =  DropTarget("CARD", cardTarget1, (connect, monitor) => ({
    	connectDropTarget: connect.dropTarget(),
    	isOver: monitor.isOver(),
    	canDrop: monitor.canDrop()
    }))(Container);


    let dragingIndex = -1;

    class BodyRow extends React.Component {
      render() {
        const {
          isOver,
          connectDragSource,
          connectDropTarget,
          moveRow,
          ...restProps
        } = this.props;
        const style = { ...restProps.style, cursor: 'move' };

        let className = restProps.className;
        if (isOver) {
          if (restProps.index > dragingIndex) {
            className += ' drop-over-downward';
          }
          if (restProps.index < dragingIndex) {
            className += ' drop-over-upward';
          }
        }

        return connectDragSource(
          connectDropTarget(
            <tr
              {...restProps}
              className={className}
              style={style}
            />
          )
        );
      }
    }

    const rowSource = {
      beginDrag(props) {
        dragingIndex = props.index;
        return {
          index: props.index,
        };
      },
    };

    const rowTarget = {
      drop(props, monitor) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }

        // Time to actually perform the action
        props.moveRow(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
      },
    };

    const DragableBodyRow = DropTarget(
      'row',
      rowTarget,
      (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
      }),
    )(
      DragSource(
        'row',
        rowSource,
        (connect) => ({
          connectDragSource: connect.dragSource(),
        }),
      )(BodyRow),
    );

    const columns2 = [{
   title: 'Title',
   dataIndex: 'Sample_Item',
   key: 'Sample_Item',
   width: 180,
   }];

   class Cards extends React.Component {

     state = {
       cardList: cardList,
			 dataTable: data1,
			 dataType1: '',
			 graphType: 'Line'

     }

     handleSizeChange2 = (e) => {

     if ( e.target.value == 'Line') {
       this.setState({
         graphType: 'Line'
       })
     }
     if ( e.target.value == 'Bar') {
       this.setState({
         graphType: 'Bar'
       })
     }
     if ( e.target.value == 'Area') {
       this.setState({
         graphType: 'Area'
       })
     }


     }



    render() {





      const list = [];


			console.log(this.state.graphType)


      for (let i=0; i < data1.length; i++) {

      //push send this data to the back of the chartData variable above.
      list.push({id: i, text: data1[i].Sample_Item, color: data1[i].color, dataType: data1[i].dataType, graph: (
          <div>
            <Row>
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <Icon type="up-circle"style={{fontSize: '32px',color: data1[i].color}} />
            </Col>
            <Col  xs={16} sm={16} md={16} lg={16} xl={16}>
            <b style={{fontSize: '24px'}}>{data1[i].Sample_Item} </b><p>{data1[i].units}</p>
            </Col>
            </Row>

            <Row>

							<Col  xs={0} sm={24} md={24} lg={24} xl={24}>
              <ResponsiveContainer width="100%" aspect={6/3.0} minHeight={100}>

                <ComposedChart data={data}
                  syncId="anyId">

                  <XAxis tick={{fontSize: 10}} dataKey="date"></XAxis>

                  <YAxis hide= "true" type="number" domain={[dataMin => (0 - Math.abs(dataMin)), dataMax => (dataMax * 2)]} />
                  <Tooltip />

                  <Line type="monotone" dataKey={data1[i].Sample_Item}  fillOpacity={1} strokeWidth={2} stroke={data1[i].color} fill={"url(#" + data1[i].Sample_Item + ")"}><LabelList dataKey={data1[i].Sample_Item} position="top" /></Line>

                </ComposedChart>
              </ResponsiveContainer>
						</Col>
            </Row>
          </div>

)});

      }

      const listOne = list;






      return (
        <div >
					<Row  type="flex" justify="center">
						<Col xs={16} sm={16} md={16} lg={16} xl={16} style={{textAlign: 'left'}}>
						<p style={{paddingTop: '25px', paddingLeft: '20px', fontSize: '24px'}}>Water Quality</p>
						</Col>

						<Col xs={24} sm={8} md={8} lg={8} xl={8} style={{textAlign: 'right'}}>
						<p style={{paddingTop: '25px', paddingRight: '50px', fontSize: '12px'}}>(Click and Drag to ReOrder)</p>
						</Col>


					</Row>
         <Row>

          <ContainerGraph id={1} list={listOne} />
          </Row>
        </div>
      );
    }
   }
   const DragContainer = DragDropContext(HTML5Backend)(Cards);



    class DragSortingTable extends React.Component {
      state = {
        dataTable: data1,
        dataType1: '',
        graphType: Line
      }

      components = {
        body: {
          row: DragableBodyRow,
        },
      }

      moveRow = (dragIndex, hoverIndex) => {
        const { dataTable } = this.state;
        const dragRow = dataTable[dragIndex];

        this.setState(
          update(this.state, {
            dataTable: {
              $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
            },
          }),
          console.log(this.state.dataTable
    )
        );
      }




      render() {



        return (
          <div>


            <Row><DragContainer /></Row>


                    </div>

        );
      }
    }

    const Demo = DragDropContext(HTML5Backend)(DragSortingTable);






    const center = {
      lat: this.state.latitude,
      lng: this.state.longitude
    };



    const columns1 = [
     {
    title: 'Title',
    dataIndex: 'Sample_Item',
    key: 'Sample_Item',
    width: 180,
    },
    {
    title: 'Data Type',
    dataIndex: 'dataType',
    key: 'dataType',
    render: (text, record, isSelected, color) => {
    if (record.dataType == 'Bar') {
    return <div style={{textAlign: 'left'}}>
    <Popover style={{textAlign: 'center'}} content={content} title="Select Type" trigger="click">
    <Icon type="bar-chart" style={{fontSize: '32px', color: record.color}}
    onClick={() => this.changeData(record.key)}>
      Click me
    </Icon>
    </Popover>
    </div>
    }
    if (record.dataType == 'Area') {
    return <div style={{textAlign: 'left'}}>
    <Popover style={{textAlign: 'center'}} content={content} title="Select Type" trigger="click">
    <Icon type="area-chart" style={{fontSize: '32px', color: record.color}}
    onClick={() => this.changeData(record.key)}>
      Click me
    </Icon>
    </Popover>
    </div>
    }
    if (record.dataType == 'Line') {
    return <div style={{textAlign: 'left'}}>
    <Popover style={{textAlign: 'center'}} content={content} title="Select Type" trigger="click">
    <Icon type="line-chart" style={{fontSize: '32px', color: record.color}}
    onClick={() => this.changeData(record.key)}>
      Click me
    </Icon>
    </Popover>
    </div>
    }
    if (record.dataType == 'Off') {
    return <div style={{textAlign: 'left'}}>
    <Popover style={{textAlign: 'center'}} content={content} title="Select Type" trigger="click">
    <Icon type="close" style={{fontSize: '32px', color: record.color}}
    onClick={() => this.changeData(record.key)}>
      Click me
    </Icon>
    </Popover>
    </div>
    }

    },





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

    },



    ]

    const demoPopover = ( <Demo />)


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
</div>
);






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



                    <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                      <Card  style={{height: 397, paddingTop: 15}} bordered={true} >

                        <Row>

													<Col xs={0} sm={24} md={24} lg={24} xl={24}>


														{this.state.currentWeather.map((parameter) => {

															if (parameter.icon.includes('fog') & parameter.icon.includes('night') ) {
																const CustomTag = WiNightFog;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('rain,30') & parameter.icon.includes('night') ) {
																const CustomTag = WiNightAltSprinkle;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('skc') & parameter.icon.includes('night') ) {
																const CustomTag = WiNightClear;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('skc') & parameter.icon.includes('day') ) {
																const CustomTag = WiDaySunny;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('few') & parameter.icon.includes('night') ) {
																const CustomTag = WiNightClear;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('few') & parameter.icon.includes('day') ) {
																const CustomTag = WiDaySunny;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('sct') & parameter.icon.includes('night') ) {
																const CustomTag = WiNightClear;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('sct') & parameter.icon.includes('day') ) {
																const CustomTag = WiDaySunny;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('bkn') & parameter.icon.includes('night') ) {
																const CustomTag = WiNightAltCloudy;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('bkn') & parameter.icon.includes('day') ) {
																const CustomTag = WiDayCloudy;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('ovc') & parameter.icon.includes('night') ) {
																const CustomTag = WiNightAltCloudy;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('ovc') & parameter.icon.includes('day') ) {
																const CustomTag = WiDayCloudy;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('wind_skc') & parameter.icon.includes('night') ) {
																const CustomTag = WiNightAltCloudyWindy;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('wind_skc') & parameter.icon.includes('day') ) {
																const CustomTag = WiDayWindy;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('wind_few') & parameter.icon.includes('night') ) {
																const CustomTag = WiNightAltCloudyWindy;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('wind_few') & parameter.icon.includes('day') ) {
																const CustomTag = WiDayWindy;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('wind_sct') & parameter.icon.includes('night') ) {
																const CustomTag = WiNightAltCloudyWindy;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('wind_sct') & parameter.icon.includes('day') ) {
																const CustomTag = WiDayCloudyWindy;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('wind_bkn') & parameter.icon.includes('night') ) {
																const CustomTag = WiNightAltCloudyWindy;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('wind_bkn') & parameter.icon.includes('day') ) {
																const CustomTag = WiDayCloudyWindy;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('wind_ovc') & parameter.icon.includes('night') ) {
																const CustomTag = WiNightAltCloudyWindy;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('wind_ovc') & parameter.icon.includes('day') ) {
																const CustomTag = WiDayCloudyWindy;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('snow') & parameter.icon.includes('night') ) {
																const CustomTag = WiSnow;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('snow') & parameter.icon.includes('day') ) {
																const CustomTag = WiSnow;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('rain_snow') & parameter.icon.includes('night') ) {
																const CustomTag = WiSnow;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('rain_snow') & parameter.icon.includes('day') ) {
																const CustomTag = WiSnow;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('rain_sleet') & parameter.icon.includes('night') ) {
																const CustomTag = WiSleet;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('rain_sleet') & parameter.icon.includes('day') ) {
																const CustomTag = WiSleet;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('snow_sleet') & parameter.icon.includes('night') ) {
																const CustomTag = WiSnow;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('snow_sleet') & parameter.icon.includes('day') ) {
																const CustomTag = WiSnow;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('fzra') & parameter.icon.includes('night') ) {
																const CustomTag = WiRainMix;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('fzra') & parameter.icon.includes('day') ) {
																const CustomTag = WiRainMix;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('rain_fzra') & parameter.icon.includes('night') ) {
																const CustomTag = WiRainMix;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('rain_fzra') & parameter.icon.includes('day') ) {
																const CustomTag = WiRainMix;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('snow_fzra') & parameter.icon.includes('night') ) {
																const CustomTag = WiRainMix;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('snow_fzra') & parameter.icon.includes('day') ) {
																const CustomTag = WiRainMix;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('sleet') & parameter.icon.includes('night') ) {
																const CustomTag = WiRainMix;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('sleet') & parameter.icon.includes('day') ) {
																const CustomTag = WiRainMix;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('rain') & parameter.icon.includes('night') ) {
																const CustomTag = WiRain;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('rain') & parameter.icon.includes('day') ) {
																const CustomTag = WiRain;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('rain_showers') & parameter.icon.includes('night') ) {
																const CustomTag = WiRain;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('rain_showers') & parameter.icon.includes('day') ) {
																const CustomTag = WiRain;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('rain_showers_hi') & parameter.icon.includes('night') ) {
																const CustomTag = WiRain;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('rain_showers_hi') & parameter.icon.includes('day') ) {
																const CustomTag = WiRain;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('tsra') & parameter.icon.includes('night') ) {
																const CustomTag = WiThunderstorm;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('tsra') & parameter.icon.includes('day') ) {
																const CustomTag = WiThunderstorm;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('tsra_sct') & parameter.icon.includes('night') ) {
																const CustomTag = WiThunderstorm;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('tsra_sct') & parameter.icon.includes('day') ) {
																const CustomTag = WiThunderstorm;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('tsra_hi') & parameter.icon.includes('night') ) {
																const CustomTag = WiThunderstorm;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('tsra_hi') & parameter.icon.includes('day') ) {
																const CustomTag = WiThunderstorm;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('tornado') & parameter.icon.includes('night') ) {
																const CustomTag = WiTornado;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('tornado') & parameter.icon.includes('day') ) {
																const CustomTag = WiTornado;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('hurricane') & parameter.icon.includes('night') ) {
																const CustomTag = WiThunderstorm;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('hurricane') & parameter.icon.includes('day') ) {
																const CustomTag = WiThunderstorm;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('tropical_storm') & parameter.icon.includes('night') ) {
																const CustomTag = WiThunderstorm;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('tropical_storm') & parameter.icon.includes('day') ) {
																const CustomTag = WiThunderstorm;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('dust') & parameter.icon.includes('night') ) {
																const CustomTag = WiDust;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('dust') & parameter.icon.includes('day') ) {
																const CustomTag = WiDust;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('smoke') & parameter.icon.includes('night') ) {
																const CustomTag = WiSmoke;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('smoke') & parameter.icon.includes('day') ) {
																const CustomTag = WiSmoke;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('haze') & parameter.icon.includes('night') ) {
																const CustomTag = WiSmoke;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('haze') & parameter.icon.includes('day') ) {
																const CustomTag = WiCloud;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('hot') & parameter.icon.includes('night') ) {
																const CustomTag = WiHot;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('hot') & parameter.icon.includes('day') ) {
																const CustomTag = WiHot;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('cold') & parameter.icon.includes('night') ) {
																const CustomTag = WiSnowflakeCold;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('cold') & parameter.icon.includes('day') ) {
																const CustomTag = WiSnowflakeCold;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('blizzard') & parameter.icon.includes('night') ) {
																const CustomTag = WiSnowWind;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('blizzard') & parameter.icon.includes('day') ) {
																const CustomTag = WiSnowWind;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('fog') & parameter.icon.includes('night') ) {
																const CustomTag = WiFog;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

															if (parameter.icon.includes('fog') & parameter.icon.includes('day') ) {
																const CustomTag = WiFog;
																return (<Col span={24}><Col span={8}><p style={{fontSize: 22, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontSize: 18, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 45}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}



													})}

													</Col>

												<Col xs={24} sm={0} md={0} lg={0} xl={0}>


													{this.state.currentWeather.map((parameter) => {

														if (parameter.icon.includes('fog') & parameter.icon.includes('night') ) {
															const CustomTag = WiNightFog;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('rain,30') & parameter.icon.includes('night') ) {
															const CustomTag = WiNightAltSprinkle;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('skc') & parameter.icon.includes('night') ) {
															const CustomTag = WiNightClear;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('skc') & parameter.icon.includes('day') ) {
															const CustomTag = WiDaySunny;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('few') & parameter.icon.includes('night') ) {
															const CustomTag = WiNightClear;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('few') & parameter.icon.includes('day') ) {
															const CustomTag = WiDaySunny;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('sct') & parameter.icon.includes('night') ) {
															const CustomTag = WiNightClear;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('sct') & parameter.icon.includes('day') ) {
															const CustomTag = WiDaySunny;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('bkn') & parameter.icon.includes('night') ) {
															const CustomTag = WiNightAltCloudy;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('bkn') & parameter.icon.includes('day') ) {
															const CustomTag = WiDayCloudy;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('ovc') & parameter.icon.includes('night') ) {
															const CustomTag = WiNightAltCloudy;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('ovc') & parameter.icon.includes('day') ) {
															const CustomTag = WiDayCloudy;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('wind_skc') & parameter.icon.includes('night') ) {
															const CustomTag = WiNightAltCloudyWindy;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('wind_skc') & parameter.icon.includes('day') ) {
															const CustomTag = WiDayWindy;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('wind_few') & parameter.icon.includes('night') ) {
															const CustomTag = WiNightAltCloudyWindy;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('wind_few') & parameter.icon.includes('day') ) {
															const CustomTag = WiDayWindy;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('wind_sct') & parameter.icon.includes('night') ) {
															const CustomTag = WiNightAltCloudyWindy;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('wind_sct') & parameter.icon.includes('day') ) {
															const CustomTag = WiDayCloudyWindy;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('wind_bkn') & parameter.icon.includes('night') ) {
															const CustomTag = WiNightAltCloudyWindy;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('wind_bkn') & parameter.icon.includes('day') ) {
															const CustomTag = WiDayCloudyWindy;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('wind_ovc') & parameter.icon.includes('night') ) {
															const CustomTag = WiNightAltCloudyWindy;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('wind_ovc') & parameter.icon.includes('day') ) {
															const CustomTag = WiDayCloudyWindy;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('snow') & parameter.icon.includes('night') ) {
															const CustomTag = WiSnow;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('snow') & parameter.icon.includes('day') ) {
															const CustomTag = WiSnow;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('rain_snow') & parameter.icon.includes('night') ) {
															const CustomTag = WiSnow;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('rain_snow') & parameter.icon.includes('day') ) {
															const CustomTag = WiSnow;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('rain_sleet') & parameter.icon.includes('night') ) {
															const CustomTag = WiSleet;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('rain_sleet') & parameter.icon.includes('day') ) {
															const CustomTag = WiSleet;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('snow_sleet') & parameter.icon.includes('night') ) {
															const CustomTag = WiSnow;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('snow_sleet') & parameter.icon.includes('day') ) {
															const CustomTag = WiSnow;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('fzra') & parameter.icon.includes('night') ) {
															const CustomTag = WiRainMix;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('fzra') & parameter.icon.includes('day') ) {
															const CustomTag = WiRainMix;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('rain_fzra') & parameter.icon.includes('night') ) {
															const CustomTag = WiRainMix;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('rain_fzra') & parameter.icon.includes('day') ) {
															const CustomTag = WiRainMix;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('snow_fzra') & parameter.icon.includes('night') ) {
															const CustomTag = WiRainMix;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('snow_fzra') & parameter.icon.includes('day') ) {
															const CustomTag = WiRainMix;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('sleet') & parameter.icon.includes('night') ) {
															const CustomTag = WiRainMix;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('sleet') & parameter.icon.includes('day') ) {
															const CustomTag = WiRainMix;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('rain') & parameter.icon.includes('night') ) {
															const CustomTag = WiRain;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('rain') & parameter.icon.includes('day') ) {
															const CustomTag = WiRain;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('rain_showers') & parameter.icon.includes('night') ) {
															const CustomTag = WiRain;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('rain_showers') & parameter.icon.includes('day') ) {
															const CustomTag = WiRain;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('rain_showers_hi') & parameter.icon.includes('night') ) {
															const CustomTag = WiRain;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('rain_showers_hi') & parameter.icon.includes('day') ) {
															const CustomTag = WiRain;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('tsra') & parameter.icon.includes('night') ) {
															const CustomTag = WiThunderstorm;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('tsra') & parameter.icon.includes('day') ) {
															const CustomTag = WiThunderstorm;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('tsra_sct') & parameter.icon.includes('night') ) {
															const CustomTag = WiThunderstorm;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('tsra_sct') & parameter.icon.includes('day') ) {
															const CustomTag = WiThunderstorm;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('tsra_hi') & parameter.icon.includes('night') ) {
															const CustomTag = WiThunderstorm;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('tsra_hi') & parameter.icon.includes('day') ) {
															const CustomTag = WiThunderstorm;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('tornado') & parameter.icon.includes('night') ) {
															const CustomTag = WiTornado;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('tornado') & parameter.icon.includes('day') ) {
															const CustomTag = WiTornado;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('hurricane') & parameter.icon.includes('night') ) {
															const CustomTag = WiThunderstorm;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('hurricane') & parameter.icon.includes('day') ) {
															const CustomTag = WiThunderstorm;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('tropical_storm') & parameter.icon.includes('night') ) {
															const CustomTag = WiThunderstorm;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('tropical_storm') & parameter.icon.includes('day') ) {
															const CustomTag = WiThunderstorm;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('dust') & parameter.icon.includes('night') ) {
															const CustomTag = WiDust;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('dust') & parameter.icon.includes('day') ) {
															const CustomTag = WiDust;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('smoke') & parameter.icon.includes('night') ) {
															const CustomTag = WiSmoke;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('smoke') & parameter.icon.includes('day') ) {
															const CustomTag = WiSmoke;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('haze') & parameter.icon.includes('night') ) {
															const CustomTag = WiSmoke;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('haze') & parameter.icon.includes('day') ) {
															const CustomTag = WiCloud;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('hot') & parameter.icon.includes('night') ) {
															const CustomTag = WiHot;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('hot') & parameter.icon.includes('day') ) {
															const CustomTag = WiHot;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('cold') & parameter.icon.includes('night') ) {
															const CustomTag = WiSnowflakeCold;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('cold') & parameter.icon.includes('day') ) {
															const CustomTag = WiSnowflakeCold;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('blizzard') & parameter.icon.includes('night') ) {
															const CustomTag = WiSnowWind;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('blizzard') & parameter.icon.includes('day') ) {
															const CustomTag = WiSnowWind;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('fog') & parameter.icon.includes('night') ) {
															const CustomTag = WiFog;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}

														if (parameter.icon.includes('fog') & parameter.icon.includes('day') ) {
															const CustomTag = WiFog;
															return (<Col span={24}><Col span={8}><p style={{fontsize: 16, paddingLeft: 30}}><b>{this.state.lakeName}</b></p><p style={{fontsize: 16, paddingLeft: 30}}>{parameter.shortForecast}</p><p style={{fontSize: 36, paddingLeft: 30}}>{parameter.temperature}{'\u00B0'} F</p></Col> <Col span={15} style={{paddingLeft: 15}}><CustomTag size={200} color='#000000a8' /></Col></Col>)}



												})}

												</Col>


                        </Row>
                        <Row>
                    {this.state.weatherData.map((parameter) => {
                      const forecastCard = (
                        <div>

                      <p>{parameter.name.substring(0,3)}</p>
                      <p>{parameter.temperature}</p>

                      </div>
                    )

                    if (parameter.name.includes('Night') ) {
                      const CustomTag = WiNightFog;
                      return (null)}

                      if (parameter.icon.includes('fog') & parameter.icon.includes('night') ) {
                        const CustomTag = WiNightFog;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('rain,10')  ) {
                        const CustomTag = WiDaySprinkle;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                        if (parameter.icon.includes('rain,20')  ) {
                          const CustomTag = WiDaySprinkle;
                          return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                          if (parameter.icon.includes('rain,30')  ) {
                            const CustomTag = WiDaySprinkle;
                            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                            if (parameter.icon.includes('rain,40')  ) {
                              const CustomTag = WiDaySprinkle;
                              return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                              if (parameter.icon.includes('rain,50')  ) {
                                const CustomTag = WiDaySprinkle;
                                return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                                if (parameter.icon.includes('rain,60')  ) {
                                  const CustomTag = WiRain;
                                  return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                                  if (parameter.icon.includes('rain,70') ) {
                                    const CustomTag = WiRain;
                                    return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                                    if (parameter.icon.includes('rain,80')  ) {
                                      const CustomTag = WiRain;
                                      return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                                      if (parameter.icon.includes('rain,90')  ) {
                                        const CustomTag = WiRain;
                                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                                        if (parameter.icon.includes('rain,100') ) {
                                          const CustomTag = WiRain;
                                          return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col> )}

                      if (parameter.icon.includes('snow,10')  ) {
                        const CustomTag = WiCloud;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                        if (parameter.icon.includes('snow,20')  ) {
                          const CustomTag = WiCloud;
                          return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                          if (parameter.icon.includes('snow,30')  ) {
                            const CustomTag = WiCloud;
                            return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                            if (parameter.icon.includes('snow,40')  ) {
                              const CustomTag = WiDaySprinkle;
                              return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                              if (parameter.icon.includes('snow,50')  ) {
                                const CustomTag = WiDaySprinkle;
                                return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                                if (parameter.icon.includes('snow,60')  ) {
                                  const CustomTag = WiSnow;
                                  return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                                  if (parameter.icon.includes('snow,70') ) {
                                    const CustomTag = WiSnow;
                                    return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                                    if (parameter.icon.includes('snow,80')  ) {
                                      const CustomTag = WiSnow;
                                      return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                                      if (parameter.icon.includes('snow,90')  ) {
                                        const CustomTag = WiSnow;
                                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                                        if (parameter.icon.includes('snow,100') ) {
                                          const CustomTag = WiSnow;
                                          return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col> )}

                      if (parameter.icon.includes('skc') & parameter.icon.includes('night') ) {
                        const CustomTag = WiNightClear;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('skc') & parameter.icon.includes('day') ) {
                        const CustomTag = WiDaySunny;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('few') & parameter.icon.includes('night') ) {
                        const CustomTag = WiNightClear;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('few') & parameter.icon.includes('day') ) {
                        const CustomTag = WiDaySunny;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('sct') & parameter.icon.includes('night') ) {
                        const CustomTag = WiNightClear;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('sct') & parameter.icon.includes('day') ) {
                        const CustomTag = WiDaySunny;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('bkn') & parameter.icon.includes('night') ) {
                        const CustomTag = WiNightAltCloudy;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('bkn') & parameter.icon.includes('day') ) {
                        const CustomTag = WiDayCloudy;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('ovc') & parameter.icon.includes('night') ) {
                        const CustomTag = WiNightAltCloudy;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('ovc') & parameter.icon.includes('day') ) {
                        const CustomTag = WiDayCloudy;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('wind_skc') & parameter.icon.includes('night') ) {
                        const CustomTag = WiNightAltCloudyWindy;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('wind_skc') & parameter.icon.includes('day') ) {
                        const CustomTag = WiDayWindy;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('wind_few') & parameter.icon.includes('night') ) {
                        const CustomTag = WiNightAltCloudyWindy;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('wind_few') & parameter.icon.includes('day') ) {
                        const CustomTag = WiDayWindy;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('wind_sct') & parameter.icon.includes('night') ) {
                        const CustomTag = WiNightAltCloudyWindy;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('wind_sct') & parameter.icon.includes('day') ) {
                        const CustomTag = WiDayCloudyWindy;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('wind_bkn') & parameter.icon.includes('night') ) {
                        const CustomTag = WiNightAltCloudyWindy;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('wind_bkn') & parameter.icon.includes('day') ) {
                        const CustomTag = WiDayCloudyWindy;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('wind_ovc') & parameter.icon.includes('night') ) {
                        const CustomTag = WiNightAltCloudyWindy;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('wind_ovc') & parameter.icon.includes('day') ) {
                        const CustomTag = WiDayCloudyWindy;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('snow') & parameter.icon.includes('night') ) {
                        const CustomTag = WiSnow;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('snow') & parameter.icon.includes('day') ) {
                        const CustomTag = WiSnow;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('rain_snow') & parameter.icon.includes('night') ) {
                        const CustomTag = WiSnow;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('rain_snow') & parameter.icon.includes('day') ) {
                        const CustomTag = WiSnow;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('rain_sleet') & parameter.icon.includes('night') ) {
                        const CustomTag = WiSleet;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('rain_sleet') & parameter.icon.includes('day') ) {
                        const CustomTag = WiSleet;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('snow_sleet') & parameter.icon.includes('night') ) {
                        const CustomTag = WiSnow;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('snow_sleet') & parameter.icon.includes('day') ) {
                        const CustomTag = WiSnow;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('fzra') & parameter.icon.includes('night') ) {
                        const CustomTag = WiRainMix;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('fzra') & parameter.icon.includes('day') ) {
                        const CustomTag = WiRainMix;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('rain_fzra') & parameter.icon.includes('night') ) {
                        const CustomTag = WiRainMix;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('rain_fzra') & parameter.icon.includes('day') ) {
                        const CustomTag = WiRainMix;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('snow_fzra') & parameter.icon.includes('night') ) {
                        const CustomTag = WiRainMix;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('snow_fzra') & parameter.icon.includes('day') ) {
                        const CustomTag = WiRainMix;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('sleet') & parameter.icon.includes('night') ) {
                        const CustomTag = WiRainMix;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('sleet') & parameter.icon.includes('day') ) {
                        const CustomTag = WiRainMix;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('rain') & parameter.icon.includes('night') ) {
                        const CustomTag = WiRain;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('rain') & parameter.icon.includes('day') ) {
                        const CustomTag = WiRain;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('rain_showers') & parameter.icon.includes('night') ) {
                        const CustomTag = WiRain;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('rain_showers') & parameter.icon.includes('day') ) {
                        const CustomTag = WiRain;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('rain_showers_hi') & parameter.icon.includes('night') ) {
                        const CustomTag = WiRain;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('rain_showers_hi') & parameter.icon.includes('day') ) {
                        const CustomTag = WiRain;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('tsra') & parameter.icon.includes('night') ) {
                        const CustomTag = WiThunderstorm;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('tsra') & parameter.icon.includes('day') ) {
                        const CustomTag = WiThunderstorm;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('tsra_sct') & parameter.icon.includes('night') ) {
                        const CustomTag = WiThunderstorm;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('tsra_sct') & parameter.icon.includes('day') ) {
                        const CustomTag = WiThunderstorm;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('tsra_hi') & parameter.icon.includes('night') ) {
                        const CustomTag = WiThunderstorm;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('tsra_hi') & parameter.icon.includes('day') ) {
                        const CustomTag = WiThunderstorm;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('tornado') & parameter.icon.includes('night') ) {
                        const CustomTag = WiTornado;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('tornado') & parameter.icon.includes('day') ) {
                        const CustomTag = WiTornado;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('hurricane') & parameter.icon.includes('night') ) {
                        const CustomTag = WiThunderstorm;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('hurricane') & parameter.icon.includes('day') ) {
                        const CustomTag = WiThunderstorm;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('tropical_storm') & parameter.icon.includes('night') ) {
                        const CustomTag = WiThunderstorm;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('tropical_storm') & parameter.icon.includes('day') ) {
                        const CustomTag = WiThunderstorm;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('dust') & parameter.icon.includes('night') ) {
                        const CustomTag = WiDust;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('dust') & parameter.icon.includes('day') ) {
                        const CustomTag = WiDust;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('smoke') & parameter.icon.includes('night') ) {
                        const CustomTag = WiSmoke;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('smoke') & parameter.icon.includes('day') ) {
                        const CustomTag = WiSmoke;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('haze') & parameter.icon.includes('night') ) {
                        const CustomTag = WiSmoke;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('haze') & parameter.icon.includes('day') ) {
                        const CustomTag = WiCloud;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('hot') & parameter.icon.includes('night') ) {
                        const CustomTag = WiHot;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('hot') & parameter.icon.includes('day') ) {
                        const CustomTag = WiHot;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('cold') & parameter.icon.includes('night') ) {
                        const CustomTag = WiSnowflakeCold;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('cold') & parameter.icon.includes('day') ) {
                        const CustomTag = WiSnowflakeCold;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('blizzard') & parameter.icon.includes('night') ) {
                        const CustomTag = WiSnowWind;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('blizzard') & parameter.icon.includes('day') ) {
                        const CustomTag = WiSnowWind;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('fog') & parameter.icon.includes('night') ) {
                        const CustomTag = WiFog;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}

                      if (parameter.icon.includes('fog') & parameter.icon.includes('day') ) {
                        const CustomTag = WiFog;
                        return (<Col span={3} style={{textAlign: 'center', paddingLeft: 36}}><p style={{fontSize: 12}}>{parameter.name.substring(0,3)}</p><CustomTag size={36} color='#000000a8' /><p>{parameter.temperature}</p></Col>)}







                    })}
                    </Row>
                    </Card>
            </Col>


            <Col xs={24} sm={{ span: 9, offset: 1 }} md={{ span: 9, offset: 1 }} lg={{ span: 9, offset: 1 }} xl={{ span: 9, offset: 1 }}>
            <Card  style={{textAlign: 'left', height: 397}} bordered={true} >
             <div style={{  height: 357, width: '100%' }}>
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
            <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{textAlign: 'center'}}>
              <Card style={{ width: '100%' }}>
                <Row>
                  <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{textAlign: 'left'}}>


                  </Col>
                  <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{textAlign: 'left'}}>


                  </Col>
                  <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{textAlign: 'right'}}>
                    <Radio.Group size="small" style={{fontSize: '12px'}} value={this.state.timeFrame} onChange={this.handleTimeFrameChange} >
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




              <Demo />



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
