import React, { useState } from "react";
import { Modal, Button, Form , Accordion, Card, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import usersData from "./UsersData";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import "./MapViewerComp.css";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Map,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import { EditControl } from "./src";
// import { EditControl } from "react-leaflet-draw";
import { Tabs } from "antd";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Users from "./Users";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
// import Form from "antd/lib/form/Form";

const { TabPane } = Tabs;


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
const rows = [
    "Constraction",
    "0212",
    "7:30",
    "4:50",
    "Addis Ababa",
    "x6t25H3",
    "03/05/20",
    "4:30"
  ]

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function GetIcon(icon) {
  return L.icon({
    // iconUrl: require("../../assets/icons/logo.jpg"),
    iconUrl: require("./src/akil.jpg"),
    iconSize: icon,
  });
}




export default function User() {
  const [mapLayers, setMapLayer] = useState([]);
  const [showModal, setShow] = useState(false);
  const [startDate,setStartDate] = useState(new Date());
  const [endDate,setEndDate] = useState(new Date());



  const addSiteModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const _onCreate = (e) => {
    console.log(e, "onCreate");

    const { layerType, layer } = e;
    if (layerType === "marker") {
      const { _leaflet_id } = layer;
      const { _latlng } = layer;

      setMapLayer((layer) => [...layer, { id: _leaflet_id, latlng: _latlng }]);
      console.log(layer, "layersss", mapLayers);
    }
  };

  const _onEditPath = (e) => {
    console.log(e, "edit path");
    let numEdited = 0;
    e.layers.eachLayer((layer) => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);
  };

  const _onDeleted = (e) => {
    console.log(e, "deleted");

    let numDeleted = 0;
    e.layers.eachLayer((layer) => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);
  };
  return (
    <>
      <Tabs defaultActiveKey="2">
        <TabPane tab="Sites" key="1">
          <Button
            color="primary"
            onClick={closeModal}
            style={{ float: "right", marginBottom: "2%" }}
          >
          Remove {" "}
          </Button>
          <Button
            color="primary"
            onClick={addSiteModal}
            style={{ float: "right", marginBottom: "2%" }}
          >
          Add{" "}
          </Button>

          <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Site Name</StyledTableCell>
                <StyledTableCell>Site Manager</StyledTableCell>
                <StyledTableCell>Paint Area</StyledTableCell>
                <StyledTableCell>Starts</StyledTableCell>
                <StyledTableCell>Ends</StyledTableCell>
                <StyledTableCell>Sanding Material</StyledTableCell>
                <StyledTableCell>Painting Material</StyledTableCell>
                <StyledTableCell align="right">
                  Contact Person
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.Id}</StyledTableCell>
                  <StyledTableCell>{row.CIN}</StyledTableCell>
                  <StyledTableCell>{row.COUT}</StyledTableCell>
                  <StyledTableCell>{row.Location}</StyledTableCell>
                  <StyledTableCell>{row.DId}</StyledTableCell>
                  <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell align="right">{row.time}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>






          <Modal show={showModal} onHide = {closeModal}
          // style={{width: "750px" , margin: "auto"}}
          >
            
            
            <Modal.Header >
              <Modal.Title> Add Sites</Modal.Title>
            </Modal.Header>
            <Modal.Body >
              <Form >
                <Form.Group>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Name</InputGroupAddon>

                    <Input placeholder="Name of Site" />
                    <Button
                    color="primary"
                    // style={{ float: "right", marginBottom: "2%" }}
                    >
                    Pin on Map{" "}
                    </Button>
                  </InputGroup>
                </Form.Group>
                <br/>
                <Form.Group>
                  {/* <Label for="exampleEmail">Position</Label> */}
                  <InputGroup>
                    {/* <Label for="exampleEmail">Age</Label> */}

                    <InputGroupAddon addonType="prepend">Site Manager</InputGroupAddon>
                    <Input type="select" name="backdrop" id="backdrop">
                      <option value="true">----Select Name----</option>
                      <option value="true">Site Manager 1</option>
                      <option value="false">Site Manager 2</option>
                    </Input>
                  </InputGroup>
                  </Form.Group>
                  <br/>
                  <Form.Group>
                  <InputGroup>
                  <InputGroupAddon addonType="prepend">Paint Area</InputGroupAddon>
                    <Input placeholder="Area in meter-square" />
                  </InputGroup>
                </Form.Group>
                <br/>


                  <Form.Group>
                    <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Paint</Accordion.Header>
                        <Accordion.Body>
                        <div className="radio" >
                          <label>
                            <input
                              type="radio"
                              value="Manual"
                              name="Paint"
                              // checked={this.state.selectedOption === "Manual"}
                              // onChange={this.onValueChange}
                            />
                              Ceiling
                          </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input
                                type="radio"
                                value="Manual"
                                name="Paint"
                                // checked={this.state.selectedOption === "Manual"}
                                // onChange={this.onValueChange}
                              />
                                Wall
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input
                                type="radio"
                                value="Manual"
                                name="Paint"
                                // checked={this.state.selectedOption === "Manual"}
                                // onChange={this.onValueChange}
                              />
                                Beam
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input
                                type="radio"
                                value="Manual"
                                name="Paint"
                                // checked={this.state.selectedOption === "Manual"}
                                // onChange={this.onValueChange}
                              />
                                Column
                            </label>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <br/>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Delivering Time</Accordion.Header>
                        <Accordion.Body>
                          <Form.Group>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">Starts:</InputGroupAddon>
                                <p>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> <br/>
                                </p>
                            </InputGroup>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">Ends:</InputGroupAddon>
                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} /> <br/>
                            </InputGroup>
                          </Form.Group>
                        </Accordion.Body>
                      </Accordion.Item>
                      <br/>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>Sanding Material</Accordion.Header>
                        <Accordion.Body>
                          <div className="radio">
                            <label>
                              <input
                                type="radio"
                                value="Manual"
                                name="Sanding-Options"
                                // checked={this.state.selectedOption === "Manual"}
                                // onChange={this.onValueChange}
                              />
                                Manual
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input
                                type="radio"
                                value="Sanding Machine"
                                name="Sanding-Options"
                                // checked={this.state.selectedOption === "Sanding Machine"}
                                // onChange={this.onValueChange}
                              />
                                Sanding Machine
                            </label>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <br/>
                      <Accordion.Item eventKey="3">
                        <Accordion.Header>Painting Material</Accordion.Header>
                        <Accordion.Body>
                          <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  value="Manual"
                                  name="Painting Materials"
                                  // checked={this.state.selectedOption === "Manual"}
                                  // onChange={this.onValueChange}
                                />
                                  Spray Machine
                              </label>
                            </div>
                            <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  value="Sanding Machine"
                                  name="Painting Materials"
                                  // checked={this.state.selectedOption === "Sanding Machine"}
                                  // onChange={this.onValueChange}
                                />
                                  Tool Box
                              </label>
                            </div>
                            <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  value="Sanding Machine"
                                  name="Painting Materials"
                                  // checked={this.state.selectedOption === "Sanding Machine"}
                                  // onChange={this.onValueChange}
                                />
                                  Jet Roller
                              </label>
                            </div>
                            <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  value="Sanding Machine"
                                  name="Painting Materials"
                                  // checked={this.state.selectedOption === "Sanding Machine"}
                                  // onChange={this.onValueChange}
                                />
                                  Same Accessories
                              </label>
                            </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Form.Group>


{/* 
                  <Form.Group>
                  <InputGroup>
                  <InputGroupAddon addonType="prepend">Sanding Material:</InputGroupAddon>
                  </InputGroup>
                  </Form.Group>
                  <Form.Group>
                  <InputGroup>
                  <InputGroupAddon addonType="prepend">Painting Material:</InputGroupAddon>
                  </InputGroup>
                  </Form.Group> */}
                  <Button
                    color="primary"
                    style={{ float: "right", marginBottom: "2%" }}
                    >
                    Cancel{" "}
                  </Button>
                  <Button
                    color="primary"
                    style={{ float: "right", marginBottom: "2%" }}
                    >
                    Add{" "}
                  </Button>
                  



                  
                
              </Form>

            
              
              </Modal.Body>
          </Modal>
        </TabPane>
        <TabPane tab="Map" key="2">
          <div style={{ height: "82vh", width: "100%" }}>
            <Map
              center={[8.980603, 38.757759]}
              zoom={12}
              scrollWheelZoom={false}
              className="mapContainer"
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[8.980603, 38.757759]} icon={GetIcon(30)}>
                <Popup>
                  <p>Akile Headquarters</p>
                  <FeatureGroup>
                    <EditControl
                      position="topright"
                      onEdited={_onEditPath}
                      onCreated={_onCreate}
                      onDeleted={_onDeleted}
                      draw={{
                        rectangle: false,
                        circle: false,
                        polyline: false,
                        polygone: false,
                      }}
                    />
                    <Circle center={[51.51, -0.06]} radius={200} />
                  </FeatureGroup>
                </Popup>
              </Marker>
            </Map>
            <pre>{JSON.stringify(mapLayers, 0, 2)}</pre>
          </div>
        </TabPane>
        <TabPane tab="Assign Site" key="3">
          <div style={{ width: "100%" }}>
            <Users mapData={mapLayers} />
          </div>
        </TabPane>
        <TabPane tab="Inforamtion" key="4"></TabPane>
      </Tabs>
    </>
  );
}

