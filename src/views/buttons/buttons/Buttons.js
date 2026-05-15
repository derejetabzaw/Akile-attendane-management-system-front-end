import React, { Component } from "react";
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import "./Calendar.css";
import { Button, Modal, ModalHeader, ModalFooter, } from "reactstrap";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Date } from "core-js";


// const base_url = 'https://akille-4cfc3.firebaseapp.com/api/v1';
const base_url = 'http://localhost:9000/api/v1'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      attendance: [],
      users: [],
      selectedDate: new Date(),
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  createData = (name, Id, CIN, COUT, Location, date, time) => {
    return { name, Id, CIN, COUT, Location, date, time };
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  componentDidMount = () => {
    this.getmongodb();
  };

  cancelItem_onClick = () => {
    this.setState({
      showModal: false,
      showModal2: false,
      temp: this.refreshPage()
    });
  };

  refreshPage() {
    window.location.reload();
  }

  formatDate = (date) => {
    var d = new Date(date);
    var day = ("0" + d.getDate()).slice(-2);
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    var year = d.getFullYear();
    return year + '-' + month + '-' + day;
  }

  getFilteredAttendanceData = () => {
    const { attendance, users, selectedDate } = this.state;
    const today = this.formatDate(selectedDate);
    
    let clockins = [];
    let clockouts = [];
    let dates = [];
    let names = [];
    let staffids = [];
    let locations = [];
    let total = [];

    if (attendance && attendance.attendances && users && users.users) {
      const attendance_length = attendance.attendances.length;
      const user_length = users.users.length;

      for (let j = 0; j < user_length; j++) {
        for (let i = 0; i < attendance_length; i++) {
          const record = attendance.attendances[i];
          const user = users.users[j];
          if (today === record.date && record.user === user._id) {
            clockins.push(record.checkInTime);
            clockouts.push(record.checkOutTime);
            dates.push(record.date);
            names.push(user.name + " " + user.lastName);
            staffids.push(user.staffId);
            locations.push(user.workingSite);
            total.push(record.checkOutTime === '' ? "" : record.workedHours);
          }
        }
      }
    }

    return { names, staffids, clockins, clockouts, locations, dates, total };
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  handleShowClick = () => {
    this.setState({ showModal: false });
  };

  generatePDF = () => {
    try {
      const { names, staffids, clockins, clockouts, locations, total } = this.getFilteredAttendanceData();
      
      if (!names || names.length === 0) {
        alert("No attendance records found for the selected date to generate PDF.");
        return;
      }

      const doc = new jsPDF();
      const dateStr = this.formatDate(this.state.selectedDate);

      doc.setFontSize(18);
      doc.text("Daily Attendance Report", 14, 22);
      doc.setFontSize(11);
      doc.text(`Date: ${dateStr}`, 14, 30);

      const tableColumn = ["Staff ID", "Name", "Clock-In", "Clock-Out", "Location", "Worked Hours"];
      const tableRows = names.map((name, i) => [
        staffids[i] || "-",
        name || "-",
        clockins[i] || "-",
        clockouts[i] || "-",
        locations[i] || "-",
        total[i] || "0"
      ]);

      console.log("Generating PDF with autoTable:", typeof autoTable);

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
      } else {
        alert("Error: PDF AutoTable plugin not found.");
        return;
      }

      doc.save(`Attendance_Report_${dateStr}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Failed to generate PDF. Check console for details.");
    }
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

    axios
      .get(
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

  // This will help to check when new information[Checking in/Checking Out] is added to the database

  // displaymongodbpost = (posts) => {
  //   if (posts.length==0) return console.log("posts has not been updated");
  //   console.log("Before Change Posts:" , posts.attendances)
  //   if (!posts.length) return null; 
  //   return console.log("Incoming Data")
  // }; 
  // const ReactCalandar = () => {
  //   const [date, setDate] = useState(new Date());

  //   const onChange = date => {
  //      setDate(date);
  //   };
  //   return(
  //     <div>
  //       <Calendar onChange={onChange} value={date} />
  //     </div>
  //   );

  // };
  // render(<ReactCalandar/>, document.querySelector("#root"))

  render() {
    const { names, staffids, clockins, clockouts, locations, dates, total } = this.getFilteredAttendanceData();
    const namerows = names;
    const krows = this.createData(names, staffids, clockins, clockouts, locations, dates, total);

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

    // const App = () => {
    //   const [selectedDay, setSelectedDay] = useState(null);
    // }

    return (
      <>

        <Button
          color="primary"
          onClick={this.toggleModal}
          style={{ float: "right", marginBottom: '2%', marginLeft: '10px' }}
        >
          Show by Date
        </Button> {" "}

        <Button
          color="success"
          onClick={this.generatePDF}
          style={{ float: "right", marginBottom: '2%' }}
        >
          Generate PDF
        </Button> {" "}

        <Modal
          isOpen={this.state.showModal}
          modalTransition={{ timeout: 200 }}
          backdropTransition={{ timeout: 100 }}
          style={{ width: "50%" }}
          toggle={this.toggleModal}
        >
          <ModalHeader>Select a Date</ModalHeader>

          <Calendar
            onChange={this.handleDateChange}
            value={this.state.selectedDate}
          />

          <ModalFooter>
            <Button color="primary" onClick={this.handleShowClick}>
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
                <StyledTableCell>Clock-In</StyledTableCell>
                <StyledTableCell>Clock-Out</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Work Hours</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {namerows.map((krow, idx) => (
                <StyledTableRow krow={krow} key={krow.rowcount}>
                  <StyledTableCell component="th" scope="row">{krows.Id[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.name[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.CIN[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.COUT[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.Location[idx]}</StyledTableCell>
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