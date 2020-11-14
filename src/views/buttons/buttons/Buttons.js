import React, { Component } from "react";
import Slider from "react-slick";
import { Card, Row, Col, Carousel } from "antd";
// import "./landing.css";

import { Button,InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const { Meta } = Card;
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  createData = (name, Id, CIN, COUT, Location, DId, date, time) => {
    return { name, Id, CIN, COUT, Location, DId, date, time}
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }


  render() {
    const rows = [
      this.createData("Constraction", '0212', '✔',"x", 'Addis Ababa', 'x6t25H3', '03/05/20', '4:30'),
      this.createData("John Walsh", '0324', '✔', "✔", 'Addis Ababa', 'ia3Hwoa5',  '03/05/20', '5:20'),
      this.createData("Bob Herm", '3324', 'x', "x", 'Adama', 'tt288JY',  '03/05/20', '4:35'),
      this.createData("James Houston", '7702', '✔', "✔", 'Awassa', '999h3tJ',  '03/05/20', '5:33'),
      // this.createData("Bobby Herm", '39924', 'x', "x", 'Adama', 'tt288JY',  '03/05/20', '5:35'),
      this.createData("Matt Houston", '77002', '✔', "✔", 'Awassa', '999h3tJ',  '03/05/20', '5:33'),
      this.createData("Cat", '03212', '✔',"x", 'Addis Ababa', 'x6t25H3', '03/05/20', '5:30'),
      this.createData("Johnny Walsh", '02324', '✔', "✔", 'Addis Ababa', 'ia3Hwoa5',  '03/05/20', '5:20'),
      this.createData("Nob Herm", '36324', 'x', "x", 'Adama', 'tt288JY',  '03/05/20', '4:35'),
     
      
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
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);
    
    
    return (
      <>
      {/* <Button color="primary" onClick={this.toggleModal} style={{float:"right", marginBottom: '2%'}}>Add </Button> */}
      
      <div style={{marginTop: '2%'}}></div>
      <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Staff Name</StyledTableCell>
            <StyledTableCell >Staff ID</StyledTableCell>
            <StyledTableCell >Clock-In</StyledTableCell>
            <StyledTableCell >Clock-Out</StyledTableCell>
            <StyledTableCell>Location</StyledTableCell>
            <StyledTableCell >Device ID</StyledTableCell>
            <StyledTableCell >Date</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell> 
              <StyledTableCell >{row.Id}</StyledTableCell>
              <StyledTableCell >{row.CIN}</StyledTableCell>
              <StyledTableCell>{row.COUT}</StyledTableCell>
              <StyledTableCell >{row.Location}</StyledTableCell>
              <StyledTableCell >{row.DId}</StyledTableCell>
              <StyledTableCell >{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.time}</StyledTableCell>

              {/* <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>



     
   </>
    );
  }
}
