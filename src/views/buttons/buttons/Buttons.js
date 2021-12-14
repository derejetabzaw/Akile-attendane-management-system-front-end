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
const url_users = 'http://localhost:9000/api/v1/users/';


export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      posts: [],
      users: [],
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

  componentDidMount = () =>{
    this.getmongodb();
  };

  getmongodb = () => {
    axios.get(url)
      .then((response) => {
        const data = response.data
        this.setState({posts:data});
        // console.log("ALL DATA:" , data.attendances)
        // console.log("ALL dates:" , data.attendances.at(5))
        // console.log("Recieved",data.attendances.at(-1).checkInTime)
        console.log("date:",data.attendances.at(-1).date)
        console.log("CIT:",data.attendances.at(-1).checkInTime)
        console.log("COT:",data.attendances.at(-1).checkOutTime)
      })
      .catch(() => {
        console.log("Error");
      });
      axios.get(url_users)
      .then((response) => {
        const data = response.data
        this.setState({users:data});
        // console.log("ALL Users:" , data.users.at(5))
        console.log("Name:",data.users.at(-1).name)
        console.log("staffID:",data.users.at(-1).staffId)
        console.log("WS:",data.users.at(-1).workingSite)
        console.log("Id:",data.users.at(-1)._id)
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
        "f5e90564385492f2",
        "",
        ""
      ),
    ];


        
  
    

    
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

