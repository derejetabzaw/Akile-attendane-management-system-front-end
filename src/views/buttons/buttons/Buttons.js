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
      names: [],
      staffids: [],
      clockins: [],
      clockouts: [],
      locations: [],
      dates: [],
      total: [],
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
      this.state.total = []

      for (var j = 0; j < user_length; j++) {
        for (var i = 0; i < attendance_length; i++) {
          if (today === this.state.attendance.attendances.at(i).date && this.state.attendance.attendances.at(i).user === this.state.users.users.at(j)._id) {
            //  if (this.state.attendance.attendances.at(i).checkOutTime === '') {
            //   this.state.total.push("")
            // }
            // else{
            this.state.clockins.push(this.state.attendance.attendances.at(i).checkInTime);
            this.state.clockouts.push(this.state.attendance.attendances.at(i).checkOutTime);
            this.state.dates.push(this.state.attendance.attendances.at(-1).date);
            this.state.names.push(this.state.users.users.at(j).name);
            this.state.staffids.push(this.state.users.users.at(j).staffId);
            this.state.locations.push(this.state.users.users.at(j).workingSite);

            if (this.state.attendance.attendances.at(i).checkOutTime === '') {
              this.state.total.push("")
            }
            else {
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
      this.state.total
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

    // const App = () => {
    //   const [selectedDay, setSelectedDay] = useState(null);
    // }

    return (
      <>

        <Button
          color="primary"
          onClick={this.toggleModal}
          style={{ float: "right", marginBottom: '2%' }}
        >
          Show by Date
        </Button> {" "}

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
                <StyledTableCell>Clock-In</StyledTableCell>
                <StyledTableCell>Clock-Out</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Total Daily Work Hour</StyledTableCell>
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