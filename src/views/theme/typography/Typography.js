import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class Typography extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
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
                    <StyledTableCell>Dayliy Salary</StyledTableCell>
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
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell>{row.Id}</StyledTableCell>
                      <StyledTableCell>{row.Position}</StyledTableCell>
                      <StyledTableCell>{row.BSalary}</StyledTableCell>
                      <StyledTableCell>{row.WorkDay}</StyledTableCell>
                      <StyledTableCell>{row.DSalary}</StyledTableCell>
                      <StyledTableCell>
                        {row.TransportAllowance}
                      </StyledTableCell>
                      <StyledTableCell>{row.timeNight}</StyledTableCell>
                      <StyledTableCell>{row.timeWeekend}</StyledTableCell>
                      <StyledTableCell>{row.Comission}</StyledTableCell>
                      <StyledTableCell>{row.TSalary}</StyledTableCell>
                      <StyledTableCell>{row.SalaryAdvance}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.NETSalary}
                      </StyledTableCell>
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
