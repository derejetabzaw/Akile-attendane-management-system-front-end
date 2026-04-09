import React, { Component } from "react";
import axios from 'axios';
import {
      Button, Modal, ModalHeader,
      ModalBody, ModalFooter,
} from "reactstrap";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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

                  // Build rows: one per attendance record with overtime, joined with user info
                  // FIX: use a.user (not a.user_id) to match the DB field, and compare with u._id
                  const rows = attendances
                        .filter(a => (a.overtime > 0 || a.overtimeTwo > 0))
                        .map(a => {
                              const user = users.find(u => u._id === (a.user ? a.user.toString() : ''));
                              return {
                                    attendanceId: a._id,
                                    userId: a.user,
                                    name: user ? `${user.name} ${user.lastName}` : 'Unknown',
                                    staffId: user ? user.staffId : '-',
                                    ot1: a.overtime || 0,
                                    ot2: a.overtimeTwo || 0,
                                    date: a.date || '-',
                              };
                        });

                  this.setState({ users, attendance: attendances, rows });
            })).catch(err => {
                  alert('Unauthorized! Please login again. ' + err.message);
                  localStorage.removeItem('Bearer');
                  window.location.href = '/';
            });
      }

      handleApprove = (row) => {
            // Visual confirmation — future: add 'approved' boolean to Attendance schema
            this.setState({ actionFeedback: `✓ Overtime for ${row.name} on ${row.date} approved.` });
            setTimeout(() => this.setState({ actionFeedback: '' }), 3000);
      }

      handleDeclineConfirm = (attendanceId) => {
            this.setState({ confirmModal: true, selectedAttendanceId: attendanceId });
      }

      handleDecline = () => {
            const { selectedAttendanceId } = this.state;
            axios.put(
                  base_url + '/attendance/' + selectedAttendanceId,
                  { overtime: 0, overtimeTwo: 0 },
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

      render() {
            const { rows, confirmModal, actionFeedback } = this.state;

            const StyledTableCell = withStyles((theme) => ({
                  head: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
                  body: { fontSize: 14 },
            }))(TableCell);

            const StyledTableRow = withStyles((theme) => ({
                  root: { '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } },
            }))(TableRow);

            return (
                  <>
                        <div className="card-header">
                              <p>Overtime Management</p>
                              {actionFeedback && (
                                    <div style={{ background: '#d4edda', padding: '8px 12px', borderRadius: 4, color: '#155724', marginTop: 8 }}>
                                          {actionFeedback}
                                    </div>
                              )}
                        </div>

                        <TableContainer component={Paper}>
                              <Table aria-label="overtime table">
                                    <TableHead>
                                          <TableRow>
                                                <StyledTableCell>Employee Name</StyledTableCell>
                                                <StyledTableCell>StaffID</StyledTableCell>
                                                <StyledTableCell>OT1 (Night hrs)</StyledTableCell>
                                                <StyledTableCell>OT2 (Weekend hrs)</StyledTableCell>
                                                <StyledTableCell>Date</StyledTableCell>
                                                <StyledTableCell>Approve</StyledTableCell>
                                                <StyledTableCell>Decline</StyledTableCell>
                                          </TableRow>
                                    </TableHead>
                                    <TableBody>
                                          {rows.length === 0 ? (
                                                <StyledTableRow>
                                                      <StyledTableCell colSpan={7} align="center">No overtime records found.</StyledTableCell>
                                                </StyledTableRow>
                                          ) : rows.map((row) => (
                                                <StyledTableRow key={row.attendanceId}>
                                                      <StyledTableCell>{row.name}</StyledTableCell>
                                                      <StyledTableCell>{row.staffId}</StyledTableCell>
                                                      <StyledTableCell>{row.ot1}</StyledTableCell>
                                                      <StyledTableCell>{row.ot2}</StyledTableCell>
                                                      <StyledTableCell>{row.date}</StyledTableCell>
                                                      <StyledTableCell>
                                                            <Button color="success" onClick={() => this.handleApprove(row)}>
                                                                  Approve
                                                            </Button>
                                                      </StyledTableCell>
                                                      <StyledTableCell>
                                                            <Button color="danger" onClick={() => this.handleDeclineConfirm(row.attendanceId)}>
                                                                  Decline
                                                            </Button>
                                                      </StyledTableCell>
                                                </StyledTableRow>
                                          ))}
                                    </TableBody>
                              </Table>
                        </TableContainer>

                        {/* Decline confirmation modal */}
                        <Modal isOpen={confirmModal} toggle={() => this.setState({ confirmModal: false })}>
                              <ModalHeader>Confirm Decline</ModalHeader>
                              <ModalBody>Are you sure you want to decline this overtime? It will be reset to 0 hours.</ModalBody>
                              <ModalFooter>
                                    <Button color="danger" onClick={this.handleDecline}>Yes, Decline</Button>
                                    <Button color="secondary" onClick={() => this.setState({ confirmModal: false })}>Cancel</Button>
                              </ModalFooter>
                        </Modal>
                  </>
            );
      }
}
