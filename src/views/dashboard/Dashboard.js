import React, { Component } from "react";
import { Upload } from "antd";
import "./landing.css";
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


// const base_url = 'http://localhost:9000/api/v1';
// const base_url = 'https://akille-backend-server.onrender.com/api/v1';
const base_url = 'https://hrserver.akillepainting.com/api/v1';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal2: false,
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
      // deviceids: [],
      staffIds: [],
      salarys: [],
      telephones: [],
      emails: [],
      uploadFile: [],
      src: null,
      rows: 0,
      krows: [],
      // passwords: [],
      gender: 'Male',
      position: '',
      database_id: [],
      database_name: [],
      database_lastName: [],
      database_position: [],
      database_gender: [],
      // database_deviceid: [],
      database_staffid: [],
      database_salary: [],
      database_telephone: [],
      database_email: [],
      intial_load: 0,
      // vals: Math.floor(1000 + Math.random() * 9000),
      id: "",
      place_holder_salary: "",
      place_holder_email: "",
      place_holder_telephone: "",
      place_holder_device: "",
      place_holder_position: ""
      // posts: []
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleUpdate = this.toggleUpdate.bind(this);
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

  // handleDeviceIdchange = (event) => {
  //   const target = event.target;
  //   const name = target.name
  //   const deviceid = target.type === 'checkbox' ? target.checked : target.value;
  //   this.setState({
  //     deviceid: event.target.value
  //   });
  // }

  // handlePassword = (event) => {
  //   const target = event.target;
  //   const name = target.name
  //   const password = target.type === 'checkbox' ? target.checked : target.value;
  //   this.setState({
  //     password: event.target.value
  //   });
  // }

  handleSalarychange = (event) => {
    const target = event.target;
    const name = target.name
    const salary = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      salary: event.target.value
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
    this.setState({
      // [name]:value
      email: event.target.value
    });
  }

  setPlaceHolder(obj) {
    this.state.items = obj
    // localStorage.setItem("update-data",JSON.stringify(obj))
  }

  handleNameSubmit = (event) => {
    event.preventDefault()
    var vals = Math.floor(1000 + Math.random() * 9000)

    var staffIds = [], items = [], lastNames = [], genders = [], positions = [], salarys = [], telephones = [], emails = []
    // var passwords = this.state.passwords;
    // var deviceids = this.state.deviceids;

    staffIds.push(vals)
    items.push(this.state.names);
    lastNames.push(this.state.lastName);
    genders.push(this.state.gender);
    positions.push(this.state.position);
    salarys.push(this.state.salary);
    telephones.push(this.state.new_telephone);
    emails.push(this.state.email);

    // passwords.push(this.state.password);
    // deviceids.push(this.state.deviceid);



    const user = {
      _id: "",
      name: this.state.names,
      lastName: this.state.lastName,
      staffId: "AK-" + vals,
      // password: this.state.password,
      position: this.state.position,
      isAdmin: false,
      email: this.state.email,
      gender: this.state.gender,
      imageUrl: "",
      workingSite: "Piassa",
      salary: this.state.salary,
      telephone: this.state.new_telephone,
      // deviceId: this.state.deviceid

    };

    axios
      .post(base_url + '/users/signup', user)
      .then(() => {
        alert("User Created")
      })
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
  //update-User
  handleUpdate = () => {
    const staffId = this.state.id;
    var positions = this.state.positions;

    // var deviceids = this.state.deviceids;
    var salarys = this.state.salarys;
    var telephones = this.state.telephones;
    var emails = this.state.emails;
    // var passwords = this.state.passwords;

    positions.push(this.state.position);
    // deviceids.push(this.state.deviceids);
    salarys.push(this.state.salary);
    telephones.push(this.state.new_telephone);
    emails.push(this.state.email);
    // passwords.push(this.state.password);
    console.log("Updating")
    const user = {
      // password: this.state.password,
      email: this.state.email,
      // deviceId: this.state.deviceid,
      isAdmin: false,
      position: this.state.position,
      workingSite: "Bole",
      salary: this.state.salary,
      telephone: this.state.new_telephone

    };

    axios.put(
      base_url + '/users/update-users/' + staffId, user,
      {
        headers: {
          'authorization': localStorage.getItem('Bearer')
        }
      })
      .then(
      () => alert("User Successfully Updated")
    )
      .catch(err => {
        alert.error("Couldn't Update User", err)
      });

    this.refreshPage()

    //this makes the update work
    this.setState(event => {
      return {
        showModal2: !this.state.showModal2,
      }
    });
  }
  //delete-users/
  handleRemoveUser = (id) => {
    axios
      .delete(
        base_url + '/users/delete-user/' + id,
        {
          headers: {
            'authorization': localStorage.getItem('Bearer')
          }
        })
      .then(
      () => alert("User Successfully Deleted")
    )
      .catch(err => {
        alert.error("Couldn't Delete User", err)
      });

    this.refreshPage()

    // this makes the remove work
    this.setState(event => {
      return {
        showModal2: !this.state.showModal2,
      }
    });
  }

  handleItemChanged(i, event) {
    var items = this.state.items;
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
      showModal: false,
      showModal2: false,
      // temp: this.refreshPage()
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
    lastName,
    Position,
    Gender,
    // DeviceID,
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
      // DeviceID,
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

  toggleUpdate = () => {

    this.setState({
      showModal2: !this.state.showModal2
    })
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
            // this.state.database_deviceid.push(this.state.users.users.at(j).deviceId);
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

  // Testrender(id) {
  //   return <div>
  //     <h1>place holder</h1>
  //   </div>
  // }



  render() {
    const database_namerows = this.state.database_name;
    var jrows = this.createData(
      this.state.database_name,
      this.state.database_lastName,
      this.state.database_position,
      this.state.database_gender,
      // this.state.database_deviceid,
      this.state.database_staffid,
      this.state.database_salary,
      this.state.database_telephone,
      this.state.database_email,
      // this.state.database_id
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


    // console.log("id1 is", id1);

    // const history = useHistory()
    // useEffect(() => {
    //   const token = localStorage.getItem('token')
    //   if (!token) {
    //     const user = jwt.decode(token)
    //     if (!user) {
    //       localStorage.removeItem('token')
    //       history.replace('/')
    //     }
    //     else {
    //       this.getmongodb();
    //     }
    //   }
    // }, [history])

    return (
      <>
        <Button
          color="primary"
          onClick={this.toggleModal}
          style={{ float: "right", marginBottom: "2%" }}
        >
          Add
        </Button>{" "}

        <Modal
          isOpen={this.state.showModal}
          modalTransition={{ timeout: 200 }}
          backdropTransition={{ timeout: 100 }}
          style={{ width: "50%" }}
          toggle={this.toggleModal}

        >
          <ModalHeader>Add Employee</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">First Name</InputGroupAddon>
                  <Input onChange={this.handleNameChange} placeholder="First name of Employee" />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Last Name</InputGroupAddon>
                  <Input onChange={this.handleLastNameChange} placeholder="Last name of Employee" />
                </InputGroup>
              </FormGroup>

              <FormGroup>
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
              </FormGroup>

              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Gender</InputGroupAddon>
                  <Input onChange={this.handleGenderchange} type="select" name="backdrop" id="backdrop" value={this.state.gender}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Input>
                </InputGroup>
              </FormGroup>

              {/* <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    Device Id
                  </InputGroupAddon>
                  <Input
                    onChange={this.handleDeviceIdchange}
                    placeholder="DeviceId of Employee" />
                </InputGroup>
              </FormGroup> */}

              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    Basic Salary
                  </InputGroupAddon>
                  <Input
                    onChange={this.handleSalarychange}
                    type="number"
                    placeholder="Salary"
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    Telephone
                  </InputGroupAddon>
                  <Input
                    onChange={this.handleTelephonechange}
                    placeholder="Phone Number of Employee"
                    // min={10}
                    // max={13}
                    type="phone"
                  />
                </InputGroup>
              </FormGroup>

              {/* <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    Password
                  </InputGroupAddon>
                  <Input
                    onChange={this.handlePassword}
                    placeholder="Password of the Employee"
                    type="password"
                    required
                  />
                </InputGroup>
              </FormGroup> */}

              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                  <Input
                    onChange={this.handleEmailchange}
                    placeholder="Email of Employee"
                    type="email"
                    required
                  />
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
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell>Last Name</StyledTableCell>
                <StyledTableCell>Position</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
                {/* <StyledTableCell>DeviceID</StyledTableCell> */}
                <StyledTableCell>StaffID</StyledTableCell>
                <StyledTableCell>Basic Salary</StyledTableCell>
                <StyledTableCell>Telephone</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Edit</StyledTableCell>
                <StyledTableCell>Remove</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {/*
                  //Add Authentication 
                  // Create a handle for the Remove button to remove user on that row 
                    and also from the database after the right authentications from admins
                  //FetchId from table when clicking that row's edit button
              */}
              {database_namerows.map((krow, idx) => (
                <StyledTableRow krow={krow} key={rowcount}>
                  <StyledTableCell component="th" scope="row">{jrows.name[idx]}</StyledTableCell>                   <StyledTableCell component="th" scope="row">{jrows.lastName[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{jrows.Position[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{jrows.Gender[idx]}</StyledTableCell>
                  {/* <StyledTableCell component="th" scope="row">{jrows.DeviceID[idx]}</StyledTableCell> */}
                  <StyledTableCell component="th" scope="row">{jrows.StaffID[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{jrows.Salary[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{jrows.Telephone[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{jrows.Email[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" >
                    <Button color="secondary" onClick={() => {
                      this.state.id = this.state.database_id[idx]
                      this.state.place_holder_salary = jrows.Salary[idx]
                      this.state.place_holder_email = jrows.Email[idx]
                      //  this.state.place_holder_device = jrows.DeviceID[idx]
                      this.state.place_holder_telephone = jrows.Telephone[idx]
                      this.state.place_holder_position = jrows.Position[idx]

                      this.toggleUpdate()
                    }}>
                      Edit
                    </Button>{" "}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    <Button color="secondary" onClick={() => { this.handleRemoveUser(jrows.StaffID[idx]) }}>
                      Remove
                    </Button>{" "}
                  </StyledTableCell>
                </StyledTableRow>


              ))}









              <Modal
                isOpen={this.state.showModal2}
                modalTransition={{ timeout: 200 }}
                backdropTransition={{ timeout: 100 }}
                style={{ width: "50%" }}
              >
                <ModalHeader>Update Employee</ModalHeader>
                <ModalBody>
                  <Form>
                    <FormGroup>
                      <InputGroup>
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          Position
                        </InputGroupAddon>
                        <Input onChange={this.handlePositionchange} type="select" name="backdrop" id="backdrop" value={this.state.position} placeholder={this.state.place_holder_position}>
                          <option value=" ">Select Position</option>
                          <option value="Site Manager">Site Manager</option>
                          <option value="Project Manager">Project Manager</option>
                          <option value="PMP">Professional Machine Painter - PMP</option>
                          <option value="Painter">Painter</option>
                        </Input>
                      </InputGroup>
                    </FormGroup>
                    {/* <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          Device Id
                        </InputGroupAddon>
                        <Input onChange={this.handleDeviceIdchange} placeholder={this.state.place_holder_device} id="device" />
                      </InputGroup>
                    </FormGroup> */}
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          Basic Salary
                        </InputGroupAddon>
                        <Input onChange={this.handleSalarychange} type="number" placeholder={this.state.place_holder_salary} id="salary" />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          Telephone
                        </InputGroupAddon>
                        <Input
                          onChange={this.handleTelephonechange}
                          placeholder={this.state.place_holder_telephone}
                          type="number"
                          id="telephone"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                        <Input onChange={this.handleEmailchange} placeholder={this.state.place_holder_email} id="email" />
                      </InputGroup>
                    </FormGroup>
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={() => this.handleUpdate()}>
                    Update Employee
                  </Button>{" "}
                  <Button color="secondary" onClick={this.cancelItem_onClick}>
                    Cancel
                  </Button>{" "}
                </ModalFooter>
              </Modal>


            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}