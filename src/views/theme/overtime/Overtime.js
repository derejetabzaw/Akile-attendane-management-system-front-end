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

export default class Overtime extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  name: '',
                  lastName: '',
                  count: 0,
                  render_count: 0,
                  users: [],
                  items: [],
                  lastNames: [],
                  staffIds: [],
                  rows: 0,
                  krows: [],
                  database_id: [],
                  database_name: [],
                  database_lastName: [],
                  database_staffid: [],
                  intial_load: 0,
                  id: "",
                  ot1: 0,
                  ot2: 0,
                  ot1s: [],
                  ot2s: [],
                  database_ot1: [],
                  database_ot2: [],
                  attendance: [],
            };
      }

      handleUpdate = () => {
            const staffId = this.state.id;
            var positions = this.state.positions;
            var salarys = this.state.salarys;
            var telephones = this.state.telephones;
            var emails = this.state.emails;

            positions.push(this.state.position);
            salarys.push(this.state.salary);
            telephones.push(this.state.new_telephone);
            emails.push(this.state.email);
            const user = {
                  email: this.state.email,
                  isAdmin: false,
                  position: this.state.position,
                  workingSite: "Bole",
                  salary: this.state.salary,
                  telephone: this.state.new_telephone
            };

            // axios.put(
            //       base_url + '/users/update-users/' + staffId, user,
            //       {
            //             headers: {
            //                   'authorization': localStorage.getItem('Bearer')
            //             }
            //       })
            //       .catch(err => {
            //             alert.error("Couldn't Update User", err)
            //       });

            this.refreshPage()

            //this makes the update work
            this.setState(event => {
                  return {
                        showModal2: !this.state.showModal2,
                  }
            });
      }

      handleRemoveUser = (id) => {
            // axios
            //       .delete(
            //             base_url + '/users/delete-user/' + id,
            //             {
            //                   headers: {
            //                         'authorization': localStorage.getItem('Bearer')
            //                   }
            //             })
            //       .catch(err => {
            //             alert.error("Couldn't Delete User", err)
            //       });

            this.refreshPage()

            // this makes the remove work
            this.setState(event => {
                  return {
                        showModal2: !this.state.showModal2,
                  }
            });
      }


      createData = (
            name,
            lastName,
            StaffID,
            ot1,
            ot2
      ) => {
            return {
                  name,
                  lastName,
                  StaffID,
                  ot1,
                  ot2
            };
      };

      componentDidMount = () => {
            this.getmongodb();
      };

      getmongodb() {
            axios.all([
                  axios.get(base_url + '/users/', {
                        headers: {
                              'authorization': localStorage.getItem('Bearer')
                        }
                  }),
                  axios.get(base_url + '/attendance/', {
                        headers: {
                              'authorization': localStorage.getItem('Bearer')
                        }
                  })
            ]).then(axios.spread((usersResponse, attendanceResponse) => {
                  const users_info = usersResponse.data;
                  const attendance_info = attendanceResponse.data;

                  this.setState({
                        users: users_info,
                        attendance: attendance_info
                  });

                  console.log(attendanceResponse.data)

                  if (this.state.users.length !== 0 && this.state.rows === 0) {
                        var user_length = this.state.users.users.length
                        this.state.rows = user_length

                        for (var j = 0; j < user_length; j++) {
                              this.state.database_id.push(this.state.users.users.at(j)._id);
                              this.state.database_name.push(this.state.users.users.at(j).name);
                              this.state.database_lastName.push(this.state.users.users.at(j).lastName);
                              this.state.database_staffid.push(this.state.users.users.at(j).staffId);

                              console.log("Try", this.state.attendance)

                              // add ot1 and ot2 values to the arrays
                              const userId = this.state.users.users.at(j)._id;
                              const userAttendance = this.state.attendance ? this.state.attendance.filter(a => a.user_id === userId)[0] : undefined;

                              console.log("User Attendance ", userAttendance)

                              if (userAttendance) {
                                    this.state.database_ot1.push(userAttendance.overtime);
                                    this.state.database_ot2.push(userAttendance.overtimeTwo);
                              } else {
                                    this.state.database_ot1.push(0);
                                    this.state.database_ot2.push(0);
                              }
                        }
                  }
            })).catch(err => {
                  alert('Unauthorized! Please Login again' + err.message)
                  // localStorage.removeItem('Bearer')
                  // window.location.href = '/'
            });

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
                  this.state.database_staffid,
                  this.state.database_ot1,
                  this.state.database_ot2,
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
                              <p>Overtime Management</p>
                        </div>

                        <TableContainer component={Paper}>
                              <Table aria-label="customized table">
                                    <TableHead>
                                          <TableRow>
                                                <StyledTableCell>Employee Name</StyledTableCell>
                                                <StyledTableCell>StaffID</StyledTableCell>
                                                <StyledTableCell>OT1(Night)</StyledTableCell>
                                                <StyledTableCell>OT2(Weekend)</StyledTableCell>
                                                <StyledTableCell>Date</StyledTableCell>
                                                <StyledTableCell></StyledTableCell>
                                                <StyledTableCell></StyledTableCell>
                                          </TableRow>
                                    </TableHead>
                                    <TableBody>

                                          {database_namerows.map((krow, idx) => (
                                                <StyledTableRow krow={krow} key={rowcount}>
                                                      <StyledTableCell component="th" scope="row">{jrows.name[idx]} {jrows.lastName[idx]}</StyledTableCell>
                                                      <StyledTableCell component="th" scope="row">{jrows.StaffID[idx]}</StyledTableCell>
                                                      <StyledTableCell component="th" scope="row">{jrows.ot1[idx]}</StyledTableCell>
                                                      <StyledTableCell component="th" scope="row">{jrows.ot2[idx]}</StyledTableCell>
                                                      <StyledTableCell component="th" scope="row"></StyledTableCell>
                                                      <StyledTableCell component="th" scope="row" >
                                                            <Button color="success" onClick={() => {
                                                                  this.state.id = this.state.database_id[idx]

                                                            }}>
                                                                  Approve
                                                            </Button>{" "}
                                                      </StyledTableCell>

                                                      <StyledTableCell align="left">
                                                            <Button color="danger" onClick={() => { this.handleRemoveUser(jrows.StaffID[idx]) }}>
                                                                  Decline
                                                            </Button>{" "}
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
