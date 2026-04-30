import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, InputGroup, InputGroupAddon, Input
} from "reactstrap";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const base_url = 'http://localhost:9000/api/v1';

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

const PendingApprovals = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Approve modal
  const [approveModal, setApproveModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [salary, setSalary] = useState('');
  const [position, setPosition] = useState('');
  const [workingSite, setWorkingSite] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  const toggleApproveModal = () => setApproveModal(!approveModal);

  const fetchPending = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${base_url}/users/pending`, {
        headers: { 'authorization': localStorage.getItem('Bearer') }
      });
      setPendingUsers(res.data.users || []);
    } catch (err) {
      console.error("Error fetching pending users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSites = async () => {
    try {
      const res = await axios.get(`${base_url}/sites`, {
        headers: { 'authorization': localStorage.getItem('Bearer') }
      });
      setSites(res.data.sites || []);
    } catch (err) {
      console.error("Error fetching sites:", err);
    }
  };

  useEffect(() => {
    fetchPending();
    fetchSites();
  }, []);

  const handleApproveClick = (user) => {
    setSelectedUser(user);
    setSalary('');
    setPosition('');
    setWorkingSite('');
    setEmail(user.email || '');
    setTelephone(user.telephone || '');
    setApproveModal(true);
  };

  const submitApproval = async () => {
    if (!salary || !position || !workingSite) {
      alert("Please fill in Salary, Position, and Working Site.");
      return;
    }

    try {
      await axios.put(`${base_url}/users/approve/${selectedUser._id}`, {
        salary,
        position,
        workingSite
      }, {
        headers: { 'authorization': localStorage.getItem('Bearer') }
      });

      alert(`User ${selectedUser.name} approved! Activation email sent.`);
      setApproveModal(false);
      fetchPending();
    } catch (err) {
      alert("Approval failed: " + (err.response?.data?.error || err.message));
    }
  };

  const handleReject = async (userId, staffId) => {
    if (!window.confirm("Are you sure you want to reject and remove this user?")) return;

    try {
      await axios.delete(`${base_url}/users/delete-user/${staffId}`, {
        headers: { 'authorization': localStorage.getItem('Bearer') }
      });
      fetchPending();
    } catch (err) {
      alert("Failed to reject user: " + (err.response?.data?.error || err.message));
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <div style={{ marginTop: "2%" }}></div>

      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading pending registrations...</p>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="pending approvals table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Employee Name</StyledTableCell>
                <StyledTableCell>Position</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
                <StyledTableCell>StaffID</StyledTableCell>
                <StyledTableCell>Working Site</StyledTableCell>
                <StyledTableCell>Basic Salary</StyledTableCell>
                <StyledTableCell>Telephone</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingUsers.length === 0 ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={10} style={{ textAlign: 'center', padding: '20px' }}>
                    No users awaiting approval.
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                pendingUsers.map((user, idx) => (
                  <StyledTableRow key={user._id}>
                    <StyledTableCell component="th" scope="row">{user.name} {user.lastName}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{user.position || '—'}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{user.gender || '—'}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{user.staffId || '—'}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{user.workingSite || '—'}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{user.salary || '—'}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{user.telephone || '—'}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{user.email || '—'}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <Button color="primary" onClick={() => handleApproveClick(user)}>
                        Approve
                      </Button>{" "}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Button color="danger" onClick={() => handleReject(user._id, user.staffId)}>
                        Reject
                      </Button>{" "}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Approval Modal — same style as Dashboard Update Employee modal */}
      <Modal
        isOpen={approveModal}
        modalTransition={{ timeout: 200 }}
        backdropTransition={{ timeout: 100 }}
        style={{ width: "50%" }}
        toggle={toggleApproveModal}
      >
        <ModalHeader>
          Activate: {selectedUser?.name} {selectedUser?.lastName}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  Position
                </InputGroupAddon>
                <Input onChange={(e) => setPosition(e.target.value)} type="select" value={position}>
                  <option value="">Select Position</option>
                  <option value="Site Manager">Site Manager</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="PMP">Professional Machine Painter - PMP</option>
                  <option value="Painter">Painter</option>
                  <option value="Security">Security</option>
                  <option value="Laborer">Laborer</option>
                </Input>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  Working Site
                </InputGroupAddon>
                <Input onChange={(e) => setWorkingSite(e.target.value)} type="select" value={workingSite}>
                  <option value="">Select Site</option>
                  {sites.map((site) => (
                    <option key={site._id} value={site.sitename}>{site.sitename} - {site.location}</option>
                  ))}
                </Input>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  Basic Salary
                </InputGroupAddon>
                <Input
                  onChange={(e) => setSalary(e.target.value)}
                  type="number"
                  placeholder="Salary"
                  value={salary}
                />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  Telephone
                </InputGroupAddon>
                <Input
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder={selectedUser?.telephone || "Phone Number"}
                  type="phone"
                  value={telephone}
                />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={selectedUser?.email || "Email"}
                  type="email"
                  value={email}
                />
              </InputGroup>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitApproval}>
            Approve Employee
          </Button>{" "}
          <Button color="secondary" onClick={toggleApproveModal}>
            Cancel
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PendingApprovals;
