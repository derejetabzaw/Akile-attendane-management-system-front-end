import React, { Component } from "react";
import axios from 'axios';
import {
      Button, Modal, ModalHeader,
      ModalBody, ModalFooter, Input, Label, FormGroup, Col, Row
} from "reactstrap";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";

const base_url = 'http://localhost:9000/api/v1'

export default class Overtime extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  users: [],
                  attendance: [],
                  rows: [],
                  confirmModal: false,
                  selectedAttendanceId: null,
                  actionFeedback: '',
                  selectedMonth: moment().format("YYYY-MM"),
            };
      }

      componentDidMount() {
            this.getmongodb();
      }

      getmongodb() {
            axios.all([
                  axios.get(base_url + '/users/', {
                        headers: { 'authorization': localStorage.getItem('Bearer') }
                  }),
                  axios.get(base_url + '/attendance/', {
                        headers: { 'authorization': localStorage.getItem('Bearer') }
                  })
            ]).then(axios.spread((usersResponse, attendanceResponse) => {
                  const users = usersResponse.data.users || [];
                  const attendances = attendanceResponse.data.attendances || [];
                  const { selectedMonth } = this.state;

                  console.log(`[Overtime] Fetched ${users.length} users and ${attendances.length} records.`);

                  const rows = attendances
                        .map(a => {
                              // Robust matching: check both _id and id, handle string/object
                              const attendanceUserId = a.user ? a.user.toString() : '';
                              const user = users.find(u =>
                                    (u._id && u._id.toString() === attendanceUserId) ||
                                    (u.id && u.id.toString() === attendanceUserId)
                              );

                              return {
                                    attendanceId: a._id,
                                    userId: a.user,
                                    name: user ? `${user.name} ${user.lastName}` : 'Unknown',
                                    staffId: user ? user.staffId : '-',
                                    workHours: a.workedHours || 0,
                                    ot1: a.overtime || 0,
                                    ot2: a.overtimeTwo || 0,
                                    date: a.date || '-',
                                    isApproved: a.isApproved || false,
                              };
                        })
                        .filter(row => (row.ot1 > 0 || row.ot2 > 0))
                        .filter(row => {
                              if (!row.date || row.date === '-') return false;
                              const m = moment(row.date, ["YYYY-MM-DD", "DD-MM-YYYY", "DD,MM,YYYY", "YYYY-MM", "MM-YYYY", "DD/MM/YYYY"]);
                              if (m.isValid()) {
                                    return m.format("YYYY-MM") === selectedMonth;
                              }
                              const parts = selectedMonth.split('-');
                              return row.date.includes(parts[0]) && row.date.includes(parts[1]);
                        });

                  this.setState({ users, attendance: attendances, rows });
            })).catch(err => {
                  console.error("[Overtime Error]", err);
                  if (err.response) {
                        console.error("[Overtime Data]", err.response.data);
                        console.error("[Overtime Status]", err.response.status);
                  }
                  alert('Session expired or error occurred. Check console for details.');
            });
      }

      handleMonthChange = (e) => {
            this.setState({ selectedMonth: e.target.value }, () => {
                  this.getmongodb();
            });
      }

      handleApprove = (row) => {
            axios.put(
                  base_url + '/attendance/' + row.attendanceId,
                  { isApproved: true },
                  { headers: { 'authorization': localStorage.getItem('Bearer') } }
            ).then(() => {
                  this.setState({ actionFeedback: `✓ Overtime for ${row.name} on ${row.date} approved.` });
                  setTimeout(() => this.setState({ actionFeedback: '' }), 3000);
                  this.getmongodb();
            }).catch(err => alert('Error approving: ' + err.message));
      }

      handleApproveAll = () => {
            if (!window.confirm(`Are you sure you want to approve all overtime records for ${this.state.selectedMonth}?`)) return;

            axios.post(
                  base_url + '/attendance/approve-month',
                  { month: this.state.selectedMonth },
                  { headers: { 'authorization': localStorage.getItem('Bearer') } }
            ).then(res => {
                  this.setState({ actionFeedback: res.data.msg });
                  setTimeout(() => this.setState({ actionFeedback: '' }), 4000);
                  this.getmongodb();
            }).catch(err => alert('Error: ' + err.message));
      }

      handleDeclineConfirm = (attendanceId) => {
            this.setState({ confirmModal: true, selectedAttendanceId: attendanceId });
      }

      handleDecline = () => {
            const { selectedAttendanceId } = this.state;
            axios.put(
                  base_url + '/attendance/' + selectedAttendanceId,
                  { overtime: 0, overtimeTwo: 0, isApproved: false },
                  { headers: { 'authorization': localStorage.getItem('Bearer') } }
            ).then(() => {
                  this.setState({
                        confirmModal: false,
                        selectedAttendanceId: null,
                        actionFeedback: 'Overtime declined — reset to 0 hours.',
                  });
                  setTimeout(() => this.setState({ actionFeedback: '' }), 3000);
                  this.getmongodb();
            }).catch(err => {
                  alert('Error declining overtime: ' + err.message);
                  this.setState({ confirmModal: false });
            });
      }

      generatePDF = () => {
            try {
                  const { rows, selectedMonth } = this.state;
                  if (!rows || rows.length === 0) {
                        alert("No records found for " + selectedMonth);
                        return;
                  }

                  const doc = new jsPDF();
                  doc.setFontSize(18);
                  doc.text(`Overtime Report - ${selectedMonth}`, 14, 22);

                  const tableColumn = ["Name", "Staff ID", "OT1 (Night)", "OT2 (Weekend)", "Date", "Status"];
                  const tableRows = rows.map(row => [
                        row.name,
                        row.staffId,
                        row.ot1.toFixed(2),
                        row.ot2.toFixed(2),
                        row.date,
                        row.isApproved ? "Approved" : "Pending"
                  ]);

                  autoTable(doc, {
                        head: [tableColumn],
                        body: tableRows,
                        startY: 35,
                        theme: 'grid',
                  });

                  doc.save(`OT_Report_${selectedMonth}.pdf`);
            } catch (error) {
                  alert("Failed to export PDF.");
            }
      };

      render() {
            const { rows, confirmModal, actionFeedback, selectedMonth } = this.state;

            const StyledTableCell = withStyles((theme) => ({
                  head: { backgroundColor: "#4f46e5", color: theme.palette.common.white },
                  body: { fontSize: 14 },
            }))(TableCell);

            const StyledTableRow = withStyles((theme) => ({
                  root: { '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } },
            }))(TableRow);

            return (
                  <>
                        <Row className="mb-4 align-items-end">
                              <Col md="3">
                                    <FormGroup className="mb-0">
                                          <Label for="monthSelect">Select Month</Label>
                                          <Input
                                                type="month"
                                                id="monthSelect"
                                                value={selectedMonth}
                                                onChange={this.handleMonthChange}
                                          />
                                    </FormGroup>
                              </Col>
                              <Col className="text-right">
                                    <Button color="success" onClick={this.generatePDF} className="mr-2">
                                          Export PDF
                                    </Button>
                                    <Button color="primary" onClick={this.handleApproveAll}>
                                          Approve All Month
                                    </Button>
                              </Col>
                        </Row>

                        {actionFeedback && (
                              <div className="alert alert-success mb-3">{actionFeedback}</div>
                        )}

                        <TableContainer component={Paper}>
                              <Table aria-label="overtime table">
                                    <TableHead>
                                          <TableRow>
                                                <StyledTableCell>Employee Name</StyledTableCell>
                                                <StyledTableCell>StaffID</StyledTableCell>
                                                <StyledTableCell>OT1 (hrs)</StyledTableCell>
                                                <StyledTableCell>OT2 (hrs)</StyledTableCell>
                                                <StyledTableCell>Date</StyledTableCell>
                                                <StyledTableCell>Status</StyledTableCell>
                                                <StyledTableCell>Actions</StyledTableCell>
                                          </TableRow>
                                    </TableHead>
                                    <TableBody>
                                          {rows.length === 0 ? (
                                                <StyledTableRow>
                                                      <StyledTableCell colSpan={7} align="center">No overtime records found for this month.</StyledTableCell>
                                                </StyledTableRow>
                                          ) : rows.map((row) => (
                                                <StyledTableRow key={row.attendanceId}>
                                                      <StyledTableCell>{row.name}</StyledTableCell>
                                                      <StyledTableCell>{row.staffId}</StyledTableCell>
                                                      <StyledTableCell>{row.ot1.toFixed(1)}</StyledTableCell>
                                                      <StyledTableCell>{row.ot2.toFixed(1)}</StyledTableCell>
                                                      <StyledTableCell>{row.date}</StyledTableCell>
                                                      <StyledTableCell>
                                                            {row.isApproved ? (
                                                                  <span className="text-success font-weight-bold">Approved</span>
                                                            ) : (
                                                                  <span className="text-warning font-weight-bold">Pending</span>
                                                            )}
                                                      </StyledTableCell>
                                                      <StyledTableCell>
                                                            {!row.isApproved && (
                                                                  <Button color="link" className="p-0 text-success mr-3" onClick={() => this.handleApprove(row)}>
                                                                        Approve
                                                                  </Button>
                                                            )}
                                                            <Button color="link" className="p-0 text-danger" onClick={() => this.handleDeclineConfirm(row.attendanceId)}>
                                                                  Reset
                                                            </Button>
                                                      </StyledTableCell>
                                                </StyledTableRow>
                                          ))}
                                    </TableBody>
                              </Table>
                        </TableContainer>

                        <Modal isOpen={confirmModal} toggle={() => this.setState({ confirmModal: false })}>
                              <ModalHeader>Confirm Reset</ModalHeader>
                              <ModalBody>Are you sure you want to reset this overtime to 0?</ModalBody>
                              <ModalFooter>
                                    <Button color="danger" onClick={this.handleDecline}>Confirm Reset</Button>
                                    <Button color="secondary" onClick={() => this.setState({ confirmModal: false })}>Cancel</Button>
                              </ModalFooter>
                        </Modal>
                  </>
            );
      }
}
