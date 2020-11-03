import React, { Component } from "react";
import Slider from "react-slick";
import { Card, Row, Col, Carousel } from "antd";
import "./landing.css";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
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

  createData = (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }


  render() {
    const rows = [
      this.createData("Joe James", 30,"Addis Ababa"),
      this.createData("John Walsh", 42, "CT"),
      this.createData("Bob Herm", 33, "FL"),
      this.createData("James Houston", 37, "TX"),
    ];
    const useStyles = makeStyles({
      table: {
        minWidth: 700,
      },
    });

    const columns = ["Name", "Company", "City", "State"];

    const data = [
      ["Joe James", "Test Corp", "Yonkers", "NY"],
      ["John Walsh", "Test Corp", "Hartford", "CT"],
      ["Bob Herm", "Test Corp", "Tampa", "FL"],
      ["James Houston", "Test Corp", "Dallas", "TX"],
    ];

    const options = {
      filterType: "checkbox",
    };

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
      <Button color="primary" onClick={this.toggleModal} style={{float:"right", marginBottom: '2%'}}>Add </Button>
      
      <div style={{marginTop: '2%'}}></div>
      <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Employee Name</StyledTableCell>
            <StyledTableCell align="right">Age</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            {/* <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>



      <Modal isOpen={this.state.showModal} modalTransition={{ timeout: 200 }} backdropTransition={{ timeout: 100 }}
      style={{ width: '50%'}}
        toggle={this.toggleModal} >
        <ModalHeader toggle={this.toggleModal}>Add Employee</ModalHeader>
        <ModalBody>
          <Form>
          <FormGroup>
        <Label for="exampleEmail">Name</Label>
        <Input  name="email" id="exampleEmail" placeholder="with a placeholder" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Age</Label>
        <Input  name="email" id="exampleEmail" placeholder="with a placeholder" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Address</Label>
        <Input  name="email" id="exampleEmail" placeholder="with a placeholder" />
      </FormGroup>
          </Form>
         </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggleModal}>Add Employee</Button>{' '}
          <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
   </>
    );
  }
}
