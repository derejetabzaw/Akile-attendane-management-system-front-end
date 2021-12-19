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

const base_url = 'http://localhost:9000/api/v1' ;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      attendance: [],
      users: [],
      names: [],
      staffids: [],
      clockins: [],
      clockouts: [],
      locations: [],
      // deviceids: [],
      dates: [],
    };

    this.toggleModal = this.toggleModal.bind(this);
  }



  createData = (name, Id, CIN, COUT, Location, date, time) => {
    return { name, Id, CIN, COUT, Location, date, time };
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  componentDidMount = () =>{
    this.getmongodb();
  };

  getmongodb = () => {
    axios.get(base_url + '/attendance/')
      .then((response) => {
        const attendance_info = response.data
        this.setState({attendance:attendance_info});
      })
      .catch(() => {
        console.log("Error");
      });
      axios.get(base_url + '/users/')
      .then((response) => {
        const users_info = response.data
        this.setState({users:users_info});
      })
      .catch(() => {
        console.log("Error");
      });
  }



  // This will help to check when new information[Checking in/Checking Out] is added to the database

  // displaymongodbpost = (posts) => {
  //   if (posts.length==0) return console.log("posts has not been updated");
  //   console.log("Before Change Posts:" , posts.attendances)
  //   if (!posts.length) return null; 
  //   return console.log("Incoming Data")
  // }; 


  render() {
    
    const rows = [
      this.createData(
        "Beamlak Teshome",
        "AK-12156",
        "",
        "",
        "",
        "",
        ""
      ),
    ];



    

    


    if (this.state.attendance.length !== 0) {
      const id = this.state.attendance.attendances.at(-1)._id
      // console.log("ID", this.state.attendance.attendances.at(-1)._id)
      // console.log("CIN", this.state.attendance.attendances.at(-1).checkInTime)
      // console.log("COUT", this.state.attendance.attendances.at(-1).checkOutTime)
      // console.log("DATE", this.state.attendance.attendances.at(-1).date)
      this.state.clockins.push(this.state.attendance.attendances.at(-1).checkInTime);
      this.state.clockouts.push(this.state.attendance.attendances.at(-1).checkOutTime);
      this.state.dates.push(this.state.attendance.attendances.at(-1).date);
      if (this.state.users.length !== 0) {
        var user_length = this.state.users.users.length
        for (var i = 0; i < user_length; i++) {
          if (this.state.attendance.attendances.at(-1).user === this.state.users.users.at(i)._id){
            // console.log("Name:",this.state.users.users.at(i).name)
            // console.log("staffID",this.state.users.users.at(i).staffId)
            // console.log("WorkingSite:",this.state.users.users.at(i).workingSite)
            this.state.names.push(this.state.users.users.at(i).name);
            this.state.staffids.push(this.state.users.users.at(i).staffId);
            this.state.locations.push(this.state.users.users.at(i).workingSite);
            // this.state.deviceids.push(this.state.users.users.at(i).deviceId);

          }
          
        }
    
    }

  }
    var namerows = this.state.names;
    var krows = this.createData(this.state.names,this.state.staffids,this.state.clockins,this.state.clockouts,this.state.locations,this.state.dates);
    
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
                {/* <StyledTableCell>Device ID</StyledTableCell> */}
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell align="right">
                  Total Daily Work Hour
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.Id}</StyledTableCell>
                  <StyledTableCell>{row.CIN}</StyledTableCell>
                  <StyledTableCell>{row.COUT}</StyledTableCell>
                  <StyledTableCell>{row.Location}</StyledTableCell> */}
                  {/* <StyledTableCell>{row.DId}</StyledTableCell> */}
                  {/* <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell align="right">{row.time}</StyledTableCell>
                </StyledTableRow>
              ))} */}

              {namerows.map((krow,idx) => ( 
                <StyledTableRow krow={krow} key={krow.rowcount}>
                  <StyledTableCell component="th" scope="row">{krows.name[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.Id[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.CIN[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.COUT[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.Location[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.date[idx]}</StyledTableCell>



                </StyledTableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }  
}

