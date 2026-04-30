import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { Button } from "reactstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


// const base_url = 'https://akille-4cfc3.firebaseapp.com/api/v1';
const base_url = 'http://localhost:9000/api/v1'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    const formattedToday = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);
    this.state = {
      startDate: formattedToday,
      endDate: formattedToday,
      attendance: [],
      users: [],
    };
  }

  formatDate = (date) => {
    const d = new Date(date);
    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return year + '-' + month + '-' + day;
  }

  getFilteredAttendanceData = () => {
    const { attendance, users, startDate, endDate } = this.state;
    
    let dates = [];
    let names = [];
    let staffids = [];
    let numofcheckins = [];
    let total = [];

    if (attendance && attendance.attendances && users && users.users) {
      const attendance_records = attendance.attendances;
      const user_list = users.users;
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      // Create a map to group by user and date: key = userId_date
      const aggregated = {};

      attendance_records.forEach(record => {
        if (!record || !record.date || !record.user) return;
        
        const recordDate = new Date(record.date);
        if (recordDate >= start && recordDate <= end) {
          const key = `${record.user}_${record.date}`;
          if (!aggregated[key]) {
            aggregated[key] = {
              userId: record.user,
              date: record.date,
              maxCheckIn: record.numberOfCheckIn || 0,
              totalHours: record.workedHours || 0
            };
          } else {
            aggregated[key].maxCheckIn = Math.max(aggregated[key].maxCheckIn, record.numberOfCheckIn || 0);
            aggregated[key].totalHours += (record.workedHours || 0);
          }
        }
      });

      // Map aggregated data back to arrays for the table, matching with user info
      Object.values(aggregated).forEach(item => {
        const user = user_list.find(u => u._id === item.userId);
        if (user) {
          names.push(user.name + " " + user.lastName);
          staffids.push(user.staffId);
          dates.push(item.date);
          numofcheckins.push(item.maxCheckIn);
          total.push(item.totalHours.toFixed(2));
        }
      });
    }

    return { names, staffids, dates, total, numofcheckins };
  };

  generatePDF = () => {
    try {
      const { names, staffids, numofcheckins, dates, total } = this.getFilteredAttendanceData();
      
      if (!names || names.length === 0) {
        alert("No attendance records found for the selected date range to generate PDF.");
        return;
      }

      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Attendance Report", 14, 22);
      doc.setFontSize(11);
      doc.text(`Range: ${this.state.startDate} to ${this.state.endDate}`, 14, 30);

      const tableColumn = ["Staff ID", "Name", "Check-Ins", "Date", "Worked Hours"];
      const tableRows = names.map((name, i) => [
        staffids[i] || "-",
        name || "-",
        numofcheckins[i] || "0",
        dates[i] || "-",
        total[i] || "0"
      ]);

      if (typeof autoTable === 'function') {
        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 35,
          theme: 'grid',
        });
      } else if (doc.autoTable) {
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 35,
          theme: 'grid',
        });
      }

      doc.save(`Attendance_Report_${this.state.startDate}_to_${this.state.endDate}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Failed to generate PDF. Check console for details.");
    }
  };

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
    const { names, staffids, numofcheckins, dates, total } = this.getFilteredAttendanceData();
    const namerows = names;
    const krows = this.createData(names, staffids, null, null, null, dates, total, numofcheckins);

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
          <Button 
            color="success" 
            variant="outline"
            onClick={this.generatePDF}
            style={{ height: '38px', marginLeft: '10px' }}
          >
            Generate PDF
          </Button>
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
              {namerows.length === 0 ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={5} align="center">No attendance records found for this range.</StyledTableCell>
                </StyledTableRow>
              ) : namerows.map((krow, idx) => (
                <StyledTableRow krow={krow} key={idx}>
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

