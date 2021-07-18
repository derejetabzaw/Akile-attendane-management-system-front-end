import React, { useState } from "react";
import { Modal, Button, Form} from "react-bootstrap";
import usersData from "./UsersData";
import "./MapViewerComp.css";
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
import Users from "./Users";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
// import Form from "antd/lib/form/Form";

const { TabPane } = Tabs;



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
        <TabPane tab="List of Sites" key="1">
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
          <Modal show={showModal} onHide = {closeModal}>
            
            <Modal.Header>
              <Modal.Title> Add Sites</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Name</InputGroupAddon>

                    <Input placeholder="Name of Employee" />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  {/* <Label for="exampleEmail">Position</Label> */}
                  <InputGroup>
                    {/* <Label for="exampleEmail">Age</Label> */}

                    <InputGroupAddon addonType="prepend">
                      Position
                    </InputGroupAddon>
                    <Input type="select" name="backdrop" id="backdrop">
                      <option value="true">----Select Position----</option>
                      <option value="true">Manager</option>

                      <option value="false">Programmer</option>
                    </Input>
                  </InputGroup>
                </Form.Group>
              </Form>
            
              
              </Modal.Body>
          </Modal>
        </TabPane>
        <TabPane tab="Add Site" key="2">
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

