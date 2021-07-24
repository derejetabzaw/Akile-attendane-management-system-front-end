import React, { Component } from "react";
import Slider from "react-slick";
import { Card, Row, Col, Upload, Button as AntButton } from "antd";
import { Accordion, Tab,Tabs } from "react-bootstrap";
import "./landing.css";
import { UploadOutlined } from "@ant-design/icons";
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
import nextId from "react-id-generator";
import PasswordWithGenerator from "react-password-with-generator";
import "react-password-with-generator/style.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const { Meta } = Card;

// const id1 = nextId("AK");
export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      uploadFile: [],
      src: null,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  beforeUploadFile = (file) => {
    this.setState({ uploadFile: [file] });
    return false;
  };

  onRemove = (file) => {
    this.setState({
      uploadFile: [],
    });
  };
  onSelectFile = (file, list, e) => {
    // if (file) {
    //   const reader = new FileReader();
    //   reader.addEventListener("load", () =>
    //     this.setState({ src: reader.result })
    //   );
    //   reader.readAsDataURL(file.file);
    // }
  };
  createData = (
    Machine_Name,
    Components,
    Status,
    Site,
  ) => {
    return {
      Machine_Name,
      Components,
      Status,
      Site,
    };
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  toggleModalAdd = () => {
    this.createData();
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  render() {
    const requestForm = ["Form"]
    const rows = [
      this.createData(
        "Water Based Spray Machine 001",
        "Hose",
        "Out",
        "Bole",
      ),
      this.createData(
        "Oil Based Spray Machine 002",
        "Hose",
        "Available",
        "",
      ),
      this.createData(
        "Jet Roller 003",
        "Hose",
        "Available",
        "",
      ),
      this.createData(
        "Sanding Machine 004",
        "Hose",
        "Available",
        "",
      ),
    ];
    const rows_new = [
        this.createData(
          "Water Based Spray Machine 001",
          "Hose",
          "Out",
          "Bole",
        ),
        this.createData(
          "Oil Based Spray Machine 002",
          "Hose",
          "Available",
          "",
        ),
        this.createData(
          "Jet Roller 003",
          "Hose",
          "Available",
          "",
        ),
        this.createData(
          "Sanding Machine 004",
          "Hose",
          "Available",
          "",
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
    // console.log("id1 is", id1);
    return (
      <>


        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="home" title="Status">
                <Button
                    color="primary"
                    onClick={this.toggleModal}
                    style={{ float: "right", marginBottom: "2%" }}
                    >
                    Add Machines{" "}
                </Button>

                <div style={{ marginTop: "2%" }}></div>
                <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Machine Name</StyledTableCell>
                        <StyledTableCell>Components</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Site</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.Machine_Name}>
                        <StyledTableCell component="th" scope="row">
                            {row.Machine_Name}
                        </StyledTableCell>
                        <StyledTableCell>{row.Components}</StyledTableCell>
                        <StyledTableCell>{row.Status}</StyledTableCell>
                        <StyledTableCell>{row.Site}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Tab>
            <Tab eventKey="am" title="Assign Machine">
            </Tab>
            <Tab eventKey="requests" title="Requests">

                <div style={{ marginTop: "2%" }}></div>
                <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Request Form</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows_new.map((index) => (
                        <StyledTableRow key={index.Name}>
                        <StyledTableCell component="th" scope="index">
                            {index.Name}
                        </StyledTableCell>
                        <StyledTableCell>{index.ID}</StyledTableCell>
                        <StyledTableCell>{requestForm}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>

            </Tab>
        </Tabs>



        <Modal
          isOpen={this.state.showModal}
          modalTransition={{ timeout: 200 }}
          backdropTransition={{ timeout: 100 }}
          style={{ width: "50%" }}
          toggle={this.toggleModal}
        >
          <ModalHeader toggle={this.toggleModal}>Add Employee</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                {/* <Label for="exampleEmail">Name</Label> */}
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Machine Name</InputGroupAddon>

                  <Input placeholder="Machine Name" />
                </InputGroup>
              </FormGroup>




                <InputGroup>
                    <InputGroupAddon addonType="prepend">Components</InputGroupAddon>

                    <Input placeholder="Add" />
                    <Button
                    color="primary"
                    // style={{ float: "right", marginBottom: "2%" }}
                    >
                    +{" "}
                    </Button>
                </InputGroup>
 
            </Form>
          </ModalBody>

        </Modal>
      </>
    );
  }
}
