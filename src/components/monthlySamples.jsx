import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { Page, Text, View, Document, StyleSheet, Image,  PDFDownloadLink, Font,  } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

import './assetManager/maintenanceReport.css';


import { fire } from '../fire';
import moment from 'moment';

import domtoimage from 'dom-to-image';
import { SketchPicker } from 'react-color';
import fileDownload from "js-file-download";


import { ComposedChart, LineChart, LabelList, ResponsiveContainer, ReferenceArea, AreaChart, Brush, Area, Line, Tooltip, XAxis, YAxis, BarChart, Bar, CartesianGrid, Legend, Label} from 'recharts';

import { Row, Col, Tabs, Table, Divider, Tag, message, Card, Drawer, Menu, Dropdown, Button, Layout, Carousel, Input, Pagination, Popover, Icon, Cascader, Calendar, Switch, Select, AutoComplete, Radio, DatePicker } from 'antd';
import Highlighter from 'react-highlight-words';
import { CSVLink, CSVDownload } from "react-csv";



const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


const TabPane = Tabs.TabPane;

const { Option } = Select;

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}




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






export default class monthlySamples extends Component {


    constructor(props) {
        super(props);
        this.state = {

          parameterAdd: '',

          userID: '',
          currentProject: '',
          key: "1",
          snapArray: [],
          chartArray: [],
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
          units: '',
          dataType: '',
          color: '#000000',

          item: '',
          timeFrame: "All",
          graphData: [],
          turnedOffKeys: [],

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
          overwrite: 'none',



          url: null,
          blob: null,
          file:null,
          blobUrl: null,


          //for drawers
          visible: false,
          visible1: false,
          visible2: false,
          visible3: false,
          visible4: false,
          visible5: false,

          //Inputs for Profile Page
          lakeName: '',
          locationCity: '',
          locationState: '',
          managementContact: '',
          hoaContact: '',
          managementContactNumber: '',
          hoaContactNumber: '',


          startDate: '',
          endDate: '',




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





      componentDidMount() {

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
              console.log(snapArray)
              if (snapArray.length == 0) {
                this.setState({
                  snapArray: [],
                  threeData: [],
                  sixData: [],
                  twelveData: [],
                  graphData: [],
                  tableKeys: [],
                })
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


                  const item3 = txt.replace(/^"(.*)"$/, '$1');
                  const item4 = "a"+"."+item3;


                  console.log(item3);
                  console.log(item4);

                  return (

                  {
                  title:txt,
                  dataIndex: txt,
                  key: txt,
                  ...this.getColumnSearchProps(txt),
                  sorter: (a, b) => { return a[item3] - b[item3]},
                  sortDirections: ['descend', 'ascend'],


                }
                )})



                tableKeys.unshift({
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                ...this.getColumnSearchProps('date'),
                sorter: (a, b) => { return a.date.localeCompare(b.date)},
                sortDirections: ['descend', 'ascend'],


                })

                tableKeys.unshift({
                title: 'ID',
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
                  width: 60,
                })
                console.log(data);
                let reverseData = data.reverse();
                let threeData = [data[2], data[1], data[0]];
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
                console.log(reverseData1);




                this.setState({
                  snapArray: data,
                  chartArray: data.reverse(),
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

closeSampleForm = () => {
  this.setState({
    visibleSampleForm: false,
  })
}

showDrawer = () => {



  const sampleList2Ref = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/sampleList`);
  sampleList2Ref.on('value', (snapshot) => {
    let maintenanceArray = this.snapshotToArray(snapshot);
    console.log(maintenanceArray)
    this.setState({
      snapArray1: maintenanceArray,

    })
  })


    this.setState({
      arrayKeys1: [],
      arrayValues1: [],
      sampleDate: '',
      sampleID: '',
      sampleTitle: '',
      sampleMisc: '',

      visibleSampleForm: true,



    })






};














showDrawer4 = () => {


    this.setState({

      parameterAdd: 'none',
      visible4: true,
      Sample_Item: '',
      dataType: '',
      color: '#000000',
      units: '',




    })

};

onClose = () => {
  this.setState({
    visible: false,
    visible1: false,
    visible2: false,
    visible3: false,


  });
};

visible4Close = () => {
  this.setState({
    visible4: false,
  })
}
visible5Close = () => {
  this.setState({
    visible5: false,
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

  sortColumn = (txt) => {
    return (
      <div style={{textAlign: 'center'}}>
      <Icon type="copy" style={{fontSize: '24px', color: '#101441'}}
      onClick={() => this.testColumn(txt)}>
        Click me
      </Icon>
      </div>
    )
  }

  testColumn(txt) {
    console.log(txt)
  }

  deleteRow = (row, isSelected, e, id, key) =>
  {

    const content = (
  <div style={{textAlign: 'center'}}>
    <p>This will affect your dashboard graphs <br /> are you sure you want to delete?</p>
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

   const sampleRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/sampleReport/${itemId}`);
   sampleRef.remove();
 }

 deleteRow1 = (row, isSelected, e, id, key) =>
 {

   const content = (
 <div style={{textAlign: 'center'}}>
   <p>This will affect your dashboard graphs <br /> are you sure you want to delete?</p>
   <Button type="primary" onClick={() => this.removesample1(isSelected.key)}>Delete</Button>
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



 removesample1(itemId) {

  const sampleRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/sampleList/${itemId}`);
  sampleRef.remove();
}

removesample2(itemId) {

  const sampleRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/sampleReport/${itemId}`);
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

  this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{



  const sample1Ref = fire.database().ref(`${user.uid}/${this.state.currentProject}/sampleReport/${itemId}`);
  let id = fire.database().ref().child(`${user.uid}/${this.state.currentProject}/sampleReport/${itemId}`).key;
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

    if (arr.length === 0 ) {
      console.log("Arghhhh")
    }

    if (arr.length > 0 ) {
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

    }






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
console.log(arrayData);
this.setState({
key: "3",
snapArray1: arrayData,
arrayData2: arrayData,
})

});



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

    const sample1Ref = fire.database().ref(`${user.uid}/${this.state.currentProject}/sampleList/${itemId}`);
    let id = fire.database().ref().child(`${user.uid}/${this.state.currentProject}/sampleList/${itemId}`).key;
    sample1Ref.on('value', (snapshot) => {

      this.setState({
        Sample_Item: snapshot.child('Sample_Item').val(),
        dataType: snapshot.child('dataType').val(),
        color: snapshot.child('color').val(),
        units: snapshot.child('units').val(),
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
this.setState({

})

});
}


  fillParameterInfo = (e, itemId) => {
    e.preventDefault();
    //fire.database().ref('samples') refers to the main title of the fire database.
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
    const sampleListRef = fire.database().ref(`${user.uid}/${this.state.currentProject}/sampleList`);
    let id = fire.database().ref().child(`${user.uid}/${this.state.currentProject}/sampleList/${itemId}`).key;
    const sampleInfo = {
      Sample_Item: this.state.Sample_Item,
      Sample_Input: '',
      dataType: this.state.dataType,
      color: this.state.color,
      units: this.state.units,
      id: id,

    }

    sampleListRef.push(sampleInfo);
    //this.setState is used to clear the text boxes after the form has been submitted.
    this.setState({
      childrenDrawer: false,
      visible4: false,
    });

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
        units: snapshot.child('units').val(),
        id: id,
      });

});

  }

  overwriteColor = (color) => {

    const sampleListRef = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/sampleList/${this.state.id}`);

     this.setState({ color: color.hex });

    var object = {Sample_Item: this.state.Sample_Item, units: this.state.units, color: this.state.color, dataType: this.state.dataType, Sample_Input: '', id: this.state.id};

    sampleListRef.set(object);


   };






  handleSampleChange = idx => evt => {
    const newParameters = this.state.snapArray1.map((parameter, sidx) => {
      if (idx !== sidx) return parameter;
      return { ...parameter, Sample_Input: evt.target.value };
    });
    this.setState({ snapArray1: newParameters,
                    arrayData2: newParameters});



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

      sampleSubmit = (e) => {
        e.preventDefault();
        //fire.database().ref('samples') refers to the main title of the fire database.
        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
        const sampleListRef = fire.database().ref(`${user.uid}/${this.state.currentProject}/sampleReport`);


    var arr = this.state.snapArray1;
    console.log(arr);


    if (arr.length == 0){
      var object = {date: this.state.sampleDate, ID: this.state.sampleID, Title: this.state.sampleTitle, Miscellaneous: this.state.sampleMisc}
      console.log(object);
      sampleListRef.push(object);
    }

if (arr.length > 0){

      var object = arr.reduce(
          (obj, item) => Object.assign(obj, {date: this.state.sampleDate, ID: this.state.sampleID, Title: this.state.sampleTitle, Miscellaneous: this.state.sampleMisc, [item.Sample_Item]: item.Sample_Input}) ,{});
          console.log(object);
          sampleListRef.push(object);

          const sampleList2Ref = fire.database().ref(`${user.uid}/${this.state.currentProject}/sampleList`);
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
          visible: false,



        });

      });
      }

      fillStates(itemId) {

        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

          this.setState({
            visible5: true,




          })

        const sample1Ref = fire.database().ref(`${user.uid}/${this.state.currentProject}/sampleReport/${itemId}`);
        let id = fire.database().ref().child(`${user.uid}/${this.state.currentProject}/sampleReport/${itemId}`).key;
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
console.log(arrayData);
this.setState({
  snapArray1: arrayData,
  arrayData2: arrayData,
})

      });
    }


    sampleOverwrite = (e) => {
      e.preventDefault();
      //fire.database().ref('samples') refers to the main title of the fire database.
      this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
        console.log(this.state.id);
      const sampleListRef = fire.database().ref(`${user.uid}/${this.state.currentProject}/sampleReport/${this.state.id}`);


  var arr = this.state.arrayData2;
  console.log(arr);


  if (arr.length == 0){
    var object = {date: this.state.sampleDate, ID: this.state.sampleID,  Title: this.state.sampleTitle, Miscellaneous: this.state.sampleMisc}
    console.log(object);
    sampleListRef.set(object);

  }


  if (arr.length > 0){
    var object = arr.reduce(
        (obj, item) => Object.assign(obj, {date: this.state.sampleDate, ID: this.state.sampleID, Title: this.state.sampleTitle, Miscellaneous: this.state.sampleMisc, [item.Sample_Item]: item.Sample_Input}) ,{});
        console.log(object);
        sampleListRef.set(object);



      //this.setState is used to clear the text boxes after the form has been submitted.
      this.setState({

        visible5: false,



      });
    }

    });
    }





    additionalItem = (e, itemId, id) => {
      e.preventDefault();
      //fire.database().ref('samples') refers to the main title of the fire database.

      let array = this.state.arrayData2;

      const parameterInfo = {

        Sample_Item: this.state.Sample_Item,
        Sample_Input: '',
        dataType: this.state.dataType,
        color: this.state.color,
        units: this.state.units,
        id: id,

      }

      array.push(parameterInfo);
      //this.setState is used to clear the text boxes after the form has been submitted.
      this.setState({
        Sample_Item: '',
        arrayData2: array,
        dataType: '',
        units: '',
        color: '',

      });


    }

    onChange = (pagination, filters, sorter, extra: { currentDataSource: [] }) => {

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
      Sample_Item: '',
      dataType: '',
      color: '',
      units: '',

    });

    this.setState({

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

  this.setState({ dataType: e.target.value, parameterAdd: null });

  var object = {Sample_Item: this.state.Sample_Item, units: this.state.units, color: this.state.color, dataType: this.state.dataType, Sample_Input: '', id: this.state.id};

  sampleListRef.set(object);

}

handleSizeChange1 = (e) => {

this.setState({ dataType: e.target.value,
parameterAdd: null});



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

 onDateChange = (value, mode) => {
  console.log(moment(value).format('YYYY[-]MM[-]DD'));
  let startDate = moment(value).format('YYYY[-]MM[-]DD');
  this.setState({
    startDate: startDate
  })

}
onDateChange1 = (value, mode) => {
 console.log(moment(value).format('YYYY[-]MM[-]DD'));
 let endDate = moment(value).format('YYYY[-]MM[-]DD');
 this.setState({
   endDate: endDate
 })
}

onChangeDate = (date, dateString) => {

  const parameterList1Ref = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/sampleReport`);
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


      const parameterList1Ref = fire.database().ref(`${this.state.userID}/${this.state.currentProject}/sampleReport`);
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


        let { file } = this.state
        let url = file && URL.createObjectURL(file)
        let img = document.createElement("my-node");




        const MyDoc = (
          <Document>
            <Page size="A4" style={styles.body}>


                    <Text style={styles.header} fixed>
                      {this.state.lakeName} Sampling Report
                    </Text>
                    <Text style={styles.title}>{this.state.sampleTitle}</Text>
                    <Text style={styles.author}>{this.state.sampleDate}</Text>
                    <Text style={styles.author}>Report #{this.state.sampleID}</Text>

                    <Text style={styles.subtitle}>
                      Monthly Sampling Data:
                    </Text>

                    <View>
                      {this.state.arrayData2.map((parameter, idx) => {

                        return (
                          <View>
                          <Text style={styles.author}>{parameter.Sample_Item}:  {parameter.Sample_Input} mg/L</Text>
                          </View>
                        )

                      })}

                    </View>







                    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                      `${pageNumber} / ${totalPages}`
                    )} fixed />






