import React, { useState } from "react";
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

const { TabPane } = Tabs;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function User() {
  const _onCreate = (e) => {
    console.log(e, "onCreate");
  };
  const _onEditPath = (e) => {
    console.log(e, "edit path");
  };

  const _onDeleted = (e) => {
    console.log(e, "deleted");
  };

  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Add Site" key="1">
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
              <Marker position={[8.980603, 38.757759]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
              <FeatureGroup>
                <EditControl
                  position="topright"
                  onEdited={_onEditPath}
                  onCreated={_onCreate}
                  onDeleted={_onDeleted}
                  draw={{
                    rectangle: false,
                  }}
                />
                <Circle center={[51.51, -0.06]} radius={200} />
              </FeatureGroup>
            </Map>
          </div>
        </TabPane>
        <TabPane tab="Assign Site" key="2">
          <div style={{ width: "100%" }}>
            <Users />
          </div>
        </TabPane>
        <TabPane tab="Inforamtion" key="3"></TabPane>
      </Tabs>
    </>
  );
}
