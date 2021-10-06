import React, { Component,useState, useEffect } from "react";

import Slider from "react-slick";
import { Card, Row, Col, Carousel } from "antd";
// import "./landing.css";
import axios from 'axios';
import ReactDOM from "react-dom";


import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const { Meta } = Card;
// const [state, setState] = useState({data: []});
const url = 'http://localhost:9000/api/v1/attendance/';


export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }



  createData = (name, Id, CIN, COUT, Location, DId, date, time) => {
    return { name, Id, CIN, COUT, Location, DId, date, time };
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };
  
  // fetchApi() {
  //   const [temp, setTemp] = useState(0);


  //   useEffect(() => {
  //     setInterval(()=>{
  //       setTemp((prevTemp)=>prevTemp+1)
  //     }, 2000);
  //   });


  //   useEffect(()=>{
  //     fetchData()
  //   }, [temp])

  //   const fetchData = async () => {

  //     try { 
  //         var obj;
  //         var length;
  //         const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzODk3MGJiZDNlMGQxMTVjY2RjMDc3In0sImlhdCI6MTYzMjEzODAyMiwiZXhwIjoxNjMyMjI0NDIyfQ.biGdfMK57tfDcH__IqJgXtp2L-5ZPN-ZKSHrFK17cw4'
  //         const datas = fetch(url, {
  //           method: 'GET',
  //           headers: {
  //               'Content-Type': 'application/json',
  //               'Authorization': `${access_token}`
  //           },
  //           })
  //           .then(res => res.json())
  //           .then(data => obj = data)
  //           .then(() => length = (obj.attendances).length)
  //           // .then(data => obj = data.attendances[0].checkInTime);
  //           .then(() => console.log("number:",length)); 
  //           return obj
  //         }   
  //     catch (error) {console.log(error);
  //       return error
  //     }
    
  //   }
  // }
  


  async fetchApi() {
    const [data, setData] = React.useState(null);
    const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzODk3MGJiZDNlMGQxMTVjY2RjMDc3In0sImlhdCI6MTYzMjIwMTAzOCwiZXhwIjoxNjMyMjg3NDM4fQ.xidqX3VJ3AxoYDGivc8lMDflvWeGwF8tdkH28QO-W1M'

    React.useEffect(() => {
        fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${access_token}`
        },
        })
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);
    
    // var obj;
    // var length;
    // const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzODk3MGJiZDNlMGQxMTVjY2RjMDc3In0sImlhdCI6MTYzMjIwMTAzOCwiZXhwIjoxNjMyMjg3NDM4fQ.xidqX3VJ3AxoYDGivc8lMDflvWeGwF8tdkH28QO-W1M'
    // console.log(access_token)
    // const datas = fetch(url, {
    //   method: 'GET',
    //   headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `${access_token}`
    //   },
    //   })
    //   .then(console.log("data",datas))
    //   .then(res => res.json())
    //   .then(data => obj = data)
    //   .then(() => length = (obj.attendances).length)
    //   // .then(data => obj = data.attendances[0].checkInTime);
    //   .then(() => console.log("number:",length));


  }


  render() {
    const rows = [
      this.createData(
        "Beamlak Teshome",
        "AK-12156",
        "",
        "",
        "",
        "f5e90564385492f2",
        "",
        ""
      ),
    ];


    
    // fetchApi() {
    //   const datas = fetch(url, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `${access_token}`
    //     },
    //     })
    //     .then(console.log("data",datas))
    //     .then(res => res.json())
    //     .then(data => obj = data)
    //     .then(() => length = (obj.attendances).length)
    //     // .then(data => obj = data.attendances[0].checkInTime);
    //     .then(() => console.log("number:",length)); 

    // }



    
  
    

    
    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);
    const StyledTableRow = withStyles((theme) => ({
      root: {
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);

    console.log("checkin", rows, rows.CIN, rows.COUT);
    

    return (
      <>
        {/* <Button color="primary" onClick={this.toggleModal} style={{float:"right", marginBottom: '2%'}}>Add </Button> */}
        <div style={{ marginTop: "2%" }}></div>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Staff Name</StyledTableCell>
                <StyledTableCell>Staff ID</StyledTableCell>
                <StyledTableCell>Clock-In</StyledTableCell>
                <StyledTableCell>Clock-Out</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
                <StyledTableCell>Device ID</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell align="right">
                  Total Daily Work Hour
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.Id}</StyledTableCell>
                  <StyledTableCell>{row.CIN}</StyledTableCell>
                  <StyledTableCell>{row.COUT}</StyledTableCell>
                  <StyledTableCell>{row.Location}</StyledTableCell>
                  <StyledTableCell>{row.DId}</StyledTableCell>
                  <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell align="right">{row.time}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }  
}

