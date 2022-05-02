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

// const id1 = nextId("AK");
// console.log(id1)

const base_url = 'http://localhost:9000/api/v1' ;



export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal2: false,
      showModal: false,
      name: '',
      count: 0,
      users: [],
      items: [],
      positions:[],
      genders:[],
      deviceids: [],
      staffids:[],
      salarys:[],
      telephones:[],
      emails:[],
      uploadFile: [],
      src: null,
      krows: [],
      passwords: [],
      gender: 'Male',
      position: '',
      database_id: [],
      database_name: [],
      database_position: [],
      database_gender: [],
      database_deviceid: [],
      database_staffid: [],
      database_salary: [],
      database_telephone: [],
      database_email: [],
      intial_load : 0,
      vals: Math.floor(1000 + Math.random() * 9000),
      id:"",
      place_holder_salary:"",
      place_holder_email:"",
      place_holder_telephone:"",
      place_holder_device:"",
      place_holder_position:""
       
      
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
  // Commented out handleStaffIdchange because the text field is removed and also the autogeneration 
  // is done in the handleNameSubmit

  // handleStaffIdchange = (event) => {
    // const target = event.target;
    // const name = target.name
    // const staffid = target.type === 'checkbox' ? target.checked : target.value;
    
  //   this.setState({
  //     staffid: "AK-" + this.state.vals
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
    const target = event.target;
    const name = target.name
    const email = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      // [name]:value
      email: event.target.value

    });
  }
  
  setPlaceHolder(obj){
    this.state.items = obj
    console.log(this.state.items)
    // localStorage.setItem("update-data",JSON.stringify(obj))
  }
  




  
  handleNameSubmit = () => {

    var items = this.state.items;
    var positions = this.state.positions;
    var genders = this.state.genders;
    var deviceids = this.state.deviceids;
    //var staffids = this.state.staffids;
    var salarys = this.state.salarys;
    var telephones = this.state.telephones;
    var emails = this.state.emails;
    var passwords = this.state.passwords;
       

    items.push(this.state.names);
    positions.push(this.state.position);
    genders.push(this.state.gender);
    deviceids.push(this.state.deviceid);
    //staffids.push(this.state.staffid);
    salarys.push(this.state.salary);
    telephones.push(this.state.new_telephone);
    emails.push(this.state.email);
    passwords.push(this.state.password);

     

    const user = {
        _id: "",
        name: this.state.names,
        //staffId: this.state.staffid,
        staffId: "AK-" + this.state.vals,
        
        password: "akilepass",
        position: this.state.position,
        isAdmin: false,
        email:this.state.email,
        gender: this.state.gender,
        imageUrl: "",
        workingSite: "Piassa",
        salary: this.state.salary,
        telephone:this.state.new_telephone,
        deviceId: this.state.deviceid

    };


    axios
    .post('http://localhost:9000/api/v1/users/signup', user)
    .then(() => {
      alert("User Created")
      console.log('User Created',user)})
    .catch(err => {
      alert("User Not Created");
      console.error("The Error:",err);
    });
    
    this.refreshPage()
    
    this.setState(event => {
      return { 
        items: items,
        showModal: !this.state.showModal,
        count: event.count + 1}
    });
    
  }
  //update-User
  handleUpdate = () => {
   const  staffId = this.state.id;
    console.log(staffId)
    var positions = this.state.positions;

    var deviceids = this.state.deviceids;
    var salarys = this.state.salarys;
    var telephones = this.state.telephones;
    var emails = this.state.emails;
    var passwords = this.state.passwords;
       
    positions.push(this.state.position);
    deviceids.push(this.state.deviceids);
    salarys.push(this.state.salary);
    telephones.push(this.state.new_telephone);
    emails.push(this.state.email);
    passwords.push(this.state.password);
    console.log("Updating")
    const user = {
        password: "akilepass",
        email:this.state.email,
        deviceId: this.state.deviceid,
        isAdmin: false,
        position: this.state.position,
        workingSite: "Bole",
        salary: this.state.salary,
        telephone:this.state.new_telephone
       
    };
    
    axios.put('http://localhost:9000/api/v1/users/update-users/'+staffId,user)
    
    this.refreshPage()

    // this.setState(event => {
    //   return { 
    //     showModal2: !this.state.showModal2,
    //     }
    // });
  }
  //delete-users/
  handleRemoveUser =  (id)=>{
    axios
    .delete('http://localhost:9000/api/v1/users/delete-user/'+id)
    .then(()=> alert("User Successfully Deleted"))
    .catch(err=>{
        alert.error("Couldn't Delete User", err)
    });

    this.refreshPage()
  }
  handleUpdateUser=()=>
  {
    let id = localStorage.getItem("id");
    console.log(id);
     axios.put(`http://localhost:9000/api/v1/users/delete-user/update-users/:id`)
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
      showModal: false,
      showModal2: false,
      temp: this.refreshPage()
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
    Salary,
    Telephone,
    Email
  ) => {
    return {
      name,
      Position,
      Gender,
      DeviceID,
      StaffID,
      Salary,
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

  toggleUpdate = () =>{

    this.setState({
      showModal2: !this.state.showModal2
    })
    
  };
  

  componentDidMount = () =>{
    this.getmongodb();
  };
    

  getmongodb = () => {
      axios.get(base_url + '/users/')
      .then((response) => {
        const users_info = response.data
        this.setState({users:users_info});

        if (this.state.users.length !== 0) {
          var user_length = this.state.users.users.length
          for (var j = 0; j < user_length; j++) {
              this.state.database_id.push(this.state.users.users.at(j)._id);
              this.state.database_name.push(this.state.users.users.at(j).name);
              this.state.database_position.push(this.state.users.users.at(j).position);
              this.state.database_gender.push(this.state.users.users.at(j).gender);
              this.state.database_deviceid.push(this.state.users.users.at(j).deviceId);
              this.state.database_staffid.push(this.state.users.users.at(j).staffId);
              this.state.database_salary.push(this.state.users.users.at(j).salary);
              this.state.database_telephone.push(this.state.users.users.at(j).telephone);
              this.state.database_email.push(this.state.users.users.at(j).email);            
          }
        }
      })
      .catch(() => {
        console.log("Error");
      });
  }

  refreshPage() {
    window.location.reload();
  }  



  componentWillMount(){
    this.getmongodb();
  }
  Testrender(id){
   return <div>
      <h1>place holder</h1>
   </div>
  }
  render() {  
    var namerows = this.state.items;
    var database_namerows = this.state.database_name;    
    var krows = this.createData(
      this.state.items ,
      this.state.positions,
      this.state.genders,
      this.state.deviceids,
      this.state.staffids,
      this.state.salarys,
      this.state.telephones , 
      this.state.emails);

    var jrows = this.createData(
      this.state.database_name,
      this.state.database_position,
      this.state.database_gender,
      this.state.database_deviceid,
      this.state.database_staffid,
      this.state.database_salary,
      this.state.database_telephone, 
      this.state.database_email,
      this.state.database_id
      );

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
                  <InputGroupAddon addonType="prepend">
                    Basic Salary
                  </InputGroupAddon>
                  <Input onChange ={this.handleSalarychange} type="number" placeholder="Salary" />
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
                <StyledTableCell>Basic Salary</StyledTableCell>
                <StyledTableCell>Telephone</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>

                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>

              </TableRow>
            </TableHead>
            <TableBody>     

              {/*
                  //Add Authentication 
                  // Create a handle for the Remove button to remove user on that row 
                    and also from the database after the right authentications from admins
                  //FetchId from table when clicking that row's edit button
              */}
                            
              {database_namerows.map((krow,idx) => ( 
                <StyledTableRow krow={krow} key={krow.rowcount}>
                  
                  <StyledTableCell component="th" scope="row">{jrows.name[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{jrows.Position[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{jrows.Gender[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{jrows.DeviceID[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{jrows.StaffID[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{jrows.Salary[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{jrows.Telephone[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{jrows.Email[idx]}</StyledTableCell>

                  <StyledTableCell component="th" scope="row" >
                    <Button color="secondary" onClick={()=>{
                      
                      this.state.id = this.state.database_id[idx]
                      // let placeholders = {
                      //   salary:jrows.Salary[idx],
                      //   device: jrows.DeviceID[idx],
                      //   email: jrows.Email[idx],
                      //   telephone: jrows.Telephone[idx]
                      // }
                      //  this.setPlaceHolder(placeholders)
                      this.state.place_holder_salary=jrows.Salary[idx]
                      this.state.place_holder_email = jrows.Email[idx]
                      this.state.place_holder_device = jrows.DeviceID[idx]
                      this.state.place_holder_telephone = jrows.Telephone[idx]
                      this.state.place_holder_position = jrows.Position[idx]
                      
                      this.toggleUpdate()
                      }}>
                      Edit
                    </Button>{" "}
                  </StyledTableCell>
                  
                  <StyledTableCell align="left">
                    <Button color="secondary" onClick={() => {this.handleRemoveUser(jrows.StaffID[idx])}}>
                      Remove
                    </Button>{" "}
                  </StyledTableCell>

                </StyledTableRow>

              ))} 

              {namerows.map((krow,idx) => ( 
                <StyledTableRow krow={krow} key={krow.rowcount}>
                  <StyledTableCell component="th" scope="row">{krows.name[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.Position[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.Gender[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.DeviceID[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.StaffID[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.Salary[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.Telephone[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.Email[idx]}</StyledTableCell>

                  
                  <StyledTableCell align="left">
                  <Button color="secondary" onClick={() => {this.handleRemoveUser(krows.StaffID[idx])}}>
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
                      // toggle={this.toggleUpdate}
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
                              <Input onChange ={this.handlePositionchange} type="select" name="backdrop" id="backdrop" value={this.state.position} placeholder={this.state.place_holder_position}>
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
                              <InputGroupAddon addonType="prepend">
                                Device Id
                              </InputGroupAddon>
                              <Input onChange={this.handleDeviceIdchange} placeholder={this.state.place_holder_device} id="device"/>
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                Basic Salary
                              </InputGroupAddon>
                              <Input onChange ={this.handleSalarychange} type="number" placeholder={this.state.place_holder_salary} id="salary"/>
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                Telephone
                              </InputGroupAddon>
                              <Input
                                onChange ={this.handleTelephonechange}
                                placeholder={this.state.place_holder_telephone}
                                min={10}
                                max={13}
                                type="number"
                                id="telephone"
                              />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                              <Input onChange ={this.handleEmailchange} placeholder={this.state.place_holder_email} id="email"/>
                            </InputGroup>
                          </FormGroup>
                        </Form>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={()=>this.handleUpdate()}>
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