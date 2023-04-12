import React, { Component } from "react";
import axios from 'axios';
import Calendar from "react-calendar";
import { Button } from "@coreui/coreui";
import Modal from "antd/lib/modal/Modal";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { ModalFooter } from "react-bootstrap";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


const base_url = 'https://akille-4cfc3.firebaseapp.com/api/v1';
// const base_url = 'http://localhost:9000/api/v1'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      attendance: [],
      users: [],
      names: [],
      staffids: [],
      clockins: [],
      clockouts: [],
      locations: [],
      numofcheckins: [],
      dates: [],
      total: [],
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  createData = (name, Id, CIN, COUT, Location, date, time, numofcheckins) => {
    return { name, Id, CIN, COUT, Location, date, time, numofcheckins };
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  componentDidMount = () => {
    this.getmongodb();
  };

  getmongodb = () => {
    axios.get(base_url + '/attendance/',
      {
        headers: {
          'authorization': localStorage.getItem('Bearer')
        }
      }
    )
      .then((response) => {
        const attendance_info = response.data
        this.setState({ attendance: attendance_info });
      })
      .catch(() => {
        console.log("Error");
      });

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
      })
      .catch(() => {
        alert("Error");
      });
  }

  render() {

    const getCurrentDate = () => {
      var date = ("0" + new Date().getDate()).slice(-2)
      var month = ("0" + (new Date().getMonth() + 1)).slice(-2)
      var year = new Date().getFullYear();
      return year + '-' + month + '-' + date;
    }

    var today = getCurrentDate();

    if (this.state.attendance.length !== 0 && this.state.users.length !== 0) {
      var attendance_length = this.state.attendance.attendances.length
      var user_length = this.state.users.users.length

      this.state.clockins = []
      this.state.clockouts = []
      this.state.dates = []
      this.state.names = []
      this.state.staffids = []
      this.state.locations = []
      this.state.numofcheckins = []
      this.state.total = []

      for (var j = 0; j < user_length; j++) {
        for (var i = 0; i < attendance_length; i++) {
          if (today === this.state.attendance.attendances.at(i).date && this.state.attendance.attendances.at(i).user === this.state.users.users.at(j)._id && this.state.attendance.attendances.at(i).numberOfCheckIn === 3) {

            if (!(this.state.attendance.attendances.at(i).checkOutTime === '')) {
              this.state.clockins.push(this.state.attendance.attendances.at(i).checkInTime);
              this.state.clockouts.push(this.state.attendance.attendances.at(i).checkOutTime);
              this.state.dates.push(this.state.attendance.attendances.at(-1).date);
              this.state.names.push(this.state.users.users.at(j).name);
              this.state.staffids.push(this.state.users.users.at(j).staffId);
              this.state.locations.push(this.state.users.users.at(j).workingSite);
              this.state.numofcheckins.push(this.state.attendance.attendances.at(i).numberOfCheckIn);
              this.state.total.push(this.state.attendance.attendances.at(i).workedHours)
            }
          }
        }
      }
    }

    var namerows = this.state.names;
    var krows = this.createData(
      this.state.names,
      this.state.staffids,
      this.state.clockins,
      this.state.clockouts,
      this.state.locations,
      this.state.dates,
      this.state.total,
      this.state.numofcheckins
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

    return (
      <>
        {/* <Button 
        color="primary" 
        onClick={this.toggleModal} 
        style={{float:"right", marginBottom: '2%'}}
        >
          Show by Date
          </Button> {" "} */}

        <Modal
          isOpen={this.state.showModal}
          modalTransition={{ timeout: 200 }}
          backdropTransition={{ timeout: 100 }}
          style={{ width: "50%" }}
          toggle={this.toggleModal}
        >
          <ModalHeader>Select a Date</ModalHeader>

          <Calendar />

          <ModalFooter>
            <Button color="primary" onClick={this.handleNameSubmit}>
              Show
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
                <StyledTableCell>Staff ID</StyledTableCell>
                <StyledTableCell>Staff Name</StyledTableCell>
                <StyledTableCell>Number of CheckIns</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Total Daily Work Hour</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {namerows.map((krow, idx) => (
                <StyledTableRow krow={krow} key={krow.rowcount}>
                  <StyledTableCell component="th" scope="row">{krows.Id[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.name[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.numofcheckins[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.date[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.time[idx]}</StyledTableCell>
                </StyledTableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

