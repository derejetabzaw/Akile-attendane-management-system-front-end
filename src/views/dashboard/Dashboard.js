import React, { Component } from "react";
import Slider from "react-slick";
import { Card, Row, Col, Upload, Button as AntButton } from "antd";
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

const id1 = nextId("AK");
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: '',
      count: 0,
      items: [],
      deviceids: [],
      message: "",
      Position: '',
      Gender: '',
      DeviceID:'',
      StaffID: '',
      Telephone:'',
      Email:'',
      uploadFile: [],
      src: null,
      krows: [],
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  beforeUploadFile = (file) => {
    this.setState({ uploadFile: [file] });
    return false;
  };
  
  handleNameChange = (event) => {
    const target = event.target;
    const name = target.name
    const names = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      names: event.target.value
    });

  }


  handlePositionchange = (event) => {
    const target = event.target;
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]:value
    });
    // console.log(value)

  }
  handleGenderchange = (event) => {
    const target = event.target;
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]:value
    });
    // console.log(value)

  }
  handleDeviceIdchange = (event) => {
    const target = event.target;
    const name = target.name
    const deviceid = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      deviceid: event.target.value

    });

  }
  handleStaffIdchange = (event) => {
    const target = event.target;
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]:value
    });
    console.log(value)

  }
  handleTelephonechange = (event) => {
    const target = event.target;
    const name = target.name
    const telephone = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      // [name]:value
      telephone: event.target.value

    });
    console.log(telephone)

  }
  handleEmailchange = (event) => {
    const target = event.target;
    const name = target.name
    const email = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      // [name]:value
      email: event.target.value

    });
    console.log(email)
  }
  
  
  




  
  handleNameSubmit = () => {

    var items = this.state.items;
    var deviceids = this.state.deviceids
    deviceids.push(this.state.deviceid)
    items.push(this.state.names);
    // items.push(this.state.deviceid);



    
    // const krows = [ this.state.names ,this.state.deviceid, this.state.telephone , this.state.email]
    this.setState(event => {
      return { 
        items: items,
        message: "",
        showModal: !this.state.showModal,
        count: event.count + 1}
    });
  }


  handleItemChanged(i, event) {
    var items = this.state.items;

    // items[i] = event.target.value;
    console.log(items[i])
  

    this.setState({
      items: items
    });
  }
  


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
    name,
    Position,
    Gender,
    DeviceID,
    StaffID,
    Telephone,
    Email
  ) => {
    return {
      name,
      Position,
      Gender,
      DeviceID,
      StaffID,
      Telephone,
      Email,
    };
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  toggleModalAdd = () => {
    // this.createData();
    // const krows = [ this.handleNameChange(),this.handleDeviceIdchange(), this.handleTelephonechange(),this.handleEmailchange()]
    // console.log(krows)
    this.setState({
      showModal: !this.state.showModal,
    });
  };




  render() {
    const rows = [
      this.createData(
        "Beamlak Teshome",
        "Painter - II",
        "Male",
        "f5e90564385492f2",
        "AK-12156",
        "0910315980",
        "dergkat59@gmail.com"
      ),
    ];
    // var krows = [this.state.items,this.state.deviceids];
    var namerows = this.state.items;
    var krows = this.createData(this.state.items ,"","",this.state.deviceids,"", this.state.telephone , this.state.email);
    var rowcount = parseInt(this.state.count);

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
        <Button
          color="primary"
          onClick={this.toggleModal}
          style={{ float: "right", marginBottom: "2%" }}
        >
          Add{" "}
        </Button>

        

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
                  <InputGroupAddon addonType="prepend">Name</InputGroupAddon>

                  <Input   onChange={this.handleNameChange} placeholder="Name of Employee" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                {/* <Label for="exampleEmail">Position</Label> */}
                <InputGroup>
                  {/* <Label for="exampleEmail">Age</Label> */}

                  <InputGroupAddon addonType="prepend">
                    Position
                  </InputGroupAddon>
                  <Input onChange ={this.handlePositionchange} type="select" name="backdrop" id="backdrop">
                    <option value="true">----Select Position----</option>
                    <option value="true">Manager</option>
                    <option value="false">Programmer</option>
                  </Input>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                {/* <Label for="exampleEmail">Sex</Label> */}
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Gender</InputGroupAddon>

                  <Input onChange ={this.handleGenderchange} type="select" name="backdrop" id="backdrop">
                    <option value="true">Male</option>
                    <option value="false">Female</option>
                  </Input>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    Device Id
                  </InputGroupAddon>
                  <Input onChange={this.handleDeviceIdchange} placeholder="DeviceId of Employee" /> */}
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    Password
                  </InputGroupAddon>

                  {/* <Input
                    placeholder="DeviceId of Employee"
                    value={Math.random().toString(36).slice(-8)}
                  /> */}
                  <PasswordWithGenerator />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup>
                  {/* <Label for="exampleEmail">Age</Label> */}

                  <InputGroupAddon addonType="prepend">
                    Telephone
                  </InputGroupAddon>
                  <Input
                    onChange ={this.handleTelephonechange}
                    placeholder="Phone Number of Employee"
                    min={10}
                    max={13}
                    type="number"
                  />
                  {/* <InputGroupAddon addonType="append">.00</InputGroupAddon> */}
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Email</InputGroupAddon>

                  <Input onChange ={this.handleEmailchange} placeholder="Email of Employee" />
                </InputGroup>
              </FormGroup>
              <Upload
                accept="image/*"
                beforeUpload={this.beforeUploadFile}
                onRemove={this.onRemove}
                onChange={this.onSelectFile}
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleNameSubmit}>
              Add Employee
            </Button>{" "}
            <Button color="secondary" onClick={this.handleItemChanged.bind(this, 2)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        
        
        <div style={{ marginTop: "2%" }}></div>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Position</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
                <StyledTableCell>DeviceID</StyledTableCell>
                <StyledTableCell>StaffID</StyledTableCell>
                <StyledTableCell>Telephone</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>     
              {namerows.map((krow,idx) => (
                <StyledTableRow krow={krow} key={krow.rowcount}>
                  <StyledTableCell component="th" scope="row">{krows.name[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.DeviceID[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{}</StyledTableCell>
                </StyledTableRow>

              ))}
                

            </TableBody>
          </Table>
        </TableContainer>      
      </>
    );
  }
}
