import React, { Component } from "react";
import axios from 'axios';
import {
  Button, InputGroup, InputGroupAddon, Modal, ModalHeader,
  ModalBody, ModalFooter, Form, FormGroup, Input,
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

export default class Sites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      feedback: '',
      // Add form
      sitename: '',
      location: '',
      latitude: '',
      longitude: '',
      sitemanager: '',
      paintarea: '',
      // Edit
      editId: '',
      editSitename: '',
      editLocation: '',
      editLatitude: '',
      editLongitude: '',
      editSitemanager: '',
      editPaintarea: '',
      // Delete
      deleteId: '',
      deleteName: '',
      siteManagers: [],
    };
  }

  componentDidMount() {
    this.fetchSites();
    this.fetchSiteManagers();
  }

  fetchSiteManagers() {
    axios.get(base_url + '/users/', {
      headers: { 'authorization': localStorage.getItem('Bearer') }
    }).then(res => {
      const users = res.data.users || [];
      const sitemanagers = users.filter(manager => manager.position === 'Site Manager' || manager.position === 'Project Manager');
      this.setState({ siteManagers: sitemanagers });
    }).catch(err => {
      console.log('Error loading users: ' + err.message);
    });
  }

  fetchSites() {
    axios.get(base_url + '/sites/', {
      headers: { 'authorization': localStorage.getItem('Bearer') }
    }).then(res => {
      this.setState({ sites: res.data.sites || [] });
    }).catch(err => {
      alert('Error loading sites: ' + err.message);
    });
  }

  handleAddSite = (e) => {
    e.preventDefault();
    const { sitename, location, latitude, longitude, sitemanager, paintarea } = this.state;
    axios.post(base_url + '/sites/addsite', {
      sitename, location, latitude, longitude, sitemanager, paintarea
    }, {
      headers: { 'authorization': localStorage.getItem('Bearer') }
    }).then(() => {
      this.setState({
        showAddModal: false, feedback: '✓ Site added successfully.',
        sitename: '', location: '', latitude: '', longitude: '', sitemanager: '', paintarea: ''
      });
      setTimeout(() => this.setState({ feedback: '' }), 3000);
      this.fetchSites();
    }).catch(err => {
      alert('Error adding site: ' + err.message);
    });
  }

  handleUpdateSite = () => {
    const { editId, editSitename, editLocation, editLatitude, editLongitude, editSitemanager, editPaintarea } = this.state;
    axios.put(base_url + '/sites/update-sites/' + editId, {
      sitename: editSitename,
      location: editLocation,
      latitude: editLatitude,
      longitude: editLongitude,
      sitemanager: editSitemanager,
      paintarea: editPaintarea,
    }, {
      headers: { 'authorization': localStorage.getItem('Bearer') }
    }).then(() => {
      this.setState({ showEditModal: false, feedback: '✓ Site updated successfully.' });
      setTimeout(() => this.setState({ feedback: '' }), 3000);
      this.fetchSites();
    }).catch(err => {
      alert('Error updating site: ' + err.message);
    });
  }

  handleDeleteSite = () => {
    axios.delete(base_url + '/sites/delete-sites/' + this.state.deleteId, {
      headers: { 'authorization': localStorage.getItem('Bearer') }
    }).then(() => {
      this.setState({ showDeleteModal: false, feedback: '✓ Site deleted successfully.' });
      setTimeout(() => this.setState({ feedback: '' }), 3000);
      this.fetchSites();
    }).catch(err => {
      alert('Error deleting site: ' + err.message);
    });
  }

  openEditModal(site) {
    this.setState({
      showEditModal: true,
      editId: site._id,
      editSitename: site.sitename,
      editLocation: site.location,
      editLatitude: site.latitude,
      editLongitude: site.longitude,
      editSitemanager: site.sitemanager || '',
      editPaintarea: site.paintarea,
    });
  }

  openDeleteModal(site) {
    this.setState({
      showDeleteModal: true,
      deleteId: site._id,
      deleteName: site.sitename,
    });
  }

  render() {
    const { sites, feedback } = this.state;

    const StyledTableCell = withStyles((theme) => ({
      head: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
      body: { fontSize: 14 },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
      root: { '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } },
    }))(TableRow);

    return (
      <>
        <Button
          color="success"
          onClick={() => this.setState({ showAddModal: true })}
          style={{ float: "right", marginBottom: "2%" }}
        >
          Add Site
        </Button>

        {feedback && (
          <div style={{ background: '#d4edda', padding: '8px 12px', borderRadius: 4, color: '#155724', marginBottom: 8, clear: 'both' }}>
            {feedback}
          </div>
        )}

        {/* ---- Add Site Modal ---- */}
        <Modal isOpen={this.state.showAddModal} toggle={() => this.setState({ showAddModal: false })}>
          <ModalHeader>Add New Site</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleAddSite}>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Site Name</InputGroupAddon>
                  <Input value={this.state.sitename} onChange={e => this.setState({ sitename: e.target.value })} placeholder="e.g. Bole Branch" required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Location</InputGroupAddon>
                  <Input value={this.state.location} onChange={e => this.setState({ location: e.target.value })} placeholder="Address / area" required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Latitude</InputGroupAddon>
                  <Input value={this.state.latitude} onChange={e => this.setState({ latitude: e.target.value })} placeholder="e.g. 9.0192" required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Longitude</InputGroupAddon>
                  <Input value={this.state.longitude} onChange={e => this.setState({ longitude: e.target.value })} placeholder="e.g. 38.7525" required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Site Manager</InputGroupAddon>
                  <Input type="select" value={this.state.sitemanager} onChange={e => this.setState({ sitemanager: e.target.value })}>
                    <option value="">----Select Name----</option>
                    {(this.state.siteManagers || []).map((manager) => (
                      <option value={manager.name + " " + manager.lastName} key={manager._id}>{manager.name} {manager.lastName}</option>
                    ))}
                  </Input>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Paint Area</InputGroupAddon>
                  <Input value={this.state.paintarea} onChange={e => this.setState({ paintarea: e.target.value })} placeholder="e.g. 500 sqm" required />
                </InputGroup>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleAddSite}>Add Site</Button>{" "}
            <Button color="secondary" onClick={() => this.setState({ showAddModal: false })}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* ---- Edit Site Modal ---- */}
        <Modal isOpen={this.state.showEditModal} toggle={() => this.setState({ showEditModal: false })}>
          <ModalHeader>Edit Site</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Site Name</InputGroupAddon>
                  <Input value={this.state.editSitename} onChange={e => this.setState({ editSitename: e.target.value })} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Location</InputGroupAddon>
                  <Input value={this.state.editLocation} onChange={e => this.setState({ editLocation: e.target.value })} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Latitude</InputGroupAddon>
                  <Input value={this.state.editLatitude} onChange={e => this.setState({ editLatitude: e.target.value })} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Longitude</InputGroupAddon>
                  <Input value={this.state.editLongitude} onChange={e => this.setState({ editLongitude: e.target.value })} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Site Manager</InputGroupAddon>
                  <Input type="select" value={this.state.editSitemanager} onChange={e => this.setState({ editSitemanager: e.target.value })}>
                    <option value="">----Select Name----</option>
                    {(this.state.siteManagers || []).map((manager) => (
                      <option value={manager.name + " " + manager.lastName} key={manager._id}>{manager.name} {manager.lastName}</option>
                    ))}
                  </Input>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Paint Area</InputGroupAddon>
                  <Input value={this.state.editPaintarea} onChange={e => this.setState({ editPaintarea: e.target.value })} />
                </InputGroup>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleUpdateSite}>Update Site</Button>{" "}
            <Button color="secondary" onClick={() => this.setState({ showEditModal: false })}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* ---- Delete Confirmation Modal ---- */}
        <Modal isOpen={this.state.showDeleteModal} toggle={() => this.setState({ showDeleteModal: false })}>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>Are you sure you want to delete site <strong>{this.state.deleteName}</strong>?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleDeleteSite}>Yes, Delete</Button>{" "}
            <Button color="secondary" onClick={() => this.setState({ showDeleteModal: false })}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* ---- Sites Table ---- */}
        <div style={{ marginTop: "2%", clear: "both" }}></div>
        <TableContainer component={Paper}>
          <Table aria-label="sites table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Site Name</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
                <StyledTableCell>Latitude</StyledTableCell>
                <StyledTableCell>Longitude</StyledTableCell>
                <StyledTableCell>Site Manager</StyledTableCell>
                <StyledTableCell>Paint Area</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sites.length === 0 ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={8} align="center">No sites found. Add a site to get started.</StyledTableCell>
                </StyledTableRow>
              ) : sites.map((site) => (
                <StyledTableRow key={site._id}>
                  <StyledTableCell>{site.sitename}</StyledTableCell>
                  <StyledTableCell>{site.location}</StyledTableCell>
                  <StyledTableCell>{site.latitude}</StyledTableCell>
                  <StyledTableCell>{site.longitude}</StyledTableCell>
                  <StyledTableCell>{site.sitemanager || '-'}</StyledTableCell>
                  <StyledTableCell>{site.paintarea}</StyledTableCell>
                  <StyledTableCell>
                    <Button color="primary" onClick={() => this.openEditModal(site)}>Edit</Button>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button color="danger" onClick={() => this.openDeleteModal(site)}>Delete</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}
