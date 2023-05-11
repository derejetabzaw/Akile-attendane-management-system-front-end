import React, { Component } from "react";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from 'axios';
import {
  Button, InputGroup, InputGroupAddon, Modal, ModalHeader,
  ModalBody, ModalFooter, Form, FormGroup, Input,
} from "reactstrap";

import "react-password-with-generator/style.css";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


// const base_url = 'https://akille-4cfc3.firebaseapp.com/api/v1';
const base_url = 'http://localhost:9000/api/v1'

export default class Colors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: '',
      lastName: '',
      firstName: '',
      count: 0,
      render_count: 0,
      users: [],
      items: [],
      positions: [],
      lastNames: [],
      genders: [],
      staffIds: [],
      salarys: [],
      telephones: [],
      emails: [],
      uploadFile: [],
      src: null,
      rows: 0,
      krows: [],
      gender: 'Male',
      position: '',
      database_id: [],
      database_name: [],
      database_lastName: [],
      database_position: [],
      database_gender: [],
      database_staffid: [],
      database_salary: [],
      database_telephone: [],
      database_email: [],
      intial_load: 0,
      id: "",
      place_holder_salary: "",
      place_holder_email: "",
      place_holder_telephone: "",
      place_holder_device: "",
      place_holder_position: ""
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  beforeUploadFile = (file) => {
    this.setState({ uploadFile: [file] });
    return false;
  };

  handleNameChange = (event) => {
    this.setState({
      names: event.target.value
    });
  }

  handleLastNameChange = (event) => {
    this.setState({
      lastName: event.target.value
    })
  }

  handleStaffIdChange = (event) => {
    this.setState({
      staffId: event.target.value
    })
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

  handleSalarychange = (event) => {
    this.setState({
      salary: event.target.value
    });
  }

  handleTelephonechange = (event) => {
    this.setState({
      new_telephone: event.target.value
    });
  }

  handleEmailchange = (event) => {
    this.setState({
      email: event.target.value
    });
  }

  setPlaceHolder(obj) {
    this.state.items = obj
  }

  handleNameSubmit = (event) => {
    event.preventDefault()
    var vals = Math.floor(1000 + Math.random() * 9000)

    var
      staffIds = [],
      items = [],
      lastNames = [],
      genders = [],
      positions = [],
      salarys = [],
      telephones = [],
      emails = []

    staffIds.push(vals)
    items.push(this.state.names);
    lastNames.push(this.state.lastName);
    genders.push(this.state.gender);
    positions.push(this.state.position);
    salarys.push(this.state.salary);
    telephones.push(this.state.new_telephone);
    emails.push(this.state.email);

    const user = {
      _id: "",
      name: this.state.names,
      lastName: this.state.lastName,
      staffId: "AK-" + vals,
      position: this.state.position,
      isAdmin: false,
      email: this.state.email,
      gender: this.state.gender,
      imageUrl: "",
      workingSite: "Piassa",
      salary: this.state.salary,
      telephone: this.state.new_telephone
    };

    axios
      .post(base_url + '/users/signup', user)
      .catch(err => {
        alert("User Not Created")
      });

    this.refreshPage()

    this.setState(event => {
      return {
        items: items,
        showModal: !this.state.showModal,
        count: event.count + 1
      }
    });

  }


  handleRemoveUser = (id) => {
    axios
      .delete(
        base_url + '/users/delete-user/' + id,
        {
          headers: {
            'authorization': localStorage.getItem('Bearer')
          }
        })
      .catch(err => {
        alert.error("Couldn't Delete User", err)
      });

    this.refreshPage()

  }

  handleItemChanged(i, event) {
    var items = this.state.items;
    this.setState({
      items: items
    });
  }

  cancelItem_onClick = () => {
    this.setState({
      showModal: false,
    });
  };

  createData = (
    name,
    lastName,
    Position,
    Gender,
    StaffID,
    Salary,
    Telephone,
    Email
  ) => {
    return {
      name,
      lastName,
      Position,
      Gender,
      StaffID,
      Salary,
      Telephone,
      Email,
    };
  };

  toggleModal = () => {
    this.state.count = this.state.count + 1
    this.setState({
      showModal: !this.state.showModal,

    });
  };

  toggleModalAdd = () => {
    this.state.count = this.state.count + 1
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  componentDidMount = () => {
    this.getmongodb();
  };

  getmongodb() {
    axios.get(
      base_url + '/users/',
      {
        headers: {
          'authorization': localStorage.getItem('Bearer')
        }
      }
    )
      .then((response) => {
        const users_info = response.data
        this.setState({ users: users_info });

        if (this.state.users.length !== 0 && this.state.rows === 0) {
          var user_length = this.state.users.users.length
          this.state.rows = user_length

          for (var j = 0; j < user_length; j++) {
            this.state.database_id.push(this.state.users.users.at(j)._id);
            this.state.database_name.push(this.state.users.users.at(j).name);
            this.state.database_lastName.push(this.state.users.users.at(j).lastName);
            this.state.database_position.push(this.state.users.users.at(j).position);
            this.state.database_gender.push(this.state.users.users.at(j).gender);
            this.state.database_staffid.push(this.state.users.users.at(j).staffId);
            this.state.database_salary.push(this.state.users.users.at(j).salary);
            this.state.database_telephone.push(this.state.users.users.at(j).telephone);
            this.state.database_email.push(this.state.users.users.at(j).email);
          }
        }
      })
      .catch(err => {
        alert('Unauthorized! Please Login again', err.message)
        localStorage.removeItem('Bearer')
        window.location.href = '/'
      })
  }

  UNSAFE_componentWillMount() {
    this.getmongodb();
  }

  refreshPage() {
    window.location.reload();
  }

  render() {
    const database_namerows = this.state.database_name;
    var jrows = this.createData(
      this.state.database_name,
      this.state.database_lastName,
      this.state.database_position,
      this.state.database_gender,
      this.state.database_staffid,
      this.state.database_salary,
      this.state.database_telephone,
      this.state.database_email,
    );

    var rowcount = this.state.rows;

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
        <div className="card-header">
          <p>Transport Allowance / Salary Advance Information</p>
        </div>

        <Button
          color="success"
          onClick={this.toggleModal}
          style={{ float: "right", marginBottom: "2%" }}
        >
          Add Record
        </Button>

        <Modal
          isOpen={this.state.showModal}
          modalTransition={{ timeout: 200 }}
          backdropTransition={{ timeout: 100 }}
          style={{ width: "50%" }}
          toggle={this.toggleModal}
        >
          <ModalHeader>Add Salary Details</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Staff Id</InputGroupAddon>
                  <Input onChange={this.handleNameChange} placeholder="Staff Id of Employee" />
                </InputGroup>
              </FormGroup>

              {/* <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Last Name</InputGroupAddon>
                  <Input onChange={this.handleLastNameChange} placeholder="Last name of Employee" />
                </InputGroup>
              </FormGroup> */}

              {/* <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    Position
                  </InputGroupAddon>
                  <Input onChange={this.handlePositionchange} type="select" name="backdrop" id="backdrop" value={this.state.position}>
                    <option value=" ">Select Position</option>
                    <option value="Site Manager">Site Manager</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="PMP">Professional Machine Painter - PMP</option>
                    <option value="Painter">Painter</option>
                  </Input>
                </InputGroup>
              </FormGroup> */}

              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    Transport Allowance
                  </InputGroupAddon>
                  <Input
                    onChange={this.handleTelephonechange}
                    placeholder="0"
                    type="number"
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Salary Advance</InputGroupAddon>
                  <Input
                    onChange={this.handleEmailchange}
                    placeholder="0"
                    type="number"
                    required
                  />
                </InputGroup>
              </FormGroup>

            </Form>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.handleNameSubmit}>
              Save
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
                <StyledTableCell>Employee Name</StyledTableCell>
                <StyledTableCell>StaffID</StyledTableCell>
                <StyledTableCell>Transport Allowance</StyledTableCell>
                <StyledTableCell>Salary Advance</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {database_namerows.map((krow, idx) => (
                <StyledTableRow krow={krow} key={rowcount}>
                  <StyledTableCell component="th" scope="row">{jrows.name[idx]} {jrows.lastName[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" >{jrows.StaffID[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    0
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    0
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">

                  </StyledTableCell>

                </StyledTableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  }
}