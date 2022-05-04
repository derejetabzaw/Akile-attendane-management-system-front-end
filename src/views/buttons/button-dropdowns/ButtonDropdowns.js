import React, { Component } from "react";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


const base_url = 'http://localhost:9000/api/v1' ;

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
      dates: [],
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  createData = (name, Id, CIN, COUT, date) => {
    return { name, Id, CIN, COUT, date };
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  componentDidMount = () =>{
    this.getmongodb();
  };

  getmongodb = () => {
    axios.get(base_url + '/attendance/')
      .then((response) => {
        const attendance_info = response.data
        this.setState({attendance:attendance_info});
      })
      .catch(() => {
        console.log("Error");
      });
      axios.get(base_url + '/users/')
      .then((response) => {
        const users_info = response.data
        this.setState({users:users_info});
      })
      .catch(() => {
        console.log("Error");
      });
  }

  render() {
    
    const getCurrentDate = () =>{
      var date = ("0" + new Date().getDate()).slice(-2)
      var month = ("0" + (new Date().getMonth() + 1)).slice(-2)
      var year = new Date().getFullYear();
      
      return year + '-'  + month + '-' + date;
    }

    var today = getCurrentDate();
    
    if (this.state.attendance.length !== 0 && this.state.users.length !== 0) {
      var attendance_length = this.state.attendance.attendances.length
      var user_length = this.state.users.users.length
      
      for (var j = 0; j < user_length; j++) {
        for (var i = 0; i < attendance_length; i++) {
          if (today===this.state.attendance.attendances.at(i).date && this.state.attendance.attendances.at(i).user === this.state.users.users.at(j)._id){
            
            if (this.state.attendance.attendances.at(i).checkOutTime === '') {
              
            }
            else{
              this.state.clockins.push(this.state.attendance.attendances.at(i).checkInTime);
              this.state.clockouts.push(this.state.attendance.attendances.at(i).checkOutTime);
              this.state.dates.push(this.state.attendance.attendances.at(-1).date);
              this.state.names.push(this.state.users.users.at(j).name);
              this.state.staffids.push(this.state.users.users.at(j).staffId);
            }
        }
      }
    }

  }

    var namerows = this.state.names;
    var krows = this.createData(this.state.names,this.state.staffids,this.state.clockins,this.state.clockouts, this.state.dates);
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
        <div style={{ marginTop: "2%" }}></div>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Staff Name</StyledTableCell>
                <StyledTableCell>Staff ID</StyledTableCell>
                <StyledTableCell>Clock-In</StyledTableCell>
                <StyledTableCell>Clock-Out</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {namerows.map((krow,idx) => ( 
                <StyledTableRow krow={krow} key={krow.rowcount}>
                  <StyledTableCell component="th" scope="row">{krows.name[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.Id[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.CIN[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.COUT[idx]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{krows.date[idx]}</StyledTableCell>
                  </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }  
}

