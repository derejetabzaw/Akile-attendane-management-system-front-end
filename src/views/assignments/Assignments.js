import React, { Component } from "react";
import axios from "axios";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, Badge, Spinner,
} from "reactstrap";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const base_url = "http://localhost:9000/api/v1";

const EMPTY_FORM = {
  employeeId: "",
  title: "",
  type: "shift",
  site: "",
  shiftStart: "",
  shiftEnd: "",
  scheduledDate: "",
  workingHours: "",
  notes: "",
  status: "pending",
};

const STATUS_COLORS = {
  pending: "warning",
  active: "success",
  completed: "secondary",
};

const TYPE_COLORS = {
  task: "info",
  shift: "primary",
  schedule: "dark",
  site: "danger",
};

const StyledTableCell = withStyles((theme) => ({
  head: { backgroundColor: "#4f46e5", color: theme.palette.common.white },
  body: { fontSize: 13 },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: { "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover } },
}))(TableRow);

export default class Assignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      employees: [],
      sites: [],
      loading: true,
      feedback: "",
      showCreateModal: false,
      showEditModal: false,
      showDeleteModal: false,
      form: { ...EMPTY_FORM },
      editId: null,
      deleteId: null,
      deleteName: "",
      saving: false,
    };
  }

  componentDidMount() {
    this.fetchAll();
  }

  fetchAll() {
    this.setState({ loading: true });
    const headers = { authorization: localStorage.getItem("Bearer") };

    Promise.all([
      axios.get(base_url + "/assignments", { headers }),
      axios.get(base_url + "/users/", { headers }),
      axios.get(base_url + "/sites/", { headers }),
    ])
      .then(([assignRes, userRes, siteRes]) => {
        this.setState({
          assignments: assignRes.data.assignments || [],
          employees: (userRes.data.users || []).filter((u) => !u.isAdmin),
          sites: siteRes.data.sites || [],
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
        if (err.response && err.response.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("Bearer");
          window.location.href = "/";
        }
      });
  }

  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState((prev) => ({ form: { ...prev.form, [name]: value } }));
  };

  openCreate = () => {
    this.setState({ form: { ...EMPTY_FORM }, showCreateModal: true });
  };

  openEdit = (assignment) => {
    this.setState({
      editId: assignment._id,
      form: {
        employeeId: assignment.employeeId ? assignment.employeeId._id || assignment.employeeId : "",
        title: assignment.title || "",
        type: assignment.type || "shift",
        site: assignment.site || "",
        shiftStart: assignment.shiftStart || "",
        shiftEnd: assignment.shiftEnd || "",
        scheduledDate: assignment.scheduledDate || "",
        workingHours: assignment.workingHours || "",
        notes: assignment.notes || "",
        status: assignment.status || "pending",
      },
      showEditModal: true,
    });
  };

  openDelete = (assignment) => {
    this.setState({
      deleteId: assignment._id,
      deleteName: assignment.title,
      showDeleteModal: true,
    });
  };

  handleCreate = () => {
    const { form } = this.state;
    if (!form.employeeId || !form.title || !form.type) {
      this.showFeedback("❌ Please fill in Employee, Title, and Type.", "danger");
      return;
    }
    this.setState({ saving: true });
    axios
      .post(base_url + "/assignments", form, {
        headers: { authorization: localStorage.getItem("Bearer") },
      })
      .then(() => {
        this.setState({ showCreateModal: false, saving: false });
        this.showFeedback("✓ Assignment created and employee notified.", "success");
        this.fetchAll();
      })
      .catch((err) => {
        this.setState({ saving: false });
        alert("Error: " + (err.response?.data?.error || err.message));
      });
  };

  handleUpdate = () => {
    const { form, editId } = this.state;
    this.setState({ saving: true });
    axios
      .put(base_url + "/assignments/" + editId, form, {
        headers: { authorization: localStorage.getItem("Bearer") },
      })
      .then(() => {
        this.setState({ showEditModal: false, saving: false });
        this.showFeedback("✓ Assignment updated and employee notified.", "success");
        this.fetchAll();
      })
      .catch((err) => {
        this.setState({ saving: false });
        alert("Error: " + (err.response?.data?.error || err.message));
      });
  };

  handleDelete = () => {
    axios
      .delete(base_url + "/assignments/" + this.state.deleteId, {
        headers: { authorization: localStorage.getItem("Bearer") },
      })
      .then(() => {
        this.setState({ showDeleteModal: false });
        this.showFeedback("✓ Assignment deleted.", "success");
        this.fetchAll();
      })
      .catch((err) => alert("Error: " + (err.response?.data?.error || err.message)));
  };

  showFeedback(msg, type = "success") {
    this.setState({ feedback: { msg, type } });
    setTimeout(() => this.setState({ feedback: "" }), 4000);
  }

  renderForm() {
    const { form, employees, sites } = this.state;
    return (
      <Form>
        <FormGroup>
          <Label>Employee *</Label>
          <Input type="select" name="employeeId" value={form.employeeId} onChange={this.handleFormChange} required>
            <option value="">— Select Employee —</option>
            {employees.map((e) => (
              <option key={e._id} value={e._id}>
                {e.name} {e.lastName} ({e.staffId})
              </option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label>Title *</Label>
          <Input name="title" value={form.title} onChange={this.handleFormChange} placeholder="e.g. Morning Shift - Bole Site" required />
        </FormGroup>

        <div style={{ display: "flex", gap: 12 }}>
          <FormGroup style={{ flex: 1 }}>
            <Label>Type *</Label>
            <Input type="select" name="type" value={form.type} onChange={this.handleFormChange}>
              <option value="shift">Shift</option>
              <option value="schedule">Schedule</option>
              <option value="task">Task</option>
              <option value="site">Site Assignment</option>
            </Input>
          </FormGroup>
          <FormGroup style={{ flex: 1 }}>
            <Label>Status</Label>
            <Input type="select" name="status" value={form.status} onChange={this.handleFormChange}>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </Input>
          </FormGroup>
        </div>

        <FormGroup>
          <Label>Site</Label>
          <Input type="select" name="site" value={form.site} onChange={this.handleFormChange}>
            <option value="">— Select Site (optional) —</option>
            {sites.map((s) => (
              <option key={s._id} value={s.sitename}>
                {s.sitename} — {s.location}
              </option>
            ))}
          </Input>
        </FormGroup>

        <div style={{ display: "flex", gap: 12 }}>
          <FormGroup style={{ flex: 1 }}>
            <Label>Shift Start</Label>
            <Input type="time" name="shiftStart" value={form.shiftStart} onChange={this.handleFormChange} />
          </FormGroup>
          <FormGroup style={{ flex: 1 }}>
            <Label>Shift End</Label>
            <Input type="time" name="shiftEnd" value={form.shiftEnd} onChange={this.handleFormChange} />
          </FormGroup>
          <FormGroup style={{ flex: 1 }}>
            <Label>Working Hours</Label>
            <Input type="number" min="0" step="0.5" name="workingHours" value={form.workingHours} onChange={this.handleFormChange} placeholder="e.g. 9" />
          </FormGroup>
        </div>

        <FormGroup>
          <Label>Scheduled Date</Label>
          <Input type="date" name="scheduledDate" value={form.scheduledDate} onChange={this.handleFormChange} />
        </FormGroup>

        <FormGroup>
          <Label>Notes</Label>
          <Input type="textarea" name="notes" value={form.notes} onChange={this.handleFormChange} rows={2} placeholder="Optional notes for the employee" />
        </FormGroup>
      </Form>
    );
  }

  render() {
    const { assignments, loading, feedback, showCreateModal, showEditModal, showDeleteModal, saving } = this.state;

    return (
      <>
        {/* ── Header row ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h4 style={{ margin: 0, color: "#4f46e5", fontWeight: 700 }}>Assignments</h4>
            <small style={{ color: "#64748b" }}>Assign tasks, shifts, schedules, and sites to employees</small>
          </div>
          <Button color="primary" onClick={this.openCreate} style={{ background: "#4f46e5", border: "none", borderRadius: 8, padding: "8px 20px" }}>
            + Create Assignment
          </Button>
        </div>

        {/* ── Feedback banner ── */}
        {feedback && (
          <div
            style={{
              background: feedback.type === "success" ? "#d1fae5" : "#fee2e2",
              color: feedback.type === "success" ? "#065f46" : "#991b1b",
              padding: "10px 16px",
              borderRadius: 8,
              marginBottom: 12,
              fontWeight: 500,
            }}
          >
            {feedback.msg}
          </div>
        )}

        {/* ── Table ── */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <Spinner color="primary" /> Loading assignments…
          </div>
        ) : (
          <TableContainer component={Paper} style={{ borderRadius: 12, boxShadow: "0 2px 12px rgba(79,70,229,0.08)" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Employee</StyledTableCell>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell>Site</StyledTableCell>
                  <StyledTableCell>Shift</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Hours</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignments.length === 0 ? (
                  <StyledTableRow>
                    <StyledTableCell colSpan={9} align="center" style={{ padding: 32, color: "#94a3b8" }}>
                      No assignments yet. Click <strong>+ Create Assignment</strong> to get started.
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  assignments.map((a) => {
                    const emp = a.employeeId;
                    const empName = emp ? `${emp.name || ""} ${emp.lastName || ""}`.trim() : "—";
                    const shift = a.shiftStart && a.shiftEnd ? `${a.shiftStart} → ${a.shiftEnd}` : "—";
                    return (
                      <StyledTableRow key={a._id}>
                        <StyledTableCell>
                          <div style={{ fontWeight: 600 }}>{empName}</div>
                          {emp && <small style={{ color: "#64748b" }}>{emp.staffId}</small>}
                        </StyledTableCell>
                        <StyledTableCell style={{ maxWidth: 180 }}>{a.title}</StyledTableCell>
                        <StyledTableCell>
                          <Badge color={TYPE_COLORS[a.type] || "secondary"} style={{ textTransform: "capitalize", fontSize: 11 }}>
                            {a.type}
                          </Badge>
                        </StyledTableCell>
                        <StyledTableCell>{a.site || "—"}</StyledTableCell>
                        <StyledTableCell style={{ whiteSpace: "nowrap" }}>{shift}</StyledTableCell>
                        <StyledTableCell>{a.scheduledDate || "—"}</StyledTableCell>
                        <StyledTableCell>{a.workingHours ? `${a.workingHours}h` : "—"}</StyledTableCell>
                        <StyledTableCell>
                          <Badge color={STATUS_COLORS[a.status] || "secondary"} style={{ textTransform: "capitalize", fontSize: 11 }}>
                            {a.status}
                          </Badge>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Button size="sm" color="primary" outline onClick={() => this.openEdit(a)} style={{ marginRight: 6 }}>
                            Edit
                          </Button>
                          <Button size="sm" color="danger" outline onClick={() => this.openDelete(a)}>
                            Delete
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* ── Create Modal ── */}
        <Modal isOpen={showCreateModal} toggle={() => this.setState({ showCreateModal: false })} size="lg">
          <ModalHeader toggle={() => this.setState({ showCreateModal: false })} style={{ background: "#4f46e5", color: "#fff" }}>
            Create New Assignment
          </ModalHeader>
          <ModalBody>{this.renderForm()}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleCreate} disabled={saving} style={{ background: "#4f46e5", border: "none" }}>
              {saving ? <Spinner size="sm" /> : "Create & Notify Employee"}
            </Button>{" "}
            <Button color="secondary" onClick={() => this.setState({ showCreateModal: false })}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* ── Edit Modal ── */}
        <Modal isOpen={showEditModal} toggle={() => this.setState({ showEditModal: false })} size="lg">
          <ModalHeader toggle={() => this.setState({ showEditModal: false })} style={{ background: "#4f46e5", color: "#fff" }}>
            Edit Assignment
          </ModalHeader>
          <ModalBody>{this.renderForm()}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleUpdate} disabled={saving} style={{ background: "#4f46e5", border: "none" }}>
              {saving ? <Spinner size="sm" /> : "Update & Notify Employee"}
            </Button>{" "}
            <Button color="secondary" onClick={() => this.setState({ showEditModal: false })}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* ── Delete Confirm Modal ── */}
        <Modal isOpen={showDeleteModal} toggle={() => this.setState({ showDeleteModal: false })}>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>
            Are you sure you want to delete the assignment <strong>"{this.state.deleteName}"</strong>?
            The employee's related notifications will also be removed.
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleDelete}>
              Yes, Delete
            </Button>{" "}
            <Button color="secondary" onClick={() => this.setState({ showDeleteModal: false })}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