            </Page>
          </Document>
        )

        const columns1 = [
          {
            title: 'Delete',
            dataIndex: '',
            key: 'y',
            render: this.deleteRow1.bind(this),
            width: 60,
          },
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

      },
      {
    title: 'Units',
    dataIndex: 'units',
    key: 'units',

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

            <div style={{ background: '#F4F7FA', padding: '5px' }}>




            <Drawer
              title= "Fill in Sample Form"
              placement={this.state.placement}
              closable={false}
              onClose={this.closeSampleForm}
              visible={this.state.visibleSampleForm}
              width={600}
            >
            <Drawer
            title="Add Parameter"
            width={500}
            closable={false}
            onClose={this.onChildrenDrawerClose}
            visible={this.state.childrenDrawer}
          >


            <form>


              <FormGroup >


                <Row style={{paddingTop: '10px'}}>
                  <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <b>Parameter</b>
                  </Col>
                  <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                  <FormControl name="Sample_Item" onChange={this.handleChange} type="text" placeholder="Sample Parameter"  value={this.state.Sample_Item} />
                  </Col>



                </Row>

                <Row style={{paddingTop: '20px'}}>
                  <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <b>Units</b>
                  </Col>
                  <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                  <FormControl name="units" onChange={this.handleChange} type="text" placeholder="Units"  value={this.state.units} />
                  </Col>
                </Row>



                <Row style={{paddingTop: '30px'}}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <b>Graph Type</b>
                  </Col>
                </Row>



                <Row style={{paddingTop: '10px'}}>
                <Radio.Group size="default" value={this.state.dataType} onChange={this.handleSizeChange1}>
            <Radio.Button value="Bar">Bar</Radio.Button>
            <Radio.Button value="Line">Line</Radio.Button>
            <Radio.Button value="Area">Area</Radio.Button>
            <Radio.Button value="Off">Off</Radio.Button>
          </Radio.Group>
            </Row>

            <Row style={{paddingTop: '20px'}}>
            <b>Color of Graph Data</b>
            </Row>
                <Row style={{paddingTop: '20px'}}>

              <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                <Button onClick={this.displayColor}>Pick a Color</Button>
                </Col>
                <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                <Button style={{backgroundColor: this.state.color}}></Button>
              </Col>


              <Col xs={24} sm={18} md={18} lg={18} xl={18} style={{display: this.state.colorDisplay}}>
                <SketchPicker
              color={ this.state.color }
              onChangeComplete={ this.handleChangeComplete }
                />
              </Col>
              </Row>

              <Row>
                <hr></hr>
              </Row>
              <Row style={{paddingTop: '20px'}}>

            <Col xs={24} sm={14} md={14} lg={14} xl={14} >
              <Button  type="primary" onClick={this.fillParameterInfo} bsStyle="primary">Add Parameter</Button>
              </Col>
              </Row>



            </FormGroup>




          </form>






          </Drawer>


            <Row style={{paddingTop: '10px'}} type="flex" justify="center">
              <Button size="large" type="primary" onClick={this.showChildrenDrawer}>
            Add Sampling Parameter
          </Button>



              </Row>

              <Row style={{paddingTop: '10px'}} justify="center">
                <form>

                  <Row>
                    <FormGroup>
                      <Row style={{paddingTop: '30px'}}>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Sample Date</b></Col>
                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                          <FormControl name='sampleDate' type='date' placeholder="Date" value={this.state.sampleDate}
                          onChange={this.handleChange} />
                        </Col>
                      </Row>
                      <Row style={{paddingTop: '10px'}}>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>ID #</b></Col>
                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                          <FormControl name='sampleID' type='text' placeholder="ID" value={this.state.sampleID}
                            onChange={this.handleChange} />
                        </Col>
                      </Row>
                      <Row style={{paddingTop: '10px'}}>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Miscellaneous Notes</b></Col>
                      <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <FormControl name='sampleMisc' type="textarea" componentClass="textarea" style={{ height: 60, width: 400}}
                        onChange={this.handleChange}  placeholder="Notes" value={this.state.sampleMisc} />
                      </Col>
                      </Row>



                    </FormGroup>
                </Row>


                {this.state.snapArray1.map((parameter, idx) => {

                              return (
                                <Row style={{paddingTop: '10px'}}>
                          <FormGroup>
                            <Col xs={24} sm={7} md={7} lg={7} xl={7}><b>{parameter.Sample_Item}  ({parameter.units})</b></Col>
                            <Col xs={24} sm={13} md={13} lg={13} xl={13}>
                            <FormControl name={parameter.Sample_Item} type="text"
                              onChange={this.handleSampleChange(idx)}  placeholder="Value" value={parameter.Sample_Input} />
                            </Col>
                            <Col xs={24} sm={3} md={3} lg={3} xl={3} style={{textAlign: 'center'}}>

                              <Icon type="delete" style={{fontSize: '24px'}}
                              onClick={() => this.removesample1(parameter.key)}>
                                Click me
                              </Icon>
                              </Col>




                          </FormGroup>
                        </Row>
                        )})}





                <Row style={{paddingTop: '25px', textAlign: 'right'}}>
                  <Col xs={24} sm={22} md={22} lg={22} xl={22} >
                <Button size="large" type="primary" onClick={this.sampleSubmit} bsStyle="primary">Add Sample</Button>
                </Col>


                </Row>






                </form>

              </Row>


            </Drawer>

            <Drawer
              title= "Edit Sample Form"
              placement={this.state.placement}
              closable={false}

              visible={this.state.visible5}
              width={600}
            >




            <Row style={{paddingTop: '10px'}} justify="center">
              <form>

                <Row>
                  <FormGroup>
                    <Row style={{paddingTop: '30px'}}>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Sample Date</b></Col>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                        <FormControl name='sampleDate' type='date' placeholder="Date" value={this.state.sampleDate}
                        onChange={this.handleChange} />
                      </Col>
                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>ID #</b></Col>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                        <FormControl name='sampleID' type='text' placeholder="ID" value={this.state.sampleID}
                          onChange={this.handleChange} />
                      </Col>
                    </Row>
                    <Row style={{paddingTop: '10px'}}>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Miscellaneous Notes</b></Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <FormControl name='sampleMisc' type="textarea" componentClass="textarea" style={{ height: 60, width: 400}}
                      onChange={this.handleChange}  placeholder="Notes" value={this.state.sampleMisc} />
                    </Col>
                    </Row>



                  </FormGroup>
              </Row>


              {this.state.snapArray1.map((parameter, idx) => {

                            return (
                              <Row style={{paddingTop: '10px'}}>
                        <FormGroup>
                          <Col xs={24} sm={7} md={7} lg={7} xl={7}><b>{parameter.Sample_Item}  ({parameter.units})</b></Col>
                          <Col xs={24} sm={13} md={13} lg={13} xl={13}>
                          <FormControl name={parameter.Sample_Item} type="text"
                            onChange={this.handleSampleChange(idx)}  placeholder="Value" value={parameter.Sample_Input} />
                          </Col>
                          <Col xs={24} sm={3} md={3} lg={3} xl={3} style={{textAlign: 'center'}}>

                            <Icon type="delete" style={{fontSize: '24px'}}
                            onClick={() => this.removesample1(parameter.key)}>
                              Click me
                            </Icon>
                            </Col>




                        </FormGroup>
                      </Row>
                      )})}


                      <Row style={{paddingTop: '25px', textAlign: 'right'}}>
                        <Col xs={24} sm={22} md={22} lg={22} xl={22} >
                      <Button  size="large" type="primary" onClick={this.sampleOverwrite} bsStyle="primary">Overwrite Report</Button>
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
                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{textAlign: 'left'}}>

                  <Row type="flex" justify="center">
                    <Col span={24} style={{textAlign: 'left'}}>
                      <h2>Sampling</h2>
                    </Col>
                  </Row>



                  <Tabs style={{fontSize: '32px'}}defaultActiveKey="1" activeKey={this.state.key} onChange={this.handleSelect} >




                    <TabPane tab="SAMPLING LOG" key="1">
                      <Row type="flex" justify="center">
                        <Col span={24} style={{textAlign: 'center'}}>




                          <Row>
                        <Col xs={24} sm={24} md={9} lg={9} xl={9} style={{textAlign: 'left'}}>
                          <Button><CSVLink data={csvData1}>Download Spreadsheet</CSVLink></Button>
                        </Col>

                        <Col xs={24} sm={24} md={3} lg={3} xl={3} >
                        <Button onClick={this.clearDates}>Clear Dates</Button>
                        </Col>

                        <Col xs={24} sm={24} md={7} lg={7} xl={7} >
                        <RangePicker  allowClear={true} onChange={this.onChangeDate}  />
                        </Col>

                        <Col xs={24} sm={24} md={5} lg={5} xl={5} style={{textAlign: 'right'}}>
                        <Button size="large" type="primary" onClick={() => this.showDrawer()}>+ Add Sample</Button>
                        </Col>


                      </Row>

                      <Row style={{paddingTop: '10px'}} type="flex" justify="center">

                        <Card style={{ width: '100%' }}>
                          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Table columns={columns} dataSource={data} onChange={this.onChange} scroll={{ x: '100%'}} />

                          </Col>
                        </Card>
                        </Row>


                      </Col>
                    </Row>

                    </TabPane>



                  <TabPane tab="PARAMETERS" key="2">

                    <Drawer
                      title= "Edit Parameter"
                      placement={this.state.placement}
                      closable={false}
                      onClose={this.onClose}
                      visible={this.state.visible3}
                      width={500}
                    >
                    <FormGroup >


                      <Row>
                        <Col span={24}>
                          <h2>{this.state.Sample_Item}  ({this.state.units})</h2>
                        </Col>
                      </Row>

                      <Row style={{paddingTop: '20px'}}>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                          <b>Units</b>
                        </Col>
                        <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                        <FormControl name="units" onChange={this.handleChange} type="text" placeholder="Units"  value={this.state.units} />
                        </Col>
                      </Row>



                      <Row style={{paddingTop: '30px'}}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                          <b>Graph Type</b>
                        </Col>
                      </Row>



                      <Row style={{paddingTop: '10px'}}>
                      <Radio.Group size="default" value={this.state.dataType} onChange={this.handleSizeChange1}>
                  <Radio.Button value="Bar">Bar</Radio.Button>
                  <Radio.Button value="Line">Line</Radio.Button>
                  <Radio.Button value="Area">Area</Radio.Button>
                  <Radio.Button value="Off">Off</Radio.Button>
                </Radio.Group>
                  </Row>

                  <Row style={{paddingTop: '20px'}}>
                  <b>Color of Graph Data</b>
                  </Row>
                      <Row style={{paddingTop: '20px'}}>

                    <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                      <Button onClick={this.displayColor}>Pick a Color</Button>
                      </Col>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                      <Button style={{backgroundColor: this.state.color}}></Button>
                    </Col>


                    <Col xs={24} sm={18} md={18} lg={18} xl={18} style={{display: this.state.colorDisplay}}>
                      <SketchPicker
                    color={ this.state.color }
                    onChangeComplete={ this.handleChangeComplete }
                      />
                    </Col>
                    </Row>

                    <Row>
                      <hr></hr>
                    </Row>
                    <Row style={{paddingTop: '20px'}}>

                      <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                        <Button type="primary" onClick={this.parameterOverwrite}>Overwrite Parameter</Button>
                        </Col>
                        </Row>



                  </FormGroup>




                  </Drawer>
                  <Drawer
                  title="Add Parameter"
                  width={420}
                  closable={false}
                  onClose={this.visible4Close}
                  visible={this.state.visible4}
                >


                  <form>


                    <FormGroup >


                      <Row style={{paddingTop: '10px'}}>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                          <b>Parameter</b>
                        </Col>
                        <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                        <FormControl name="Sample_Item" onChange={this.handleChange} type="text" placeholder="Sample Parameter"  value={this.state.Sample_Item} />
                        </Col>



                      </Row>

                      <Row style={{paddingTop: '20px'}}>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                          <b>Units</b>
                        </Col>
                        <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                        <FormControl name="units" onChange={this.handleChange} type="text" placeholder="Units"  value={this.state.units} />
                        </Col>
                      </Row>



                      <Row style={{paddingTop: '30px'}}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                          <b>Graph Type</b>
                        </Col>
                      </Row>



                      <Row style={{paddingTop: '10px'}}>
                      <Radio.Group size="default" value={this.state.dataType} onChange={this.handleSizeChange1}>
                  <Radio.Button value="Bar">Bar</Radio.Button>
                  <Radio.Button value="Line">Line</Radio.Button>
                  <Radio.Button value="Area">Area</Radio.Button>
                  <Radio.Button value="Off">Off</Radio.Button>
                </Radio.Group>
                  </Row>

                  <Row style={{paddingTop: '20px'}}>
                  <b>Color of Graph Data</b>
                  </Row>
                      <Row style={{paddingTop: '20px'}}>

                    <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                      <Button onClick={this.displayColor}>Pick a Color</Button>
                      </Col>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                      <Button style={{backgroundColor: this.state.color}}></Button>
                    </Col>


                    <Col xs={24} sm={18} md={18} lg={18} xl={18} style={{display: this.state.colorDisplay}}>
                      <SketchPicker
                    color={ this.state.color }
                    onChangeComplete={ this.handleChangeComplete }
                      />
                    </Col>
                    </Row>

                    <Row>
                      <hr></hr>
                    </Row>
                    <Row style={{paddingTop: '20px'}}>

                  <Col xs={24} sm={14} md={14} lg={14} xl={14} style={{display: this.state.parameterAdd}}>
                    <Button  type="primary" onClick={this.fillParameterInfo} bsStyle="primary">Add Parameter</Button>
                    </Col>
                    </Row>



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
                          <Button size="large" type="primary" onClick={this.showDrawer4}>+ Add Parameter</Button>

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
      <PDFDownloadLink document={MyDoc} fileName="somename.pdf">
  {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Click Here & Download now!')}
</PDFDownloadLink>
</Row>

  <Row style={{paddingTop: '20px'}}>
      {MyDoc}

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
