import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from 'axios';
import Calendar from 'react-calendar';
import "./Calendar.css";
import { Tabs } from "antd";

const { TabPane } = Tabs;

// const base_url = 'https://akille-4cfc3.firebaseapp.com/api/v1';
const base_url = 'http://localhost:9000/api/v1';

class Typography extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      users: [],
      positions: [],
      lastNames: [],
      staffIds: [],
      salaries: [],
      rows: 0,
      krows: [],
      position: '',
      database_name: [],
      database_lastName: [],
      database_position: [],
      database_salary: [],
      Netsalary: [],
      selectedOption: 'daily',
      startDate: new Date(),
      endDate: new Date(),
      showCalendarsModal: false,
    };
  }

  createData = (
    name,
    lastName,
    Position,
    Salary,
    Id,
    WorkDay,
    DSalary,
    TransportAllowance,
    timeNight,
    timeWeekend,
    Comission,
    TSalary,
    SalaryAdvance,
    Netsalary
  ) => {
    return {
      name,
      lastName,
      Position,
      Salary,
      Id,
      WorkDay,
      DSalary,
      TransportAllowance,
      timeNight,
      timeWeekend,
      Comission,
      TSalary,
      SalaryAdvance,
      Netsalary
    };
  };

  componentDidMount = () => {
    this.getmongodb();
    this.getLocalStorage();
  };

  getmongodb() {
    // axios.get(base_url + '/attendance/')
    //   .then((response) => {
    //     const attendance_info = response.data
    //     this.setState({ attendance: attendance_info });
    //   })
    //   .catch(() => {
    //     console.log("Error");
    //   });

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

        if (this.state.users.length !== 0 && this.state.rows === 0) {
          var user_length = this.state.users.users.length
          this.state.rows = user_length

          for (var j = 0; j < user_length; j++) {
            this.state.database_name.push(this.state.users.users.at(j).name);
            this.state.database_lastName.push(this.state.users.users.at(j).lastName);
            this.state.database_position.push(this.state.users.users.at(j).position);
            this.state.database_salary.push(this.state.users.users.at(j).salary);
          }
        }
      })
      .catch(err => {
        alert('Unauthorized! Please Login again', err.message)
        localStorage.removeItem('Bearer')
        window.location.href = '/'
      })
  }

  getLocalStorage() {
    let nsalaryArray = JSON.parse(localStorage.getItem("netSalary"))
    console.log(nsalaryArray);
    // if (nsalaryArray.length !== 0) {
    //   this.setState({ Netsalary: nsalaryArray })
    // }
    // console.log(this.state.Netsalary)
  }

  UNSAFE_componentWillMount() {
    this.getmongodb();
    this.getLocalStorage();
  }

  refreshPage() {
    window.location.reload();
  }

  handleOptionChange = (e) => {
    this.setState({ selectedOption: e.target.value });
  };

  handleStartDateChange = (date) => {
    this.setState({ startDate: date });
  };

  handleEndDateChange = (date) => {
    this.setState({ endDate: date });
  };

  handleApplyButtonClick = () => {
    switch (this.state.selectedOption) {
      case 'daily':
        alert('Daily option selected: ' + this.state.startDate);
        break;

      // case 'weekly':
      //   const weekEndDate = new Date(this.state.startDate);
      //   weekEndDate.setDate(this.state.startDate.getDate() + 6);

      //   this.state.endDate = weekEndDate;

      //   alert(
      //     'Weekly option selected start date: ' +
      //     this.state.startDate +
      //     ' end date:' +
      //     this.state.endDate
      //   );
      //   break;

      case 'monthly':
        const monthStartDate = new Date(this.state.startDate);
        monthStartDate.setDate(1);

        this.state.startDate = monthStartDate;

        const monthEndDate = new Date(this.state.startDate);
        monthEndDate.setMonth(monthEndDate.getMonth() + 1);
        monthEndDate.setDate(this.state.endDate.getDate());

        this.state.endDate = monthEndDate;

        alert(
          'Monthly option selected start date: ' +
          this.state.startDate +
          ' end date: ' +
          this.state.endDate
        );
        break;

      case 'custom':
        alert(
          'Custom option selected. start date: ' +
          this.state.startDate +
          ' end date:' +
          this.state.endDate
        );
        break;

      default:
        alert('No option selected');
    }
  };

  handleTabClick = (key) => {
    this.setState({ selectedOption: key });
  };

  handleSelectByDateClick = () => {
    this.setState({ showCalendarsModal: true });
  };

  handleCloseCalendarsModal = () => {
    this.setState({ showCalendarsModal: false });
  };

  render() {
    const database_namerows = this.state.database_name;

    var jrows = this.createData(
      this.state.database_name,
      this.state.database_lastName,
      this.state.database_position,
      this.state.database_salary,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      this.state.Netsalary
    );

    var rowcount = this.state.rows;

    let allowance = 0;
    let commission = 0;
    let salaryAdvance = 0;

    const getTPAllowance = (e) => {
      allowance = e.target.value
    }

    const getCommission = (e) => {
      commission = e.target.value
    }

    const getSalaryAdvance = (e) => {
      salaryAdvance = e.target.value
    }

    const calculateNetPay = (name, basic_salaries, commission, allowance, salaryAdvance) => {
      let nsal = parseFloat(basic_salaries) + parseFloat(allowance) - parseFloat(salaryAdvance);
      let index = this.state.database_name.indexOf(name);

      this.state.Netsalary.splice(index, 1, nsal)

      let netSalary = JSON.parse(localStorage.getItem("netSalary")) || [];

      netSalary[index] = nsal;
      // consider this for changes on the database, add a column for netsalary
      localStorage.setItem("netSalary", JSON.stringify(netSalary))

      this.refreshPage()
    }

    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell)

    const StyledTableRow = withStyles((theme) => ({
      root: {
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow)


    return (
      <>
        <div className="card-header">
          <p>Payroll Information</p>

          <Button color="primary" onClick={this.handleSelectByDateClick}>
            Show by Date
          </Button>

          <Button color="success" style={{ float: "right", marginBottom: "2%" }}>
            Generate PDF
          </Button>

          <Modal isOpen={this.state.showCalendarsModal} toggle={this.handleCloseCalendarsModal}>
            <ModalHeader toggle={this.handleCloseCalendarsModal}>
              Select Date Range
            </ModalHeader>

            <ModalBody>
              <Tabs
                defaultActiveKey="daily"
                activeKey={this.state.selectedOption}
                onTabClick={this.handleTabClick}
              >
                <TabPane tab="Daily" key="daily">
                  <div className="custom-calendar-input">
                    <label>Start Date:</label>
                    <Calendar
                      selected={this.state.startDate}
                      onChange={this.handleStartDateChange}
                    />
                  </div>

                  <Button color="success" onClick={this.handleApplyButtonClick}>
                    Confirm Selected Day
                  </Button>
                </TabPane>

                {/* <TabPane tab="Weekly" key="weekly">
              <div>
                <label>Start Date:</label>
                <Calendar
                  selected={this.state.startDate}
                  onChange={this.handleStartDateChange}
                />
              </div>
            </TabPane> */}

                <TabPane tab="Monthly" key="monthly">
                  <div className="custom-calendar-input">
                    <label>Start Date:</label>
                    <Calendar
                      selected={this.state.endDate}
                      onChange={this.handleEndDateChange}
                    />
                  </div>

                  <Button color="success" onClick={this.handleApplyButtonClick}>
                    Confirm Selected Month
                  </Button>
                </TabPane>

                <TabPane tab="Custom" key="custom">
                  <div>
                    <div className="custom-calendar-input">
                      <label>Start Date:</label>
                      <Calendar
                        selected={this.state.startDate}
                        onChange={this.handleStartDateChange}
                      />
                    </div>

                    <div className="custom-calendar-input">
                      <label>End Date:</label>
                      <Calendar
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange}
                      />
                    </div>
                  </div>

                  <Button color="success" onClick={this.handleApplyButtonClick}>
                    Confirm Selected Dates
                  </Button>
                </TabPane>
              </Tabs>
            </ModalBody>

            <ModalFooter>
              <Button color="secondary" onClick={this.handleCloseCalendarsModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>

        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name of Employee</StyledTableCell>
                <StyledTableCell>Position</StyledTableCell>
                <StyledTableCell>Basic Salary</StyledTableCell>
                <StyledTableCell>OT1(Night)</StyledTableCell>
                <StyledTableCell>OT2(Weekend)</StyledTableCell>
                <StyledTableCell>Transport Allowance</StyledTableCell>
                <StyledTableCell>Salary Advance</StyledTableCell>

                {/* <StyledTableCell>

                  REMOVE???

                </StyledTableCell> */}

                <StyledTableCell>NET Salary</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {database_namerows.map((krow, idx) => (
                <StyledTableRow krow={krow} key={rowcount}>
                  <StyledTableCell>{jrows.name[idx]} {jrows.lastName[idx]}</StyledTableCell>
                  <StyledTableCell>{jrows.Position[idx]}</StyledTableCell>
                  <StyledTableCell>{jrows.Salary[idx]}</StyledTableCell>
                  <StyledTableCell align="center">

                  </StyledTableCell>

                  <StyledTableCell align="center">

                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {/* <Form.Control type="text" onChange={getTPAllowance} /> */}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {/* <Form.Control type="text" onChange={getSalaryAdvance} /> */}
                  </StyledTableCell>
                  {/* <StyledTableCell align="right">
                    <Button
                      variant="primary"
                      onClick={() => {
                        calculateNetPay(
                          jrows.name[idx],
                          jrows.Salary[idx],
                          commission,
                          allowance,
                          salaryAdvance
                        )
                      }}>
                      Calculate
                    </Button>
                  </StyledTableCell> */}

                  <StyledTableCell align="center">
                    {
                      JSON.parse(localStorage.getItem('netSalary')) && idx < JSON.parse(localStorage.getItem('netSalary')).length
                        ? JSON.parse(localStorage.getItem('netSalary'))[idx] : ""
                    }
                  </StyledTableCell>
                </StyledTableRow>

                // Left for reference
                //       <StyledTableRow krow={krow} key={krow.rowcount}>
                //         <StyledTableCell component="th" scope="row">{krows.name[idx]}</StyledTableCell>
                //         <StyledTableCell>{krows.Id[idx]}</StyledTableCell>
                //         <StyledTableCell>{krows.Position[idx]}</StyledTableCell>
                //         <StyledTableCell>30</StyledTableCell>
                //         <StyledTableCell>{krows.BSalary[idx]}</StyledTableCell>
                //         <StyledTableCell><Form.Control type="text" onChange={getTPAllowance} /></StyledTableCell>
                //         <StyledTableCell>{krows.DSalary[idx]}</StyledTableCell>
                //         <StyledTableCell>{krows.TransportAllowance[idx]}</StyledTableCell>
                //         <StyledTableCell><Form.Control type="text" onChange={getCommission} /></StyledTableCell>
                //         <StyledTableCell>{krows.timeWeekend[idx]}</StyledTableCell>
                //         <StyledTableCell><Form.Control type="text" onChange={getSalaryAdvance} /></StyledTableCell>
                //         <StyledTableCell align="right">{this.state.Netsalary[idx]}</StyledTableCell>
                //         <StyledTableCell>{krows.TSalary[idx]}</StyledTableCell>
                //         <StyledTableCell>{krows.SalaryAdvance[idx]}</StyledTableCell>
                //         <StyledTableCell align="right"><Button variant="primary" onClick={() => { calculateNetPay(krows.name[idx], this.state.basic_salaries[idx], commission, allowance, salaryAdvance) }}>calculate</Button></StyledTableCell>
                //         {/* <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                // <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                //       </StyledTableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </>
    );
  }
}

export default Typography;