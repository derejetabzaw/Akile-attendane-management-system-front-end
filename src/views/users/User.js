import React, { useState } from "react";
import CIcon from "@coreui/icons-react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import usersData from "./UsersData";
import ReactMapGL from "react-map-gl";
import "./MapViewerComp.css";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import { Tabs } from "antd";
import Users from "./Users";
import { render } from "enzyme";

const { TabPane } = Tabs;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGVsaW5hLWciLCJhIjoiY2tqMDNiYXc1Mm4yMDJxc2NjbnVhdGNmZyJ9._r28TdYZ4-9oatr382Axsg";
export default class User extends React.Component {
  // const [viewPort, setViewPort] = useState({
  //   latitude: 45.4211,
  //   longitude: -75.6903,
  //   width: "100vw",
  //   height: "100vh",
  //   zome: 10,
  // });
  constructor(props) {
    super(props);
    this.state = {
      map: undefined,
      lng: 45.4211,
      lat: -75.6903,
      zoom: 11,
    };
  }
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
    this.setState({ map: map });
  }
  render() {
    return (
      <>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Add Site" key="1">
            {/* <ReactMapGL
            {...viewPort}
            // mapStyle="mapbox://styles/leighhalliday/cjufmjn1r2kic1fl9wxg7u1l4"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={(view) => {
              console.log(view, "view");
              setViewPort(view);
            }}
          ></ReactMapGL> */}
            <div style={{ height: "100vh", width: "100%" }}>
              <div>
                <div
                  ref={(el) => (this.mapContainer = el)}
                  className="mapContainer"
                />
              </div>
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
}
// }
// AIzaSyBqSabtygfHfwwG9W9g_-qrWP-8r6q-zgk
// <script defer
//     src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDRb886yC1brzjRDS-UtSPAB9DJpFQxbRY&callback=initMap">
// </script>

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyBqSabtygfHfwwG9W9g_-qrWP-8r6q-zgk",
// })(User);
