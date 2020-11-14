import React, { Component } from "react";
import Slider from "react-slick";
import { Card, Row, Col, Carousel } from "antd";
import "./landing.css";

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
      this.createData("Joe James", 'Female', 30,"CEO"),
      this.createData("John Walsh", 'Male', 42, "COO"),
      this.createData("Bob Herm", 'Female', 33, "Manager"),
      this.createData("James Houston", 'Male', 37, "Business Analyst"),
    ];
    const useStyles = makeStyles({
      table: {
        minWidth: 700,
      },
    });

  
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
            <StyledTableCell >Sex</StyledTableCell>
            <StyledTableCell >Age</StyledTableCell>
            <StyledTableCell align="right">Position</StyledTableCell>
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
              <StyledTableCell >{row.calories}</StyledTableCell>
              <StyledTableCell >{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>

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
        {/* <Label for="exampleEmail">Name</Label> */}
      <InputGroup>
      <InputGroupAddon addonType="prepend">Name</InputGroupAddon>

        <Input placeholder="Name of Employee" />
      </InputGroup>

      </FormGroup>
      <FormGroup>
        {/* <Label for="exampleEmail">Sex</Label> */}
      <InputGroup>

        <InputGroupAddon addonType="prepend">Sex</InputGroupAddon>

        <Input type="select" name="backdrop" id="backdrop">
            <option value="true">Male</option>
            <option value="false">Female</option>
          </Input>
      </InputGroup>

      </FormGroup>
      <FormGroup>
      <InputGroup>
        {/* <Label for="exampleEmail">Age</Label> */}

        <InputGroupAddon addonType="prepend">Age</InputGroupAddon>
        <Input placeholder="Age of Employee" min={0} max={100} type="number" step="1" />
        {/* <InputGroupAddon addonType="append">.00</InputGroupAddon> */}
      </InputGroup>
      </FormGroup>
      <FormGroup>
        {/* <Label for="exampleEmail">Position</Label> */}
        <InputGroup>
        {/* <Label for="exampleEmail">Age</Label> */}

        <InputGroupAddon addonType="prepend">Position</InputGroupAddon>
        <Input type="select" name="backdrop" id="backdrop">
            <option value="true">----Select Position----</option>
            <option value="true">Manager</option>

            <option value="false">Programmer</option>
        </Input>
      </InputGroup>
        
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
