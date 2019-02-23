import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ResponsiveEmbed, ButtonToolbar, Form, Grid, FormGroup, ControlLabel, MenuItem, DropdownButton, FormControl, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { Page, Text, View, Document, StyleSheet, Image,  PDFDownloadLink, Font,  } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

import './maintenanceReport.css';


import { fire } from '../../fire';


import domtoimage from 'dom-to-image';
import { SketchPicker } from 'react-color';
import fileDownload from "js-file-download";


import { ComposedChart, LineChart, LabelList, ResponsiveContainer, ReferenceArea, AreaChart, Brush, Area, Line, Tooltip, XAxis, YAxis, BarChart, Bar, CartesianGrid, Legend, Label} from 'recharts';

import { Row, Col, Tabs, Table, Divider, Tag, message, Card, Drawer, Menu, Dropdown, Button, Layout, Carousel, Input, Popover, Icon, Cascader, Switch, Select, AutoComplete, Radio, Alert } from 'antd';
import Highlighter from 'react-highlight-words';
import { CSVLink, CSVDownload } from "react-csv";

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


          item: '',

          graphData: [],
          turnedOffKeys: [],

          currentData: [],




          childrenDrawer: false,
          childrenDrawer1: false,




          tableKeys: [],
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

          const parameterList1Ref = fire.database().ref(`maintenanceReport/${user.uid}`);
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


                width: 300,
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

              let reverseData1 = data.reverse();


              this.setState({
                snapArray: data.reverse(),

                tableKeys: tableKeys,
              })



            }


             })

             const sampleList2Ref = fire.database().ref(`maintenanceList/${user.uid}`);
             sampleList2Ref.on('value', (snapshot) => {
               let maintenanceArray = this.snapshotToArray(snapshot);
               console.log(maintenanceArray)
               this.setState({
                 snapArray1: maintenanceArray,

               })
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




    handleSelect = (key) => {
  this.setState({key});
}



showDrawer = () => {

  const sampleList2Ref = fire.database().ref(`maintenanceList/${this.state.userID}`);
  sampleList2Ref.on('value', (snapshot) => {
    let maintenanceArray = this.snapshotToArray(snapshot);

    this.setState({
      arrayKeys1: [],
      arrayValues1: [],
      sampleDate: '',
      sampleID: '',
      sampleTitle: '',
      sampleMisc: '',
      snapArray1: maintenanceArray,
      visible: true,
      Maintenance_Item: '',

      childrenDrawer: false,
      visible4: false,
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

   const sampleRef = fire.database().ref(`/maintenanceReport/${this.state.userID}/${itemId}`);
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

  const sampleRef = fire.database().ref(`/maintenanceList/${this.state.userID}/${itemId}`);
  sampleRef.remove();
}

removesample2(itemId) {

  const sampleRef = fire.database().ref(`/maintenanceReport/${this.state.userID}/${this.state.id}/${itemId}`);
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



  const sample1Ref = fire.database().ref(`/maintenanceReport/${user.uid}/${itemId}`);
  let id = fire.database().ref().child(`/maintenanceReport/${user.uid}/${itemId}`).key;
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

const sample2Ref = fire.database().ref(`/maintenanceReport/${user.uid}`);
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
arrayData.push({Maintenance_Input: this.state.arrayValues1[i], Maintenance_Item: this.state.arrayKeys1[i], key: this.state.arrayData1[i]});

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

    const sample1Ref = fire.database().ref(`/maintenanceList/${user.uid}/${itemId}`);
    let id = fire.database().ref().child(`/maintenanceList/${user.uid}/${itemId}`).key;
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
  const sampleListRef = fire.database().ref(`maintenanceList/${user.uid}/${this.state.id}`);


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
    const sampleListRef = fire.database().ref(`maintenanceList/${user.uid}`);
    let id = fire.database().ref().child(`/maintenanceList/${user.uid}/${itemId}`).key;

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



  handleSampleChange = idx => evt => {
    const newParameters = this.state.snapArray1.map((parameter, sidx) => {
      if (idx !== sidx) return parameter;
      return { ...parameter, Maintenance_Input: evt.target.value };
    });
    this.setState({ snapArray1: newParameters });



    };

    handleSampleChange1 = idx => evt => {
      const newParameters = this.state.arrayData2.map((parameter, sidx) => {
        if (idx !== sidx) return parameter;
        return { ...parameter, Maintenance_Input: evt.target.value };
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
        const sampleListRef = fire.database().ref(`maintenanceReport/${user.uid}`);




    var arr = this.state.snapArray1;
    console.log(arr);


    if (arr.length == 0){
      var object = {date: this.state.sampleDate, ID: this.state.sampleID, Title: this.state.sampleTitle, Miscellaneous: this.state.sampleMisc}
      console.log(object);
      sampleListRef.push(object);
    }

if (arr.length > 0){

      var object = arr.reduce(
          (obj, item) => Object.assign(obj, {date: this.state.sampleDate, ID: this.state.sampleID, Title: this.state.sampleTitle, Miscellaneous: this.state.sampleMisc, [item.Maintenance_Item]: item.Maintenance_Input}) ,{});
          console.log(object);
          sampleListRef.push(object);

          const sampleList2Ref = fire.database().ref(`maintenanceList/${user.uid}`);
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
          visible1: false,
          visible2: false,

        });

      });
      }

      fillStates(itemId) {

        this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{

          this.setState({
            overwriteReport: null,
            addReport: 'none',
            inputOverwrite: null,
            inputAdd: 'none',
            visibleEditMaintenance: true,

          })

        const sample1Ref = fire.database().ref(`/maintenanceReport/${user.uid}/${itemId}`);
        let id = fire.database().ref().child(`/maintenanceList/${user.uid}/${itemId}`).key;
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

const sample2Ref = fire.database().ref(`/maintenanceReport/${user.uid}`);
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
arrayData.push({Maintenance_Input: this.state.arrayValues1[i], Maintenance_Item: this.state.arrayKeys1[i], key: this.state.arrayData1[i]});

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
      const sampleListRef = fire.database().ref(`maintenanceReport/${user.uid}/${this.state.id}`);


  var arr = this.state.arrayData2;
  console.log(arr);


  if (arr.length == 0){
    var object = {date: this.state.sampleDate, ID: this.state.sampleID,  Title: this.state.sampleTitle, Miscellaneous: this.state.sampleMisc}
    console.log(object);
    sampleListRef.set(object);

  }
  else


    var object = arr.reduce(
        (obj, item) => Object.assign(obj, {date: this.state.sampleDate, ID: this.state.sampleID, Title: this.state.sampleTitle, Miscellaneous: this.state.sampleMisc, [item.Maintenance_Item]: item.Maintenance_Input}) ,{});
        console.log(object);
        sampleListRef.set(object);



      //this.setState is used to clear the text boxes after the form has been submitted.
      this.setState({


        visible: false,
        visible1: false,
        visible2: false,

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









      render() {


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
                          <Text style={styles.author}>{parameter.Maintenance_Item}:  {parameter.Maintenance_Input} mg/L</Text>
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
              width={600}
            >
            <Drawer
            title="Add Maintenance Item"
            width={420}
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
            <FormControl required name="Maintenance_Item" onChange={this.handleChange} type="text" placeholder="Sample Parameter"  value={this.state.Maintenance_Item} />
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
              <Button type="primary" onClick={this.showChildrenDrawer}>
            Add Maintenance Item
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
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Maintenance Date</b></Col>
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
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Title</b></Col>
                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                          <FormControl  required name='sampleTitle' type='text' placeholder="Title" value={this.state.sampleTitle}
                              onChange={this.handleChange} />
                        </Col>
                      </Row>
                      <Row style={{paddingTop: '10px'}}>
                      <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Miscellaneous Notes</b></Col>
                      <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <FormControl  required  name='sampleMisc' type="textarea" componentClass="textarea" style={{ height: 60}}
                        onChange={this.handleChange}  placeholder="Report" value={this.state.sampleMisc} />
                      </Col>
                      </Row>
                    </FormGroup>
                </Row>


                {this.state.snapArray1.map((parameter, idx) => {

                              return (
                                <Row style={{paddingTop: '10px'}}>
                          <FormGroup>
                            <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>{parameter.Maintenance_Item}</b></Col>
                            <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                            <FormControl name={parameter.Maintenance_Item} type="textarea" componentClass="textarea" style={{ height: 70, width: '100%'}}
                              onChange={this.handleSampleChange(idx)}   value={parameter.Maintenance_Input} />
                            </Col>
                            <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                              <Icon type="delete" style={{fontSize: '24px'}}
                              onClick={() => this.removesample1(parameter.key)}>
                                Click me
                              </Icon>
                              </Col>




                          </FormGroup>
                        </Row>
                        )})};





                <Row style={{paddingTop: '10px', textAlign: 'right'}}>
                <Button  type="primary" onClick={this.sampleSubmit} bsStyle="primary">Add Maintenance Report</Button>



                </Row>






                </form>

              </Row>

            </Drawer>
            <Drawer
              title= "Fill in Maintenance Form"
              placement={this.state.placement}
              closable={false}
              onClose={this.onClose}
              visible={this.state.visibleEditMaintenance}
              width={500}
            >





                  <Row style={{paddingTop: '10px'}} justify="center">
                    <form>
                      <Row style={{textAlign: 'right'}}>
                      <Icon type="right-circle"  style={{fontSize: '30px'}} onClick={() => this.onClose()}>+ Add Sample</Icon>
                      </Row>
                      <Row>
                        <FormGroup>
                          <Row style={{paddingTop: '10px'}}>
                            <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Maintenance Date</b></Col>
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
                            <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Report Title</b></Col>
                            <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                              <FormControl name='sampleTitle' type='text' placeholder="Title" value={this.state.sampleTitle}
                                  onChange={this.handleChange} />
                            </Col>
                          </Row>
                          <Row style={{paddingTop: '10px'}}>
                          <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>Miscellaneous Notes</b></Col>
                          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                          <FormControl name='sampleMisc' type="textarea" componentClass="textarea" style={{ height: 60}}
                            onChange={this.handleChange}  placeholder="Report" value={this.state.sampleMisc} />
                          </Col>
                          </Row>
                        </FormGroup>
                    </Row>


      {this.state.arrayData2.map((parameter, idx) => {

                    return (
                      <Row style={{paddingTop: '10px'}}>
                <FormGroup>
                  <Col xs={24} sm={6} md={6} lg={6} xl={6}><b>{parameter.Maintenance_Item}</b></Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <FormControl name={parameter.Maintenance_Item} type="text" componentClass="textarea" style={{ height: 60}}
                    onChange={this.handleSampleChange1(idx)}  placeholder="Report" value={parameter.Maintenance_Input} />
                  </Col>
                  <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                    <Icon type="delete" style={{fontSize: '24px'}}
                    onClick={() => this.removesample2(parameter.Maintenance_Item)}>
                      Click me
                    </Icon>
                    </Col>

                            </FormGroup>
                          </Row>
                          )})};





                  <Row style={{paddingTop: '10px', textAlign: 'right'}}>
                  <Button  type="primary" onClick={this.sampleOverwrite} bsStyle="primary">Overwrite Report</Button>



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
                  <h2>Maintenance</h2>
                </Col>
              </Row>

              <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{textAlign: 'left'}}>

                  <Tabs style={{fontSize: '32px'}}defaultActiveKey="1" activeKey={this.state.key} onChange={this.handleSelect} >




                    <TabPane tab="MAINTENANCE LOG" key="1">
                      <Row type="flex" justify="center">
                        <Col span={24} style={{textAlign: 'center'}}>

                          <Row>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{textAlign: 'left'}}>
                          <Button><CSVLink data={csvData1}>Download Spreadsheet</CSVLink></Button>

                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{textAlign: 'right'}}>
                        <Button size="large" type="primary" onClick={() => this.showDrawer()}>+ Add Report</Button>
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



                  <TabPane tab="ITEMS" key="2">

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

           <FormControl required name="Maintenance_Item" onChange={this.handleChange} type="text" placeholder="Sample Parameter"  value={this.state.Maintenance_Item} />

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
