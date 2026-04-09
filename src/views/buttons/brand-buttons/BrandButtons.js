import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { Button } from "@coreui/coreui";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


// const base_url = 'https://akille-4cfc3.firebaseapp.com/api/v1';
const base_url = 'http://localhost:9000/api/v1'

export default class Dashboard extends Component {
  constructor(props) {
      super(props);
      const today = new Date();
    const formattedToday = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);
    this.state = {
      showModal: false,
      startDate: formattedToday,
      endDate: formattedToday,
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
    }

  createData = (name, Id, CIN, COUT, Location, date, time, numofcheckins) => {
    return { name, Id, CIN, COUT, Location, date, time, numofcheckins };
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

    if (this.state.attendance.length !== 0 && this.state.users.length !== 0) {
      var attendance_length = this.state.attendance.attendances.length;
      var user_length = this.state.users.users.length;

      this.state.clockins = [];
      this.state.clockouts = [];
      this.state.dates = [];
      this.state.names = [];
      this.state.staffids = [];
      this.state.locations = [];
      this.state.numofcheckins = [];
      this.state.total = [];

      const startDate = new Date(this.state.startDate);
      const endDate = new Date(this.state.endDate);
      // to include the full end date, set time to end of day
      endDate.setHours(23, 59, 59, 999);

      for (var j = 0; j < user_length; j++) {
        for (var i = 0; i < attendance_length; i++) {
          const attendanceRecord = this.state.attendance.attendances.at(i);
          const recordDateStr = attendanceRecord.date || "";
          
          let isInRange = false;
          if (recordDateStr) {
            const recordDate = new Date(recordDateStr);
            isInRange = recordDate >= startDate && recordDate <= endDate;
          }

          if (isInRange && attendanceRecord.user === this.state.users.users.at(j)._id && attendanceRecord.numberOfCheckIn === 3) {

            if (!(attendanceRecord.checkOutTime === '')) {
              this.state.clockins.push(attendanceRecord.checkInTime);
              this.state.clockouts.push(attendanceRecord.checkOutTime);
              this.state.dates.push(attendanceRecord.date);
              this.state.names.push(this.state.users.users.at(j).name);
              this.state.staffids.push(this.state.users.users.at(j).staffId);
              this.state.locations.push(this.state.users.users.at(j).workingSite);
              this.state.numofcheckins.push(attendanceRecord.numberOfCheckIn);
              this.state.total.push(attendanceRecord.workedHours)
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginBottom: '2%', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ marginRight: '10px', marginTop: '5px' }}><strong>Start Date:</strong></label>
            <input 
              type="date" 
              className="form-control" 
              style={{ width: '180px' }} 
              value={this.state.startDate || ""}
              onChange={(e) => this.setState({ startDate: e.target.value })} 
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ marginRight: '10px', marginTop: '5px' }}><strong>End Date:</strong></label>
            <input 
              type="date" 
              className="form-control" 
              style={{ width: '180px' }} 
              value={this.state.endDate || ""}
              onChange={(e) => this.setState({ endDate: e.target.value })} 
            />
          </div>
        </div>

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

