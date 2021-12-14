import React, { Component } from "react";
import Slider from "react-slick";
import { Card, Row, Col, Upload, Button as AntButton } from "antd";
import "./landing.css";
import { UploadOutlined } from "@ant-design/icons";
import axios from 'axios';

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
import { imageOverlay } from "leaflet";

const { Meta } = Card;

const id1 = nextId("AK");
console.log(id1)
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: '',
      count: 0,
      items: [],
      positions:[],
      genders:[],
      deviceids: [],
      staffids:[],
      telephones:[],
      emails:[],
      uploadFile: [],
      src: null,
      krows: [],
      passwords: [],
      gender: 'Male',
      position: ''
      // posts: []
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

    this.setState({
      position: event.target.value
    });

  }
  handleGenderchange = (event) => {
    this.setState({
      gender: event.target.value

    });

  }
  handleDeviceIdchange = (event) => {
    const target = event.target;
    const name = target.name
    const deviceid = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      deviceid: event.target.value

    });

  }
  handlePassword = (event) => {
    const target = event.target;
    const name = target.name
    const password = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      password: event.target.value

    });

  }
  handleStaffIdchange = (event) => {
    const target = event.target;
    const name = target.name
    const staffid = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      staffid: event.target.value
    });
  }
  handleTelephonechange = (event) => {
    const target = event.target;
    const name = target.name
    const new_telephone = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      // [name]:value
      new_telephone: event.target.value

    });
  }
  handleEmailchange = (event) => {
    const target = event.target;
    const name = target.name
    const email = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      // [name]:value
      email: event.target.value

    });
  }
  
  
  




  
  handleNameSubmit = () => {

    var items = this.state.items;
    var positions = this.state.positions;
    var genders = this.state.genders;
    var deviceids = this.state.deviceids;
    var staffids = this.state.staffids;
    var telephones = this.state.telephones;
    var emails = this.state.emails;
    var passwords = this.state.passwords;
    
    items.push(this.state.names);
    positions.push(this.state.position);
    genders.push(this.state.gender);
    deviceids.push(this.state.deviceid);
    staffids.push(this.state.staffid);
    telephones.push(this.state.new_telephone);
    emails.push(this.state.email);
    passwords.push(this.state.password);

    console.log("genders:",genders)




    const user = {
        _id: "",
        name: this.state.names,
        staffId: this.state.staffid,
        password: "akilepass",
        isAdmin: false,
        email:this.state.email,
        gender: this.state.gender,
        imageUrl: "",
        workingSite: "-"
    };


    axios
    .post('http://localhost:9000/api/v1/users/signup', user)
    .then(() => console.log('User Created',user))
    .catch(err => {
      console.error("The Error:",err);
    });


    
    // this.getmongodb();

    
    this.setState(event => {
      return { 
        items: items,
        showModal: !this.state.showModal,
        count: event.count + 1}
    });
  }


  // getmongodb = () => {
  //   axios.get('http://localhost:9000/api/v1/attendance')
  //     .then((response) => {
  //       const data = response.data
  //       this.setState({posts:data});
  //       console.log("Recieved",data.attendances.at(-1).checkInTime)
  //     })
  //     .catch(() => {
  //       console.log("Error");
  //     });
  // }

  handleItemChanged(i, event) {
    var items = this.state.items;

    // items[i] = event.target.value;
  

    this.setState({
      items: items
    });
  }
  


  onRemove = (file) => {
    this.setState({
      uploadFile: [],
    });

  };

  cancelItem_onClick = () => {
    this.setState({
      showModal: !this.state.showModal,
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
       this.setState({
      showModal: !this.state.showModal,
    });
  };




  render() {
    const rows = [
      this.createData(
        "Nahom Amare",
        "Project Manager",
        "Male",
        "f5e90564385492f2",
        "AK-0001",
        "",
        "nahom@akile.com"
      ),
      this.createData(
        "Zeynu Nasre",
        "Site Manager, PMP",
        "Male",
        "",
        "AK-0002",
        "",
        "Zeynu@akile.com"
      ),
      this.createData(
        "Digro Mero",
        "PMP",
        "Male",
        "",
        "AK-0003",
        "",
        "Digro@akile.com"
      ),
      this.createData(
        "Meserate Alemayehu",
        "PMP",
        "Female",
        "",
        "AK-0004",
        "",
        "Meserate@akile.com"
      ),
      this.createData(
        "Marshet Getaneh",
        "PMP",
        "Female",
        "",
        "AK-0005",
        "",
        "Marshet@akile.com"
      ),
      this.createData(
        "Getnet",
        "PMP",
        "Male",
        "",
        "AK-0006",
        "",
        "Getnet@akile.com"
      ),
    ];


    var namerows = this.state.items;

    var krows = this.createData(this.state.items ,this.state.positions,this.state.genders,this.state.deviceids,this.state.staffids, this.state.telephones , this.state.emails);

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

                  <Input onChange={this.handleNameChange} placeholder="Name of Employee" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                {/* <Label for="exampleEmail">Position</Label> */}
                <InputGroup>
                  {/* <Label for="exampleEmail">Age</Label> */}

                  <InputGroupAddon addonType="prepend">
                    Position
                  </InputGroupAddon>
                  <Input onChange ={this.handlePositionchange} type="select" name="backdrop" id="backdrop" value={this.state.position}>
                    <option value=" ">Select Position</option>
                    <option value="Site Manager">Site Manager</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="PMP">Professional Machine Painter - PMP</option>
                    <option value="Painter">Painter</option>
                  </Input>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                {/* <Label for="exampleEmail">Sex</Label> */}
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Gender</InputGroupAddon>
                  <Input onChange ={this.handleGenderchange} type="select" name="backdrop" id="backdrop" value={this.state.gender}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Input>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    Device Id
                  </InputGroupAddon>
                  <Input onChange={this.handleDeviceIdchange} placeholder="DeviceId of Employee" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">StaffID</InputGroupAddon>
                  <Input onChange ={this.handleStaffIdchange} placeholder={"AK-000" + (this.state.count + 7)}/>
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
            <Button color="secondary" onClick={this.cancelItem_onClick}>
              Cancel
            </Button>{" "}
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
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Remove</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>     


              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                  <StyledTableCell>{row.Position}</StyledTableCell>
                  <StyledTableCell>{row.Gender}</StyledTableCell>
                  <StyledTableCell>{row.DeviceID}</StyledTableCell>
                  <StyledTableCell>{row.StaffID}</StyledTableCell>
                  <StyledTableCell>{row.Telephone}</StyledTableCell>
                  <StyledTableCell align="right">{row.Email}</StyledTableCell>

              {/* //Add the below comment after fetching from database
                  //Add Authentication 
              */}
                  <StyledTableCell align="right">
                    <Button color="secondary" onClick={this.handleItemChanged.bind(this, 2)}>
                      Remove
                    </Button>
                  </StyledTableCell>


                </StyledTableRow>
              ))}
              {namerows.map((krow,idx) => (
                <StyledTableRow krow={krow} key={krow.rowcount}>
                  <StyledTableCell component="th" scope="row">{krows.name[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.Position[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.Gender[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.DeviceID[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{"AK-000" + (idx + 7) }</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.Telephone[idx]}</StyledTableCell>
                  <StyledTableCell align="right">{krows.Email[idx]}</StyledTableCell>
                  

                  <StyledTableCell align="right">
                    <Button color="secondary" onClick={this.handleItemChanged.bind(this, 2)}>
                      Remove
                    </Button>
                  </StyledTableCell>


                </StyledTableRow>

              ))}
                
                

            </TableBody>
          </Table>
        </TableContainer>      
      </>
    );
  }
}


            //  {/* <FormGroup>
            //     <InputGroup>
            //       <InputGroupAddon addonType="prepend">
            //         Password
            //       </InputGroupAddon>

            //       {/* <Input
            //         placeholder="DeviceId of Employee"
            //         value={Math.random().toString(36).slice(-8)}
            //       /> */}
            //       <PasswordWithGenerator onChange={this.handlePassword} />
            //     </InputGroup>
            //   </FormGroup> */}