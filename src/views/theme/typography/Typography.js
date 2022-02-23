import React from "react";
import {Form,Button} from 'react-bootstrap';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from 'axios';

const base_url = 'http://localhost:9000/api/v1' ;


class Typography extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      names: [],
      positions: [],
      basic_salaries: [],
      attendance: [],
      users: [],
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  createData = (
    name,
    Id,
    Position,
    BSalary,
    WorkDay,
    DSalary,
    TransportAllowance,
    timeNight,
    timeWeekend,
    Comission,
    TSalary,
    SalaryAdvance,
    NETSalary
  ) => {
    return {
      name,
      Id,
      Position,
      BSalary,
      WorkDay,
      DSalary,
      TransportAllowance,
      timeNight,
      timeWeekend,
      Comission,
      TSalary,
      SalaryAdvance,
      NETSalary,
    };
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
    const rows = [
      this.createData(
        "Zeynu",
        "Site Manager",
        "3500",
        "30",
        "116.67",
        "350.00",
        "816.68",
        "200.00",
        "1403.40",
        "",
        "",
        "6270.08"
      ),
      this.createData(
        "Digrom Meri",
        "Painter",
        "3500",
        "30",
        "116.67",
        "350.00",
        "1225.02",
        "400.00",
        "1403.40",
        "",
        "",
        "6878.42"
      ),
      this.createData(
        "Marshet Getaneh",
        "Painter",
        "3500",
        "30",
        "116.67",
        "350.00",
        "408.02",
        "400.00",
        "1403.40",
        "",
        "500",
        "5561.74"
      ),
      this.createData(
        "Marshet Alemayehu",
        "Painter",
        "3500",
        "30",
        "116.67",
        "350.00",
        "",
        "200.00",
        "1403.40",
        "",
        "600",
        "4853.40"
      ),
      this.createData(
        "Getnet Anteneh",
        "Painter",
        "3000",
        "30",
        "100.00",
        "350.00",
        "350.00",
        "400.00",
        "1403.40",
        "",
        "",
        "5153.40"
      ),
      this.createData(
        "Getachew Neri",
        "Painter",
        "2500",
        "30",
        "83.33",
        "350.00",
        "729.13",
        "400.00",
        "",
        "",
        "",
        "3979.13"
      ),
      this.createData(
        "Andualem Yelmasew",
        "Painter",
        "2500",
        "30",
        "83.33",
        "350.00",
        "291.64",
        "400.00",
        "",
        "",
        "",
        "3541.64"
      ),
      this.createData(
        "Habtamu Neguse",
        "Painter",
        "2500",
        "30",
        "83.33",
        "350.00",
        "145.82",
        "200.00",
        "",
        "",
        "",
        "3195.82"
      ),
      this.createData(
        "Habtamu Awel",
        "Painter",
        "499.90",
        "30",
        "83.33",
        "100.00",
        "",
        "",
        "",
        "",
        "",
        "599.00"
      ),
      this.createData(
        "Nahom Amare",
        "",
        "600",
        "",
        "",
        "100.00",
        "",
        "",
        "",
        "",
        "",
        "700.00"
      ),
      this.createData(
        "",
        "",
        "25599.90",
        "",
        "",
        "3000.00",
        "3966.63",
        "2600.00",
        "7017.00",
        "",
        "",
        "40732.63"
      ),
    ];
    
    
    

    if (this.state.attendance.length !== 0 && this.state.users.length !== 0) {
      // var attendance_length = this.state.attendance.attendances.length
      var user_length = this.state.users.users.length
      // const id = this.state.attendance.attendances.at(-1)._id


      for (var j = 0; j < user_length; j++) {
          this.state.names.push(this.state.users.users.at(j).name);
          this.state.positions.push(this.state.users.users.at(j).position);
          this.state.basic_salaries.push(this.state.users.users.at(j).salary);
        }
      
  

  }


  var namerows = this.state.names;
  var krows = this.createData(this.state.names,this.state.positions,this.state.basic_salaries,"","","","","","","","","","");
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
        <div className="card">
          <div className="card-header">Payroll</div>
          <div className="card-body">
            <p>Monthly Payroll </p>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name of Employee</StyledTableCell>
                    <StyledTableCell>Position</StyledTableCell>
                    <StyledTableCell>Basic Salary</StyledTableCell>
                    <StyledTableCell>Work Day</StyledTableCell>
                    <StyledTableCell>Daily Salary</StyledTableCell>
                    <StyledTableCell>Transport Allowance</StyledTableCell>
                    <StyledTableCell>OT1(Night)</StyledTableCell>
                    <StyledTableCell>OT2(Weekend)</StyledTableCell>
                    <StyledTableCell>Comission</StyledTableCell>
                    <StyledTableCell>Total Salary</StyledTableCell>
                    <StyledTableCell>Salary Advance</StyledTableCell>
                    <StyledTableCell align="right">NET Salary</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {namerows.map((krow,idx) => (
                    
                    <StyledTableRow krow={krow} key={krow.rowcount}>
                      <StyledTableCell component="th" scope="row">{krows.name[idx]}</StyledTableCell>
                      <StyledTableCell>{krows.Id[idx]}</StyledTableCell>
                      <StyledTableCell>{krows.Position[idx]}</StyledTableCell>
                      <StyledTableCell>{30}</StyledTableCell>
                      <StyledTableCell>{krows.BSalary[idx]}</StyledTableCell>
                      <StyledTableCell><Form.Control type="text" /></StyledTableCell>
                      <StyledTableCell>{krows.DSalary[idx]}</StyledTableCell>
                      <StyledTableCell>{krows.TransportAllowance[idx]}</StyledTableCell>
                      <StyledTableCell><Form.Control type="text" /></StyledTableCell>
                      <StyledTableCell>{krows.timeWeekend[idx]}</StyledTableCell>
                      <StyledTableCell><Form.Control type="text" /></StyledTableCell>
                      <StyledTableCell>{krows.TSalary[idx]}</StyledTableCell>
                      <StyledTableCell>{krows.SalaryAdvance[idx]}</StyledTableCell>
                      <StyledTableCell align="right">{krows.NETSalary[idx]}</StyledTableCell>
                      <StyledTableCell align="right"><Button variant="primary">calculate</Button></StyledTableCell>
                      {/* <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default Typography;
