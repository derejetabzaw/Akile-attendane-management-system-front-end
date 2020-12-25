import React, { useState } from "react";
import usersData from "./UsersData";
import "./MapViewerComp.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Tabs } from "antd";
import Users from "./Users";
import useSwr from "swr";

const { TabPane } = Tabs;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function User() {
  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Add Site" key="1">
          <div style={{ height: "82vh", width: "100%" }}>
            <MapContainer
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
            </MapContainer>
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
